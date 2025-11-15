import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify'; // Correct import for toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles
import './AdminResTab.css';

const AdminHelpTab = () => {
  const [helpRequests, setHelpRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [markedRequests, setMarkedRequests] = useState({});  // Track marked requests
  const [supportForm, setSupportForm] = useState({
    email: '',
    subject: '',
    message: ''
  });  // State for support form

  // Fetch help requests from the server
  useEffect(() => {
    const fetchHelpRequests = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/help');
        setHelpRequests(response.data);
      // eslint-disable-next-line no-unused-vars
      } catch (err) {
        setError('Failed to load help requests. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchHelpRequests();
    
    // Retrieve saved marked requests from localStorage
    const savedMarkedRequests = JSON.parse(localStorage.getItem('markedRequests')) || {};
    setMarkedRequests(savedMarkedRequests);
  }, []);

  // Handle marking/unmarking a request
  const toggleMarkRequest = (id) => {
    const newMarkedRequests = { ...markedRequests, [id]: !markedRequests[id] };
    setMarkedRequests(newMarkedRequests);

    // Save the updated marked requests to localStorage
    localStorage.setItem('markedRequests', JSON.stringify(newMarkedRequests));
  };

  // Handle support form change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSupportForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle support form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Log the form data (you can replace this with an API call later)
    console.log('Support Message Sent: ', supportForm);
    
    // Reset form after submission
    setSupportForm({ email: '', subject: '', message: '' });

    // Show toast notification for successful submission
    toast.success('Support message sent successfully!', {
      
      autoClose: 5000,
      hideProgressBar: true,
    });
  };

  return (
    <div className="admin-help-tab">
      <h3 className='title_k'>User Help Requests</h3>
      {loading && <div className="spinner">Loading...</div>}
      {error && <p className="error">{error}</p>}
      
      {!loading && !error && (
        helpRequests.length > 0 ? (
          <div className="scrollable-container">
            <ul className="help-list">
              {helpRequests.map((request) => (
                <li key={request._id} className="help-item">
                  <h3>{request.name} ({request.email})</h3>
                  <p><strong>Type:</strong> {request.helpType}</p>
                  <p><strong>Priority:</strong> {request.priority}</p>
                  <p><strong>Status:</strong> {request.status}</p>
                  <p><strong>Submitted On:</strong> {new Date(request.createdAt).toLocaleString()}</p>
                  <p className='l'><strong>Description:</strong> {request.description}</p>

                  {/* Clickable square in the bottom-right corner */}
                  <div
                    className={`mark-square ${markedRequests[request._id] ? 'marked' : ''}`}
                    onClick={() => toggleMarkRequest(request._id)}
                  >
                    <input
                      type="checkbox"
                      checked={markedRequests[request._id] || false}
                      onChange={() => toggleMarkRequest(request._id)}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>No help requests available.</p>
        )
      )}

      {/* Support Form */}
      <div className="support-form-container">
        <h3 className='res'>Respond to User</h3>
        <form onSubmit={handleSubmit} className="support-form">
          <div>
            <label htmlFor="email">User Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={supportForm.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="subject">Subject:</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={supportForm.subject}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              name="message"
              value={supportForm.message}
              onChange={handleInputChange}
              rows="4"
              required
            />
          </div>
          <button type="submit" className="submit-btn">Send Response</button>
        </form>
      </div>

      {/* Toast container */}
      <ToastContainer />
    </div>
  );
};

export default AdminHelpTab;
