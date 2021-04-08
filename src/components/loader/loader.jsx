import React from 'react';
import './loader.scss';

function Loader() {
  function renderDivs(amount) {
    const result = [];
    for (let i = 0; i < amount; i += 1) {
      result.push((
        <div key={i} />
      ));
    }
    return result;
  }

  return (
    <div className="loader">
      {renderDivs(8)}
    </div>
  );
}

export default Loader;
