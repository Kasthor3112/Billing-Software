import React from 'react';

const Dashboard = () => {
  // Mock data for demonstration
  const stats = [
    { title: 'Total Customers', value: '1,250', icon: '👥', color: 'bg-blue-500' },
    { title: 'Total Products', value: '345', icon: '📦', color: 'bg-green-500' },
    { title: 'Total Invoices', value: '5,890', icon: '📄', color: 'bg-purple-500' },
    { title: 'Total Revenue', value: '₹ 1,23,45,678', icon: '💰', color: 'bg-yellow-500' },
  ];

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-center text-indigo-700">Dashboard Overview</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`${stat.color} text-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-center text-center transform transition duration-300 hover:scale-105`}
          >
            <div className="text-5xl mb-3">{stat.icon}</div>
            <h3 className="text-xl font-semibold mb-1">{stat.title}</h3>
            <p className="text-3xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Charts Placeholder */}
      <section className="bg-gray-50 p-6 rounded-lg shadow-inner">
        <h3 className="text-2xl font-semibold text-indigo-600 mb-4">Sales & Activity Charts</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-lg shadow-md min-h-[250px] flex items-center justify-center text-gray-500 border border-dashed border-gray-300">
            <p>Placeholder for Sales Over Time Chart (e.g., Monthly Sales)</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md min-h-[250px] flex items-center justify-center text-gray-500 border border-dashed border-gray-300">
            <p>Placeholder for Product Popularity Chart</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md min-h-[250px] flex items-center justify-center text-gray-500 border border-dashed border-gray-300">
            <p>Placeholder for Customer Acquisition Chart</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md min-h-[250px] flex items-center justify-center text-gray-500 border border-dashed border-gray-300">
            <p>Placeholder for GST Summary Chart</p>
          </div>
        </div>
      </section>

      {/* Recent Activity/Quick Links Placeholder */}
      <section className="bg-gray-50 p-6 rounded-lg shadow-inner">
        <h3 className="text-2xl font-semibold text-indigo-600 mb-4">Recent Activity & Quick Links</h3>
        <div className="text-gray-600">
          <p className="mb-2">This section could display:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Latest Invoices</li>
            <li>Recent Customer Additions</li>
            <li>Quick links to frequently used features</li>
            <li>Notifications or alerts</li>
          </ul>
          <div className="bg-white p-4 rounded-lg shadow-md mt-4 min-h-[100px] flex items-center justify-center text-gray-500 border border-dashed border-gray-300">
            <p>Content for recent activities/quick links would go here.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;