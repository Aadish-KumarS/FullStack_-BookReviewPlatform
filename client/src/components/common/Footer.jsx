import '../../styles/components/footer.css'


const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p>© {new Date().getFullYear()} BookReview Platform. All rights reserved.</p>
        <nav className="footer-nav">
          <a href="/about" className="footer-link">About</a>
          <a href="/contact" className="footer-link">Contact</a>
          <a href="/privacy" className="footer-link">Privacy Policy</a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
