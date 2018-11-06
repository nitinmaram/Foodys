 import React from 'react';
import {Grid} from 'semantic-ui-react';
var geolib = require('geolib');
import Cards from './restaurantCard.jsx'

class DisplayComponent extends React.Component {
    constructor(props) {
        super(props);
      }
      render()
      {
        let lat=this.props.lat
        let lon=this.props.lon
        let jsarray=this.props.restaurantsArrProp.map(function(objs){
          var loc = {latitude: objs.restaurant.location.latitude, longitude: objs.restaurant.location.longitude}
          return (
            // <Grid.Column>
            <Cards className="card"
            id={objs.restaurant.R.res_id}
            name={objs.restaurant.name}
            image={objs.restaurant.featured_image}
            location={objs.restaurant.location.address}
            cost = {objs.restaurant.average_cost_for_two}
            cuisines={objs.restaurant.cuisines}
            ratings={objs.restaurant.user_rating.aggregate_rating}
            votes = {objs.restaurant.user_rating.votes}
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
