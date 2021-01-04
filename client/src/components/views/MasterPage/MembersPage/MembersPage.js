import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
function MembersPage() {

  const [UserList, setUserList] = useState([]);

  useEffect(() => {
    fetchUserList();
  }, []);
  
  const fetchUserList = () => {
    axios.get('/api/user/allUsers').then(res => {
      if(res.data.success) {
        setUserList(res.data.result);
      } else {
        alert('Fail to get user List');
      }
    });
  };

  const renderUserList = UserList.map((user, index) => {
    return (
      <tr key={index}>
        <td>{index}</td>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.mailCheck}</td>
        <td>{user.role}</td>
        <td>{user.token}</td>
      </tr>
    )
  });

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Email</th>
            <th>MailCheck</th>
            <th>Role</th>
            <th>Token</th>
          </tr>
        </thead>
        <tbody>
          { renderUserList }
        </tbody>
      </table>
    </div>
  )
}

export default MembersPage;
