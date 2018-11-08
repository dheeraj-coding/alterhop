import React, { Component } from 'react';
import {
  Paper,
} from '@material-ui/core';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import './App.css';
import Search from './Search';
import ProfileCard from './ProfileCard';
import Profile from './Profile';

const style = (theme) => ({
  App: {
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing.unit * 4,
    },
    padding: theme.spacing.unit,
    textAlign: 'center',
  },
  paper: {
    width: '90vw',
    minHeight: '90vh',
    margin: 'auto',
    padding: theme.spacing.unit * 2,
    boxSizing: 'border-box',
    backgroundColor: '#EDEDEE',
  },
  flex: {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center',
  }
});
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      dialogOpen: false,
      loading: false
    }
    this.handleSearch = this.handleSearch.bind(this);
    this.handleViewMore = this.handleViewMore.bind(this);
    this.handleDialogClose = this.handleDialogClose.bind(this);
  }
  handleDialogClose(event) {
    this.setState({ dialogOpen: false });
  }
  handleSearch(query) {
    this.setState({ loading: true }, () => {
      axios.get('https://api.github.com/search/users?q=' + query).then((response) => {
        this.setState({ loading: false }, () => {
          this.setState({ users: response.data['items'], });
        });
      }, (err) => {
        console.log(err);
      });
    });

  }
  handleViewMore(index) {
    return (event) => {
      this.setState({ focusUser: index, dialogOpen: true })
    }
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.App}>
        <Paper elevation={3} className={classes.paper}>
          <Search search={this.handleSearch} />
          <br />
          {this.state.loading ? <img src={require('./assets/spinningwheel.gif')} alt='loading' style={{ margin: 'auto' }} /> : null}
          <div className={classes.flex}>
            {this.state.users.map((user, index) => {
              return (<ProfileCard
                key={user['node_id']}
                id={index}
                alt={user['login']}
                title={user['login']}
                image={user['avatar_url']}
                profileUrl={user['html_url']}
                viewMore={this.handleViewMore}
              />);
            })}
          </div>
          <Profile dialogClose={this.handleDialogClose} open={this.state.dialogOpen} />
        </Paper>
      </div>
    );
  }
}

export default withStyles(style)(App);
