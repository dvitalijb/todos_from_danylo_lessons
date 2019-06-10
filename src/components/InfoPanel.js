import React, {Component} from 'react';
import './InfoPanel.css';

class InfoPanel extends Component {
    render() {
        return (
            <section className="info-panel">
                <span className="items-left">{this.props.left} items left</span>
                <span className="display">
                    {['all', 'active', 'completed'].map(item =>
                        <span className={this.props.display === item ? 'selected' : ''}
                            onClick={() => this.props.displayChanged(item)}>{item}</span>
                    )}
                </span>
                {
                    this.props.completed ? <a href="#" onClick={(event) => {
                        this.props.removeClicked();
                        event.preventDefault();
                    }}>Clear completed</a> : null
                }
            </section>
        );
    }
}

export default InfoPanel;