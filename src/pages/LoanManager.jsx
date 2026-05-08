import { useState } from 'react';
import { Plus, X, Wallet, Home, Car, GraduationCap, Layout } from 'lucide-react';
import { useLoanManager } from '../hooks/useLoanManager';

const LoanManager = () => {
  const { loans, createLoan, deleteLoan, loading } = useLoanManager();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All Active");
  const [formError, setFormError] = useState('');
  const [formLoading, setFormLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    principal: '',
    annualRate: '',
    months: '',
    startDate: new Date().toISOString().split('T')[0],
    lender: ''
  });

  const getIcon = (name = '') => {
    const n = name.toLowerCase();
    if (n.includes('home') || n.includes('mortgage')) return <Home size={24} />;
    if (n.includes('car') || n.includes('auto')) return <Car size={24} />;
    if (n.includes('student') || n.includes('edu')) return <GraduationCap size={24} />;
    return <Wallet size={24} />;
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setFormError('Loan name is required');
      return false;
    }
    if (!formData.principal || parseFloat(formData.principal) <= 0) {
      setFormError('Principal must be a positive number');
      return false;
    }
    if (!formData.annualRate || parseFloat(formData.annualRate) < 0 || parseFloat(formData.annualRate) > 50) {
      setFormError('Annual rate must be between 0 and 50');
      return false;
    }
    if (!formData.months || parseInt(formData.months) < 1 || parseInt(formData.months) > 360) {
      setFormError('Duration must be between 1 and 360 months');
      return false;
    }
    if (!formData.startDate) {
      setFormError('Start date is required');
      return false;
    }
    if (!formData.lender.trim()) {
      setFormError('Lender name is required');
      return false;
    }
    return true;
  };

  const handleCreateLoan = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setFormLoading(true);
    try {
      await createLoan({
        name: formData.name,
        principal: parseFloat(formData.principal),
        annualRate: parseFloat(formData.annualRate),
        months: parseInt(formData.months),
        startDate: formData.startDate,
        lender: formData.lender
      });

      setFormData({
        name: '',
        principal: '',
        annualRate: '',
        months: '',
        startDate: new Date().toISOString().split('T')[0],
        lender: ''
      });
      setIsModalOpen(false);
      setFormError('');
    } catch (err) {
      setFormError(err.message || 'Failed to create loan');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteLoan = async (id) => {
    if (window.confirm('Are you sure you want to delete this loan?')) {
      try {
        await deleteLoan(id);
      } catch (err) {
        alert(err.message || 'Failed to delete loan');
      }
    }
  };

  const filteredLoans = loans.filter(loan => {
    if (activeFilter === "All Active") return true;
    if (activeFilter === "Mortgages") return loan.name.toLowerCase().includes('home') || loan.name.toLowerCase().includes('mortgage');
    if (activeFilter === "Auto Loans") return loan.name.toLowerCase().includes('car') || loan.name.toLowerCase().includes('auto');
    if (activeFilter === "Personal") return !loan.name.toLowerCase().includes('home') && !loan.name.toLowerCase().includes('mortgage') && !loan.name.toLowerCase().includes('car') && !loan.name.toLowerCase().includes('student');
    if (activeFilter === "Student") return loan.name.toLowerCase().includes('student');
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-200/50 p-6 md:p-16">
      <main className="max-w-7xl mx-auto flex flex-col gap-12">
        
        <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="font-bold text-4xl text-slate-900 mb-2">Loan Manager</h1>
            <p className="text-lg text-slate-500">Track, manage, and optimize your active liabilities.</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-emerald-950 text-white px-6 py-3 rounded-full hover:bg-emerald-900 transition-colors flex items-center gap-2 shadow-[0_10px_30px_rgba(24,40,32,0.1)] font-bold text-sm uppercase tracking-wider"
          >
            <Plus size={18} />
            Add New Loan
          </button>
        </section>

        <section className="flex gap-4 border-b border-slate-200 pb-2 overflow-x-auto no-scrollbar">
          {["All Active", "Mortgages", "Auto Loans", "Personal", "Student"].map((filter) => (
            <button 
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`font-bold text-xs uppercase tracking-widest pb-2 px-2 whitespace-nowrap transition-colors ${
                activeFilter === filter 
                ? "text-emerald-950 border-b-2 border-emerald-950" 
                : "text-slate-400 hover:text-emerald-950"
              }`}
            >
              {filter}
            </button>
          ))}
        </section>

        {loading ? (
          <div className="flex justify-center py-32">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-950"></div>
          </div>
        ) : filteredLoans.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 border-2 border-dashed border-slate-200 rounded-[3rem] bg-white/50">
            <div className="w-20 h-20 bg-slate-100 rounded-3xl flex items-center justify-center text-slate-400 mb-6">
              <Layout size={40} />
            </div>
            <h3 className="text-xl font-bold text-slate-900">No loans found</h3>
            <p className="text-slate-500 mt-2">Click "Add New Loan" to get started.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredLoans.map((loan) => (
              <div key={loan.id} className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 group">
                <div className="flex justify-between items-start mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-emerald-950 group-hover:bg-emerald-950 group-hover:text-white transition-colors">
                      {getIcon(loan.name)}
                    </div>
                    <div>
                      <h3 className="font-bold text-xl text-slate-900 truncate max-w-[150px]">{loan.lender}</h3>
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{loan.name}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleDeleteLoan(loan.id)}
                    className="text-slate-300 hover:text-red-600 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="mb-8">
                  <span className="text-[10px] font-black text-emerald-900 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-widest">
                    Active
                  </span>
                  <div className="mt-4">
                    <p className="text-slate-400 text-xs font-semibold uppercase">Principal Amount</p>
                    <h4 className="text-3xl font-bold text-slate-900 mt-1">
                      ₹{loan.principal.toLocaleString()}
                    </h4>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 py-6 border-y border-slate-50 mb-6 font-bold">
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase">Rate</p>
                    <p className="text-slate-900 text-lg">{loan.annual_rate}%</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase">EMI</p>
                    <p className="text-slate-900 text-lg">₹{loan.monthly_emi.toLocaleString()}</p>
                  </div>
                </div>

                <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase mb-2">
                  <span>Progress</span>
                  <span>{loan.months} Months</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-emerald-950 rounded-full transition-all duration-700"
                    style={{ width: `35%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-md overflow-y-auto">
          <div className="bg-white rounded-[3rem] w-full max-w-lg p-10 shadow-2xl border border-slate-100 my-auto">
            <div className="flex justify-between items-center mb-8 font-bold text-slate-900">
              <h2 className="text-3xl tracking-tight">Add Liability</h2>
              <button onClick={() => setIsModalOpen(false)}><X size={24} /></button>
            </div>

            {formError && (
              <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-2xl text-sm border border-red-100">
                {formError}
              </div>
            )}

            <form onSubmit={handleCreateLoan} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[11px] font-black text-emerald-950 uppercase">Loan Name (e.g. Home Loan)</label>
                <input 
                  required 
                  placeholder="Apartment Mortgage" 
                  className="w-full bg-slate-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-emerald-950 outline-none" 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})} 
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-emerald-950 uppercase">Bank Name</label>
                  <input 
                    required 
                    placeholder="HDFC Bank" 
                    className="w-full bg-slate-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-emerald-950 outline-none" 
                    value={formData.lender}
                    onChange={e => setFormData({...formData, lender: e.target.value})} 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-emerald-950 uppercase">Principal</label>
                  <input 
                    required 
                    type="number" 
                    placeholder="500000" 
                    className="w-full bg-slate-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-emerald-950 outline-none"
                    value={formData.principal}
                    onChange={e => setFormData({...formData, principal: e.target.value})} 
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-emerald-950 uppercase">Rate (%)</label>
                  <input 
                    required 
                    type="number" 
                    step="0.1" 
                    placeholder="8.5" 
                    className="w-full bg-slate-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-emerald-950 outline-none"
                    value={formData.annualRate}
                    onChange={e => setFormData({...formData, annualRate: e.target.value})} 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-emerald-950 uppercase">Duration (Months)</label>
                  <input 
                    required 
                    type="number" 
                    placeholder="120" 
                    className="w-full bg-slate-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-emerald-950 outline-none"
                    value={formData.months}
                    onChange={e => setFormData({...formData, months: e.target.value})} 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-black text-emerald-950 uppercase">Start Date</label>
                <input 
                  required 
                  type="date" 
                  className="w-full bg-slate-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-emerald-950 outline-none"
                  value={formData.startDate}
                  onChange={e => setFormData({...formData, startDate: e.target.value})} 
                />
              </div>

              <button 
                type="submit" 
                disabled={formLoading}
                className={`w-full bg-emerald-950 text-white font-bold py-5 rounded-2xl hover:bg-emerald-900 shadow-lg mt-4 transition-all ${formLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {formLoading ? 'Processing...' : 'Confirm & Add Loan'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoanManager;
