import React from 'react';
// Assuming react-router-dom is used
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // Links for the footer navigation
  const quickLinks = [
    { name: 'Features', path: '/features' },
    { name: 'FAQs', path: '/faq' },
    { name: 'Support', path: '/support' },
  ];
  
  const legalLinks = [
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'Terms of Service', path: '/terms' },
  ];

  return (
    <footer className="app-footer">
      <div className="footer-content-wrapper">
        
        {/* === Section 1: Brand & Copyright === */}
        <div className="footer-section footer-brand">
          <Link to="/" className="footer-logo">
            💰 **BudgetBuddy**
          </Link>
          <p className="footer-tagline">
            Your journey to financial clarity starts here.
          </p>
          <p className="footer-copyright">
            &copy; {currentYear} BudgetBuddy. All rights reserved.
          </p>
        </div>

        {/* === Section 2: Quick Links === */}
        <div className="footer-section">
          <h4 className="footer-heading">Quick Links</h4>
          <ul className="footer-link-list">
            {quickLinks.map(link => (
              <li key={link.name}>
                <Link to={link.path} className="footer-link">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* === Section 3: Legal & Policies === */}
        <div className="footer-section">
          <h4 className="footer-heading">Legal</h4>
          <ul className="footer-link-list">
            {legalLinks.map(link => (
              <li key={link.name}>
                <Link to={link.path} className="footer-link">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        
        {/* === Section 4: Social/Contact Info === */}
        <div className="footer-section footer-social">
          <h4 className="footer-heading">Connect</h4>
          {/* Use icons for social media links (e.g., FontAwesome) */}
          <div className="social-icons">
            <a href="#" aria-label="LinkedIn" className="social-icon">
              <i className="fab fa-linkedin"></i> 
            </a>
            <a href="#" aria-label="Twitter" className="social-icon">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" aria-label="Email Us" className="social-icon">
              <i className="fas fa-envelope"></i>
            </a>
          </div>
          <p className="footer-contact-info">
            Questions? <a href="mailto:support@budgetbuddy.com">Email our Support</a>
          </p>
        </div>
      </div>
    </footer>
  );
}