import React, { createRef } from 'react';
import PropTypes from 'prop-types';
import { getTranslate, translationKeys } from '../translation';
import './search.scss';

function Search({ search, searchPlaceholder, language }) {
  const text = createRef();

  function handleFocus({ target }) {
    target.setSelectionRange(0, target.value.length);
  }

  function handleClick() {
    text.current.value = '';
  }

  return (
    <form className="search__container search" onSubmit={search} data-testid="form">
      <input type="text" className="search__input" onFocus={handleFocus} placeholder={searchPlaceholder} ref={text} />
      <div className="search__clear" onClick={handleClick} />
      <button type="submit" className="search__button">{getTranslate(translationKeys.search, language)}</button>
    </form>
  );
}

Search.propTypes = {
  search: PropTypes.func.isRequired,
  searchPlaceholder: PropTypes.string,
  language: PropTypes.string,
};

Search.defaultProps = {
  searchPlaceholder: 'Search',
  language: '',
};

export default Search;
