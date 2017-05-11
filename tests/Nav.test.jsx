import React from 'react';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json'
import Nav from '../react-client/src/components/Nav.jsx';

test('Nav component should render as expected', () => {
  const component = shallow(<Nav />)
  const tree = toJson(component)

  expect(tree).toMatchSnapshot()
})