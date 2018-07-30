import React from 'react';
import ReactDOM from 'react-dom';
import Restaurant from './restaurant/';
import zomatoCalls from '../interactors/services/zomatoCalls.js'
var NavBar = require('./navbar/NavBar.jsx');

class MainComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            jsonarray: [],
            lat: 0,
            lon: 0
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

      getResturantFromQuery(rcity,cusine)
      {
              var stateData = {
                'rcity': rcity,
                'cuisine': cuisine
              }
              var successFunction = function(data) {
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
                this.setState({jsonarray: data.restaurants});
              }.bind(this)
              var errorFunction = function(err) {
                  console.log('error occurred on AJAX');
                  console.log(err);
              }.bind(this)
              zomatoCalls.getResturantByLoc(stateData, successFunction, errorFunction)
      }

    render()
    {
        return (
            <div>
                <NavBar activeItem = 'home'/>
                <br/>
                <Restaurant.searchTab getResturantFromQueryProp={this.getResturantFromQuery.bind(this)} getCurrentCoordinates={this.getCurrentCoordinates.bind(this)}/>
                <Restaurant.cardMap restaurantsArrProp={this.state.jsonarray} lat={this.state.lat} lon={this.state.lon}/>
            </div>

        );
    }

}
module.exports = MainComponent;
