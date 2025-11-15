import { useState, useEffect } from "react";
import axios from "axios";
import "./Sale.css";

const Sale = () => {
  const [promoCode, setPromoCode] = useState({
    code: "",
    discount: 0,
    expirationDate: "",
    isActive: true,
  });

  const [promoCodes, setPromoCodes] = useState([]); // State for storing the list of promo codes
  const [message, setMessage] = useState("");

  // Fetch promo codes when the component mounts
  useEffect(() => {
    const fetchPromoCodes = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/sale/list");
        setPromoCodes(response.data.data);
      } catch (error) {
        console.error("Error fetching promo codes:", error);
      }
    };

    fetchPromoCodes();
  }, []);

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPromoCode({ ...promoCode, [name]: value });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/api/sale/add-promo", promoCode);
      setMessage(response.data.message);
      
      const responseList = await axios.get("http://localhost:4000/api/sale/list");
      setPromoCodes(responseList.data.data);
    } catch (error) {
      setMessage("Error adding promo code");
      console.error(error);
    }
  };

 
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/sale/delete/${id}`);
      setPromoCodes(promoCodes.filter((promoCode) => promoCode._id !== id));
      setMessage("Promo code deleted successfully");
    } catch (error) {
      setMessage("Error deleting promo code");
      console.error(error);
    }
  };

  return (
    <div className="sale">
      <h2>Add Promo Code</h2>
      <form onSubmit={handleSubmit} className="sale-form">
        <div className="form-group">
          <label htmlFor="code">Promo Code</label>
          <input
            type="text"
            id="code"
            name="code"
            value={promoCode.code}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="discount">Discount (%)</label>
          <input
            type="number"
            id="discount"
            name="discount"
            value={promoCode.discount}
            onChange={handleChange}
            min="0"
            max="100"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="expirationDate">Expiration Date</label>
          <input
            type="date"
            id="expirationDate"
            name="expirationDate"
            value={promoCode.expirationDate}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>
            <input
              type="checkbox"
              name="isActive"
              checked={promoCode.isActive}
              onChange={() => setPromoCode({ ...promoCode, isActive: !promoCode.isActive })}
            />
            Active
          </label>
        </div>
        <button type="submit">Add Promo Code</button>
      </form>

      {message && <p>{message}</p>}

      <h3>Promo Codes List</h3>
      <div className="promo-codes-container">
        {promoCodes.length > 0 ? (
          <ul className="promo-codes-list">
            {promoCodes.map((promo) => (
              <li key={promo._id} className="promo-code-item">
                <span>{promo.code}</span>
                <span>{promo.discount}% Off</span>
                <span>{promo.isActive ? "Active" : "Inactive"}</span>
                <button
                  onClick={() => handleDelete(promo._id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No promo codes available</p>
        )}
      </div>
    </div>
  );
};

export default Sale;
