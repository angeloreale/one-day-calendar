import React from 'react';
import PropTypes from 'prop-types';
import parseHourAMPM from './helpers';

import './HourLabel.scss';

export const HourLabel = ({ start, id, hasHalf = false }) => (
  <div className={`${hasHalf ? 'M-HourLabel' : 'M-HourLabel--last'}`} key={`timestamp--${id}`}>
    <div className="M-HourLabel__full-hour">
      {parseHourAMPM(start)}
      :00
      <span className="M-HourLabel__full-hour--ampm">
        {start < 12 ? 'am' : 'pm'}
      </span>
    </div>
    {hasHalf && (
    <div className="M-HourLabel__half-hour">
      {parseHourAMPM(start)}
      :30
    </div>
    )}
  </div>
);

HourLabel.propTypes = {
  start: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  hasHalf: PropTypes.bool.isRequired,
};

export default HourLabel;
