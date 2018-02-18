import React, { Component } from 'react';

class Paginator extends Component {

    constructor(props){
        super();
        this.props = props;
    }

    render(){
        return (
            <div className='paginator'>
                {this.props.prev !== null && <button onClick={() => this.props.switchPage(false)} className='paginatorButton'>&larr;</button>}
                {this.props.next !== null && <button onClick={() => this.props.switchPage(true)} className='paginatorButton'>&rarr;</button>}
            </div>
        );
    }
    
}

export default Paginator;
