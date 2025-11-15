import { assets } from '../../assets/assets'
import './Footer.css'
import { useTranslation } from 'react-i18next';
const Footer = () => {
  const { t } = useTranslation();
  return (
    <div className="footer" id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
            <img className='footer-logo' src={assets.logo} alt="" />
            <p>{t("Luxurious furniture refers to high-end, premium-quality pieces that often combine exceptional craftsmanship, rare materials, unique designs, and a sense of elegance or opulence. These items are often associated with exclusivity, comfort, and attention to detail.")}</p>
            <div className="footer-social-icons">
    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
        <img src={assets.facebook_icon} alt="Facebook" />
    </a>
    <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
        <img src={assets.twitter_icon} alt="Twitter" />
    </a>
    <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
        <img src={assets.linkedin_icon} alt="LinkedIn" />
    </a>
</div>
        </div>
        <div className="footer-content-center">
            <h2>CUONG COMPANY</h2>
            <ul>
                <li>{t('Home')}</li>
                <li><a href="https://www.nitori.com.vn/pages/about-us" target="_blank" rel="noopener noreferrer">
                {t("About Us")}
                </a></li>
                <li><a href="https://www.nitori.com.vn/pages/shipping-information" target="_blank" rel="noopener noreferrer">
                {t("Delivery")}
                </a></li>
                <li>
                <a href="https://www.nitori.com.vn/pages/privacy-policy" target="_blank" rel="noopener noreferrer">
                {t("Privacy policy")}
                </a>
                </li>
            </ul>

        </div>
        <div className="footer-content-right">
            <h2>{t("GET IN TOUCH")}</h2>
            <ul>
                <li>098-765-432-1</li>
                <li><a href="https://mail.google.com/mail/u/0/#inbox" target="_blank" rel="noopener noreferrer">
        cuongmp40@gmail.com
                    </a></li>
            </ul>

        </div>
      </div>
      <hr />
      <p className='footer-copyright'>Copyright 2024 CuongFurniture.com - All Right Reserved</p>
    </div>
  )
}

export default Footer
