import React from 'react';
import PropTypes, { string } from 'prop-types';
import './dropdownMenu.scss';

function DropdownList({ items, defaultValue, callback }) {
  function renderItems() {
    return Object.entries(items).map(([key, item]) => (
      <option
        key={key}
        className="dropdown-list__item"
        value={key}
        selected={defaultValue === key}
      >
        {item}
      </option>
    ));
  }

  return (
    <select className="dropdown-list" onClick={callback}>
      {renderItems()}
    </select>
  );
}

DropdownList.propTypes = {
  items: PropTypes.objectOf(string).isRequired,
  callback: PropTypes.func,
  defaultValue: PropTypes.string,
};

DropdownList.defaultProps = {
  callback: () => {},
  defaultValue: '',
};

export default DropdownList;
