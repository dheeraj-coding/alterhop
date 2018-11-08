import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import {
    DialogContent,
    Avatar,
    List,
    ListItem,
    ListItemText,
    Button,
    Divider,
} from '@material-ui/core';
import { ellipsify } from './Utils';

const styles = (theme) => ({
    appBar: {
        position: 'relative',
    },
    flex: {
        flex: 1,
    },
    bigAvatar: {
        width: '10em',
        height: '10em',
        margin: '1em auto',
    },
    list: {
        [theme.breakpoints.up('md')]: {
            width: '30vw',
        },
        margin: 'auto',
        display: 'inline-block',
        width: '90%',
    }
});

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.handleClose = this.handleClose.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClose(event) {
        this.props.dialogClose(event);
    }
    handleClick(event) {
        window.open(this.props.user['html_url']);
    }
    render() {
        const { classes } = this.props;
        return (
            <div>
                <Dialog
                    fullScreen
                    open={this.props.open}
                    onClose={this.handleClose}
                    TransitionComponent={Transition}
                >
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            <Typography variant="h6" color="inherit" className={classes.flex}>
                                {this.props.user['login']}
                            </Typography>
                            <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                                <CloseIcon />
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                    <DialogContent style={{ textAlign: 'center' }}>
                        <Avatar
                            alt={this.props.user['login']}
                            src={this.props.user['avatar_url']}
                            className={classes.bigAvatar}
                        />
                        <br />
                        <Typography variant='display2'>
                            {this.props.user['name']}
                        </Typography>
                        <br />
                        <List className={classes.list}>
                            <ListItem>
                                <ListItemText>
                                    <Typography variant='subheading' style={{ float: 'left' }}>
                                        {'Username:'}
                                    </Typography>
                                    <Typography variant='body1' style={{ float: 'right' }}>
                                        {ellipsify(this.props.user['login'], 10)}
                                    </Typography>
                                </ListItemText>
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemText>
                                    <Typography variant='subheading' style={{ float: 'left' }}>
                                        {'Company:'}
                                    </Typography>
                                    <Typography variant='body1' style={{ float: 'right' }}>
                                        {this.props.user['company'] ? ellipsify(this.props.user['company'], 10) : 'N/A'}
                                    </Typography>
                                </ListItemText>
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemText>
                                    <Typography variant='subheading' style={{ float: 'left' }}>
                                        {'Location:'}
                                    </Typography>
                                    <Typography variant='body1' style={{ float: 'right' }}>
                                        {this.props.user['location'] ? ellipsify(this.props.user['location'], 10) : 'N/A'}
                                    </Typography>
                                </ListItemText>
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemText>
                                    <Typography variant='subheading' style={{ float: 'left' }}>
                                        {'E-Mail:'}
                                    </Typography>
                                    <Typography variant='body1' style={{ float: 'right' }}>
                                        {this.props.user['email'] ? ellipsify(this.props.user['email'], 10) : 'N/A'}
                                    </Typography>
                                </ListItemText>
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemText>
                                    <Typography variant='subheading' style={{ float: 'left' }}>
                                        {'Public Repos:'}
                                    </Typography>
                                    <Typography variant='body1' style={{ float: 'right' }}>
                                        {this.props.user['public_repos'] ? ellipsify(this.props.user['public_repos'], 10) : 'N/A'}
                                    </Typography>
                                </ListItemText>
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemText>
                                    <Typography variant='subheading' style={{ float: 'left' }}>
                                        {'Followers:'}
                                    </Typography>
                                    <Typography variant='body1' style={{ float: 'right' }}>
                                        {this.props.user['followers'] ? ellipsify(this.props.user['followers'], 10) : 'N/A'}
                                    </Typography>
                                </ListItemText>
                            </ListItem>
                            <Divider />
                        </List>
                        <br />
                        <br />
                        <Button color='primary' onClick={this.handleClick}>
                            Profile
                        </Button>
                    </DialogContent>
                </Dialog>
            </div>
        );
    }
}

Profile.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Profile);
