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

injectTapEventPlugin(); // ****** JEE ADDED FEATURE ****** testing testing
//****** RPK ADDED FEATURE********
var Highcharts = require('highcharts');
var ReactHighcharts = require('react-highcharts');
var HighchartsMore = require('highcharts-more');
HighchartsMore(ReactHighcharts.Highcharts);

var options = require('./nutritionGraph/nutrtionInfo.js');

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    // display: 'flex',
    // flexWrap: 'nowrap',
    // overflowY: 'auto',
    width: 500,
    height: 450,
    overflowY: 'auto',
  },
  dialog: {
    minWidth: '95%'
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
      options.xAxis.categories = props.nutrientTitle;
      options.series = [{
          data: props.percentDaily
        }]
      this.chart = new Highcharts["Chart"](
        'chart',
        options
      );

    }

    // if ( props.nutrientTitle && this.state.dialogIsOpen) { // Charts for comparisons
    //   options.xAxis.categories = props.nutrientTitle;
    //   options.series = [{
    //       data: props.percentDaily
    //     }]
    //   this.comparisons = new Highcharts["Chart"](
    //     'comparisons',
    //     options
    //   );
    // }

  }

  handleRequestClose() {
    this.setState({
      open: false
    });
  }

  // ****** JEE ADDED FEATURE ******
  handleOpen() {
    this.setState({
      dialogIsOpen: true
    });
    if (!this.state.dialogIsOpen) {
      console.log(this.state.dialogIsOpen);
      var self = this
      setTimeout(function() {
        console.log(self.state.dialogIsOpen)
        Highcharts.chart('container', {

      chart: {
          polar: true,
          type: 'line'
      },

      title: {
          text: 'Budget vs spending',
          x: -80
      },

      pane: {
          size: '80%'
      },

      xAxis: {
          categories: ['Sales', 'Marketing', 'Development', 'Customer Support',
                  'Information Technology', 'Administration'],
          tickmarkPlacement: 'on',
          lineWidth: 0
      },

      yAxis: {
          gridLineInterpolation: 'polygon',
          lineWidth: 0,
          min: 0
      },

      tooltip: {
          shared: true,
          pointFormat: '<span style="color:{series.color}">{series.name}: <b>${point.y:,.0f}</b><br/>'
      },

      legend: {
          align: 'right',
          verticalAlign: 'top',
          y: 70,
          layout: 'vertical'
      },

      series: [{
          name: 'Allocated Budget',
          data: [43000, 19000, 60000, 35000, 17000, 10000],
          pointPlacement: 'on'
      }, {
          name: 'Actual Spending',
          data: [50000, 39000, 42000, 31000, 26000, 14000],
          pointPlacement: 'on'
      }]

    });
      }, 0)
    }
  };

  handleClose() {
    this.setState({
      dialogIsOpen: false
    });
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
              <h4> {this.props.user}'s Favorites List! <span id="compare"><RaisedButton className="button" onTouchTap={this.handleOpen} label="Compare"></RaisedButton></span></h4>
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
              <h3>Nutrition Information</h3>
              <div id="chart">
              </div>
            </div>
          </Popover>

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
                  <h4>Graphs go in here</h4>
                  <p>Text goes in here</p>
                  <div id="container">
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
