import React from 'react';
import {shallow, mount} from 'enzyme';
// import toJson from 'enzyme-to-json'
import ReactTestUtils from 'react-dom/test-utils'; 
import homePage from '../react-client/src/viewComponents/homePage.jsx';
import renderer from 'react-test-renderer';
import ReactDOM from 'react-dom';


jest.dontMock('../react-client/src/viewComponents/homePage.jsx');

describe('homePage', () => {

  beforeEach(() => {

  });

  test('should contain spec with an expectation', () => {
    expect(true).toBeTruthy();
  });

  test('should contain a proteins IngredientFilter', () => {
    const component = render.create(<IngredientFilter handleChange = {this.handleChange} ingredients={this.state.list[0]}/>);
    expect(component).to.exist
  });

  test('should contain a grains IngredientFilter', () => {
    const component = render.create(<IngredientFilter handleChange = {this.handleChange} ingredients={this.state.list[1]}/>);
    expect(component).to.exist
  });

  test('should contain a vegetables IngredientFilter', () => {
    const component = render.create(<IngredientFilter handleChange = {this.handleChange} ingredients={this.state.list[2]}/>);
    expect(component).to.exist
  });

  test('should contain a fruits IngredientFilter', () => {
    const component = render.create(<IngredientFilter handleChange = {this.handleChange} ingredients={this.state.list[3]}/>);
    expect(component).to.exist
  });

  test('should contain a dairy IngredientFilter', () => {
    const component = render.create(<IngredientFilter handleChange = {this.handleChange} ingredients={this.state.list[4]}/>);
    expect(component).to.exist
  });

   test('should contain a RecipesView', () => {
    const component = render.create(<RecipesView />);
    expect(component).to.exist
  });

  test('should contain a MuiThemeProvider', () => {
    const component = render.create(<MuiThemeProvider/>);
    expect(component).to.exist
  });

  test('should render a homePage element', () => {
    const component = renderer.create(<homePage />).toJSON();
    // const tree = toJson(component)
    expect(component).toMatchSnapshot()
  });

  test('should be a stateful class component', () => {
    expect(React.Component.isPrototypeOf(homePage)).toBeTruthy();
  });

  test('should render exactly once', () => {
    const component = renderer.create(<homePage />).toJSON();
    expect(render.mock.instances.length).toBe(1);
  })

  test('should componentDidMount exactly once', () => {
    const component = renderer.create(<homePage />).toJSON();
    expect(componentDidMount.mock.instances.length).toBe(1);
  })

  test('should be an template test...', () => {
    const example = true;
    expect(example).toBeTruthy();
  });
})