import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
// ▼▼▼ 1. استيراد الأيقونات الجديدة من مكتبة الـ Brands ▼▼▼
import { faWhatsapp, faFacebookF } from '@fortawesome/free-brands-svg-icons';
import './Footer.css';

function Footer() {
  return (
    <footer className="main-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col about-col">
            <img src="img/Artboard 1.png" alt="شعار شركة المهندس" className="logo-footer" />
            <p>
              شركة رائدة في مجال المعدات الصناعية ومنتجات الستانلس ستيل، نلتزم بتقديم أعلى مستويات الجودة والخدمة لعملائنا.
            </p>
            {/* ▼▼▼ 2. استخدام الأيقونات الجديدة ككائنات ▼▼▼ */}
            <div className="social-icons">
              <a href="#"><FontAwesomeIcon icon={faPhone} /></a>
              <a href="#"><FontAwesomeIcon icon={faWhatsapp} /></a>
              <a href="#"><FontAwesomeIcon icon={faFacebookF} /></a>
            </div>
          </div>

          <div className="footer-col">
            <h4>روابط سريعة</h4>
            <div className="links">
              <Link to="/about">من نحن</Link>
              <Link to="/contact">اتصل بنا</Link>
              <Link to="/privacy">سياسة الخصوصية</Link>
            </div>
          </div>

          <div className="footer-col">
            <h4>خدمة العملاء</h4>
            <div className="links">
              <Link to="/account">حسابي</Link>
              <Link to="/orders">طلباتي</Link>
              <Link to="/faq">الأسئلة الشائعة</Link>
            </div>
          </div>

        </div>
      </div>
      <div className="bottom-footer">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} شركة المهندس. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;