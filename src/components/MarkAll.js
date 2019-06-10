import React, {Component} from 'react';

class MarkAll extends Component {
    render() {
        return (
            <input type="checkbox" checked={this.props.checked} onChange={event => this.props.changed(event.target.checked)} />
        );
    }
}

export default MarkAll;