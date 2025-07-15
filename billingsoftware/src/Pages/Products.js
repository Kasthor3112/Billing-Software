import React, { useState, useEffect, useCallback } from 'react';
import ItemTable from '../Components/ItemTable';
import DataTable from '../Components/Datatable';

const ProductsPage = () => {
  const [products, setProducts] = useState([
    { id: 1, name: 'Laptop Pro X', price: 75000, hsn: '8471', gst: 18 },
    { id: 2, name: 'Wireless Mouse', price: 800, hsn: '8471', gst: 18 },
    { id: 3, name: 'Software License (Annual)', price: 12000, hsn: '9983', gst: 18 },
  ]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', hsn: '', gst: 18 });
  const [editingProductId, setEditingProductId] = useState(null);
  const [editedProduct, setEditedProduct] = useState({});
  const [nextProductId, setNextProductId] = useState(4);

  const productColumns = [
    { key: 'name', header: 'Name', editable: true },
    { key: 'price', header: 'Price (₹)', editable: true, type: 'number', render: (value) => `₹ ${value.toFixed(2)}`, min: 0, step: 0.01 },
    { key: 'hsn', header: 'HSN/SAC', editable: true },
    { key: 'gst', header: 'GST (%)', editable: true, type: 'select', options: [
        { value: 0, label: '0%' }, { value: 5, label: '5%' }, { value: 12, label: '12%' },
        { value: 18, label: '18%' }, { value: 28, label: '28%' }
      ], render: (value) => `${value}%`
    },
  ];

  const handleNewProductChange = (e) => {
    const { name, value, type } = e.target;
    setNewProduct(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value
    }));
  };

  const addProduct = (e) => {
    e.preventDefault();
    if (newProduct.name && newProduct.price > 0) {
      setProducts(prev => [...prev, { ...newProduct, id: nextProductId }]);
      setNextProductId(prev => prev + 1);
      setNewProduct({ name: '', price: '', hsn: '', gst: 18 });
    } else {
      alert('Product Name and valid Price are required!');
    }
  };

  const startEditingProduct = (product) => {
    setEditingProductId(product.id);
    setEditedProduct({ ...product });
  };

  const handleEditedProductChange = (e) => {
    const { name, value, type } = e.target;
    setEditedProduct(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value
    }));
  };

  const saveEditedProduct = (id) => {
    if (!editedProduct.name || editedProduct.price <= 0) {
        alert('Product Name and valid Price are required!');
        return;
    }
    setProducts(prev =>
      prev.map(product =>
        product.id === id ? editedProduct : product
      )
    );
    setEditingProductId(null);
    setEditedProduct({});
  };

  const cancelEditingProduct = () => {
    setEditingProductId(null);
    setEditedProduct({});
  };

  const deleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(prev => prev.filter(product => product.id !== id));
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-center text-indigo-700">Manage Products/Services</h2>

      {/* Add New Product Form */}
      <section className="bg-gray-50 p-6 rounded-lg shadow-inner">
        <h3 className="text-2xl font-semibold text-indigo-600 mb-4">Add New Product/Service</h3>
        <form onSubmit={addProduct} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="newProductName" className="block text-sm font-medium text-gray-700 mb-1">Name <span className="text-red-500">*</span></label>
            <input type="text" name="name" id="newProductName" value={newProduct.name} onChange={handleNewProductChange} className="w-full p-2 border border-gray-300 rounded-md" required />
          </div>
          <div>
            <label htmlFor="newProductPrice" className="block text-sm font-medium text-gray-700 mb-1">Price (₹) <span className="text-red-500">*</span></label>
            <input type="number" name="price" id="newProductPrice" value={newProduct.price} onChange={handleNewProductChange} className="w-full p-2 border border-gray-300 rounded-md" min="0" step="0.01" required />
          </div>
          <div>
            <label htmlFor="newProductHSN" className="block text-sm font-medium text-gray-700 mb-1">HSN/SAC Code</label>
            <input type="text" name="hsn" id="newProductHSN" value={newProduct.hsn} onChange={handleNewProductChange} className="w-full p-2 border border-gray-300 rounded-md" placeholder="e.g., 8471" />
          </div>
          <div>
            <label htmlFor="newProductGST" className="block text-sm font-medium text-gray-700 mb-1">GST Rate (%)</label>
            <select name="gst" id="newProductGST" value={newProduct.gst} onChange={handleNewProductChange} className="w-full p-2 border border-gray-300 rounded-md">
              <option value="0">0%</option>
              <option value="5">5%</option>
              <option value="12">12%</option>
              <option value="18">18%</option>
              <option value="28">28%</option>
            </select>
          </div>
          <div className="md:col-span-2 text-right">
            <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-200 ease-in-out transform hover:scale-105">
              Add Product
            </button>
          </div>
        </form>
      </section>

      {/* Product List using DataTable */}
      <section className="bg-gray-50 p-6 rounded-lg shadow-inner">
        <h3 className="text-2xl font-semibold text-indigo-600 mb-4">Existing Products/Services</h3>
        <DataTable
          data={products}
          columns={productColumns}
          editingId={editingProductId}
          editedData={editedProduct}
          onEditedDataChange={handleEditedProductChange}
          onStartEdit={startEditingProduct}
          onSaveEdit={saveEditedProduct}
          onCancelEdit={cancelEditingProduct}
          onDelete={deleteProduct}
        />
      </section>
    </div>
  );
};

export default ProductsPage;