import React from 'react';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json'
import signUpPage from '../react-client/src/viewComponents/signUpPage.jsx';

test('signUpPage component should render as expected', () => {
  const component = shallow(<signUpPage />)
  const tree = toJson(component)

  expect(tree).toMatchSnapshot()
})