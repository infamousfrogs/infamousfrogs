import React from 'react';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json'
import homePage from '../react-client/src/viewComponents/homePage.jsx';

test('homePage component should render as expected', () => {
  const component = shallow(<homePage />)
  const tree = toJson(component)

  expect(tree).toMatchSnapshot()
})