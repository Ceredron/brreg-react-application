import React, { Component } from 'react';
import SearchBar from './SearchBar'
import RegistryList from './RegistryList';
import Paginator from './Paginator';
var request = require('request');

class MainScreen extends Component {

    constructor(props){
        super();
        this.props = props;

        this.state = {
            companyList: [], // Initializes it as an empty list in order to be able to use .map on it in render()
            prev: null, // For paginator
            next: null, // For paginator
        }

        this.incrementalSearch = this.incrementalSearch.bind(this); // Binds it to use it in onChange of search input
        this.switchPage = this.switchPage.bind(this);
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
                var prevLink = null;
                var nextLink = null;
                data.links.forEach(element => {
                    if(element.rel === 'prev')
                        prevLink = element.href;
                    else if(element.rel === 'next')
                        nextLink = element.href;
                });
                
                this.setState({
                    companyList: data.data == null?[]:data.data, // Question mark conditional used in case search returns no results
                    prev: prevLink,
                    next: nextLink
                }); 
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
                this.setState({
                    companyList: [data],
                    prev: null, // Organization number is unique so it returns one or zero results, therefore no paginators
                    next: null
                });
            }
        });
    }

    switchPage(toNext){
        request.get({
            url: toNext?this.state.next:this.state.prev, // If toNext is set to true, go to next page, else go to previous page
            json: true,
            headers: {'User-Agent': 'request'}
        }, 
        (err, res, data) => {
            if (err) {
                console.log('Error:', err);
            } else if (res.statusCode !== 200) { // Then not successful
               console.log('Status:', res.statusCode);
            } else { // If successful, update state accordingly
                var prevLink = null;
                var nextLink = null;
                data.links.forEach(element => {
                    if(element.rel === 'prev')
                        prevLink = element.href;
                    else if(element.rel === 'next')
                        nextLink = element.href;
                });

                this.setState({
                    companyList: data.data == null?[]:data.data, // Question mark conditional used in case search returns no results
                    prev: prevLink,
                    next: nextLink
                }); 
            }
        });
    }

    render() {
        return (
        <div>
            <SearchBar onChange={this.incrementalSearch}/>
            <RegistryList companyList={this.state.companyList}/>
            <Paginator next={this.state.next} prev={this.state.prev} switchPage={this.switchPage}/>
        </div>
        );
    }
}

export default MainScreen;
