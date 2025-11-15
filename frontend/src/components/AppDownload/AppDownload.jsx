import { assets } from '../../assets/assets'
import './AppDownload.css'
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
const AppDownload = () => {
  const { t } = useTranslation();
  return (
    <div className='app-download' id='app-download'>
      <p>{t("For better Experience Download")} <br />{t("Furniture App")}</p>
      <div className="app-download-platform">
         <a href="https://play.google.com/store/games?device=windows&pli=1" target="_blank" rel="">
            <img src={assets.play_store} alt="" />
                    </a>
          <a href="https://www.apple.com/app-store/" target="_blank" rel="">
            <img src={assets.app_store} alt="" />
                    </a>
      </div>
      <div className="news-link">
        <Link to="/news">{t("Read the latest news about Furniture")}</Link>
      </div>
    </div>
  )
}

export default AppDownload