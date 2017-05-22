import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Star from 'material-ui/svg-icons/toggle/star';
import Popover from 'material-ui/Popover';
import $ from 'jquery';
import renderHTML from 'react-render-html';
import RaisedButton from 'material-ui/RaisedButton'; // ****** JEE ADDED FEATURE ******
import Dialog from 'material-ui/Dialog'; // ****** JEE ADDED FEATURE ******
import injectTapEventPlugin from 'react-tap-event-plugin'; // ****** JEE ADDED FEATURE ******

injectTapEventPlugin(); // ****** JEE ADDED FEATURE ****** testing testing testing testing
//****** RPK ADDED FEATURE********
var Highcharts = require('highcharts');
var ReactHighcharts = require('react-highcharts');
var HighchartsMore = require('highcharts-more');
HighchartsMore(ReactHighcharts.Highcharts);

var options = require('./nutritionGraph/nutrtionInfo.js').popoverNutrition;
var options2 = require('./nutritionGraph/nutrtionInfo.js').dialogNutrition;

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 500,
    height: 450,
    overflowY: 'auto',
    background: 'whitesmoke'
  },
  dialog: {
    minWidth: '95%'
  },
  recipes: {
    minWidth: '75%'
  },
  highcharts: {
    minWidth: '400px', 
    height: '500px', 
    margin: '0 auto'
  }
};

//display all the recipes retrieved from API
class RecipesFaves extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      dialogIsOpen: false // ****** JEE ADDED FEATURE ******
    };

    this.handleTouchTap = this.handleTouchTap.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.dialogNutrientTitles;
    this.dialogPercentDailyValues;
    this.dialogRecipeTitles;
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
        this.setState({srcId: data}),
        this.setState({fetchRecipeById: id})
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
    
    if ( props.nutrientTitle && this.state.open) { // Charts for recipes testing
      this.dialogNutrientTitles = props.dialogNutrientTitle;
      this.dialogPercentDailyValues = props.dialogPercentDaily
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

  // ****** JEE ADDED FEATURE ******
  handleOpen(props) {
    this.setState({
      dialogIsOpen: true
    });
    // console.log('FAVES', this.props.foodComparison);
    if (!this.state.dialogIsOpen) {
      var self = this
      setTimeout(function() {
        options2.xAxis.categories = ['Calories', 'Carbohydrates', 'Fat', 'Protein', 'Sugar'];
        for (var key in self.props.foodComparison) {
          options2.series.push({
            name: key,
            data: self.props.foodComparison[key],
            pointPlacement: 'on'
          })
        }

        self.chart2 = new Highcharts["Chart"](
          'container',
          options2
        );
      }, 0)
    }

  };

  handleClose() {
    this.setState({
      dialogIsOpen: false
    });
    var self = this;
    setTimeout(function() {
    console.log('closed')
      self.chart2.destroy();
      options2.series = [];
    }, 500)
  };
  // ****** END OF JEE ADDED FEATURE ******

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
              <span id="compare"><RaisedButton className="button" onTouchTap={this.handleOpen} label="Compare"></RaisedButton></span>
            </div> : ''
          }
          <GridList
           cellHeight={180}
           style={styles.gridList}
           className='recipeViewList'
          >
            {Object.values(this.props.favoriteList).map((recipe) =>
              <GridTile
                key={recipe.id}
                title={recipe.title}
                subtitle={<span>Match <b>{recipe.usedIngredientCount}</b> of {recipe.usedIngredientCount + recipe.missedIngredientCount} ingredients</span>}
                actionIcon={<IconButton onClick={event => this.props.handleUnfavToggle(recipe)}><Star color="yellow" /></IconButton>}
                titleBackground='linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)'
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
                    <img src={this.state.srcUrl} className="rounded float-left"/>
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

          { /******* JEE ADDED FEATURE ******/ }
          <Dialog
            title="Compare Your Meals"
            contentStyle={styles.dialog}
            modal={false}
            open={this.state.dialogIsOpen}
            onRequestClose={this.handleClose}
            autoScrollBodyContent={true}
          >
            <div style={{height: '70vh'}} className="container-fluid">
              <div className="row">
                <div className="col">
                  <br/>
                  <br/>
                  <div id="container" style={styles.highcharts}>
                  </div>
                </div>
              </div>
            </div>
          </Dialog> { /******* END OF JEE ADDED FEATURE ******/ }

        </div>
      </MuiThemeProvider>
    );
  }
}

export default RecipesFaves;
