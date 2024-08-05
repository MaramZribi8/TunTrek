
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from "react-router-dom";  // Import useHistory

import { UserContext } from "../../UserContext.jsx";

import './UserList.css';
import axios from "axios";
const ErrorIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="red">
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
  </svg>
);

const UserList = () => {
  const { user, setUser } = useContext(UserContext);

  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [editedUser, setEditedUser] = useState({ id: '', name: '', email: '', role: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize, setPageSize] = useState(10); // Set default page size, adjust as necessary
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {

      try {
        const response = await axios.get('/users');
        const usersData = response.data;
        if (usersData) {

          setUsers(usersData);
          setFilteredUsers(usersData);
          updateTotalPages(usersData);
        }
      } catch (error) {
        console.error('Failed to fetch users data:', error);
      }

    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {

      try {
        const response = await axios.get('/profile');
        const userData = response.data;
        if (userData) {
          setUser(userData);

        }
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }

    };
    fetchUserData();
  }, [setUser]);

  useEffect(() => {
    // Apply search filter
    const filteredData = users.filter((user) =>
      Object.values(user).some(
        (value) =>
          value != null && // Ensure the value is not null or undefined
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredUsers(filteredData);
    setCurrentPage(1);
    updateTotalPages(filteredData);
  }, [searchTerm, users]);


  const updateTotalPages = (data) => {
    setTotalPages(Math.ceil(data.length / pageSize));
  };

  const handleEditClick = async (e, userId) => {
    e.preventDefault();

    try {
      // Send a PUT request to toggle the isActivated attribute
      const response = await axios.put(`/profile/${userId}/toggleActivation`);

      // Handle successful response
      console.log('User isActivated attribute toggled successfully:', response.data);
      // You may perform additional actions here if needed

    } catch (error) {
      // Handle error
      console.error('Error toggling user activation status:', error);
      // You may display an error message to the user or perform other error handling actions
    }
  };
  const navigate = useNavigate(); // use useNavigate hook for navigation

  const ContactAdmin = async (customer, profile) => {
    let userId = customer._id;
    if (customer.inTrouble) {
      try {
        // Send a PUT request to toggle the inTrouble attribute
        const response = await axios.put(`/profile/${userId}/toggleTrouble`);

        // Handle successful response
        console.log('User inTrouble attribute toggled successfully:', response.data);
        // You may perform additional actions here if needed

      } catch (error) {
        // Handle error
        console.error('Error toggling user trouble status:', error);
        // You may display an error message to the user or perform other error handling actions
      }
    }

    navigate(`/Dashboard/admin/messages/${userId}`, { state: { userId, profile } });
  };



  const handleCheckboxChange = (userId) => {
    // Toggle selected row
    setSelectedRows((prevSelectedRows) => {
      if (prevSelectedRows.includes(userId)) {
        return prevSelectedRows.filter((id) => id !== userId);
      } else {
        return [...prevSelectedRows, userId];
      }
    });
  };

  const handleSelectAll = () => {
    // Select or deselect all rows on the current page
    const allIdsOnPage = filteredUsers.slice(
      (currentPage - 1) * pageSize,
      currentPage * pageSize
    ).map((user) => user._id);

    if (selectedRows.length === allIdsOnPage.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(allIdsOnPage);
    }
  };

  const handleDeleteSelected = () => {
    // Delete selected rows in memory
    const updatedUsers = users.filter((user) => !selectedRows.includes(user._id));
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);
    setSelectedRows([]);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };


  return (
    <div className='user-list'>
      <h1 >Users List</h1>
      <input
        className='search'
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <table className='user-table'>
        <thead>
          <tr>
            <th>Select</th>
            <th>Name</th>
            <th>Email</th>
            <th>State</th>
            <th>Actions</th>
            <th>Contact user</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers
            .slice((currentPage - 1) * pageSize, currentPage * pageSize)
            .map((customer) => (
              <tr key={customer._id} className={selectedRows.includes(customer._id) ? 'selected' : ''}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(customer._id)}
                    onChange={() => handleCheckboxChange(customer._id)}
                  />
                </td>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>{customer.isActivated ? 'active' : 'inactive'}</td>
                <td>
                  {customer.isActivated ? <button className='edit-btn' onClick={(e) => handleEditClick(e, customer._id)}>Deactivate</button> : <button className='delete-btn' onClick={(e) => handleEditClick(e, customer._id)}>activate</button>}
                </td>
                <td>
                  {!customer.inTrouble ? <button onClick={() => ContactAdmin(customer, user)} className='edit-btn'>Consult Messages</button> : <button onClick={() => ContactAdmin(customer, user)} className='delete-btn2' >
                    <span className="button-icon"><ErrorIcon /></span> Open Message
                  </button>
                  }

                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <div className='allbuttons'>
        <div>
          <button className="select-deselect" onClick={handleSelectAll}>Select/Deselect All</button>
          <button className="delete-selected" onClick={handleDeleteSelected}>Delete Selected</button>
        </div>
        <div>
          <button className="previous-page" onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}>
            Previous Page
          </button>
          <button className="next-page" onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}>
            Next Page
          </button>

        </div>
      </div>


    </div>
  )
};

export default UserList;