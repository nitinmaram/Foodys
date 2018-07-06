import React from 'react';
// import ReactDOM from 'react-dom';

class GrandChildComponent extends React.Component {
	constructor () {
		super();
	}

	render () {
		return (
			<div>
				<h1>Hello From React GrandChild,{this.props.name}</h1>

			</div>
		);
	}
}
GrandChildComponent.propTypes = {
 name: React.PropTypes.object
};
export default GrandChildComponent;
