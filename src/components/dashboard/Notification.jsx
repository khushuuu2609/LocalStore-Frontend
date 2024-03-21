import React, { useState, useEffect } from 'react';

import axios from 'axios';

function Notifications() {
    const [notifications, setNotifications] = useState([]);
    const [showNotifications, setShowNotifications] = useState(false);

    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/notifications');
            console.log('Response data:', response.data);
            setNotifications(response.data);
            setShowNotifications(true);
        } catch (error) {
            console.error('Error fetching notifications:', error);
        }
    };

    console.log('Notifications:', notifications);

    return (
        <div className="container py-5 home-layout">
            <h2 className="text-center mb-4">Notifications</h2>
            <button onClick={fetchNotifications} className="btn btn-primary">View Notifications</button>
            {showNotifications && (
                <div>
                    {Array.isArray(notifications) && notifications.length > 0 ? (
                        notifications.map(notification => (
                            <div key={notification.id} className="card mb-3">
                                <div className="card-body card-bg">
                                    <h5 className="card-title">Username: {notification.title}</h5>
                                   
                                    <img src={`data:image/jpeg;base64,${notification.photo}`} alt="Notification Photo"  style={{ maxWidth: '200px', maxHeight: '200px' }} /> 
                                    <p>Category: {notification.categories}</p>
                                    <p className="card-text">Description: {notification.description}</p>

                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No notifications available</p>
                    )}
                </div>
            )}
        </div>
    );
}
export default Notifications;