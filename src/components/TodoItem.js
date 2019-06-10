import React, {Component} from 'react';
import './TodoItem.css';

class TodoItem extends Component {
    constructor(props) {
        super(props);
        this.completedChanged = this.completedChanged.bind(this);
        this.removeClicked = this.removeClicked.bind(this);
    }

    completedChanged(event) {
        this.props.statusChanged(this.props.item.id, event.target.checked);
    }

    removeClicked(event) {
        this.props.itemRemoved(this.props.item.id);
        event.preventDefault();
    }

    render() {
        return (
            <p className="item">
                <label>
                    <input type="checkbox" checked={this.props.item.completed} onChange={this.completedChanged} />
                    <span className={this.props.item.completed ? 'completed' : 'active'}>{this.props.item.title}</span>
                    <a href="#" className="remove" onClick={this.removeClicked}>&times;</a>
                </label>
            </p>
        );
    }
}

export default TodoItem;