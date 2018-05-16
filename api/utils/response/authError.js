// authentication error response
export default (res, message) => {
  res.status(401).json(
    {
      errors: [{
        status: 401,
        title: 'Login failed',
        detail: message || 'User login attempt failed',
      }],
    },
  );
};
