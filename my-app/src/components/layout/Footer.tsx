export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="app-footer">
      <div className="footer-content">
        <div className="footer-left">
          <p className="copyright">
            © {currentYear} Dubai Electricity & Water Authority (DEWA). All rights reserved.
          </p>
        </div>

        <div className="footer-center">
          <span className="app-name">Cyber 360 - Security Findings Management Platform</span>
        </div>

        <div className="footer-right">
          <span className="version">v2.4.0</span>
        </div>
      </div>
    </footer>
  );
}
