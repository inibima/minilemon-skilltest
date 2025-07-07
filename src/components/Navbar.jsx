import React from 'react';
import { Link } from 'react-router-dom';
import '../index.css';

export default function Navbar() {
  return (
    <header className="navbar">
      <nav className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem' }}>
        <Link to="/" className="navbar-brand">BocahLemon</Link>
        <ul className="navbar-nav" style={{ display: 'flex', margin: 0, padding: 0 }}>
          <li style={{ marginRight: '1.5rem' }}>
            <Link to="/" className="nav-link">Home</Link>
          </li>
          <li style={{ marginRight: '1.5rem' }}>
            <Link to="/products" className="nav-link">Products</Link>
          </li>
          <li>
            <Link to="/about" className="nav-link">About</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}