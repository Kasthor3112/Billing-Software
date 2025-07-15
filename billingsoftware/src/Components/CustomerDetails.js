import React from 'react';

const CustomerDetails = ({ customerName, customerAddress, customerGSTIN, onHeaderChange }) => (
  <section className="bg-gray-50 p-6 rounded-lg shadow-inner">
    <h2 className="text-2xl font-semibold text-indigo-600 mb-4">Customer Details</h2>
    <div className="grid grid-cols-1 gap-6">
      <div>
        <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-1">
          Customer Name
        </label>
        <input
          type="text"
          id="customerName"
          name="customerName"
          value={customerName}
          onChange={onHeaderChange}
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="M/s. ABC Enterprises"
        />
      </div>
      <div>
        <label htmlFor="customerAddress" className="block text-sm font-medium text-gray-700 mb-1">
          Customer Address
        </label>
        <textarea
          id="customerAddress"
          name="customerAddress"
          value={customerAddress}
          onChange={onHeaderChange}
          rows="3"
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="123, Main Street, City, State - 123456"
        ></textarea>
      </div>
      <div>
        <label htmlFor="customerGSTIN" className="block text-sm font-medium text-gray-700 mb-1">
          Customer GSTIN (Optional)
        </label>
        <input
          type="text"
          id="customerGSTIN"
          name="customerGSTIN"
          value={customerGSTIN}
          onChange={onHeaderChange}
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="e.g., 27ABCDE1234F1Z5"
        />
      </div>
    </div>
  </section>
);

export default CustomerDetails;