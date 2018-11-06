import React from 'react';
import ReactDOM from 'react-dom';
import SearchTab from './restaurant/searchTab.jsx';
import CardMap from './restaurant/cardMap.jsx';
import zomatoCalls from '../interactors/services/zomatoCalls.js'
var NavBar = require('./navbar/NavBar.jsx');

class MainComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            jsonarray: [],
            lat: 0,
            lon: 0,
            city: '',
            cityId: 0
        };
      }
      componentDidMount(){
        this.getCurrentCoordinates();
      }
      success(p){
      this.getResturantByLoc(p.coords.latitude,p.coords.longitude);
      }
      options(){
               enableHighAccuracy: true
      }
      getCurrentCoordinates() {
        navigator.geolocation.getCurrentPosition(this.success.bind(this),this.options.bind(this));
      }

      getResturantFromQuery(rcity,cusine,cityId)
      {
              var stateData = {
                'rcity': rcity,
                'cuisine': cusine,
                'cityId':this.state.cityId,
                'lat': this.state.lat,
                'lon': this.state.lon
              }
              var successFunction = function(data) {
                console.log(data.restaurants[0].restaurant.location,"data");
                this.setState({jsonarray: data.restaurants});
              }.bind(this)
              var errorFunction = function(err) {
                  console.log('error occurred on AJAX');
                  console.log(err);
              }.bind(this)
          zomatoCalls.getResturantFromQuery(stateData, successFunction, errorFunction)

      }
      getResturantByLoc(lat,lon)
      {
        this.setState({
          lat: lat,
          lon: lon
        });
              var stateData = {
                'lat': lat,
                'lon': lon
              }
              var successFunction = function(data) {
                console.log(data,"data");
                this.setState({jsonarray: data.restaurants, city: data.restaurants[1].restaurant.location.city,
                   cityId: data.restaurants[1].restaurant.location.city_id});
              }.bind(this)
              var errorFunction = function(err) {
                  console.log('error occurred on AJAX');
                  console.log(err);
              }.bind(this)
              zomatoCalls.getResturantByLoc(stateData, successFunction, errorFunction)
      }

      getResturantByDropLoc(cityId)
      {
              var stateData = {
                cityId: cityId
              }
              var successFunction = function(data) {
                console.log(data,'data');
                this.setState({jsonarray: data.restaurants, city: data.restaurants[1].restaurant.location.city,
                   cityId: data.restaurants[1].restaurant.location.city_id});
              }.bind(this)
              var errorFunction = function(err) {
                  console.log('error occurred on AJAX');
                  console.log(err);
              }.bind(this)
              zomatoCalls.getResturantByDropLoc(stateData, successFunction, errorFunction)
      }
      sortHandler(value){
        if(value == 'Ratings'){
          this.setState({
          jsonarray: this.state.jsonarray.sort((a,b) => {
              return(
             b.restaurant.user_rating.aggregate_rating - a.restaurant.user_rating.aggregate_rating
           )
         })
        })
        }
        else if(value == 'Distance'){
          this.getCurrentCoordinates();
        }
        else
        {
          this.setState({
          jsonarray: this.state.jsonarray.sort((a,b) => {
              return(
             a.restaurant.average_cost_for_two - b.restaurant.average_cost_for_two
           )
         })
        })
      }
      }

    render()
    {
        return (
            <div>
                <NavBar activeItem = 'home' city = {this.state.city}/>
                <br/>
                <SearchTab city = {this.state.city} getResturantByDropLocProp = {this.getResturantByDropLoc.bind(this)}
                getResturantFromQueryProp={this.getResturantFromQuery.bind(this)}
                getCurrentCoordinates={this.getCurrentCoordinates.bind(this)} sortHandlerProp = {this.sortHandler.bind(this)}/>
                <CardMap restaurantsArrProp={this.state.jsonarray} lat={this.state.lat} lon={this.state.lon}/>
            </div>

        );
    }

}
module.exports = MainComponent;
