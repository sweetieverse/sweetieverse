import PropTypes from 'prop-types';

export const propTypes = {
  toggleMenu: PropTypes.func,
  menuOpen: PropTypes.bool,
  authenticatedLayout: PropTypes.bool,
  isAuthenticated: PropTypes.bool,
  isFetching: PropTypes.bool,
};

export const defaultProps = {
  toggleMenu: () => {},
  menuOpen: false,
  authenticatedLayout: true,
  isAuthenticated: false,
  isFetching: false,
};
