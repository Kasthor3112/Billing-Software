import React from 'react';

const ActionButtons = ({ onSaveInvoice, onPrintInvoice }) => (
  <div className="flex justify-center space-x-4">
    <button
      onClick={onSaveInvoice}
      className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300"
    >
      Save Invoice
    </button>
    <button
      onClick={onPrintInvoice}
      className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-300"
    >
      Print Invoice
    </button>
  </div>
);

export default ActionButtons;