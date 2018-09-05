import React from 'react'
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search'

export default class Search extends React.Component{
    handleOnChange(e){
        if(e.target.value.length > 2){
            const docs = this.props.data.filter(data => {
                return data.Title.toLowerCase().search(e.target.value) > -1
            } );
            this.props.result_render(docs);
        }
        else{
            this.props.result_render(this.props.data);
        }
    }
    render(){
        return(
            <div>
                <TextField
                    onChange={this.handleOnChange.bind(this)}
                    id="search_text"
                    className="search_text"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon/>
                            </InputAdornment>
                        ),
                    }}
                />
            </div>
        )
    }
}