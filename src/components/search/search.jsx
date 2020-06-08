import React from 'react';
import PropTypes from 'prop-types';
import './search.scss';

function Search({ search, searchPlaceholder }) {
  return (
    <form className="search-container" onSubmit={search}>
      <input type="text" className="search-input" placeholder={searchPlaceholder} />
      <button type="submit" className="search-button">SEARCH</button>
    </form>
  );
}

Search.propTypes = {
  search: PropTypes.func.isRequired,
  searchPlaceholder: PropTypes.string,
};

Search.defaultProps = {
  searchPlaceholder: 'Search',
};

export default Search;
