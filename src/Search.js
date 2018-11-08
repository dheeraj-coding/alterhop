import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
    TextField,
    Button,
} from '@material-ui/core';
import { fromEvent } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

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
        this.subscribe = null;
    }
    componentDidMount() {
        const search = document.getElementById('search');
        const keyUP = fromEvent(search, 'keyup').pipe(map(i => i.currentTarget.value));
        const debounced = keyUP.pipe(debounceTime(500));
        this.subscribe = debounced.subscribe(val => {
            if (val) {
                this.props.search(val);
            }
        });
    }
    componentWillUnmount() {
        this.subscribe.unsubscribe();
    }
    handleChange(event) {
        this.setState({ search: event.target.value });
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