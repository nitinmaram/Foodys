import React from 'react';
import ReactDOM from 'react-dom';

class Child2Component extends React.Component {
	constructor () {
		super();
	}

	render () {
		return (
			<div>
				<h1>Hello From React Child2, {this.props.name}</h1>

			</div>
		);
	}
}
export default Child2Component;
