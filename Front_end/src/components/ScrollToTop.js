import React from 'react';
import Button from '@material-ui/core/Button';
import ArrowUpward from '@material-ui/icons/ArrowUpward';

export default class ScrollToTop extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            visibility : "invisible"
        }
    }
    handleScroll = () => {
        if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 500) {
            this.setState({
                visibility : "visible"
            })
        } else {
            this.setState({
                visibility : "invisible"
            })
        }
    };
    handleClick = () => {
        window.scrollTo(0, 0);
    };
    componentDidMount(){
        window.addEventListener('scroll', this.handleScroll);
    }
    render(){
        return(
            <Button variant="fab" onClick = {e => this.handleClick()} color="secondary" aria-label="Add" className={this.state.visibility}>
                <ArrowUpward style={{ fontSize: 30 }}/>
            </Button>
        )
    }
}