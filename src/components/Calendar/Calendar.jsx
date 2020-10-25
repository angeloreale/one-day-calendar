import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { v4 as uuid } from 'uuid';

import { HourLabel, Event } from './components';

import {
  START_TIME, END_TIME, INTERVAL, HOUR_HEIGHT,
} from './constants';

import './Calendar.scss';

const Calendar = ({ loadedEvents }) => {
  const numHours = END_TIME - START_TIME;

  const eventsWithOffset = useMemo(() => _.sortBy(_.map(_.filter(loadedEvents,
    (ev) => ev.start > 0 && ev.start < (END_TIME * 30)),
  (ev) => ({
    start: ev.start, end: ev.end, offset: 0, columns: 1,
  })), 'start'), []);

  const evaluateEvent = (position, events) => {
    let referenceStart = events[position].start;
    let referenceEnd = events[position].end;
    const sequenceOverlapIndexes = [];
    let counter = 1;
    _.forEach(events, (_event, i) => {
      if (i !== position) {
        if (!(_event.end < referenceStart)) {
          if (_event.start >= referenceStart && _event.start < referenceEnd) {
            referenceStart = _event.start;
            counter += 1;
            sequenceOverlapIndexes.push(i);

            if (_event.end > referenceEnd) {
              referenceEnd = _event.end;
            }
          } else if ((_event.end > referenceStart && _event.start <= referenceStart)) {
            counter += 1;
            sequenceOverlapIndexes.push(i);
            if (_event.end > referenceEnd) {
              referenceEnd = _event.end;
            }
          }
          eventsWithOffset[position].columns = Math.max(
            eventsWithOffset[position].columns, counter,
          );
        }
      }
    });

    _.forEach(sequenceOverlapIndexes, (i) => {
      eventsWithOffset[i].columns = Math.max(eventsWithOffset[i].columns, counter);
    });

    // set offset
    _.forEach(events, (_event, i) => {
      if (i !== position) {
        if ((_event.start >= events[position].start && _event.start < events[position].end)
          || (events[position].start < _event.end && events[position].start >= _event.start)) {
          eventsWithOffset[i].offset = eventsWithOffset[position].offset + 1;
        }
      }
    });

    return {
      numCols: eventsWithOffset[position].columns,
      offset: eventsWithOffset[position].offset,
    };
  };
  return (
    <div className="O-Calendar">
      <div className="O-Calendar__left-timestamps">
        {_.times(numHours, (_i) => (
          <HourLabel
            key={`hourlabel--${uuid}`}
            start={_i + START_TIME}
            id={uuid()}
            hasHalf
          />
        ))}
        <HourLabel start={END_TIME} id={uuid()} hasHalf={false} />
      </div>
      <div className="O-Calendar__right-events-grid">
        {_.times(numHours, () => (
          <div key={`timeblock--${uuid}`} className="A-TimeBlock" />
        ))}
        <div className="M-EventsGrid--wrapper">
          <div className="M-EventsGrid">
            {_.map(eventsWithOffset, (event, position) => {
              const { numCols, offset } = evaluateEvent(position, eventsWithOffset);
              const width = 100 / (numCols);
              const height = HOUR_HEIGHT * ((event.end - event.start) / 30) * INTERVAL;
              const top = HOUR_HEIGHT * (event.start / 30) * INTERVAL;
              const left = width * (offset);
              const isHalfHour = event.end - event.start === 30;
              return (
                <Event
                  key={`event--${uuid}`}
                  top={top}
                  left={left}
                  height={height}
                  width={width}
                  isHalfHour={isHalfHour}
                  title="Lorem ipsum"
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

Calendar.propTypes = {
  loadedEvents: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Calendar;
