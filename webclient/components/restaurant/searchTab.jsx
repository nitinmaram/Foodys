import React from 'react';
import {Button} from 'semantic-ui-react'
import {Container} from 'semantic-ui-react'
import {Input} from 'semantic-ui-react'
import {Divider} from 'semantic-ui-react'

class searchTab extends React.Component {
    constructor() {
        super();
        this.state = {
            cusine: "",
            rcity: ""
        }
    }
    changecity(e)
    {
        this.setState({rcity: e.target.value});
    }
    changecusine(e)
    {
        this.setState({cusine: e.target.value});
    }
    searchRestaurants() {
        this.props.getResturantFromQueryProp(this.state.rcity, this.state.cusine);
    }
    render() {
        return (
            <Container textAlign="center">
                <Input focus placeholder='Search Place' ref="rcity"
                onChange={this.changecity.bind(this)}/>
                <Input focus placeholder='Search Cusines...' ref="cusine"
                onChange={this.changecusine.bind(this)}/>
                <Button primary onClick={this.searchRestaurants.bind(this)}>Search</Button>
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
