import React, { useState, useEffect, useCallback } from 'react';
import DataTable from '../Components/Datatable';

const CustomersPage = () => {
  const [customers, setCustomers] = useState([
    { id: 1, name: 'ABC Enterprises', email: 'abc@example.com', phone: '9876543210', gstin: '27ABCDE1234F1Z5' },
    { id: 2, name: 'PQR Solutions', email: 'pqr@example.com', phone: '9123456789', gstin: '27FGHIJ6789K2Z6' },
    { id: 3, name: 'XYZ Innovations', email: 'xyz@example.com', phone: '9988776655', gstin: '' },
  ]);
  const [newCustomer, setNewCustomer] = useState({ name: '', email: '', phone: '', gstin: '' });
  const [editingCustomerId, setEditingCustomerId] = useState(null);
  const [editedCustomer, setEditedCustomer] = useState({});
  const [nextCustomerId, setNextCustomerId] = useState(4);

  const customerColumns = [
    { key: 'name', header: 'Name', editable: true },
    { key: 'email', header: 'Email', editable: true, type: 'email' },
    { key: 'phone', header: 'Phone', editable: true, type: 'tel' },
    { key: 'gstin', header: 'GSTIN', editable: true },
  ];

  const handleNewCustomerChange = (e) => {
    const { name, value } = e.target;
    setNewCustomer(prev => ({ ...prev, [name]: value }));
  };

  const addCustomer = (e) => {
    e.preventDefault();
    if (newCustomer.name && newCustomer.email) {
      setCustomers(prev => [...prev, { ...newCustomer, id: nextCustomerId }]);
      setNextCustomerId(prev => prev + 1);
      setNewCustomer({ name: '', email: '', phone: '', gstin: '' });
    } else {
      alert('Customer Name and Email are required!');
    }
  };

  const startEditingCustomer = (customer) => {
    setEditingCustomerId(customer.id);
    setEditedCustomer({ ...customer });
  };

  const handleEditedCustomerChange = (e) => {
    const { name, value } = e.target;
    setEditedCustomer(prev => ({ ...prev, [name]: value }));
  };

  const saveEditedCustomer = (id) => {
    if (!editedCustomer.name || !editedCustomer.email) {
        alert('Customer Name and Email cannot be empty.');
        return;
    }
    setCustomers(prev =>
      prev.map(customer =>
        customer.id === id ? editedCustomer : customer
      )
    );
    setEditingCustomerId(null);
    setEditedCustomer({});
  };

  const cancelEditingCustomer = () => {
    setEditingCustomerId(null);
    setEditedCustomer({});
  };

  const deleteCustomer = (id) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      setCustomers(prev => prev.filter(customer => customer.id !== id));
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-center text-indigo-700">Manage Customers</h2>

      {/* Add New Customer Form */}
      <section className="bg-gray-50 p-6 rounded-lg shadow-inner">
        <h3 className="text-2xl font-semibold text-indigo-600 mb-4">Add New Customer</h3>
        <form onSubmit={addCustomer} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="newCustomerName" className="block text-sm font-medium text-gray-700 mb-1">Name <span className="text-red-500">*</span></label>
            <input type="text" name="name" id="newCustomerName" value={newCustomer.name} onChange={handleNewCustomerChange} className="w-full p-2 border border-gray-300 rounded-md" required />
          </div>
          <div>
            <label htmlFor="newCustomerEmail" className="block text-sm font-medium text-gray-700 mb-1">Email <span className="text-red-500">*</span></label>
            <input type="email" name="email" id="newCustomerEmail" value={newCustomer.email} onChange={handleNewCustomerChange} className="w-full p-2 border border-gray-300 rounded-md" required />
          </div>
          <div>
            <label htmlFor="newCustomerPhone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input type="tel" name="phone" id="newCustomerPhone" value={newCustomer.phone} onChange={handleNewCustomerChange} className="w-full p-2 border border-gray-300 rounded-md" />
          </div>
          <div>
            <label htmlFor="newCustomerGSTIN" className="block text-sm font-medium text-gray-700 mb-1">GSTIN</label>
            <input type="text" name="gstin" id="newCustomerGSTIN" value={newCustomer.gstin} onChange={handleNewCustomerChange} className="w-full p-2 border border-gray-300 rounded-md" />
          </div>
          <div className="md:col-span-2 text-right">
            <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-200 ease-in-out transform hover:scale-105">
              Add Customer
            </button>
          </div>
        </form>
      </section>

      {/* Customer List using DataTable */}
      <section className="bg-gray-50 p-6 rounded-lg shadow-inner">
        <h3 className="text-2xl font-semibold text-indigo-600 mb-4">Existing Customers</h3>
        <DataTable
          data={customers}
          columns={customerColumns}
          editingId={editingCustomerId}
          editedData={editedCustomer}
          onEditedDataChange={handleEditedCustomerChange}
          onStartEdit={startEditingCustomer}
          onSaveEdit={saveEditedCustomer}
          onCancelEdit={cancelEditingCustomer}
          onDelete={deleteCustomer}
        />
      </section>
    </div>
  );
};

export default CustomersPage;