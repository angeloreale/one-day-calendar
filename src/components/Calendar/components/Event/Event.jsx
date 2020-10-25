import React from 'react';
import PropTypes from 'prop-types';

import './Event.scss';

export const Event = ({
  width, height, top, left, isHalfHour = false, title = 'Lorem ipsum dolor sit amet',
}) => (
  <div
    style={{
      width: `${width}%`, height, top, left: `${left}%`,
    }}
    className="M-Event--wrapper"
  >
    <div className={`M-Event ${isHalfHour ? 'M-Event--half' : ''}`}>
      {title}
    </div>
  </div>
);

Event.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  top: PropTypes.number.isRequired,
  left: PropTypes.number.isRequired,
  isHalfHour: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
};

export default Event;
