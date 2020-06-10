import React from 'react';
import PropTypes from 'prop-types';
import './search.scss';

function Search({ search, searchPlaceholder }) {
  function handleFocus({ target }) {
    target.setSelectionRange(0, target.value.length);
  }

  return (
    <form className="search-container" onSubmit={search}>
      <input type="text" className="search-input" onFocus={handleFocus} placeholder={searchPlaceholder} />
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
