import { useState, useContext } from "react";
import AuthContext from "../context/AuthContext.jsx";
import { login } from "../services/api.jsx";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const { login: loginUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await login(formData);
            if (data.token) {
                loginUser(data.token);
                navigate("/");
            } else {
                console.error("Invalid login response.");
            }
        } catch (error) {
            console.error(
                error?.response?.data?.message ||
                    "An error occurred during login."
            );
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-sm bg-white shadow-md rounded-lg p-5"
            >
                <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-center">
                    Login
                </h2>
                <div className="mb-3">
                    <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md text-sm"
                        required
                    />
                </div>
                <div className="mb-3">
                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md text-sm"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
