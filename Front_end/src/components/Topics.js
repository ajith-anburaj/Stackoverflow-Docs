import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {Paper, Typography, Button, T} from '@material-ui/core'
import {DotLoader} from 'react-spinners'
import {RemoveRedEye, ThumbUp } from '@material-ui/icons'
import Header from './Header'
import { Link } from 'react-router-dom'
import Menu from './Menu'
import ScrollToTop from './ScrollToTop'
import conf from '../conf/conf'

const styles = theme => ({
    root: theme.mixins.gutters({
        paddingTop: 16,
        paddingBottom: 16,
        marginTop: theme.spacing.unit * 3,
    }),
});


class Topics extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            topics : null,
            doc_id : this.props.match.params.doc_id,
            document : this.props.location.state,
        }
    }
    componentDidMount(){
        axios.get(conf.server + 'stack-overflow/topics/'+this.state.doc_id+'/')
            .then(response => {
                this.setState({
                    topics : response.data.response
                })
            })
            .catch(e => {
                console.log(e);
            })
    }
    sort(type){
        switch (type){
            case 'Votes' : this.state.topics.sort((a,b) => b.ExampleScore - a.ExampleScore);
                           this.setState({
                               topics : this.state.topics
                           });
                           break;
            case 'Views' : this.state.topics.sort((a,b) => b.ViewCount - a.ViewCount);
                            this.setState({
                                topics : this.state.topics
                            });
                            break;
            case 'Examples' : this.state.topics.sort((a,b) => b.ExampleCount - a.ExampleCount);
                                this.setState({
                                    topics : this.state.topics
                                });
                                break;
        }
    }
    sort_by = (type) => {
        this.sort(type)
    };
    render(){
        const { classes } = this.props;
        return(
            <Header>
                <ScrollToTop/>
                <div style={{marginTop:"-16px"}}>
                    <Typography variant="headline" style={{margin:"16px 2px 0 0",display:"inline-block",paddingTop:"8px"}} gutterBottom>
                        {this.state.document}
                    </Typography>
                    <div style={{marginTop:"16px", float:"right", display:"inline-block"}}>
                        <Menu function = {this.sort_by} style={{display:"inline-block",marginRight:"16px"}}/>
                        <Button variant="contained" color="primary" className={classes.button}
                            onClick={this.props.history.goBack}>
                            Back
                        </Button>
                    </div>
                    {
                        (this.state.topics)?
                            this.state.topics.map(topic =>
                                <Link to={{pathname : "/examples/"+topic.Id, state : topic.Title}}>
                                    <Paper className={classes.root} elevation={4}>
                                        <Typography variant="title" gutterBottom style={{display:"inline-block"}}>
                                            {topic.Title}
                                        </Typography>
                                        <span style={{float:"right"}}><ThumbUp style={{marginRight:"4px",verticalAlign:"sub"}}/> {topic.ExampleScore}</span>
                                        <Typography variant="subheading" gutterBottom style={{margin:"8px 0 16px 0",color:"cornflowerblue"}}>
                                            <span> <RemoveRedEye style={{verticalAlign:"bottom",marginRight:"4px"}}/> {topic.ViewCount}</span>
                                            <span style={{marginLeft:"32px"}}>Examples: {topic.ExampleCount}</span>
                                        </Typography>
                                    </Paper>
                                </Link>
                            )
                            :
                            <div style={{textAlign:"-webkit-center",marginTop:"40px"}}>
                                <DotLoader color={'#123abc'} loading={true}/>
                            </div>
                    }
                </div>
            </Header>
        )
    }
}

Topics.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Topics);
