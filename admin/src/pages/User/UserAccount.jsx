import { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './UserAccount.css';

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [editUserId, setEditUserId] = useState(null);
    const [editData, setEditData] = useState({ name: '', password: '' });

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:4000/api/admin/users');
            setUsers(response.data);
        // eslint-disable-next-line no-unused-vars
        } catch (err) {
            setError('Failed to fetch users');
            toast.error('Failed to fetch users');
        } finally {
            setLoading(false);
        }
    };

    const deleteUser = async (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await axios.delete(`http://localhost:4000/api/admin/users/${id}`);
                setUsers(users.filter((user) => user._id !== id));
                toast.success('User deleted successfully');
            // eslint-disable-next-line no-unused-vars
            } catch (err) {
                setError('Failed to delete user');
                toast.error('Failed to delete user');
            }
        }
    };

    const startEditing = (user) => {
        setEditUserId(user._id);
        setEditData({ name: user.name, password: '' });
    };

    const cancelEditing = () => {
        setEditUserId(null);
        setEditData({ name: '', password: '' });
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditData({ ...editData, [name]: value });
    };

    const saveEdit = async (id) => {
        try {
            await axios.put(`http://localhost:4000/api/admin/users/${id}`, editData);
            setUsers(users.map((user) => (user._id === id ? { ...user, name: editData.name } : user)));
            cancelEditing();
            toast.success('User updated successfully');
        // eslint-disable-next-line no-unused-vars
        } catch (err) {
            setError('Failed to update user');
            toast.error('Failed to update user');
        }
    };

    if (loading) return <div className="spinner">Loading...</div>;
    if (error) return <p className="error-message">{error}</p>;

    return (
        <div className="admin-users">
            <ToastContainer />
            <h1>User Management</h1>
            <div className="table-container">
                {users.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id}>
                                    <td>
                                        {editUserId === user._id ? (
                                            <input
                                                type="text"
                                                name="name"
                                                value={editData.name}
                                                onChange={handleEditChange}
                                            />
                                        ) : (
                                            user.name
                                        )}
                                    </td>
                                    <td>{user.email}</td>
                                    <td>
                                        {editUserId === user._id ? (
                                            <>
                                                <input
                                                    className="editer"
                                                    type="password"
                                                    name="password"
                                                    placeholder="New Password"
                                                    value={editData.password}
                                                    onChange={handleEditChange}
                                                />
                                                <button onClick={() => saveEdit(user._id)}>Save</button>
                                                <button onClick={cancelEditing}>Cancel</button>
                                            </>
                                        ) : (
                                            <>
                                                <button onClick={() => startEditing(user)}>Edit</button>
                                                <button onClick={() => deleteUser(user._id)}>Delete</button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No users found</p>
                )}
            </div>
        </div>
    );
};

export default AdminUsers;
