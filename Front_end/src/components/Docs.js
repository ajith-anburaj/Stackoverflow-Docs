import React, {Fragment} from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Header from './Header'
import { Link } from 'react-router-dom';
import { DotLoader } from 'react-spinners';
import Infinite_Scroller from './Infinite_Scroller'
import ScrollToTop from './ScrollToTop'
import conf from '../conf/conf'

const styles = {
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        marginBottom: 16,
        fontSize: 14,
        wordWrap : "break-word"
    },
    pos: {
        marginBottom: 12,
    },
};

class Docs extends React.PureComponent{
    constructor(props){
        super(props);
        this.state = {
            docs : null
        }
    }
    componentDidMount(){
        axios.get(conf.server + 'stack-overflow/docs/')
            .then(response =>
                this.setState({
                    docs : response.data.response,
                    orig_docs : response.data.response
                })
            )
            .catch(e =>
                console.log(e)
            )
    }
    search_render(docs){
        this.setState({
            docs : docs
        })
    }
    render(){
        const { classes } = this.props;
        const docs = (this.state.docs !== null)?
                        this.state.docs.map((doc,index) =>
                            <Grid item md={2} key={index}>
                                <Card>
                                    <CardContent>
                                        <Typography className={classes.title} variant="headline" component="h5">
                                            {doc.Title}
                                        </Typography>
                                        <Typography component="p">
                                            Total topics: {doc.TopicCount}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Link to={{pathname : "/topics/"+doc.Id, state : doc.Title }}>
                                            <Button size="small" style={{zIndex:"0"}}>View</Button>
                                        </Link>
                                    </CardActions>
                                </Card>
                            </Grid>)
                        :
                        null;
        return(
            <Header search_data = {this.state.orig_docs?this.state.orig_docs:null} result_render = {this.search_render.bind(this)}>
                <ScrollToTop/>
                <div>
                    {
                    (this.state.docs != null)?
                        <Infinite_Scroller
                            data = {docs}
                            items_to_render = {30}
                        />
                        :
                        null
                    }
                    {
                        (this.state.docs)?
                            null
                            :
                            <div style={{textAlign:"-webkit-center",marginTop:"40px "}}>
                                <DotLoader color={'#123abc'} loading={true}/>
                            </div>
                    }
                </div>
            </Header>
        )
    }
}

Docs.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Docs);