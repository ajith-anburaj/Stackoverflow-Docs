import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

class SimpleMenu extends React.Component {
    state = {
        anchorEl: null,
    };

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    render() {
        const { anchorEl } = this.state;
        return (
            <div style={this.props.style}>
                <Button
                    aria-owns={anchorEl ? 'simple-menu' : null}
                    aria-haspopup="true"
                    onClick={this.handleClick}
                    variant="contained"
                    color="primary"
                >
                    Sort
                </Button>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                >
                    <MenuItem onClick={e => {this.props.function(e.target.textContent);this.handleClose()}}>Votes</MenuItem>
                    <MenuItem onClick={e => {this.props.function(e.target.textContent);this.handleClose()}}>Views</MenuItem>
                    <MenuItem onClick={e => {this.props.function(e.target.textContent);this.handleClose()}}>Examples</MenuItem>
                </Menu>
            </div>
        );
    }
}

export default SimpleMenu;