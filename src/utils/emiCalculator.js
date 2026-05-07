/**
 * EMI Calculator Utility
 * Calculates monthly EMI using standard financial formula
 */

/**
 * Calculate monthly EMI
 * @param {number} principal - Loan principal amount
 * @param {number} annualRate - Annual interest rate in percentage
 * @param {number} months - Loan duration in months
 * @returns {object} - EMI details
 */
export function calculateEMI(principal, annualRate, months) {
  // Input validation
  if (principal <= 0 || annualRate < 0 || months <= 0) {
    throw new Error('Invalid input: Principal must be > 0, rate >= 0, months > 0');
  }

  // Handle zero interest rate (simple division)
  if (annualRate === 0) {
    const emi = principal / months;
    return {
      monthlyEMI: Math.round(emi * 100) / 100, // Round to 2 decimal places
      totalAmount: principal,
      totalInterest: 0
    };
  }

  // Convert annual rate to monthly decimal
  const monthlyRate = (annualRate / 12) / 100;

  // EMI formula: EMI = [P x R x (1+R)^N] / [(1+R)^N - 1]
  const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
              (Math.pow(1 + monthlyRate, months) - 1);

  const monthlyEMI = Math.round(emi * 100) / 100;
  const totalAmount = Math.round(monthlyEMI * months * 100) / 100;
  const totalInterest = Math.round((totalAmount - principal) * 100) / 100;

  return {
    monthlyEMI,
    totalAmount,
    totalInterest
  };
}

/**
 * Validate loan input data
 * @param {object} loanData - Loan data to validate
 * @returns {boolean} - True if valid
 */
export function validateLoanData(loanData) {
  const { name, principal, annualRate, months, startDate, lender } = loanData;

  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    throw new Error('Loan name is required');
  }

  if (!principal || typeof principal !== 'number' || principal <= 0) {
    throw new Error('Principal must be a positive number');
  }

  if (annualRate === undefined || typeof annualRate !== 'number' || annualRate < 0 || annualRate > 50) {
    throw new Error('Annual rate must be between 0 and 50');
  }

  if (!months || typeof months !== 'number' || months < 1 || months > 360) {
    throw new Error('Duration must be between 1 and 360 months');
  }

  if (!startDate || isNaN(new Date(startDate).getTime())) {
    throw new Error('Valid start date is required');
  }

  if (!lender || typeof lender !== 'string' || lender.trim().length === 0) {
    throw new Error('Lender name is required');
  }

  return true;
}
