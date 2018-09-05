import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Tooltip from '@material-ui/core/Tooltip';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import {Inbox, Home, Info, Apps, Bookmark, ContactMail, Save, Details, Mail, Schedule} from '@material-ui/icons';
import ListIcon from '@material-ui/icons/List';
import { Link } from 'react-router-dom';

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
});

function MenuBar(props) {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <List>
                <Link to="/">
                    <ListItem button>
                        <ListItemIcon>
                            <Home/>
                        </ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItem>
                </Link>
                <Tooltip id="doc" title="Docs">
                    <Link to="/docs">
                        <ListItem button>
                            <ListItemIcon>
                                <ListIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Details" />
                        </ListItem>
                    </Link>
                </Tooltip>
                <ListItem button>
                    <ListItemIcon>
                        <Info/>
                    </ListItemIcon>
                    <ListItemText primary="Info" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <Apps/>
                    </ListItemIcon>
                    <ListItemText primary="Apps" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <Bookmark/>
                    </ListItemIcon>
                    <ListItemText primary="Bookmark" />
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem button>
                    <ListItemIcon>
                        <ContactMail/>
                    </ListItemIcon>
                    <ListItemText primary="ContactMail" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <Save/>
                    </ListItemIcon>
                    <ListItemText primary="Save" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <Mail/>
                    </ListItemIcon>
                    <ListItemText primary="Mail" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <Schedule/>
                    </ListItemIcon>
                    <ListItemText primary="Schedule" />
                </ListItem>
                <ListItem button>
                        <ListItemIcon>
                            <Inbox/>
                        </ListItemIcon>
                        <ListItemText primary="Details" />
                </ListItem>
            </List>
        </div>
    );
}

MenuBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuBar);