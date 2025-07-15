import React, { useState, useEffect, useCallback } from 'react';

const InvoiceSummary = ({ subTotal, totalGST, grandTotal }) => (
  <section className="bg-gray-50 p-6 rounded-lg shadow-inner">
    <h2 className="text-2xl font-semibold text-indigo-600 mb-4">Summary</h2>
    <div className="space-y-2 text-lg">
      <div className="flex justify-between">
        <span>Sub Total:</span>
        <span className="font-semibold">₹ {subTotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between">
        <span>Total GST:</span>
        <span className="font-semibold">₹ {totalGST.toFixed(2)}</span>
      </div>
      <div className="flex justify-between text-2xl font-bold text-indigo-700 border-t-2 border-indigo-300 pt-2 mt-2">
        <span>Grand Total:</span>
        <span>₹ {grandTotal.toFixed(2)}</span>
      </div>
    </div>
  </section>
);

export default InvoiceSummary;