import React from 'react';

//user clicks on ingredient category (i.e. proteins), checks ingredients they want to serach for
class IngredientFilter extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      arrayOfIngredients: [],
      label: Object.keys(props.ingredients)[0]
    };
    
    for (var key in this.props.ingredients[this.state.label]) {
      this.state.arrayOfIngredients.push(key);
    }
    
    this.changeOnFirst = this.changeOnFirst.bind(this);
    this.changeOnSecond = this.changeOnSecond.bind(this);
    this.changeOnThird = this.changeOnThird.bind(this);
    this.changeOnFourth = this.changeOnFourth.bind(this);
    this.changeOnFifth = this.changeOnFifth.bind(this);

  }

  changeOnFirst() {
    this.props.handleChange(this.state.arrayOfIngredients[0]);
  }

  changeOnSecond() {
    this.props.handleChange(this.state.arrayOfIngredients[1]);
  }

  changeOnThird() {
    this.props.handleChange(this.state.arrayOfIngredients[2]);
  }

  changeOnFourth() {
    this.props.handleChange(this.state.arrayOfIngredients[3]);
  }

  changeOnFifth() {
    this.props.handleChange(this.state.arrayOfIngredients[4]);
  }

  render() {
    return (
      <div className="col-md-2">
        <h5 className="ingredient">{this.state.label}</h5>
         <form>
          <input onChange = {this.changeOnFirst} type="checkbox" value="ingredient1"/> {this.state.arrayOfIngredients[0]}<br/>
          <input onChange = {this.changeOnSecond} type="checkbox" value="ingredient2"/> {this.state.arrayOfIngredients[1]}<br/>
          <input onChange = {this.changeOnThird} type="checkbox" value="ingredient3"/> {this.state.arrayOfIngredients[2]}<br/>
          <input onChange = {this.changeOnFourth} type="checkbox" value="ingredient4"/> {this.state.arrayOfIngredients[3]}<br/>
          <input onChange = {this.changeOnFifth} type="checkbox" value="ingredient5"/> {this.state.arrayOfIngredients[4]}<br/>
        </form>
      </div>
    );
  }
}

export default IngredientFilter;