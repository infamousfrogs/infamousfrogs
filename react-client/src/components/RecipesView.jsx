import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import Popover from 'material-ui/Popover';
import $ from 'jquery';
import renderHTML from 'react-render-html';
import Dialog from 'material-ui/Dialog'; // ****** JEE ADDED FEATURE ******

//****** RPK ADDED FEATURE********
var Highcharts = require('highcharts');
var options = require('./nutritionGraph/nutrtionInfo.js').popoverNutrition;

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
    background: 'whitesmoke'
  },
  recipes: {
    minWidth: '75%',
    backgroundColor: 'black'
  }
};

//display all the recipes retrieved from API
class RecipesView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
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
        this.setState({srcId: data});
        this.setState({fetchRecipeById: id});
      }
    });
    this.setState ({
      open: true,
      anchorEl: event.currentTarget,
      srcUrl: event.target.src,
      srcTitle: title,
      srcId: this.props.srcId,
      fetchRecipeById: this.props.fetchRecipeById
    });

  }

  //******RPK ADDED FEATURES*********
  componentWillReceiveProps(props) {
    if ( props.nutrientTitle && this.state.open) {

      options.xAxis.categories = props.nutrientTitle;
      options.series = [{
          data: props.percentDaily
        }]
      this.chart = new Highcharts["Chart"](
        'chart',
        options
      );

    }
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
      let id = this.state.fetchRecipeById;
      var instructions = this.props.recipeInstruction;
    }

    return (
      <MuiThemeProvider>
        <div
          style={styles.root}
          className="col-md-12 searchResults"
        >
          <GridList
           cellHeight={240}
           style={styles.gridList}
           className='recipeViewList'
          >
            {Object.values(this.props.recipeList).map((recipe) =>
              <GridTile
                titleBackground='linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)'
                key={recipe.id}
                title={recipe.title}
                subtitle={<span>Match <b>{recipe.usedIngredientCount}</b> of {recipe.usedIngredientCount + recipe.missedIngredientCount} ingredients</span>}
                  actionIcon={<IconButton
                  onClick={event =>
                    this.props.handleFavesToggle(recipe)
                  }><StarBorder color="white" /></IconButton>}
                             >
                <img
                  src={recipe.image}
                  onClick={event => {
                    this.handleTouchTap(event, recipe.title, recipe.id)
                    this.props.fetchRecipeById(recipe.id)
                    }
                  }
                />
              </GridTile>
            )}
          </GridList>
          

          {/*<Popover
            open={this.state.open}
            anchorEl={this.state.anchorEl}
            anchorOrigin={{horizontal: 'left', vertical: 'center'}}
            targetOrigin={{horizontal: 'left', vertical: 'top'}}
            onRequestClose={this.handleRequestClose}
            className="col-md-5 recipeViewBK"
          >*/}

          <Dialog
            open={this.state.open}
            onRequestClose={this.handleRequestClose}
            modal={false}
            autoScrollBodyContent={true}
            contentStyle={styles.recipes}
          >
            <div>
              <div className="container-fluid">
                <div className="">    
                    <img src={this.state.srcUrl} height={400} className="rounded float-left"/>
                    <h4 className="display-4 test">{this.state.srcTitle}</h4>
                      <table className="table table-responsive">
                        <thead>
                          <tr>
                            <th><h4 className="lead">What is it?</h4></th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>{description}</td>
                          </tr>
                        </tbody>
                      </table>

                      <table className="table table-responsive">
                        <thead>
                          <tr>
                            <th><h4 className="lead">How do I make it?</h4></th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>{instructions}</td>
                          </tr>
                        </tbody>
                      </table>

                      <table className="table">
                        <thead>
                          <tr>
                            <th><h4 className="lead">Give me the facts!</h4></th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td><div id="chart"></div></td>
                          </tr>
                        </tbody>
                      </table>
                </div>
              </div>
            </div>
          </Dialog>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default RecipesView;
