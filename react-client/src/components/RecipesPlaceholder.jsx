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


const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  gridList: {
    width: 500,
    height: 450,
    background: 'whitesmoke'
  },
};

const RecipesPlaceholder = function(props) {
  return(
    <MuiThemeProvider>
      <div style={styles.root}>
        <GridList
         cellHeight={180}
         style={styles.gridList}
         className='recipeViewList'
        >
        </GridList>
      </div>
    </MuiThemeProvider>
  )
}

export default RecipesPlaceholder;
