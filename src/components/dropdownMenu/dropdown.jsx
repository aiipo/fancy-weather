import React from 'react';
import PropTypes, { string } from 'prop-types';
import './dropdownMenu.scss';

function DropdownList({ items }) {
  function renderItems() {
    return Object.values(items).map(item => (
      <option
        key={item}
        className="dropdown-list__item"
        value={item}
      >
        {item}
      </option>
    ));
  }

  return (
    <select className="dropdown-list">
      {renderItems()}
    </select>
  );
}

DropdownList.propTypes = {
  items: PropTypes.objectOf(string).isRequired,
};

export default DropdownList;
