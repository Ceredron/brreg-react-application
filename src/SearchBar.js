import React, { Component } from 'react';

class SearchBar extends Component {

    constructor(props){
        super();
        this.props = props;
    }

    render(){
        return (
            <div>
                <h1 className='searchInstruction'>Skriv inn navn eller organisasjonsnummer</h1>
                <input className='searchField' type='text' onChange={this.props.onChange}/>
            </div>
        );
    }
    
}

export default SearchBar;
