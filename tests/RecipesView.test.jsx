import React from 'react';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json'
import RecipesView from '../react-client/src/components/RecipesView.jsx';


//test currently fails
test('RecipesView component should render as expected', () => {
  const component = shallow(<RecipesView />)
  const tree = toJson(component)

  expect(tree).toMatchSnapshot()
})