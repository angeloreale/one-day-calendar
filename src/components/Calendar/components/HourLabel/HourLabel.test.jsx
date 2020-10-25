/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { v4 as uuid } from 'uuid';
import { shallow } from 'enzyme';
import { HourLabel } from './HourLabel';

describe('HourLabel', () => {
  let defaultProps;
  beforeEach(() => {
    defaultProps = {
      hasHalf: true,
      start: 0,
      id: uuid(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render', () => {
    const component = shallow(<HourLabel {...defaultProps} />);
    expect(component.find('.M-HourLabel').length).toEqual(1);
  });

  it('should show full hour', () => {
    const component = shallow(<HourLabel {...defaultProps} />);
    expect(component.find('.M-HourLabel__full-hour').length).toEqual(1);
    expect(component.find('.M-HourLabel__full-hour').text()).toEqual('0:00am');
  });

  it('should show half hour', () => {
    const component = shallow(<HourLabel {...defaultProps} />);
    expect(component.find('.M-HourLabel__half-hour').length).toEqual(1);
    expect(component.find('.M-HourLabel__half-hour').text()).toEqual('0:30');
  });

  it('should hide half hour', () => {
    const component = shallow(<HourLabel {...defaultProps} hasHalf={false} />);
    expect(component.find('.M-HourLabel__half-hour').length).toEqual(0);
  });
});
