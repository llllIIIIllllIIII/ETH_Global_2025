import React from "react";
import "./SubscriptionManager.css";

export default function SubscriptionManager() {
  // Simulated data fetched from backend or blockchain
  const totalMonthlyCost = 200; // Total monthly subscription cost
  const paidThisMonth = 80;     // Paid amount for this month
  const historicalTotalPaid = 150; // Historical total paid amount
  
  const subscriptions = [
    {
      name: "ChatGPT Pro",
      price: 20,
      currency: "USDT",
      nextDue: "2023-12-01",
    },
    {
      name: "Notion AI",
      price: 10,
      currency: "USDT",
      nextDue: "2023-11-15",
    },
    {
      name: "Figma Plus",
      price: 15,
      currency: "USDT",
      nextDue: "2023-11-30",
    },
  ];

  const handleTransfer = (sub) => {
    // Trigger logic to transfer subscription
    alert(`Transfer subscription: ${sub.name}`);
  };

  const handleCancel = (sub) => {
    // Trigger logic to cancel subscription
    alert(`Cancel subscription: ${sub.name}`);
  };

  return (
    <div className="subscription-manager">
      {/* Top Info Card */}
      <div className="info-card">
        <div className="info-item">
          <h2 className="info-title">Total Monthly Subscription Cost</h2>
          <p className="info-value">$ {totalMonthlyCost} USDT / month</p>
        </div>
        <div className="info-item">
          <h2 className="info-title">Paid This Month</h2>
          <p className="info-value paid">$ {paidThisMonth} USDT</p>
        </div>
        <div className="info-item">
          <h2 className="info-title">Historical Total Paid</h2>
          <p className="info-value totalpaid">$ {historicalTotalPaid} USDT</p>
        </div>
      </div>

      {/* Subscription List Table */}
      <div className="subscription-table-container">
        <table className="subscription-table">
          <thead>
            <tr>
              <th>Subscription Service</th>
              <th>Price</th>
              <th>Next Payment Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {subscriptions.map((sub, index) => (
              <tr key={index}>
                <td>{sub.name}</td>
                <td>
                  {sub.price} {sub.currency}/month
                </td>
                <td>{sub.nextDue}</td>
                <td>
                  <button
                    className="btn transfer"
                    onClick={() => handleTransfer(sub)}
                  >
                    Transfer
                  </button>
                  <button
                    className="btn cancel"
                    onClick={() => handleCancel(sub)}
                  >
                    Unsubscribe
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
