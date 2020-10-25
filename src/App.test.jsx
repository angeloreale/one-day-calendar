/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import Calendar from './components/Calendar/Calendar';

describe('App', () => {
  it('should render calendar', () => {
    const component = shallow(<App />);
    expect(component.find(Calendar).length).toEqual(1);
  });
});
