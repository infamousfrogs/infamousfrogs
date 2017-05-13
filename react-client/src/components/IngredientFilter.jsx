import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Checkbox from 'material-ui/Checkbox';


const styles = {
  block: {
    maxWidth: 250,
  },
  checkbox: {
    marginBottom: -20,
  },
};

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
      <div className="col-md-2 filterHeader">
        <h5 className="ingredient">{this.state.label}</h5>
         <form style={styles.block}>
          <Checkbox style={styles.checkbox} label={this.state.arrayOfIngredients[0]} onCheck = {this.changeOnFirst} type="checkbox" value="ingredient1"/> <br/>
          <Checkbox style={styles.checkbox} label={this.state.arrayOfIngredients[1]} onCheck = {this.changeOnSecond} type="checkbox" value="ingredient2"/> <br/>
          <Checkbox style={styles.checkbox} label={this.state.arrayOfIngredients[2]} onCheck = {this.changeOnThird} type="checkbox" value="ingredient3"/> <br/>
          <Checkbox style={styles.checkbox} label={this.state.arrayOfIngredients[3]} onCheck = {this.changeOnFourth} type="checkbox" value="ingredient4"/> <br/>
          <Checkbox style={styles.checkbox} label={this.state.arrayOfIngredients[4]} onCheck = {this.changeOnFifth} type="checkbox" value="ingredient5"/> <br/>
        </form>
      </div>
    );
  }
}

export default IngredientFilter;