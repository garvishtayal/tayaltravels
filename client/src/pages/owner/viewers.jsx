import React, { useState, useEffect } from 'react';
import withAuth from '../../utils/withAuth';

const ViewerList = () => {
  const [viewerData, setViewerData] = useState([]);

  useEffect(() => {
    fetchViewerData();
  }, []);

  const fetchViewerData = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/viewers');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setViewerData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <h2>Viewer List</h2>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {viewerData.map((viewer, index) => (
            <tr key={index}>
              <td>{viewer.username}</td>
              <td>{viewer.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default withAuth(ViewerList);
