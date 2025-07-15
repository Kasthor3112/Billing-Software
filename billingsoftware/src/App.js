import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import Header from './Pages/Header';
import Dashboard from './Pages/Dashboard';
import InvoiceHeader from './Components/InvoiceHeader';
import CustomerDetails from './Components/CustomerDetails';
import ItemTable from './Components/ItemTable';
import InvoiceSummary from './Components/InvoiceSummary';
import ActionButtons from './Components/ActionButton';
import CustomersPage from './Pages/Customers';
import ProductsPage from './Pages/Products';
import ReportsPage from './Pages/Reports';
import Footer from './Pages/Footer';
import LoginPage from './Pages/Login';

const App = () => {
  // State for invoice details
  const [invoice, setInvoice] = useState({
    invoiceNumber: '',
    invoiceDate: new Date().toISOString().slice(0, 10), // Current date
    customerName: '',
    customerAddress: '',
    customerGSTIN: '', // GST Identification Number
    items: [{ id: 1, description: '', quantity: 1, unitPrice: 0, gstRate: 18 }], // Default item with 18% GST
    subTotal: 0,
    totalGST: 0,
    grandTotal: 0,
  });

  const navigate = useNavigate()

  // State for managing unique item IDs
  const [nextItemId, setNextItemId] = useState(2);

  // State to manage the current page view (simulating react-router-dom's location.pathname)
  const [currentPage, setCurrentPage] = useState('/login'); // Start at login page
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to calculate totals (subTotal, totalGST, grandTotal)
  const calculateTotals = useCallback(() => {
    let newSubTotal = 0;
    let newTotalGST = 0;

    invoice.items.forEach(item => {
      const itemTotal = item.quantity * item.unitPrice;
      const itemGST = itemTotal * (item.gstRate / 100);
      newSubTotal += itemTotal;
      newTotalGST += itemGST;
    });

    const newGrandTotal = newSubTotal + newTotalGST;

    setInvoice(prevInvoice => ({
      ...prevInvoice,
      subTotal: newSubTotal,
      totalGST: newTotalGST,
      grandTotal: newGrandTotal,
    }));
  }, [invoice.items]); // Recalculate when items change

  // Effect to recalculate totals whenever items change
  useEffect(() => {
    calculateTotals();
  }, [invoice.items, calculateTotals]);

  // Handle changes in invoice header fields
  const handleHeaderChange = (e) => {
    const { name, value } = e.target;
    setInvoice(prevInvoice => ({
      ...prevInvoice,
      [name]: value,
    }));
  };

  // Handle changes in individual item fields
  const handleItemChange = (id, e) => {
    const { name, value, type } = e.target;
    const updatedItems = invoice.items.map(item =>
      item.id === id
        ? { ...item, [name]: type === 'number' ? parseFloat(value) || 0 : value }
        : item
    );
    setInvoice(prevInvoice => ({
      ...prevInvoice,
      items: updatedItems,
    }));
  };

  // Add a new item row
  const addItem = () => {
    setInvoice(prevInvoice => ({
      ...prevInvoice,
      items: [
        ...prevInvoice.items,
        { id: nextItemId, description: '', quantity: 1, unitPrice: 0, gstRate: 18 }, // Default GST
      ],
    }));
    setNextItemId(prevId => prevId + 1);
  };

  // Remove an item row
  const removeItem = (id) => {
    setInvoice(prevInvoice => ({
      ...prevInvoice,
      items: prevInvoice.items.filter(item => item.id !== id),
    }));
  };

  // Simulate saving the invoice (in a real app, this would be an API call)
  const handleSaveInvoice = () => {
    console.log('Saving Invoice:', invoice);
    // In a real application, you would send this data to your Node.js backend
    // Example: fetch('/api/invoices', { method: 'POST', body: JSON.stringify(invoice) })
    alert('Invoice saved! (Simulated)'); // Using alert for demo, use a custom modal in production
  };

  // Simulate printing the invoice
  const handlePrintInvoice = () => {
    console.log('Printing Invoice:', invoice);
    alert('Printing Invoice! (Simulated)'); // Using alert for demo
    window.print(); // Browser print functionality
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentPage('/dashboard');
    navigate('/dashboard') // Redirect to dashboard after login
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      setIsLoggedIn(false);
      setCurrentPage('/login');
      navigate('/login') // Redirect to login page after logout
    }
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  if (isLoggedIn) {
    return (
      // In a real react-router-dom app, you would wrap your entire App content in <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 font-inter text-gray-800 flex flex-col">
        <Header onLogout={handleLogout} />
        <main className="flex-grow max-w-4xl mx-auto bg-white shadow-xl rounded-xl p-8 space-y-8 w-full">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/invoice" element={
              <>
                <InvoiceHeader invoiceNumber={invoice.invoiceNumber} invoiceDate={invoice.invoiceDate} onHeaderChange={handleHeaderChange} />
                <CustomerDetails customerName={invoice.customerName} customerAddress={invoice.customerAddress} customerGSTIN={invoice.customerGSTIN} onHeaderChange={handleHeaderChange} />
                <ItemTable items={invoice.items} onItemChange={handleItemChange} addItem={addItem} removeItem={removeItem} />
                <InvoiceSummary subTotal={invoice.subTotal} totalGST={invoice.totalGST} grandTotal={invoice.grandTotal} />
                <ActionButtons onSaveInvoice={handleSaveInvoice} onPrintInvoice={handlePrintInvoice} />
              </>
            } />
            <Route path="/customers" element={<CustomersPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    );
  }
};

export default App;