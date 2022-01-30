// react
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// firebase
import { auth } from '../../firebase.config';

const links = [
  { to: '/', name: 'Home', private: false },
  { to: 'admin', name: 'Admin', private: true },
];

const Menu = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((fireUser) => {
      if (fireUser) setUser(fireUser.email);
    });
  }, []);

  const signOut = () => {
    auth
      .signOut()
      .then((_) => {
        setUser(null);
        alert(`You are signing out.`);
        navigate('/');
      })
      .catch((error) => {
        alert(
          `Something went wrong\nERROR CODE: ${error.code}\nERROR MESSAGE: ${error.message}`
        );
      });
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark justify-content-between">
      <ul className="navbar-nav mr-auto">
        {links.map((link, index) => {
          return link.private ? (
            user ? (
              <li key={index} className="nav-item">
                <Link className="nav-link" to={link.to}>
                  {link.name}
                </Link>
              </li>
            ) : null
          ) : (
            <li key={index} className="nav-item">
              <Link className="nav-link" to={link.to}>
                {link.name}
              </Link>
            </li>
          );
        })}
      </ul>
      {user ? (
        <div>
          <span className="text-secondary">{user}</span>
          <button onClick={signOut} className="btn btn-danger mx-4">
            Sign out
          </button>
        </div>
      ) : (
        <Link className="nav-link" to="login">
          Register or Sign in
        </Link>
      )}
    </nav>
  );
};

export default Menu;
