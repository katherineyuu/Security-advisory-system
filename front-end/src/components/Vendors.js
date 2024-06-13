import React, { useState, useEffect } from 'react';
import './Vendors.css';
import { FaPlus, FaTrash } from 'react-icons/fa';

function Vendors() {
  const [vendors, setVendors] = useState([]);
  const [newVendor, setNewVendor] = useState({ name: '' });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/v1/vendors');
        const data = await response.json();
        const formattedVendors = data
          .filter(vendor => vendor.name && vendor.vendor_url)
          .map((vendor) => ({
            id: vendor.id,
            name: vendor.name,
            logo: vendor.vendor_url,
          }));
        setVendors(formattedVendors);
      } catch (error) {
        console.error('Error fetching vendors:', error);
      }
    };

    fetchVendors();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewVendor((prevVendor) => ({
      ...prevVendor,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('New vendor to add:', newVendor.name);

    try {
      const response = await fetch(`http://localhost:3001/api/v1/vendors/${newVendor.name}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      const data = result.data;
      console.log('Vendor added:', data);

      if (data.vendor_url) {
        const updatedVendors = [
          ...vendors,
          { id: data.id, name: data.name, logo: data.vendor_url },
        ];

        setVendors(updatedVendors);
        setNewVendor({ name: '' });
        setShowForm(false);
      } else {
        console.error('Vendor logo URL is missing:', data);
        alert('Failed to add vendor. Vendor logo URL is missing.');
      }
    } catch (error) {
      console.error('Error adding vendor:', error);
    }
  };

  const handleDelete = async (vendorName) => {
    try {
      const response = await fetch(`http://localhost:3001/api/v1/vendors/${vendorName}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const updatedVendors = vendors.filter(vendor => vendor.name !== vendorName);
      setVendors(updatedVendors);
    } catch (error) {
      console.error('Error deleting vendor:', error);
    }
  };

  return (
    <div className="vendors">
      <h2>Vendor Logos</h2>
      <div className="vendor-grid">
        {vendors.map((vendor) => (
          <div key={vendor.id} className="vendor-card">
            <img src={vendor.logo} alt={vendor.name} className="vendor-logo" />
            <button className="delete-button" onClick={() => handleDelete(vendor.name)}>
              <FaTrash />
            </button>
          </div>
        ))}
        <div className="vendor-card add-vendor" onClick={() => setShowForm(!showForm)}>
          <FaPlus size={40} />
        </div>
      </div>
      {showForm && (
        <form onSubmit={handleSubmit} className="vendor-form">
          <input
            type="text"
            name="name"
            placeholder="Vendor Name"
            value={newVendor.name}
            onChange={handleChange}
            required
          />
          <button type="submit">Add Vendor</button>
        </form>
      )}
    </div>
  );
}

export default Vendors;
