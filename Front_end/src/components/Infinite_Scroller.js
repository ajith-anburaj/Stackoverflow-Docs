import React from 'react'
import InfiniteScroll from 'react-infinite-scroller';
import Loader from '../../node_modules/react-loading';
import Grid from '@material-ui/core/Grid';

export default class Infinite_Scroller extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            items : [],
            hasMoreItems : true,
            items_rendered : 0,
        }
    }
    loadItems(){
        let {items, items_rendered} = this.state;
        debugger;
        if(items_rendered < this.props.data.length){
            items = items.concat(this.props.data.slice(items_rendered,items_rendered+this.props.items_to_render));
            items_rendered +=  this.props.items_to_render;
            this.setState({
                items : items,
                items_rendered : items_rendered
            })
        }
        else {
            this.setState({
                hasMoreItems : false
            })
        }
    }
    render(){
        debugger;
        return(
            <InfiniteScroll
                pageStart={0}
                loadMore={this.loadItems.bind(this)}
                hasMore={this.state.hasMoreItems}
                loader={<Loader type="bubbles" color="blue"/>}>
                <Grid container spacing={24}>
                    {this.state.items}
                </Grid>
            </InfiniteScroll>
        )
    }
}