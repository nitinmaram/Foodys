import React from 'react';
import ReactDOM from 'react-dom';
import GrandChild from './GrandChild.jsx';
class Child1Component extends React.Component {
	constructor () {
		super();
	}

	render () {
		return (
			<div>
				<br></br>
				<button onClick={this.props.handle}>Change Child</button>
				<h1>Hello From React Child1, {this.props.name}</h1>
			</div>
		);
	}
}
// export default Child1Component;
module.exports = {
	Child1Component,
	GrandChild
}
