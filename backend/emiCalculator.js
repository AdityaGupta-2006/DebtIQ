function calculateEMI(principal, annualRate, months) {
  if (principal <= 0 || annualRate < 0 || months <= 0) {
    throw new Error('Invalid input: Principal must be > 0, rate >= 0, months > 0');
  }

  if (annualRate === 0) {
    const emi = principal / months;
    return {
      monthlyEMI: Math.round(emi * 100) / 100,
      totalAmount: principal,
      totalInterest: 0
    };
  }

  const monthlyRate = (annualRate / 12) / 100;
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

module.exports = { calculateEMI };
