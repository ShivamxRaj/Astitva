import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        {/* Animated 404 Number */}
        <div style={styles.errorCode}>
          <span style={styles.four}>4</span>
          <span style={styles.zero}>0</span>
          <span style={styles.four}>4</span>
        </div>

        {/* Message */}
        <h1 style={styles.title}>Page Not Found</h1>
        <p style={styles.description}>
          The page you're looking for doesn't exist or has been moved. 
          Don't worry — you can explore other helpful resources below.
        </p>

        {/* Helpful Links */}
        <div style={styles.linksGrid}>
          <Link to="/" style={styles.linkCard}>
            <span style={styles.linkIcon}>🏠</span>
            <span style={styles.linkText}>Home</span>
            <span style={styles.linkDescription}>Go back to the homepage</span>
          </Link>
          <Link to="/search" style={styles.linkCard}>
            <span style={styles.linkIcon}>🔍</span>
            <span style={styles.linkText}>Search</span>
            <span style={styles.linkDescription}>Search for missing persons</span>
          </Link>
          <Link to="/report" style={styles.linkCard}>
            <span style={styles.linkIcon}>📝</span>
            <span style={styles.linkText}>Report</span>
            <span style={styles.linkDescription}>Report an unclaimed body</span>
          </Link>
          <Link to="/contact" style={styles.linkCard}>
            <span style={styles.linkIcon}>📧</span>
            <span style={styles.linkText}>Contact</span>
            <span style={styles.linkDescription}>Get in touch with us</span>
          </Link>
        </div>

        {/* Back Button */}
        <button 
          onClick={() => window.history.back()} 
          style={styles.backButton}
          id="go-back-button"
        >
          ← Go Back
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '80vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
    padding: '2rem 1rem',
    fontFamily: "'Inter', sans-serif",
  },
  content: {
    textAlign: 'center',
    maxWidth: '600px',
    width: '100%',
  },
  errorCode: {
    display: 'flex',
    justifyContent: 'center',
    gap: '0.5rem',
    marginBottom: '1.5rem',
  },
  four: {
    fontSize: 'clamp(4rem, 12vw, 8rem)',
    fontWeight: '800',
    background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    lineHeight: '1',
  },
  zero: {
    fontSize: 'clamp(4rem, 12vw, 8rem)',
    fontWeight: '800',
    background: 'linear-gradient(135deg, #f59e0b, #ef4444)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    lineHeight: '1',
    animation: 'pulse 2s ease-in-out infinite',
  },
  title: {
    fontSize: 'clamp(1.5rem, 4vw, 2rem)',
    fontWeight: '700',
    color: '#e2e8f0',
    marginBottom: '0.75rem',
  },
  description: {
    fontSize: '1rem',
    color: '#94a3b8',
    lineHeight: '1.6',
    marginBottom: '2rem',
    maxWidth: '480px',
    margin: '0 auto 2rem',
  },
  linksGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
    gap: '1rem',
    marginBottom: '2rem',
  },
  linkCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '1.25rem 0.75rem',
    borderRadius: '12px',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
  },
  linkIcon: {
    fontSize: '1.75rem',
    marginBottom: '0.5rem',
  },
  linkText: {
    fontSize: '0.9rem',
    fontWeight: '600',
    color: '#e2e8f0',
    marginBottom: '0.25rem',
  },
  linkDescription: {
    fontSize: '0.7rem',
    color: '#94a3b8',
    lineHeight: '1.3',
  },
  backButton: {
    padding: '0.75rem 2rem',
    borderRadius: '8px',
    background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
    color: '#fff',
    border: 'none',
    fontSize: '0.95rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontFamily: "'Inter', sans-serif",
  },
};

export default NotFound;
