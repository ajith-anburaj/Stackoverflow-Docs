import React from 'react';
import Header from './Header'
import axios from 'axios'
import Swiper from 'react-id-swiper';
import {Grid} from '@material-ui/core'
import {DotLoader} from 'react-spinners'
import styles from './Layout.css'
import conf from '../conf/conf'

export default class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data : null
        }
    }
    componentDidMount(){
        axios.get(conf.server + 'stack-overflow/home/')
            .then(response => {
                this.setState({
                    data : response.data.response
                });
            })
            .catch(e => {
                console.log(e)
            })
    }
    render(){
        const params = {
            initialSlide : (this.state.data != null)?Math.round(this.state.data.length/2):0,
            pagination: {
                el: '.swiper-pagination',
                clickable: true
            }
        };
        let poster_images = null;
        if(this.state.data){
            poster_images = this.state.data.map(data =>
                                <div>
                                    <img src={data.poster_image} className={styles.img_responsive}/>
                                </div>
                            )
        }
        return(
            <Header>
                <Grid container>
                    <Grid item md={9} className="swiper">
                        {
                            (this.state.data)?
                                <Swiper {...params}>
                                    {poster_images}
                                </Swiper>
                                :
                                <div style={{textAlign:"-webkit-center",marginTop:"40px"}}>
                                    <DotLoader color={'#123abc'} loading={true}/>
                                </div>
                        }
                        {
                            (this.state.data)?
                                this.state.data.map(data =>
                                    <Grid container>
                                        <Grid item md={4} style={{padding:"8px 8px 4px 0px"}}>
                                            <img src={data.image} className={styles.img_responsive}/>
                                        </Grid>
                                        <Grid item md={8} style={{padding:"8px 8px 4px 4px"}}>
                                            <p style={{fontSize:"16px",fontWeight:"bold"}}>{data.content.head}</p>
                                            <p style={{textAlign:"justify"}}>{data.content.content.split('...')[0]}...</p>
                                            <p style={{textAlign:"justify",float:"right",color:"gray"}}>{data.content.content.split('...')[1]}</p>
                                        </Grid>
                                    </Grid>
                                )
                                :
                                null
                        }
                    </Grid>
                    <Grid item md={3} style={{paddingLeft:"12px"}}>
                        <p>Side data</p>
                    </Grid>
                </Grid>
            </Header>
        )
    }
}
