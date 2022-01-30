const errorMessages = Object.freeze({
  'auth/email-already-in-use':
    'This email is already in use, try another email.',
  'auth/weak-password': 'Password should have at least 6 characters.',
  'auth/user-not-found': 'Username or password are wrong.',
  'auth/wrong-password': 'Username or password are wrong.',
  'auth/invalid-email': 'Username is not valid, make sure the field is filled.',
});

export default errorMessages;
