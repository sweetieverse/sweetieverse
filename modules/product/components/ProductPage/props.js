import PropTypes from 'prop-types';

export const propTypes = {
  product: PropTypes.object,
  isFetching: PropTypes.bool,
};

export const defaultProps = {
  product: {},
  isFetching: false,
};
