import { useState, useEffect } from 'react';
import { Cloudinary } from '@cloudinary/url-cloudinary';
import Ticket from './components/Ticket';
import Form from './components/Form';

const CLOUD_NAME = 'your_cloud_name'; // Replace with your Cloudinary cloud name
const UPLOAD_PRESET = 'your_upload_preset'; // Replace with your Cloudinary upload preset

const cld = new Cloudinary({ cloud: { cloudName: CLOUD_NAME } });

export default function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    avatar: '',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Load from localStorage
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('ticketFormData'));
    if (savedData) setFormData(savedData);
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('ticketFormData', JSON.stringify(formData));
  }, [formData]);

  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', UPLOAD_PRESET);

    try {
      const response = await fetch(
        https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload,
        { method: 'POST', body: formData }
      );
      const data = await response.json();
      setFormData((prev) => ({ ...prev, avatar: data.secure_url }));
    } catch (error) {
      setErrors((prev) => ({ ...prev, avatar: 'Image upload failed' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.avatar) newErrors.avatar = 'Avatar is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) setSubmitted(true);
  };

  return (
    <main className="min-h-screen p-8 bg-gray-50">
      {!submitted ? (
        <Form
          formData={formData}
          setFormData={setFormData}
          errors={errors}
          handleImageUpload={handleImageUpload}
          handleSubmit={handleSubmit}
        />
      ) : (
        <Ticket data={formData} />
      )}
    </main>
  );
}
