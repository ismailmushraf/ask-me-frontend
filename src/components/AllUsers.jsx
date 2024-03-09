import { UserCard } from "../modals/UserCard";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export function AllUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const jwtToken = Cookies.get('jwtToken');
      const response = await axios.get('http://localhost:3000/user/list-users', {
        headers: {
          Authorization: `Bearer ${jwtToken}`
        }
      });

      setUsers(response.data.users);
    }

    fetchUsers();
  }, []);

  return <div>
    {users.map(user => (<UserCard key={user._id} fullname={user.fullname} userId={user._id} profession={user.profession}/>))}
  </div>
}
