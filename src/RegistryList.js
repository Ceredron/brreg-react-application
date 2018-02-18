import React, { Component } from 'react';

class RegistryList extends Component {

    constructor(props){
        super();
        this.props = props;
    }

    render(){
        return (
            <div>
                {this.props.companyList.map(element => 
                <details className='companyListing'>
                    <summary class='listingHeader'>{element.navn}</summary>  
                    <ul>              
                        {element.organisasjonsnummer !== undefined && <li>Organisasjonsnummer: {element.organisasjonsnummer} </li>}
                        {element.organisasjonsform !== undefined && <li>Organisasjonsform: {element.organisasjonsform} </li>} 
                        {element.stiftelsesdato !== undefined && <li>Stiftelsesdato: {element.stiftelsesdato} </li>}
                        {element.konkurs !== undefined && <li>Konkurs?: {element.konkurs} </li>}
                        {element.kontaktinformasjon && element.kontaktinformasjon.telefonnummer !== undefined && <li>Telefonnummer: {element.kontaktinformasjon.telefonnummer} </li>}
                        {element.kontaktinformasjon && element.kontaktinformasjon.hjemmeside !== undefined && <li>Hjemmeside: {element.kontaktinformasjon.hjemmeside} </li>}
                    </ul>
                </details>)}
            </div>
        );
    }
    
}

export default RegistryList;
