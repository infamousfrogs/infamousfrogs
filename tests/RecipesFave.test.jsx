import React from 'react';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json'
import RecipesFaves from '../react-client/src/components/RecipesFaves.jsx';

test('RecipesFaves component should render as expected', () => {
  const component = shallow(<RecipesFaves />)
  const tree = toJson(component)

  expect(tree).toMatchSnapshot()
})