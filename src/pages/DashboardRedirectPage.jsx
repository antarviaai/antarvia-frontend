// src/pages/DashboardRedirectPage.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function DashboardRedirectPage() {
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAndRedirect = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/');
                return;
            }
            try {
                const response = await axios.get('/api/users/profile', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const userRole = response.data.role;

                if (userRole === 'Manager') {
                    navigate('/admin/dashboard');
                } else if (userRole === 'Resident') {
                    navigate('/resident/dashboard');
                } else if (userRole === 'Guard') {
                    navigate('/guard/dashboard');
                } else if (userRole === 'Cleaner') {
                    navigate('/cleaner/dashboard'); 
                } else {
                    navigate('/'); 
                }
            } catch (error) {
                console.error("Redirect failed:", error);
                localStorage.removeItem('token');
                navigate('/');
            }
        };

        fetchAndRedirect();
    }, [navigate]);

    return <div>Loading...</div>;
}

export default DashboardRedirectPage;