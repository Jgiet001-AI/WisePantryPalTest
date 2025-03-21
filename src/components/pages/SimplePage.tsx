import React from 'react';

export default function SimplePage() {
  return (
    <div style={{ 
      padding: '20px', 
      maxWidth: '500px', 
      margin: '40px auto',
      backgroundColor: '#f0f9f6',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
    }}>
      <h1 style={{ color: '#2a9d8f', textAlign: 'center' }}>
        WisePantryPal Test Page
      </h1>
      <p style={{ marginBottom: '20px', textAlign: 'center' }}>
        If you can see this page, the React app is working correctly.
      </p>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center',
        gap: '10px'
      }}>
        <button 
          style={{
            backgroundColor: '#2a9d8f',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
          onClick={() => alert('Button clicked!')}
        >
          Test Button
        </button>
      </div>
    </div>
  );
}
