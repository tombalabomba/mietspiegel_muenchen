import React, { useState } from 'react';
import './Tooltip.css';

const Tooltip = ({ text }) => {
  const [show, setShow] = useState(false);

  return (
    <span className="tooltip-wrapper">
      <button
        type="button"
        className="tooltip-trigger"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        onClick={() => setShow(!show)}
        aria-label="Hilfe"
      >
        ?
      </button>
      {show && <span className="tooltip-content">{text}</span>}
    </span>
  );
};

export default Tooltip;
