import React from 'react';
import {shallow, mount, render} from 'enzyme';
import toJson from 'enzyme-to-json'
import ReactTestUtils from 'react-dom/test-utils'; 
import Nav from '../react-client/src/components/Nav.jsx';

jest.dontMock('../react-client/src/components/Nav.jsx');

test('contains spec with an expectation', function() {
  expect(true).toBeTruthy();
});

test('Nav component should render as expected', () => {
  const component = shallow(<Nav />)
  const tree = toJson(component)

  expect(tree).toMatchSnapshot()
});

test('should be a stateful class component', function() {
  expect(React.Component.isPrototypeOf(Nav)).toBeTruthy();
});


test('Submit button functions', () => {
  const page = <Nav />;
  const pageMounted = mount(page);

  const button = pageMounted.find('.submitButton');
  expect(button.length).toBe(1);
  button.simulate('submit');
});




