import { useEffect, useState, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import toastify CSS
import './Searching.css';
import { StoreContext } from '../../context/StoreContext';

const SearchResult = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { addToCart } = useContext(StoreContext);

  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await axios.get(`http://localhost:4000/api/food/search`, {
          params: { q: query },
        });

        if (response.data && response.data.length > 0) {
          setResults(response.data); // Update results state with the data
        } else {
          setResults([]); // If no results, set an empty array
        }
      } catch (error) {
        console.error('Error fetching search results:', error);
        setError('Error fetching search results');
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchSearchResults();
    }
  }, [query]);

  const handleAddToCart = (productId) => {
    addToCart(productId); // Use the addToCart function from StoreContext
    toast.success('Product added to cart successfully!'); // Show success notification
    console.log('Product added to cart:', productId);
  };

  return (
    <div className="search-result">
      <ToastContainer /> {/* Toast container to render notifications */}
      <h1>Search Results for "{query}"</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {results.length === 0 && !loading && <p>No results found.</p>}
      <div className="results-container">
        {results.map((item) => (
          <div key={item._id} className="result-item">
            <img src={`http://localhost:4000/images/${item.image}`} alt={item.name} />
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p>${item.price.toFixed(2)}</p>
            <button onClick={() => handleAddToCart(item._id)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResult;
