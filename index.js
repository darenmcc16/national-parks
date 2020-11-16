'use strict';

const apiKey = "wGy7qdLADk4Z7HNE0l4NqQvfvFc9CGLvFBTObnUc";
const searchURL = "https://developer.nps.gov/api/v1/parks";

function formatQueryParams (params){
    const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
    return queryItems.join('&');
}

function displayResults(responseJson){
    console.log(responseJson);
    $('#results-list').empty();

    for(let i=0; i < responseJson.data.length; i++){
        $('#results-list').append(`
        <li>
        <h3>${responseJson.data.fullname[i]}</h3>
        <p>${responseJson.data.description}</p>
        <a href="${responseJson.data.url}>${responseJson.data.fullname} + " " + Website</a>`)
    }
    $('#results').removeClass('hidden');
}

function getNationalParks (query, maxResults=10){
    const params = {
        key: apiKey,
        q: query,
    }
    const queryString = formatQueryParams(params);
    const url = searchURL + "?" + queryItems;

    console.log(url);

    fetch(url)
    .then(response =>{
        if(response.ok){
            return response.json();
        }
        throw new Error(response.statusText)
    })
    .then(responseJson  => displayResults(responseJson))
    .catch(err=>{
        $('#js-error-message').text(`Something went wrong: ${error.message}`)
    });
}

function watchForm(){
    $('form').submit(event =>{
        event.preventDefault();
        const searchTerm = ('#js-search-term').val();
        const maxResults = ('#js-max-results').val();
        getNationalParks(searchTerm, maxResults);
    })
}

$(watchForm);