import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import Popover from 'material-ui/Popover';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    display: 'flex',
    flexWrap: 'nowrap',
    overflowY: 'auto',
  }
};

//display all the recipes retrieved from API
class RecipesView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };

    this.handleTouchTap = this.handleTouchTap.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
  }

  handleTouchTap(event, title) {
    event.preventDefault();
    this.setState ({
      open: true,
      anchorEl: event.currentTarget,
      srcUrl: event.target.src,
      srcTitle: title
    });
  }

  handleRequestClose() {
    this.setState({
      open: false
    });
  }
  
  render() {
    return (
      <MuiThemeProvider>
        <div
          style={styles.root}
          className="col-md-12"
        >
          <h4> Search Result </h4>
          <GridList
           cellHeight={240}
           style={styles.gridList}
          >
            {Object.values(this.props.recipeList).map((recipe) =>
              <GridTile 
                key={recipe.id}
                title={recipe.title}
                subtitle={<span>Match <b>{recipe.usedIngredientCount}</b> of {recipe.usedIngredientCount + recipe.missedIngredientCount} ingredients</span>}
                actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
              >
                <img
                  src={recipe.image}
                  onClick={event => this.handleTouchTap(event, recipe.title)}
                />
              </GridTile>
            )}
          </GridList>
          <Popover
            open={this.state.open}
            anchorEl={this.state.anchorEl}
            anchorOrigin={{horizontal: 'middle', vertical: 'center'}}
            targetOrigin={{horizontal: 'middle', vertical: 'top'}}
            onRequestClose={this.handleRequestClose}
          >
            <div>
              <img
                src={this.state.srcUrl}
                height={400}
              />
              <h4>{this.state.srcTitle}</h4>
              <p> Insert Description Here </p>
            </div>
          </Popover>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default RecipesView;