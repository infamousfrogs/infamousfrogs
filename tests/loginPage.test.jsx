import React from 'react';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json'
import loginPage from '../react-client/src/viewComponents/loginPage.jsx';

test('loginPage component should render as expected', () => {
  const component = shallow(<loginPage />)
  const tree = toJson(component)

  expect(tree).toMatchSnapshot()
})