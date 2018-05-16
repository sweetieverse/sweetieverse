// authentication error response
export default (res, message) => {
  res.status(500).json(
    {
      errors: [{
        status: 500,
        title: 'Server error',
        detail: message || 'Something blew up',
      }],
    },
  );
};
