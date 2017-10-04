import React from 'react';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json'
import ReactTestUtils from 'react-dom/test-utils';
import RecipesView from '../react-client/src/components/RecipesView.jsx';

jest.dontMock('../react-client/src/components/RecipesView.jsx');

test('contains spec with an expectation', function() {
  expect(true).toBeTruthy();
});

//test currently fails
test('RecipesView component should render as expected', () => {
  const component = shallow(<RecipesView />)
  const tree = toJson(component)

  expect(tree).toMatchSnapshot()
});


test('should be a stateful class component', function() {
  expect(React.Component.isPrototypeOf(RecipesView)).toBeTruthy();
});

test('should have header text', function() {
  const component = shallow(<RecipesView />)
  expect(component.contains(<h4>Search Results</h4>)).toBeTruthy();
});
