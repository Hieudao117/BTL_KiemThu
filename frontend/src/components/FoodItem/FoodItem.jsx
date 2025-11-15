import { useContext, useState } from 'react';
import { assets } from '../../assets/assets';
import './FoodItem.css';
import { StoreContext } from '../../context/StoreContext';

// eslint-disable-next-line react/prop-types
const FoodItem = ({ id, name, price, description, image }) => {
    const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);
    const [isModalOpen, setModalOpen] = useState(false);

    const handleModalOpen = () => setModalOpen(true);
    const handleModalClose = () => setModalOpen(false);

    return (
        <div className="food-item">
            <div className="food-item-container" onClick={handleModalOpen}>
                <img
                    className="food-item-image"
                    src={`${url}/images/${image}`}
                    alt={name}
                />
                {!cartItems[id] ? (
                    <img
                        className="add"
                        onClick={(e) => {
                            e.stopPropagation(); // Prevent triggering the modal
                            addToCart(id);
                        }}
                        src={assets.add_icon_white}
                        alt="Add to cart"
                    />
                ) : (
                    <div className="food-item-counter">
                        <img
                            onClick={(e) => {
                                e.stopPropagation();
                                removeFromCart(id);
                            }}
                            src={assets.remove_icon_red}
                            alt="Remove from cart"
                        />
                        <p>{cartItems[id]}</p>
                        <img
                            onClick={(e) => {
                                e.stopPropagation();
                                addToCart(id);
                            }}
                            src={assets.add_icon_green}
                            alt="Add more"
                        />
                    </div>
                )}
            </div>

            <div className="food-item-infor">
                <div className="food-item-name-rating">
                    <p>{name}</p>
                    <img src={assets.rating_starts} alt="Rating stars" />
                </div>
                <p className="food-item-desc">{description}</p>
                <p className="food-item-price">${price}</p>
            </div>

            {isModalOpen && (
                <div className="product-modal" onClick={handleModalClose}>
                    <div
                        className="product-modal-content"
                        onClick={(e) => e.stopPropagation()} 
                    >
                        <button className="close-button" onClick={handleModalClose}>
                            &times;
                        </button>
                        <img
                            className="product-modal-image"
                            src={`${url}/images/${image}`}
                            alt={name}
                        />
                        <h2>{name}</h2>
                        <p>{description}</p>
                        <p className="modal-price">${price}</p>
                        <div className="modal-counter">
                            <img
                                onClick={() => removeFromCart(id)}
                                src={assets.remove_icon_red}
                                alt="Remove from cart"
                            />
                            <p>{cartItems[id] || 0}</p>
                            <img
                                onClick={() => addToCart(id)}
                                src={assets.add_icon_green}
                                alt="Add to cart"
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FoodItem;
