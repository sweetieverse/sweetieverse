// success response object
export default (res, data) => {
  res.status(200).json(
    {
      meta: {
        code: 200,
      },
      data,
    },
  );
};
