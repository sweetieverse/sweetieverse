import PropTypes from 'prop-types';

export const propTypes = {
  user: PropTypes.object,
  isFetching: PropTypes.bool,
};

export const defaultProps = {
  user: {},
  isFetching: false,
};
