 import React from 'react';
// import ReactDOM from 'react-dom';
import {Button} from 'semantic-ui-react';
import {Grid} from 'semantic-ui-react';
// import {Container, Header} from 'semantic-ui-react'
// import {Input} from 'semantic-ui-react'
// import {Divider} from 'semantic-ui-react'
// import {Card} from 'semantic-ui-react'
var geolib = require('geolib');
import Cards from './child3.jsx'

class DisplayComponent extends React.Component {
    constructor() {
        super();

      }
      render()
      {
        let lat=this.props.lat
        let lon=this.props.lon
        let jsarray=this.props.name.map(function(objs){
          var loc = {latitude: objs.restaurant.location.latitude, longitude: objs.restaurant.location.longitude}
          return (
            // <Grid.Column>
            <Cards className="card"
            id={objs.restaurant.R.res_id}
            name={objs.restaurant.name}
            image={objs.restaurant.featured_image}
            location={objs.restaurant.location.address}
            cuisines={objs.restaurant.cuisines}
            ratings={objs.restaurant.user_rating.aggregate_rating}
            comment=""
            distance={geolib.getDistance({latitude: lat,longitude: lon},loc)}
            lat={lat}
            lon={lon}
            lat1={loc.latitude}
            lon1={loc.longitude}
            />
          // {/* </Grid.Column> */}
          );
        });
        return(
          <div>
            <Grid centered columns={5}>
            {jsarray}
          </Grid>
        </div>
        );
      }
}
DisplayComponent.propTypes = {
 name: React.PropTypes.object
}
module.exports=DisplayComponent;
