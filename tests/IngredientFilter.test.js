import React from 'react';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json'
import ReactTestUtils from 'react-dom/test-utils'; 
import IngredientFilter from '../react-client/src/components/IngredientFilter.jsx';


jest.dontMock('../react-client/src/components/IngredientFilter.jsx');

test('contains spec with an expectation', function() {
  expect(true).toBeTruthy();
});

test('IngredientFilter component should render as expected', () => {
  const component = shallow(<IngredientFilter />)
  const tree = toJson(component)

  expect(tree).toMatchSnapshot()
});

test('should be a stateful class component', function() {
  expect(React.Component.isPrototypeOf(IngredientFilter)).toBeTruthy();
});


