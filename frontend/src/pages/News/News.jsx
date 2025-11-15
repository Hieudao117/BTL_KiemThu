import { assets } from '../../assets/assets';
import './News.css';
import { useTranslation } from 'react-i18next';

const News = () => {
  const { t } = useTranslation();

  const newsArticles = [
    
    {
      title: "The Future of Sustainable Furniture",
      videoUrl: assets.Video1,
      content: "Explore how eco-friendly materials are transforming the furniture industry.",
    },
    {
      title: "Top Furniture Trends in 2024",
      videoUrl: assets.Video2,
      content: "Discover the latest designs and innovations shaping modern interiors.",
    },
    {

      title: "The Rise of Smart Furniture",
      videoUrl: assets.Video3,
      content: "Learn about furniture integrated with advanced technology.",

    },
    {
        title: "The Flash Sale Schedule for CuongComPany (Flash Sale 12/12 ) ",
      videoUrl: assets.Video4,
      content: "Like Flash Sale of BlackFriday last week, We continue to give you the Flash Sale up to 60%",
    },
    {
        title: "Cuong Company has claimed Best Furniture and Quality of 2024",
      videoUrl: assets.Video5,
      content: "Follow the World Funiture Organization (WFO), Cuong Company awards the best Furniture over the World in three-years continuosly ",

    }
  ];

  return (
    <div className="news-page">
      <h1>{t("Latest News About Furniture")}</h1>
      <div className="news-list">
        {newsArticles.map((article, index) => (
          <div key={index} className="news-item">
            <h2>{article.title}</h2>
            <p>{article.content}</p>
            <div className="news-video">
              <video controls>
                <source src={article.videoUrl} type="video/mp4" />
                {t("Your browser does not support the video tag.")}
              </video>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
