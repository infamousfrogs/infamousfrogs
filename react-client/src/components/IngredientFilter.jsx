import React from 'react';

//user clicks on ingredient category (i.e. proteins), checks ingredients they want to serach for

class IngredientFilter extends React.Component {
	constructor(props) {
    super(props);
    
    this.state = {
      isSelected: false;
    }
      this.handleChange = this.handleChange.bind(this);
  }



  handleChange() {
    
    this.setState({!isSelected})
  }

}


