import React from 'react';
import {shallow, mount} from 'enzyme';
import toJson from 'enzyme-to-json'
import ReactTestUtils from 'react-dom/test-utils'; 
import homePage from '../react-client/src/viewComponents/homePage.jsx';


jest.dontMock('../react-client/src/viewComponents/homePage.jsx');

test('contains spec with an expectation', function() {
  expect(true).toBeTruthy();
});

test('homePage component should render as expected', () => {
  const component = shallow(<homePage />)
  const tree = toJson(component)

  expect(tree).toMatchSnapshot()
})

test('should be a stateful class component', function() {
  expect(React.Component.isPrototypeOf(homePage)).toBeTruthy();
});

