import React from 'react';

const ItemTable = ({ items, onItemChange, addItem, removeItem }) => (
  <section className="bg-gray-50 p-6 rounded-lg shadow-inner">
    <h2 className="text-2xl font-semibold text-indigo-600 mb-4">Items</h2>
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 rounded-lg overflow-hidden">
        <thead className="bg-indigo-500 text-white">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider rounded-tl-lg">Description</th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Qty</th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Unit Price (₹)</th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">GST (%)</th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Total (₹)</th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider rounded-tr-lg">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {items.map(item => (
            <tr key={item.id}>
              <td className="px-4 py-3 whitespace-nowrap">
                <input
                  type="text"
                  name="description"
                  value={item.description}
                  onChange={(e) => onItemChange(item.id, e)}
                  className="w-full p-2 border border-gray-200 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Item Description"
                />
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <input
                  type="number"
                  name="quantity"
                  value={item.quantity}
                  onChange={(e) => onItemChange(item.id, e)}
                  className="w-20 p-2 border border-gray-200 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  min="0"
                />
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <input
                  type="number"
                  name="unitPrice"
                  value={item.unitPrice}
                  onChange={(e) => onItemChange(item.id, e)}
                  className="w-28 p-2 border border-gray-200 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  min="0"
                  step="0.01"
                />
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <select
                  name="gstRate"
                  value={item.gstRate}
                  onChange={(e) => onItemChange(item.id, e)}
                  className="w-24 p-2 border border-gray-200 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="0">0%</option>
                  <option value="5">5%</option>
                  <option value="12">12%</option>
                  <option value="18">18%</option>
                  <option value="28">28%</option>
                </select>
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-right font-medium">
                ₹ {(item.quantity * item.unitPrice * (1 + item.gstRate / 100)).toFixed(2)}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-center">
                <button
                  onClick={() => removeItem(item.id)}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-3 rounded-full shadow-md transition duration-200 ease-in-out transform hover:scale-105"
                >
                  &times;
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <button
      onClick={addItem}
      className="mt-4 bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-200 ease-in-out transform hover:scale-105"
    >
      Add Item
    </button>
  </section>
);

export default ItemTable;