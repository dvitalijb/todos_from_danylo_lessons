import React, {Component} from 'react';
import TodoItem from './TodoItem';
import './Todo.css';
import MarkAll from "./MarkAll";
import InfoPanel from "./InfoPanel";

class Todo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            input: '',
            nextId: 1,
            items: [
            ],
            display: 'all'
        };

        this.newItemChanged = this.newItemChanged.bind(this);
        this.newItemKeyDown = this.newItemKeyDown.bind(this);
        this.statusChanged = this.statusChanged.bind(this);
        this.itemRemoved = this.itemRemoved.bind(this);
        this.markAllChanged = this.markAllChanged.bind(this);
        this.displayChanged = this.displayChanged.bind(this);
        this.removeClicked = this.removeClicked.bind(this);
    }

    newItemChanged(event) {
        this.setState({
            input: event.target.value
        });
    }

    newItemKeyDown(event) {
        if (event.key === 'Enter' && this.state.input.trim() !== '') {
            this.setState((state) => {
                const newItem = {
                    title: state.input,
                    id: state.nextId,
                    completed: false
                };

                const newItems = [...state.items, newItem];

                return {
                    items: newItems,
                    nextId: state.nextId + 1,
                    input: ''
                };
            });
        }
    }

    statusChanged(itemId, completed) {
        this.setState((state) => {
            const newItems = state.items.map(item => {
                if (item.id === itemId) {
                    return {
                        title: item.title,
                        id: item.id,
                        completed: completed
                    };
                } else {
                    return item;
                }
            });
            return {
                items: newItems
            };
        });
    }

    itemRemoved(itemId) {
        this.setState(state => {
            return {
                items: state.items.filter(item => item.id !== itemId)
            };
        });
    }

    markAllChanged(checked) {
        this.setState(state => {
            return {
                items: state.items.map(item => {
                    return {
                        title: item.title,
                        id: item.id,
                        completed: checked
                    };
                })
            };
        });
    }

    displayChanged(displayType) {
        this.setState({
            display: displayType
        });
    }

    removeClicked() {
        this.setState(state => {
            return {
                items: state.items.filter(item => !item.completed)
            };
        });
    }

    render() {
        return (
            <section className="todo">
                <input className="new-item" type="text" value={this.state.input}
                       onChange={this.newItemChanged} onKeyDown={this.newItemKeyDown} />
                <MarkAll checked={this.state.items.every(item => item.completed)}
                         changed={this.markAllChanged}/>
                <section className="items">
                    {this.state.items.filter(item =>
                        this.state.display === 'all'
                        || this.state.display === 'completed' && item.completed
                        || this.state.display === 'active' && !item.completed)
                        .map(item =>
                        <TodoItem key={item.id} item={item}
                                  statusChanged={this.statusChanged} itemRemoved={this.itemRemoved}
                        />
                    )}
                </section>
                <InfoPanel
                    left={this.state.items.filter(item => !item.completed).length}
                    completed={this.state.items.some(item => item.completed)}
                    display={this.state.display} displayChanged={this.displayChanged}
                    removeClicked={this.removeClicked}
                />
            </section>
        );
    }
}

export default Todo;