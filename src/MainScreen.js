import React, { Component } from 'react';
import styles from './index.css';
var request = require('request');
/**
 * To implement
 *  Paginator
 *  CSS Styling
 */

class MainScreen extends Component {

    constructor(props){
        super();
        this.props = props;

        this.state = {
            companyList: [] // Initializes it as an empty list in order to be able to use .map on it in render()
        }

        this.incrementalSearch = this.incrementalSearch.bind(this); // Binds it to use it in onChange of search input
    }

    incrementalSearch(event){
        if(event.target.value.length < 3){
            return;
        }
        // Check for organization number by regex matching true for nine-digit number
        else if(event.target.value.match(/^\d{9}$/)){
            // If true search by organization number
            this.searchNumber(event.target.value);
        } else{
            // If not search by name
            this.searchName(event.target.value);
        }
    }

    searchName(searchString){
        request.get({
            url: 'http://data.brreg.no/enhetsregisteret/enhet.json?page=0&size=10&$filter=startswith(navn,\'' + searchString + '\')',
            json: true
        }, 
        (err, res, data) => {
            if (err) {
                console.log('Error:', err);
            } else if (res.statusCode !== 200) {
                console.log('Status:', res.statusCode);
            } else { // If successful, update state accordingly
                this.setState({companyList: data.data == null?[]:data.data}); // Question mark conditional used in case search returns no results
            }
        });
    }

    searchNumber(searchString){
        request.get({
            url: 'http://data.brreg.no/enhetsregisteret/enhet/' + searchString + '.json',
            json: true,
            headers: {'User-Agent': 'request'}
        }, 
        (err, res, data) => {
            if (err) {
                console.log('Error:', err);
            } else if (res.statusCode !== 200) { // Then not successful
               console.log('Status:', res.statusCode);
            } else { // If successful, update state accordingly
                this.setState({companyList: [data]});
            }
        });
    }

    render() {
        return (
        <div>
            <h1>Skriv inn navn eller organisasjonsnummer</h1>
            <input type='text' onChange={this.incrementalSearch}/>
            {this.state.companyList.map(element => 
            <details>
                <summary>{element.navn}</summary>  
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

export default MainScreen;
