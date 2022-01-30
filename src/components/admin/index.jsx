import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// firebase
import { auth, database } from '../../firebase.config';
import { addDoc, collection, getDocs } from 'firebase/firestore';

const Admin = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [fullname, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [loadingNewContact, setLoadingNewContact] = useState(false);
  const [loadingAddBook, setLoadingAddBook] = useState(true);
  const [contactList, setContactList] = useState([]);

  useEffect(() => {
    const subscription = auth.onAuthStateChanged((fireUser) => {
      if (fireUser) setUser(fireUser.email);
      else navigate('../login');
    });
    if (user) getContactList();

    return () => {
      subscription();
    };
  }, [user, navigate]);

  const onChange = (event) => {
    switch (event.target.placeholder) {
      case 'Full name':
        setFullName(event.target.value);
        break;
      case 'Email':
        setEmail(event.target.value);
        break;
      case 'Phone':
        setPhone(event.target.value);
        break;
      default:
        return;
    }
  };

  const createNewContact = async (event) => {
    event.preventDefault();
    setLoadingNewContact(true);
    const newContact = { fullname, phone, email };

    try {
      await addDoc(collection(database, `address-book-${user}`), newContact);
      setLoadingNewContact(false);
      setFullName('');
      setEmail('');
      setPhone('');
      getContactList();
      alert(`New contact added successfully.`);
    } catch (error) {
      setLoadingNewContact(false);
      alert(
        `Something went wrong\nERROR CODE: ${error.code}\nERROR MESSAGE: ${error.message}`
      );
    }
  };

  const getContactList = async () => {
    setLoadingAddBook(true);
    try {
      const querySnapshot = await getDocs(
        collection(database, `address-book-${user}`)
      );
      let contacts = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        contacts.push(doc.data());
      });
      setContactList(contacts);
      setLoadingAddBook(false);
    } catch (error) {
      setLoadingAddBook(false);
      alert(
        `Could not load the address book\nERROR CODE: ${error.code}\nERROR MESSAGE: ${error.message}`
      );
    }
  };

  return (
    <div className="container">
      {user ? (
        <div className="row">
          <div className="col mt-4">
            <h2>Add contact</h2>
            <form className="form-group" onSubmit={createNewContact}>
              <input
                value={fullname}
                className="form-control mb-4"
                placeholder="Full name"
                onChange={onChange}
                type="text"
                required
              />
              <input
                value={email}
                className="form-control mb-4"
                placeholder="Email"
                onChange={onChange}
                type="email"
                required
              />
              <input
                value={phone}
                className="form-control mb-4"
                placeholder="Phone"
                onChange={onChange}
                type="tel"
                required
              />
              <button
                className="btn btn-success btn-block mb-4 w-100"
                type="submit"
                disabled={loadingNewContact}
              >
                {loadingNewContact && (
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                )}
                {loadingNewContact ? (
                  <span className="sr-only"> Adding new contact...</span>
                ) : (
                  'Add contact'
                )}
              </button>
            </form>
          </div>
          <div
            className="col mt-4 d-flex flex-column"
            style={{ borderRadius: '14px', backgroundColor: '#f1f1f1' }}
          >
            <h2>Address book</h2>
            {loadingAddBook ? (
              <div className="flex-grow-1 d-flex justify-content-center align-items-center flex-column">
                <div
                  className="spinner-border text-secondary"
                  role="status"
                ></div>
                <span className="sr-only my-2 text-muted">
                  Loading contacts...
                </span>
              </div>
            ) : contactList.length > 0 ? (
              <ul className="text-start">
                {contactList.map((contact, index) => (
                  <li key={index}>
                    {contact.fullname} -- {contact.email} -- {contact.phone}
                  </li>
                ))}
              </ul>
            ) : (
              <span>
                No contacts yet, add a new one filling the form leftside.
              </span>
            )}
          </div>
        </div>
      ) : (
        <h2>Protected route, sign in to access this content.</h2>
      )}
    </div>
  );
};

export default Admin;
