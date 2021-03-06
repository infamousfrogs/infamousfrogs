import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Star from 'material-ui/svg-icons/toggle/star';
import Popover from 'material-ui/Popover';
import $ from 'jquery';
import renderHTML from 'react-render-html';


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
class RecipesFaves extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };

    this.handleTouchTap = this.handleTouchTap.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
  }

  handleTouchTap(event, title, id) {
    event.preventDefault();
    $.ajax({
      type: 'GET',
      url: `/summary?id=${id}`,
      contentType: 'application/json',
      data: JSON.stringify(id),
      dataType: 'text',
      success: (data) => {
        this.setState({srcId: data})
        this.setState({fetchRecipeById: id})
      }
    });

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
    if (this.state.srcId) {
      var description = renderHTML(this.state.srcId);
    }
    if (this.state.fetchRecipeById) {
      let id = this.state.fetchRecipeById
      var instructions = this.props.recipeInstruction;
    }
    return (
      <MuiThemeProvider>
        <div
          style={styles.root}
          className="col-md-12 favoriteResults"
        >
          {this.props.user ?
            <div className="col-md-12">
              <h4> {this.props.user}'s Favorites List! </h4>
            </div> : ''
          }
          <GridList
           cellHeight={240}
           style={styles.gridList}
           className='recipeViewList'
          >
            {Object.values(this.props.favoriteList).map((recipe) =>
              <GridTile
                key={recipe.id}
                title={recipe.title}
                subtitle={<span>Match <b>{recipe.usedIngredientCount}</b> of {recipe.usedIngredientCount + recipe.missedIngredientCount} ingredients</span>}
                  actionIcon={<IconButton onClick={event => this.props.handleUnfavToggle(recipe)}><Star color="yellow" /></IconButton>}
              >
                <img
                  src={recipe.image}
                  onClick={event => {
                    this.handleTouchTap(event, recipe.title, recipe.recipeId)
                    this.props.fetchRecipeById(recipe.recipeId || recipe.id)
                    }
                  }
                />
              </GridTile>
            )}
          </GridList>
          <Popover
            open={this.state.open}
            anchorEl={this.state.anchorEl}
            anchorOrigin={{horizontal: 'left', vertical: 'center'}}
            targetOrigin={{horizontal: 'left', vertical: 'top'}}
            onRequestClose={this.handleRequestClose}
            className="col-md-4 recipeViewBK"
          >
            <div>
              <img
                src={this.state.srcUrl}
                height={400}
                className="imagePlacer"
              />
              <h4>{this.state.srcTitle}</h4>
              {description}
              <h3> Instructions </h3>
              {instructions}
            </div>
          </Popover>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default RecipesFaves;
