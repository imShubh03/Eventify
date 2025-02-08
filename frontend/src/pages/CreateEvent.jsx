import { useState, useContext } from "react";
import { createEvent } from "../services/api";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const CreateEvent = () => {
    const [formData, setFormData] = useState({ name: "", description: "", date: "" });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    if (!user) {
        navigate("/login");
        return null;
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };

    const validateForm = () => {
        let newErrors = {};
        if (!formData.name.trim()) newErrors.name = "Event name is required.";
        if (!formData.description.trim()) newErrors.description = "Description is required.";
        if (!formData.date) newErrors.date = "Date and time are required.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            await createEvent(formData, token);
            navigate("/");
        } catch (error) {
            console.error("Error creating event:", error.response?.data?.message || error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
            <form onSubmit={handleSubmit} className="w-full max-w-md bg-white shadow-md rounded-lg p-5">
                <h2 className="text-lg font-semibold mb-4 text-center">Create Event</h2>
                
                <FormInput name="name" type="text" placeholder="Event Name" value={formData.name} onChange={handleChange} error={errors.name} />
                <FormInput name="description" type="textarea" placeholder="Description" value={formData.description} onChange={handleChange} error={errors.description} />
                <FormInput name="date" type="datetime-local" value={formData.date} onChange={handleChange} error={errors.date} />

                <button type="submit" className="w-full mt-3 bg-green-500 text-white py-2 rounded-md text-sm sm:text-base hover:bg-green-600" disabled={loading}>
                    {loading ? "Creating..." : "Create Event"}
                </button>
            </form>
        </div>
    );
};

const FormInput = ({ name, type, placeholder, value, onChange, error }) => (
    <div className="mb-3">
        {type === "textarea" ? (
            <textarea name={name} placeholder={placeholder} value={value} onChange={onChange} className="block w-full p-2 border rounded-md text-sm sm:text-base" required />
        ) : (
            <input name={name} type={type} placeholder={placeholder} value={value} onChange={onChange} className="block w-full p-2 border rounded-md text-sm sm:text-base" required />
        )}
        {error && <p className="text-red-500 text-xs sm:text-sm">{error}</p>}
    </div>
);

export default CreateEvent;
