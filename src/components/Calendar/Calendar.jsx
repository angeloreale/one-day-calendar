import React from 'react';
import _ from 'lodash';
import {
  START_TIME, END_TIME, EVENTS, INTERVAL, HOUR_HEIGHT,
} from './constants';

import './Calendar.scss';

const parseHourAMPM = (hour) => (hour > 12 ? hour - 12 : hour);

const renderHourTimestamp = (start, id) => (
  <div className="M-HourLabel" key={`timestamp--${id}`}>
    <div className="M-HourLabel__full-hour">
      {parseHourAMPM(start)}
      :00
      <span className="M-HourLabel__full-hour--ampm">
        {start < 12 ? 'am' : 'pm'}
      </span>
    </div>
    <div className="M-HourLabel__half-hour">
      {parseHourAMPM(start)}
      :30
    </div>
  </div>
);

const Calendar = () => {
  const numHours = END_TIME - START_TIME;

  const eventsWithOffset = _.sortBy(_.map(_.filter(EVENTS,
    (ev) => ev.start > 0 && ev.start < (END_TIME * 30)),
  (ev) => ({
    start: ev.start, end: ev.end, offset: 0, columns: 1,
  })), 'start');

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
        {_.times(numHours, (_i) => renderHourTimestamp(_i + START_TIME, _i))}
        <div className="M-HourLabel--last">
          <div className="M-HourLabel__full-hour M-HourLabel__full-hour--last">
            {parseHourAMPM(END_TIME)}
            :00
            <span className="M-HourLabel__full-hour--ampm">
              {END_TIME < 12 ? 'am' : 'pm'}
            </span>
          </div>
        </div>
      </div>
      <div className="O-Calendar__right-events-grid">
        {_.times(numHours, (_i) => (
          <div key={`timeblock--${_i}`} className="M-TimeBlock" />
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
                <div
                  style={{
                    width: `${width}%`, height, top, left: `${left}%`,
                  }}
                  className="M-Event--wrapper"
                >
                  <div className={`M-Event ${isHalfHour ? 'M-Event--half' : ''}`}>
                    Lorem ipsum dolor sit amet
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Calendar;
