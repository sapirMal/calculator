import React, {Component} from 'react';

class Button extends Component {

    render() {
        const symbol = this.props.symbol;
        return (

            <button
                className={this.props.className}
                onClick={() => this.props.action(symbol)}
                onKeyPress={(e) => this.props.keyPress(e)}>{symbol}</button>

        )

    }
}

export default Button;