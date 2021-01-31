import React, {Component} from 'react';

import Button from './Button/Button';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      current: '0',
      prev: [],
      lastOperation: null,
      lastNum: 0,
    }
  }

  resetHandler = () => {
    this.setState({result: 0});
  }

  eval2nums = (prev) => {
    const second = +prev.pop();
    const operation = prev.pop();
    const first = +prev.pop();

    console.log(first, operation, second);

    switch (operation) {
      case '+':
        return first + second;

      case '-':
        return first - second;
      case '*':
        return first * second;
      case '/':
        return first / second;

    }
  }

  evalHandler = (symbol) => {
    console.log(symbol);
    console.log(this.state.prev);
    let prev = [...this.state.prev];


    if (prev.length > 2) {
      const res = this.eval2nums(prev);
      prev.push(res);
      if (symbol !== '=') {
        prev.push(symbol);
      }

      this.setState({prev: prev, current: res});
    }
    else {
      switch (symbol) {
        case '+':
        case '-':
        case '*':
        case '/':
          prev.push(this.state.current);
          if (prev.length > 2) {
            const res = this.eval2nums(prev);
            prev.push(res);
          }
          prev.push(symbol);
          this.setState((prevState) => {
            return {
              current: '0',
              prev: prev,
              lastOperation: symbol,
              lastNum: prevState.current
            }
          });

          break;

        case '=':
          if (prev.length == 2) {
            prev.push(this.state.current);
            console.log('= lastnum:' ,this.state.lastNum);
            const res = this.eval2nums(prev);
            this.setState((prevState) => {
              return {
                current: res,
                // lastNum: prevState.current
              }
            });
          }
          else if (this.state.lastOperation) {
            prev.push(this.state.lastNum);
            prev.push(this.state.lastOperation);
            this.setState({prev: prev});
            // this.eval('=');
          }
          break;
        default:
          this.setState((prevState) => {
            return {current: prevState.current + symbol}
          });
          return;

      }
    }

  }



  render() {
    const reset = <Button key='C' symbol='C' action={this.resetHandler} />;
    const symbols = [7, 8, 9, '/', 4, 5, 6, '-', 1, 2, 3, '+', 0, '.', '='].map((symbol) => '' + symbol);
    const buttons = [reset].concat(symbols.map(sym => <Button key={sym} symbol={sym} action={this.evalHandler} />))

    return (
      <div>
        {/* <input type='text' value={this.state.current} onChange={this.changeHandler} /> */}
        {this.state.current}
        {buttons}
      </div>
    );
  }
}

export default App;