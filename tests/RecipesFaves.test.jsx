import React from 'react';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import ReactTestUtils from 'react-dom/test-utils'; 
import RecipesFaves from '../react-client/src/components/RecipesFaves.jsx';

jest.dontMock('../react-client/src/components/RecipesFaves.jsx');

test('contains spec with an expectation', function() {
  expect(true).toBeTruthy();
});

test('RecipesFaves component should render as expected', () => {
  const component = shallow(<RecipesFaves />)
  const tree = toJson(component)

  expect(tree).toMatchSnapshot()
});

test('should be a stateful class component', function() {
  expect(React.Component.isPrototypeOf(RecipesFaves)).toBeTruthy();
});

