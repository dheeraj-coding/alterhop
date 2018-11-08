import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
    TextField,
    Button,
} from '@material-ui/core';

const styles = (theme) => ({
    root: {
        margin: '4em auto',
        display: 'inline-block',
    },
    btn: {
        margin: theme.spacing.unit,
        marginLeft: theme.spacing.unit * 3,
    }
});

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    handleChange(event) {
        this.setState({ search: event.target.value }, () => {
            this.props.search(this.state.search);
        });
    }
    handleClick(event) {
        this.props.search(this.state.search);
    }
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <TextField
                    id="search"
                    label="Search"
                    value={this.state.search}
                    onChange={this.handleChange}
                />
                <Button color='primary' variant='contained' className={classes.btn} onClick={this.handleClick}>
                    Search
                </Button>
            </div>
        );
    }
}
export default withStyles(styles)(Search);