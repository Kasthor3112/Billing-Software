import React, { useState, useEffect, useCallback } from 'react';

const InvoiceHeader = ({ invoiceNumber, invoiceDate, onHeaderChange }) => (
  <section className="bg-gray-50 p-6 rounded-lg shadow-inner">
    <h2 className="text-2xl font-semibold text-indigo-600 mb-4">Invoice Details</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label htmlFor="invoiceNumber" className="block text-sm font-medium text-gray-700 mb-1">
          Invoice Number
        </label>
        <input
          type="text"
          id="invoiceNumber"
          name="invoiceNumber"
          value={invoiceNumber}
          onChange={onHeaderChange}
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="INV-2023-001"
        />
      </div>
      <div>
        <label htmlFor="invoiceDate" className="block text-sm font-medium text-gray-700 mb-1">
          Invoice Date
        </label>
        <input
          type="date"
          id="invoiceDate"
          name="invoiceDate"
          value={invoiceDate}
          onChange={onHeaderChange}
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
    </div>
  </section>
);

export default InvoiceHeader;