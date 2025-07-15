import React, { useState } from 'react';

const ReportsPage = () => {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [reportGenerated, setReportGenerated] = useState(false);
  const [filteredInvoices, setFilteredInvoices] = useState([]);

  // Mock data for reports
  const allInvoices = [
    { id: 'INV-001', date: '2023-01-15', customer: 'ABC Enterprises', total: 15000, gst: 2700 },
    { id: 'INV-002', date: '2023-02-01', customer: 'PQR Solutions', total: 22000, gst: 3960 },
    { id: 'INV-003', date: '2023-03-10', customer: 'XYZ Innovations', total: 18000, gst: 3240 },
    { id: 'INV-004', date: '2023-04-20', customer: 'ABC Enterprises', total: 30000, gst: 5400 },
    { id: 'INV-005', date: '2023-05-05', customer: 'PQR Solutions', total: 12000, gst: 2160 },
    { id: 'INV-006', date: '2023-06-25', customer: 'XYZ Innovations', total: 28000, gst: 5040 },
    { id: 'INV-007', date: '2023-07-01', customer: 'New Customer Co.', total: 5000, gst: 900 },
  ];

  const salesByMonth = [
    { month: 'Jan', sales: 150000 },
    { month: 'Feb', sales: 180000 },
    { month: 'Mar', sales: 210000 },
    { month: 'Apr', sales: 190000 },
    { month: 'May', sales: 250000 },
    { month: 'Jun', sales: 230000 },
  ];

  const topSellingProducts = [
    { name: 'Laptop Pro X', units: 50, revenue: 3750000 },
    { name: 'Software License (Annual)', units: 80, revenue: 960000 },
    { name: 'Wireless Mouse', units: 120, revenue: 96000 },
    { name: 'External SSD 1TB', units: 30, revenue: 1500000 },
  ];

  const handleGenerateReport = () => {
    if (!fromDate || !toDate) {
      alert('Please select both From Date and To Date.');
      return;
    }
    const from = new Date(fromDate);
    const to = new Date(toDate);
    if (from > to) {
      alert('From Date cannot be after To Date.');
      return;
    }

    const filtered = allInvoices.filter(invoice => {
      const invoiceDate = new Date(invoice.date);
      return invoiceDate >= from && invoiceDate <= to;
    });
    setFilteredInvoices(filtered);
    setReportGenerated(true);
    console.log(`Generating report from ${fromDate} to ${toDate}`);
    // In a real app, you'd send these dates to your backend to fetch filtered data
  };

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-center text-indigo-700">Reports</h2>

      {/* Report Filters */}
      <section className="bg-gray-50 p-6 rounded-lg shadow-inner">
        <h3 className="text-2xl font-semibold text-indigo-600 mb-4">Generate Custom Reports</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div>
            <label htmlFor="fromDate" className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
            <input
              type="date"
              id="fromDate"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="toDate" className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
            <input
              type="date"
              id="toDate"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="md:col-span-1 text-right md:text-left">
            <button
              onClick={handleGenerateReport}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-200 ease-in-out transform hover:scale-105"
            >
              Generate Report
            </button>
          </div>
        </div>
        {reportGenerated && (
          <p className="mt-4 text-green-700 font-medium">Report generated for the period: {fromDate} to {toDate}. (Mock data displayed below)</p>
        )}
      </section>

      {reportGenerated && filteredInvoices.length > 0 && (
        <section className="bg-gray-50 p-6 rounded-lg shadow-inner">
          <h3 className="text-2xl font-semibold text-indigo-600 mb-4">Invoices for Selected Period</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-indigo-500 text-white">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Invoice ID</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Customer</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Total (₹)</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">GST (₹)</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredInvoices.map((invoice, index) => (
                  <tr key={index}>
                    <td className="px-4 py-3 whitespace-nowrap">{invoice.id}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{invoice.date}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{invoice.customer}</td>
                    <td className="px-4 py-3 whitespace-nowrap">₹ {invoice.total.toLocaleString('en-IN')}</td>
                    <td className="px-4 py-3 whitespace-nowrap">₹ {invoice.gst.toLocaleString('en-IN')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredInvoices.length === 0 && (
            <p className="text-center text-gray-500 mt-4">No invoices found for the selected period.</p>
          )}
        </section>
      )}

      {/* Sales by Month Report */}
      <section className="bg-gray-50 p-6 rounded-lg shadow-inner">
        <h3 className="text-2xl font-semibold text-indigo-600 mb-4">Sales by Month (Last 6 Months)</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-indigo-500 text-white">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Month</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Total Sales (₹)</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {salesByMonth.map((data, index) => (
                <tr key={index}>
                  <td className="px-4 py-3 whitespace-nowrap">{data.month}</td>
                  <td className="px-4 py-3 whitespace-nowrap">₹ {data.sales.toLocaleString('en-IN')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Top Selling Products Report */}
      <section className="bg-gray-50 p-6 rounded-lg shadow-inner">
        <h3 className="text-2xl font-semibold text-indigo-600 mb-4">Top Selling Products</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-indigo-500 text-white">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Product Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Units Sold</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Revenue (₹)</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {topSellingProducts.map((data, index) => (
                <tr key={index}>
                  <td className="px-4 py-3 whitespace-nowrap">{data.name}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{data.units}</td>
                  <td className="px-4 py-3 whitespace-nowrap">₹ {data.revenue.toLocaleString('en-IN')}</td>
                  </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default ReportsPage;