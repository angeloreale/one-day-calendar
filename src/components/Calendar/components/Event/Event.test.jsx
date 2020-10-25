/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import { shallow } from 'enzyme';
import { Event } from './Event';
import { instanceOf } from 'prop-types';

describe('Event', () => {
  let defaultProps;
  beforeEach(() => {
    defaultProps = {
      width: 100,
      height: 100,
      top: 100,
      left: 100,
      isHalfHour: false,
      title: 'Lorem ipsum dolor sit amet',
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render', () => {
    const component = shallow(<Event {...defaultProps} />);
    expect(component.find('.M-Event').length).toEqual(1);
  });

  it('should show default title', () => {
    const component = shallow(<Event {...defaultProps} />);
    expect(component.find('.M-Event').text()).toEqual('Lorem ipsum dolor sit amet');
  });

  it('should show extraeous title', () => {
    const component = shallow(<Event {...defaultProps} title="Meeting with the team" />);
    expect(component.find('.M-Event').text()).toEqual('Meeting with the team');
  });

  it('should have half event class on half hour evennts', () => {
    const component = shallow(<Event {...defaultProps} isHalfHour />);
    expect(component.find('.M-Event--half').length).toEqual(1);
  });
});
