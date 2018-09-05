import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {Paper, Button, Typography} from '@material-ui/core'
import {ThumbUp} from '@material-ui/icons'
import {DotLoader} from 'react-spinners'
import ReactHtml from 'react-render-html'
import Header from './Header'
import style from './Layout.css'
import ScrollToTop from './ScrollToTop'
import conf from '../conf/conf'

const styles = theme => ({
    root: theme.mixins.gutters({
        paddingTop: 16,
        paddingBottom: 16,
        marginTop: theme.spacing.unit * 3,
    }),
});


class Examples extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            examples : null,
            topic_id : this.props.match.params.topic_id,
            topic : this.props.location.state,
        }
    }
    componentDidMount(){
        axios.get(conf.server + 'stack-overflow/examples/'+this.state.topic_id+'/')
            .then(response => {
                this.setState({
                    examples : response.data.response
                })
            })
            .catch(e => {
                console.log(e);
            })
    }
    render(){
        const { classes } = this.props;
        return(
            <Header>
                <ScrollToTop/>
                <div style={{marginTop:"-16px"}}>
                    <Typography variant="headline" style={{margin:"16px 2px 0 0",display:"inline-block",paddingTop:"8px"}} gutterBottom>
                        {this.state.topic}
                    </Typography>
                    <Button variant="contained" color="primary" style={{marginTop:"16px", float:"right", display:"inline-block"}} className={classes.button}
                            onClick={this.props.history.goBack}>
                        Back
                    </Button>
                    {
                        (this.state.examples)?
                            this.state.examples.map(example =>
                                <Paper className={classes.root} elevation={4}>
                                    <Typography variant="title" gutterBottom style={{display:"inline-block",marginBottom:"16px"}}>
                                        {example.Title}
                                    </Typography>
                                    <Typography variant="subheading" gutterBottom style={{display:"inline-block", float:"right", marginBottom:"16px",color:"cornflowerblue"}}>
                                        <ThumbUp style={{marginRight:"4px", verticalAlign:"sub"}}/> {example.Score}
                                    </Typography>
                                    <Typography variant="subheading" style={{textAlign:"justify"}} gutterBottom className={style.topics_image}>
                                        {ReactHtml(example.BodyHtml)}
                                    </Typography>
                                </Paper>
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

Examples.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Examples);
