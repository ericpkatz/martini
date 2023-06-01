import { createRoot } from 'react-dom/client';
import React, { useState, useEffect } from 'react';
const App = ()=> {
  const [users, setUsers] = useState([]);
  useEffect(()=> {
    const fetchUsers = async()=> {
      const response = await fetch('/api/users');
      const json = await response.json();
      setUsers(json);
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <h1>The Martini Site!! ({ users.length })</h1>
      <ul>
        {
          users.map( user => {
            return (
              <li key={ user.id }>
                { user.username }
              </li>
            );
          })
        }
      </ul>
    </div>
  );
};

const root = createRoot(document.querySelector('#root'));
root.render(<App />);

