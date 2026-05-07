import { calculateEMI, validateLoanData } from '../utils/emiCalculator';

const STORAGE_KEY = 'debtiq_loans';

// Helper to simulate API delay
const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

// Helper to get loans from local storage
const getLocalLoans = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

// Helper to save loans to local storage
const saveLocalLoans = (loans) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(loans));
};

// Loan API mock calls using LocalStorage
export const loanAPI = {
  // Get all loans
  getAllLoans: async (sortBy = null) => {
    await delay();
    let loans = getLocalLoans();

    // Apply sorting
    if (sortBy) {
      switch (sortBy) {
        case 'dueDate':
          loans.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
          break;
        case 'interest':
          loans.sort((a, b) => b.annualRate - a.annualRate);
          break;
        case 'amount':
          loans.sort((a, b) => b.principal - a.principal);
          break;
        case 'name':
          loans.sort((a, b) => a.name.localeCompare(b.name));
          break;
        default:
          break;
      }
    }

    return {
      success: true,
      data: loans
    };
  },

  // Get specific loan
  getLoanById: async (id) => {
    await delay();
    const loans = getLocalLoans();
    const loan = loans.find(l => l.id === id);
    
    if (!loan) {
      throw new Error('Loan not found');
    }

    return {
      success: true,
      data: loan
    };
  },

  // Get loan statistics
  getLoanStats: async () => {
    await delay();
    const loans = getLocalLoans();

    const stats = {
      totalLoans: loans.length,
      activeLoans: loans.filter(l => l.status === 'active').length,
      totalPrincipal: loans.reduce((sum, l) => sum + l.principal, 0),
      totalMonthlyEMI: loans.filter(l => l.status === 'active').reduce((sum, l) => sum + l.monthlyEMI, 0),
      totalInterest: loans.reduce((sum, l) => sum + l.totalInterest, 0)
    };

    // Round monetary values
    stats.totalPrincipal = Math.round(stats.totalPrincipal * 100) / 100;
    stats.totalMonthlyEMI = Math.round(stats.totalMonthlyEMI * 100) / 100;
    stats.totalInterest = Math.round(stats.totalInterest * 100) / 100;

    return {
      success: true,
      data: stats
    };
  },

  // Create new loan
  createLoan: async (loanData) => {
    await delay();
    validateLoanData(loanData);

    const loans = getLocalLoans();
    const emiDetails = calculateEMI(loanData.principal, loanData.annualRate, loanData.months);

    const newLoan = {
      id: crypto.randomUUID(),
      name: loanData.name.trim(),
      principal: loanData.principal,
      annualRate: loanData.annualRate,
      months: loanData.months,
      startDate: loanData.startDate,
      lender: loanData.lender.trim(),
      monthlyEMI: emiDetails.monthlyEMI,
      totalAmount: emiDetails.totalAmount,
      totalInterest: emiDetails.totalInterest,
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    loans.push(newLoan);
    saveLocalLoans(loans);

    return {
      success: true,
      data: newLoan,
      message: 'Loan created successfully'
    };
  },

  // Update loan
  updateLoan: async (id, loanData) => {
    await delay();
    const loans = getLocalLoans();
    const index = loans.findIndex(l => l.id === id);

    if (index === -1) {
      throw new Error('Loan not found');
    }

    const existingLoan = loans[index];
    const updatedLoan = {
      ...existingLoan,
      ...loanData,
      updatedAt: new Date().toISOString()
    };

    validateLoanData(updatedLoan);

    // Recalculate EMI if principal, rate, or months changed
    if (loanData.principal !== undefined || loanData.annualRate !== undefined || loanData.months !== undefined) {
      const emiDetails = calculateEMI(updatedLoan.principal, updatedLoan.annualRate, updatedLoan.months);
      updatedLoan.monthlyEMI = emiDetails.monthlyEMI;
      updatedLoan.totalAmount = emiDetails.totalAmount;
      updatedLoan.totalInterest = emiDetails.totalInterest;
    }

    loans[index] = updatedLoan;
    saveLocalLoans(loans);

    return {
      success: true,
      data: updatedLoan,
      message: 'Loan updated successfully'
    };
  },

  // Delete loan
  deleteLoan: async (id) => {
    await delay();
    const loans = getLocalLoans();
    const filteredLoans = loans.filter(l => l.id !== id);

    if (filteredLoans.length === loans.length) {
      throw new Error('Loan not found');
    }

    saveLocalLoans(filteredLoans);

    return {
      success: true,
      message: 'Loan deleted successfully'
    };
  },

  // Health check
  checkHealth: async () => {
    return { success: true, status: 'ok', storage: 'localStorage' };
  }
};

export default loanAPI;