import { formatISODateLocal } from './date';

const STORAGE_KEY = 'debtiq_payments_v1';

const readStore = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
};

const writeStore = (store) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
};

export const isPaymentMarkedPaid = (loanId, dueISODate) => {
  if (!loanId || !dueISODate) return false;
  const store = readStore();
  return Boolean(store?.[loanId]?.[dueISODate]);
};

export const markPaymentPaid = (loanId, dueISODate) => {
  if (!loanId || !dueISODate) return;
  const store = readStore();
  store[loanId] = store[loanId] || {};
  store[loanId][dueISODate] = true;
  writeStore(store);
};

export const unmarkPaymentPaid = (loanId, dueISODate) => {
  if (!loanId || !dueISODate) return;
  const store = readStore();
  if (!store?.[loanId]) return;
  delete store[loanId][dueISODate];
  if (Object.keys(store[loanId]).length === 0) delete store[loanId];
  writeStore(store);
};

export const togglePaymentPaid = (loanId, dueISODate) => {
  if (isPaymentMarkedPaid(loanId, dueISODate)) unmarkPaymentPaid(loanId, dueISODate);
  else markPaymentPaid(loanId, dueISODate);
};

export const listPaidDatesForLoan = (loanId) => {
  if (!loanId) return [];
  const store = readStore();
  return Object.keys(store?.[loanId] || {}).sort();
};

export const markPaymentPaidToday = (loanId) => {
  const todayISO = formatISODateLocal(new Date());
  if (!todayISO) return;
  markPaymentPaid(loanId, todayISO);
};

