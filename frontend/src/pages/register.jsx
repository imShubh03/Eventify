import { useState, useContext } from "react";
import AuthContext from "../context/AuthContext.jsx";
import { register } from "../services/api.jsx";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const [error, setError] = useState(null);
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            const { data } = await register(formData);
            login(data.token);
            navigate("/");
        } catch (error) {
            setError(error.response?.data?.message || "Registration failed.");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form 
                onSubmit={handleSubmit} 
                className="p-6 bg-white shadow-md rounded-lg w-full max-w-sm"
            >
                <h2 className="text-xl font-semibold mb-4 text-center">Register</h2>
                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                <input 
                    name="name" 
                    placeholder="Name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    className="block w-full p-2 border rounded mt-2" 
                    required 
                />
                <input 
                    name="email" 
                    type="email" 
                    placeholder="Email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    className="block w-full p-2 border rounded mt-2" 
                    required 
                />
                <input 
                    name="password" 
                    type="password" 
                    placeholder="Password" 
                    value={formData.password} 
                    onChange={handleChange} 
                    className="block w-full p-2 border rounded mt-2" 
                    required 
                />
                <button 
                    type="submit" 
                    className="mt-4 w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
                >
                    Register
                </button>
            </form>
        </div>
    );
};

export default Register;
