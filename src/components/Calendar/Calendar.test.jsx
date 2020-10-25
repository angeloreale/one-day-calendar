/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import { shallow } from 'enzyme';
import Calendar from './Calendar';
import { Event } from './components';

const mockEvents = [
  { start: 30, end: 150 },
  { start: 180, end: 240 },
  { start: 180, end: 240 },
  { start: 180, end: 240 },
  { start: 150, end: 240 },
  { start: 150, end: 330 },
  { start: 300, end: 360 },
  { start: 330, end: 390 },
  { start: 360, end: 390 },
  { start: 390, end: 420 },
  { start: 540, end: 2400 },
];

describe('Calendar', () => {
  it('should render calendar', () => {
    const component = shallow(<Calendar loadedEvents={mockEvents} />);
    expect(component.find('.O-Calendar').length).toEqual(1);
  });

  it('should render events at the right position', () => {
    const component = shallow(<Calendar loadedEvents={mockEvents} />);
    expect(component.find(Event).length).toEqual(11);
    expect(component.find(Event).at(0).prop('top')).toEqual(30);
    expect(component.find(Event).at(0).prop('width')).toEqual(100);
    expect(component.find(Event).at(0).prop('height')).toEqual(120);
    expect(component.find(Event).at(0).prop('left')).toEqual(0);

    expect(component.find(Event).at(1).prop('top')).toEqual(150);
    expect(component.find(Event).at(1).prop('width')).toEqual(12.5);
    expect(component.find(Event).at(1).prop('height')).toEqual(90);
    expect(component.find(Event).at(1).prop('left')).toEqual(0);

    expect(component.find(Event).at(2).prop('top')).toEqual(150);
    expect(component.find(Event).at(2).prop('width')).toEqual(12.5);
    expect(component.find(Event).at(2).prop('height')).toEqual(180);
    expect(component.find(Event).at(2).prop('left')).toEqual(12.5);

    expect(component.find(Event).at(3).prop('top')).toEqual(180);
    expect(component.find(Event).at(3).prop('width')).toEqual(12.5);
    expect(component.find(Event).at(3).prop('height')).toEqual(60);
    expect(component.find(Event).at(3).prop('left')).toEqual(25);

    expect(component.find(Event).at(4).prop('top')).toEqual(180);
    expect(component.find(Event).at(4).prop('width')).toEqual(12.5);
    expect(component.find(Event).at(4).prop('height')).toEqual(60);
    expect(component.find(Event).at(4).prop('left')).toEqual(37.5);

    expect(component.find(Event).at(5).prop('top')).toEqual(180);
    expect(component.find(Event).at(5).prop('width')).toEqual(12.5);
    expect(component.find(Event).at(5).prop('height')).toEqual(60);
    expect(component.find(Event).at(5).prop('left')).toEqual(50);

    expect(component.find(Event).at(6).prop('top')).toEqual(300);
    expect(component.find(Event).at(6).prop('width')).toEqual(12.5);
    expect(component.find(Event).at(6).prop('height')).toEqual(60);
    expect(component.find(Event).at(6).prop('left')).toEqual(25);

    expect(component.find(Event).at(7).prop('top')).toEqual(330);
    expect(component.find(Event).at(7).prop('width')).toEqual(12.5);
    expect(component.find(Event).at(7).prop('height')).toEqual(60);
    expect(component.find(Event).at(7).prop('left')).toEqual(37.5);

    expect(component.find(Event).at(8).prop('top')).toEqual(360);
    expect(component.find(Event).at(8).prop('width')).toEqual(12.5);
    expect(component.find(Event).at(8).prop('height')).toEqual(30);
    expect(component.find(Event).at(8).prop('left')).toEqual(50);

    expect(component.find(Event).at(9).prop('top')).toEqual(390);
    expect(component.find(Event).at(9).prop('width')).toEqual(100);
    expect(component.find(Event).at(9).prop('height')).toEqual(30);
    expect(component.find(Event).at(9).prop('left')).toEqual(0);

    expect(component.find(Event).at(10).prop('top')).toEqual(540);
    expect(component.find(Event).at(10).prop('width')).toEqual(100);
    expect(component.find(Event).at(10).prop('height')).toEqual(1860);
    expect(component.find(Event).at(10).prop('left')).toEqual(0);
  });
});
