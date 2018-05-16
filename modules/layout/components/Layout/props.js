import PropTypes from 'prop-types';

export const propTypes = {
  toggleMenu: PropTypes.func,
  menuOpen: PropTypes.bool,
};

export const defaultProps = {
  toggleMenu: () => {},
  menuOpen: false,
};
