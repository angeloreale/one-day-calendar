/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import { shallow } from 'enzyme';
import Calendar from './Calendar';

describe('Calendar', () => {
  it('should render calendar', () => {
    const component = shallow(<Calendar />);
    expect(component.find('.O-Calendar').length).toEqual(1);
  });
});
