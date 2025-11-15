import './ExploreMenu.css';
import { assets, menu_list } from '../../../assets/assets';
import { useTranslation } from 'react-i18next';



// eslint-disable-next-line react/prop-types
const ExploreMenu = ({category,setCategory}) => {
  const { t } = useTranslation();
  
  return (
    <div className='explore-menu' id='explore-menu'>
      <video controls width="1215">
                <source src={assets.advertisement} type="video/mp4" />
                
            </video>
      <h1>{t('Explore our Menu')}</h1>
      <p className='explore-menu-text'>
        {t('Choose from a diverse array of furniture crafted by excellent artists from around the world, using the finest materials. Our collection is designed to meet your needs and elevate your home decoration, offering a luxurious experience, one piece at a time.')}
      </p>
      <div className="explore-menu-list">
        {menu_list.map((item, index) => (
        
          <div onClick={()=>setCategory(prev=>prev===item.menu_name?"All":item.menu_name)} key={index} className='explore-menu-list-item'>
            <img className={category==item.menu_name?"active":""}src={item.menu_image} alt={item.menu_name} />
            
          </div>
        
        ))}
      </div>
      <hr />
    </div>
  );
};

export default ExploreMenu;
