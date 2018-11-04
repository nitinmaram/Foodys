import React from 'react';
import {Container,Button, Divider, Dropdown, Input} from 'semantic-ui-react'
import zomatoCalls from '../../interactors/services/zomatoCalls.js'

class searchTab extends React.Component {
    constructor(props) {
      console.log(props);
        super(props);
        this.state = {
            cusine: "",
            rcity: "",
            dropOptions: [{key: '', value: '', text: ''}],
            cityValue: props.city,
            cityId: 0
        }
    }
    componentWillReceiveProps(newProps){
      this.setState({
        cityValue: newProps.city
      })
    }
    changecity(e)
    {
        this.setState({rcity: e.target.value});
        this.searchRestaurants()
    }
    changecusine(e)
    {
        this.setState({cusine: e.target.value});
        this.searchRestaurants()
    }
    searchRestaurants() {
        this.props.getResturantFromQueryProp(this.state.rcity, this.state.cusine);
    }
    searchChange(e, {searchQuery, value })
    {
            var stateData = {
              'query': searchQuery
            }
            var successFunction = function(data) {
              this.setState((prevState) => {
                prevState.dropOptions = []
                data.location_suggestions.length > 0 ? data.location_suggestions.forEach((item)=>{
                  console.log(item.id,"item");
                  prevState.dropOptions.push({'key':item.id, 'value': item.name, 'text': item.name})
                }): null
                return({
                  'dropOptions': prevState.dropOptions
                })
              })
            }.bind(this)
            var errorFunction = function(err) {
                console.log('error occurred on AJAX');
                console.log(err);
            }.bind(this)
        zomatoCalls.getCitiesByQuery(stateData, successFunction, errorFunction)

    }
    dropChange(e,{value}){
      this.setState({
        cityValue: value
      })

      var stateData = {
        'query': value
      }
      var successFunction = function(data) {
        let cityId = data.location_suggestions[0].id;
        this.props.getResturantByDropLocProp.call(this,cityId)
      }.bind(this)
      var errorFunction = function(err) {
          console.log('error occurred on AJAX');
          console.log(err);
      }.bind(this)
      zomatoCalls.getCitiesByQuery(stateData, successFunction, errorFunction)

    }
    render() {
        return (
            <Container textAlign="center">
                <h3>You Are in &nbsp;&nbsp;&nbsp;
                <Dropdown placeholder='Select Country' search scrolling
                 selection options={this.state.dropOptions}
                 text = {this.state.cityValue} onChange = {this.dropChange.bind(this)}
                 onSearchChange = {this.searchChange.bind(this)} value = {this.state.cityValue}/></h3>
                <Input focus placeholder='Search Place' ref="rcity"
                onChange={this.changecity.bind(this)}/>
                <Input focus placeholder='Search Cusines...' ref="cusine"
                onChange={this.changecusine.bind(this)}/>
                <Button primary onClick={this.props.getCurrentCoordinates.bind(this)}>Near By Restaurants</Button>
                <Divider/>
            </Container>
        );
    }
}
// export default searchTab;
searchTab.propTypes = {
 handle: React.PropTypes.func,
 name: React.PropTypes.object
}
export default searchTab;
