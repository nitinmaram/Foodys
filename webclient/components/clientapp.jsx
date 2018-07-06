import React from 'react';
import ReactDOM from 'react-dom';
import Child1Component from './restaurant/';

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
        this.f1();
      }
      f1() {
        navigator.geolocation.getCurrentPosition(this.success.bind(this),this.options.bind(this));
      }
      success (p){
        console.log(p.coords);
  this.getResturantByLoc(p.coords.latitude,p.coords.longitude);
  }
  options(){
           enableHighAccuracy: true
  }
    render()
    {
        return (
            <div >
                <Child1Component.Child1 handle={this.getResturantFromQuery.bind(this)} f1={this.f1.bind(this)}/>
                <Child1Component.Child2 name={this.state.jsonarray} lat={this.state.lat} lon={this.state.lon}/>
            </div>
        );
    }
    getResturantFromQuery(rcity,cusine)
    {
        $.ajax({
            url: "https://developers.zomato.com/api/v2.1/search?q="+rcity+"&cuisines="+cusine,
            type: 'GET',
            beforeSend: function(request) {
                request.setRequestHeader("user-key", "e7d66af9fb8c94906a2e8ed0f4c3c203");
            },
            success: function(data) {
              this.setState({jsonarray: data.restaurants});
            }.bind(this),
            error: function(err) {
                console.log('error occurred on AJAX');
                console.log(err);
            }.bind(this)
        });

    }
    getResturantByLoc(lat,lon)
    {
      this.setState({
        lat: lat,
        lon: lon
      });
        $.ajax({

            url: "https://developers.zomato.com/api/v2.1/search?lat="+lat+"&lon="+lon+"&sort=real_distance",
            type: 'GET',
            beforeSend: function(request) {
                request.setRequestHeader("user-key", "e7d66af9fb8c94906a2e8ed0f4c3c203");
            },
            success: function(data) {
              this.setState({jsonarray: data.restaurants});
            }.bind(this),
            error: function(err) {
                console.log('error occurred on AJAX');
                console.log(err);
            }.bind(this)
        });

    }
//     getResturantDataFromZomato(rid, cusine)
//     {
//         console.log(rid);
//         console.log(cusine);
//         $.ajax({
//
//             url: "https://developers.zomato.com/api/v2.1/search?entity_id=" + rid + "&entity_type=city&q=" + cusine + "&count=10",
//             type: 'GET',
//             beforeSend: function(request) {
//                 request.setRequestHeader("user-key", "e7d66af9fb8c94906a2e8ed0f4c3c203");
//             },
//             success: function(data) {
//                 console.log('Successfully got JSON from Zomato' + data);
//                 this.setState({jsonarray: data.restaurants});
//             }.bind(this),
//             error: function(err) {
//                 console.log('error occurred on AJAX');
//                 console.log(err);
//             }.bind(this)
//         });
//
//     }
}

// ReactDOM.render(
//     <MainComponent/>, document.getElementById('mountapp'));

module.exports = MainComponent;
