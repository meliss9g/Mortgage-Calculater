import React, { useState } from "react";

function MortgageCalculater() {
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loanTerm, setLoanTerm] = useState("");
  const [monthlyPayment, setMonthlyPayment] = useState("");
  const [error, setError] = useState("");

  const CalculatePayment = () => {
    if (!loanAmount || !interestRate || !loanTerm) {
      setError("All fields are required.");
      return;
    }
    if (loanAmount <= 0 || interestRate <= 0 || loanTerm <= 0) {
      setError("Please enter valid positive values.");
      return;
    }
    if (loanTerm < 5) {
      setError("Loan Term must not be less than 5 years.");
      return;
    }
    if (interestRate > 8) {
      setError("Interest rate must not be greater than 8.");
      return;
    }
    const P = parseFloat(loanAmount);
    const i = parseFloat(interestRate) / 100 / 12;
    const n = parseFloat(loanTerm) * 12;
    const M = (P * (i * Math.pow(1 + i, n))) / (Math.pow(1 + i, n) - 1);
    setMonthlyPayment(Math.round(M));
    console.log(M);
    setError("");
  };

  return (
    <div className="p-4">
      <input
        className="border p-2 m-2 w-full"
        type="number"
        placeholder="Loan Amount"
        value={loanAmount}
        onChange={(e) => setLoanAmount(e.target.value)}
      />
      <input
        className="border p-2 m-2 w-full"
        type="number"
        placeholder="Interest Rate (%)"
        value={interestRate}
        onChange={(e) => setInterestRate(e.target.value)}
      />
      <input
        className="border p-2 m-2 w-full"
        type="number"
        placeholder="Loan Term (years)"
        value={loanTerm}
        onChange={(e) => setLoanTerm(e.target.value)}
      />
      <button
        className="bg-fuchsia-600 dark:md:hover:bg-fuchsia-900 text-white p-2 m-2 w-full"
        onClick={CalculatePayment}
      >
        Calculate
      </button>
      {error && <div className="text-red-500"> {error} </div>}
      <div className="p-2">Monthly Payment : ${monthlyPayment}</div>
    </div>
  );
}
export default MortgageCalculater;
