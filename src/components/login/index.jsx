import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// firebase
import { auth } from '../../firebase.config';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
// errors
import errorMessages from './error-messages';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loadingNewUser, setLoadingNewUser] = useState(false);
  const [loadingSignIn, setLoadingSignIn] = useState(false);

  const onChange = (event) => {
    if (event.target.placeholder === 'Email') setEmail(event.target.value);
    else if (event.target.placeholder === 'Password')
      setPassword(event.target.value);
  };

  const registerNewUser = (event) => {
    event.preventDefault();
    setLoadingNewUser(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then((credentials) => {
        setLoadingNewUser(false);
        alert(`User registered: ${credentials.user.email}`);
        navigate('../admin');
      })
      .catch((error) => {
        setLoadingNewUser(false);
        alert(
          errorMessages[error.code] ||
            `Something went wrong\nERROR CODE: ${error.code}\nERROR MESSAGE: ${error.message}`
        );
      });
  };

  const signIn = (event) => {
    event.preventDefault();
    setLoadingSignIn(true);

    signInWithEmailAndPassword(auth, email, password)
      .then((credentials) => {
        setLoadingSignIn(false);
        alert(`Welcome ${credentials.user.email}`);
        navigate('../admin');
      })
      .catch((error) => {
        setLoadingSignIn(false);
        alert(
          errorMessages[error.code] ||
            `Something went wrong\nERROR CODE: ${error.code}\nERROR MESSAGE: ${error.message}`
        );
      });
  };

  return (
    <div className="row mt-5">
      <div className="col"></div>
      <div className="col">
        <form onSubmit={registerNewUser} className="form-group">
          <input
            onChange={onChange}
            className="form-control mb-4"
            type="email"
            placeholder="Email"
            required
            autoComplete="new-email"
          />
          <input
            onChange={onChange}
            className="form-control mb-4"
            type="password"
            placeholder="Password"
            required
            autoComplete="new-password"
          />
          <button
            className="btn btn-dark btn-block mb-4 w-100"
            type="submit"
            disabled={loadingNewUser || loadingSignIn}
          >
            {loadingNewUser && (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            )}
            {loadingNewUser ? (
              <span className="sr-only"> Creating new user...</span>
            ) : (
              'Register new user'
            )}
          </button>
        </form>
        <button
          className="btn btn-success btn-block w-100"
          onClick={signIn}
          disabled={loadingNewUser || loadingSignIn}
        >
          {loadingSignIn && (
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
          )}
          {loadingSignIn ? (
            <span className="sr-only"> Authenticating user...</span>
          ) : (
            'Sign in'
          )}
        </button>
      </div>
      <div className="col"></div>
    </div>
  );
};

export default Login;
