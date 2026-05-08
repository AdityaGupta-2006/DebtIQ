import { useState } from 'react'
import { useLoanManager } from '../hooks/useLoanManager'
import { clampDayOfMonth, formatISODateLocal, monthDiff, parseISODateLocal } from '../utils/date'
import { isPaymentMarkedPaid, togglePaymentPaid } from '../utils/paymentTracker'

function Calender() {
  const today = new Date()
  const [currentDate, setCurrentDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1))
  const [selectedDate, setSelectedDate] = useState(today.getDate())
  const [modal, setModal] = useState(null)
  const [paymentsRev, setPaymentsRev] = useState(0)

  const { loans: backendLoans = [] } = useLoanManager()

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  const todayDate = today.getDate()

  const monthName = currentDate.toLocaleString("default", {
    month: "long"
  })

  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const firstDay = new Date(year, month, 1).getDay()

  const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]

  const dates = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1)
  ]

  const normalizeLoan = (loan) => {
    const startISO = loan.start_date || loan.startDate;
    return {
      id: loan.id,
      name: loan.name || loan.bank || 'Loan',
      months: Number(loan.months),
      monthlyEmi: Number(loan.monthly_emi ?? loan.monthlyEMI ?? loan.monthlyEmi ?? 0),
      startDateISO: typeof startISO === 'string' ? startISO : null,
    };
  };

  const dueItemsThisMonth = (() => {
    void paymentsRev;
    const monthAnchor = new Date(year, month, 1);
    const items = [];

    for (const raw of backendLoans) {
      const loan = normalizeLoan(raw);
      if (!loan.id || !loan.startDateISO || !Number.isFinite(loan.months) || loan.months <= 0) continue;

      const startDate = parseISODateLocal(loan.startDateISO);
      if (!startDate) continue;

      const diff = monthDiff(monthAnchor, new Date(startDate.getFullYear(), startDate.getMonth(), 1));
      if (diff < 0 || diff >= loan.months) continue;

      const dueDay = clampDayOfMonth(year, month, startDate.getDate());
      const dueDate = new Date(year, month, dueDay);
      const dueISO = formatISODateLocal(dueDate);
      if (!dueISO) continue;

      items.push({
        loanId: loan.id,
        loanName: loan.name,
        monthlyEmi: loan.monthlyEmi,
        dueDate,
        dueISO,
        isPaid: isPaymentMarkedPaid(String(loan.id), dueISO),
      });
    }

    return items.sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime());
  })();

  const monthTotals = (() => {
    const totalDue = dueItemsThisMonth.reduce((sum, item) => sum + (Number.isFinite(item.monthlyEmi) ? item.monthlyEmi : 0), 0);
    const totalPaid = dueItemsThisMonth.reduce((sum, item) => sum + (item.isPaid ? (Number.isFinite(item.monthlyEmi) ? item.monthlyEmi : 0) : 0), 0);
    const remaining = Math.max(0, totalDue - totalPaid);
    return { totalDue, totalPaid, remaining };
  })();

  const selectedDateISO = formatISODateLocal(new Date(year, month, selectedDate));

  const selectedItems = selectedDateISO ? dueItemsThisMonth.filter((i) => i.dueISO === selectedDateISO) : [];

  const urgentThresholdDays = 3;
  const todayISO = formatISODateLocal(today);
  const isSameMonthAsToday = today.getFullYear() === year && today.getMonth() === month;
  const urgentDays = (() => {
    const set = new Set();
    for (const item of dueItemsThisMonth) {
      if (item.isPaid) continue;
      const diffDays = Math.ceil((item.dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      if (diffDays >= 0 && diffDays <= urgentThresholdDays) set.add(item.dueDate.getDate());
    }
    return set;
  })();

  const paidDays = (() => {
    const set = new Set();
    for (const item of dueItemsThisMonth) {
      if (item.isPaid) set.add(item.dueDate.getDate());
    }
    return set;
  })();

  const upcomingDays = (() => {
    const set = new Set();
    for (const item of dueItemsThisMonth) set.add(item.dueDate.getDate());
    return set;
  })();

  const goToToday = () => {
    setCurrentDate(new Date(today.getFullYear(), today.getMonth(), 1));
    setSelectedDate(today.getDate());
  };

  const moveMonth = (delta) => {
    const next = new Date(year, month + delta, 1);
    setCurrentDate(next);
    setSelectedDate(1);
  };

  return (
    <div className="bg-slate-200/50 flex-1 p-4 sm:p-8 overflow-y-auto relative h-screen">

      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-3xl sm:text-4xl font-bold text-gray-800">
            {monthName} {year}
          </p>
          <p className="text-gray-500 mt-1">
            Stay on track with your financial commitments.
          </p>
        </div>

        <div className="flex gap-4 items-center">
          <button onClick={() => moveMonth(-1)} className="bg-white px-3 py-2 rounded-xl border text-sm">
            Prev
          </button>
          <button onClick={goToToday} className="bg-white px-4 py-2 rounded-xl border text-sm">
            Today
          </button>
          <button onClick={() => moveMonth(1)} className="bg-white px-3 py-2 rounded-xl border text-sm">
            Next
          </button>
          <button
            onClick={() => selectedItems.length && setModal("pay")}
            disabled={!selectedItems.length}
            className={`bg-gray-800 text-white px-4 py-2 rounded-xl text-sm ${!selectedItems.length ? 'opacity-60 cursor-not-allowed' : ''}`}
          >
            Mark Paid
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">

        <div className="flex-1 flex flex-col gap-6">

          <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-sm border border-slate-200">
            
            <div className="flex gap-6 text-sm text-gray-500 mb-4">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-600"></div>
                Paid
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-gray-400"></div>
                Upcoming
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-red-500"></div>
                Urgent
              </div>
            </div>

            <div className="grid grid-cols-7 gap-2 text-center text-sm text-gray-400 mb-2">
              {days.map(d => <div key={d}>{d}</div>)}
            </div>

            <div className="grid grid-cols-7 gap-2">
              {dates.map((date, index) => {
                const isPaid = date ? paidDays.has(date) : false
                const isUrgent = date ? urgentDays.has(date) : false
                const isUpcoming = date ? upcomingDays.has(date) : false
                const isToday = isSameMonthAsToday && date === todayDate

                return (
                  <div
                    key={index}
                    onClick={() => date && setSelectedDate(date)}
                    className={`relative h-12 flex items-center justify-center rounded-xl text-sm font-medium cursor-pointer
                      ${date === selectedDate
                        ? "bg-gray-600 text-white"
                        : isToday
                        ? "bg-green-950 text-white"
                        : "bg-slate-100 text-gray-600"
                      }`}
                  >
                    {date}

                    {date && (
                      <span
                        className={`absolute bottom-1 h-1.5 w-1.5 rounded-full
                          ${isPaid
                            ? "bg-green-600"
                            : isUrgent
                            ? "bg-red-500"
                            : isUpcoming
                            ? "bg-gray-400"
                            : "bg-transparent"
                          }`}
                      ></span>
                    )}
                  </div>
                )
              })}
            </div>

          </div>

        </div>

        <div className="w-full lg:w-[350px] flex flex-col gap-6">

          <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-slate-200">
            <p className="text-lg font-semibold text-gray-800">
              Monthly Summary
            </p>
            <p className="text-gray-500 text-sm mt-1">
              Your total obligations for {monthName}.
            </p>

            <p className="text-4xl font-bold text-gray-800 mt-4">
              ₹{monthTotals.totalDue.toLocaleString()}
            </p>
            <p className="text-gray-500 text-sm">Due</p>

            <div className="w-full h-2 bg-gray-200 rounded-full mt-4 relative">
              <div
                className="absolute left-0 top-0 h-2 bg-gray-800 rounded-full"
                style={{
                  width: monthTotals.totalDue > 0 ? `${Math.min(100, Math.round((monthTotals.totalPaid / monthTotals.totalDue) * 100))}%` : '0%'
                }}
              ></div>
            </div>

            <div className="flex justify-between text-sm text-gray-500 mt-2">
              <p>Paid: ₹{monthTotals.totalPaid.toLocaleString()}</p>
              <p>Remaining: ₹{monthTotals.remaining.toLocaleString()}</p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-slate-200 flex flex-col gap-4">
            
            <p className="text-lg font-semibold text-gray-800">
              {selectedDateISO ? `Payments on ${selectedDateISO}` : 'Payments'}
            </p>

            {!selectedItems.length ? (
              <div className="text-sm text-gray-500 bg-slate-50 border border-slate-200 rounded-2xl p-4">
                No EMI due on this date.
              </div>
            ) : (
              selectedItems.map((item) => {
                const dueIsToday = todayISO && item.dueISO === todayISO;
                const isUrgent = urgentDays.has(item.dueDate.getDate());
                const containerClass = item.isPaid
                  ? "bg-emerald-50"
                  : isUrgent || dueIsToday
                  ? "bg-red-100"
                  : "bg-slate-100";

                const labelClass = item.isPaid
                  ? "text-emerald-800"
                  : isUrgent || dueIsToday
                  ? "text-red-700"
                  : "text-gray-700";

                return (
                  <div key={`${item.loanId}-${item.dueISO}`} className={`flex items-center justify-between rounded-2xl p-4 ${containerClass}`}>
                    <div className="flex flex-col">
                      <p className={`text-sm font-medium ${labelClass}`}>{item.loanName}</p>
                      <p className={`text-sm font-bold ${labelClass}`}>
                        ₹{(Number.isFinite(item.monthlyEmi) ? item.monthlyEmi : 0).toLocaleString()}
                        {item.isPaid ? " • Paid" : dueIsToday ? " • Due Today" : " • Due"}
                      </p>
                    </div>

                    <button
                      onClick={() => setModal(item.isPaid ? "review" : "pay")}
                      className={
                        item.isPaid
                          ? "border border-emerald-700 px-4 py-1.5 rounded-full text-sm text-emerald-800"
                          : "bg-red-600 text-white px-4 py-1.5 rounded-full text-sm"
                      }
                    >
                      {item.isPaid ? "Unmark" : "Pay Now"}
                    </button>
                  </div>
                );
              })
            )}

          </div>

        </div>

      </div>

      {modal && (
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-6 w-[90%] max-w-sm flex flex-col gap-4">
            <p className="text-xl font-bold text-gray-800">
              {modal === "pay" ? "Complete Payment" : "Review Details"}
            </p>

            <p className="text-gray-500 text-sm">
              {modal === "pay"
                ? "Proceed with your payment securely."
                : "View and manage your loan details."
              }
            </p>

            <button
              onClick={() => {
                if (selectedDateISO) {
                  for (const item of selectedItems) {
                    togglePaymentPaid(String(item.loanId), selectedDateISO);
                  }
                }
                setPaymentsRev((v) => v + 1);
                setModal(null);
              }}
              className="bg-gray-800 text-white py-2 rounded-xl"
            >
              {modal === "pay" ? "Mark as Paid" : "Toggle Paid"}
            </button>

            <button 
              onClick={() => setModal(null)}
              className="text-gray-500 text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

    </div>
  )
}

export default Calender
