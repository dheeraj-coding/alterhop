import React, { Component } from 'react';
import {
    Card,
    CardActionArea,
    CardMedia,
    CardContent,
    CardActions,
    Button,
    Typography,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
    card: {
        [theme.breakpoints.up('md')]: {
            minWidth: '15vw',
        },
        maxWidth: 345,
        minWidth: '80vw',
        margin: '2em',
    },
    media: {
        objectFit: 'cover',
    },
});

class ProfileCard extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(event) {
        window.open(this.props.profileUrl);
    }
    render() {
        const { classes } = this.props;
        return (
            <Card className={classes.card}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        alt={this.props.alt}
                        className={classes.media}
                        height="140"
                        image={this.props.image}
                        title={this.props.title}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {this.props.title}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary" onClick={this.handleClick} style={{ float: 'right' }}>
                        Profile
                    </Button>
                    <Button size="small" color="primary" onClick={this.props.viewMore(this.props.id)} style={{ float: 'right' }}>
                        More..
                    </Button>
                </CardActions>
            </Card>
        );
    }
}

export default withStyles(styles)(ProfileCard);