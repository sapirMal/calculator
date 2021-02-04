import React, {Component} from 'react';
import style from './App.module.css';
import Button from './Button/Button';
const operators = ['+', '-', 'X', '/'];
const numbers = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0].map((symbol) => '' + symbol);
const symbols = operators.concat(numbers.concat(['.', '=']));
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
    this.setState({current: '0', prev: [], decimal: false});
  }

  keyHandler = (event) => {
    console.log(event.key, typeof event.key);
    if (event.key === 'Enter') {
      this.evalHandler('=')
    }
    if (symbols.indexOf(event.key) > -1) {
      this.evalHandler(event.key);
    }

  }


  eval2nums = () => {
    let prev = [...this.state.prev];
    const second = +this.state.current;
    const operation = prev.pop();
    const first = +prev.pop();

    console.log(first, operation, second);

    switch (operation) {
      case '+':
        return first + second;
      case '-':
        return first - second;
      case 'X':
        return first * second;
      case '/':
        return first / second;

    }
  }

  evalHandler = (symbol) => {
    console.log(typeof symbol, symbol);
    // console.log(this.state.prev);

    // symbol is number
    if (numbers.indexOf(symbol) > -1) {
      console.log('number');
      if (this.state.current === '0' || this.state.displayRes) {
        this.setState({current: symbol, displayRes: false});
      } else {
        this.setState(prevState => {
          return {current: prevState.current + symbol}
        })
      }
      return;
    }

    //symbol is decimal
    if (symbol === '.') {
      console.log('decimal');

      if (!this.state.decimal)
        this.setState(prevState => {
          return {
            current: prevState.current + symbol,
            decimal: true
          }
        });
      return;
    }

    // symbol is operation
    if (operators.indexOf(symbol) > -1) {
      console.log('operator');

      if (this.state.prev.length && !this.state.equalMode) {
        // prev.push(this.state.current);
        const res = this.eval2nums();
        this.setState({
          current: res,
          prev: [res, symbol],
          displayRes: true,
          decimal: res % 1 !== 0
        });
      } else {
        this.setState(prevState => {
          return {
            current: '0',
            prev: [prevState.current, symbol],
            equalMode: false,
            decimal: false,
          }
        })
      }

      return;
    }

    // symbol is equal sign
    if (symbol === '=') {
      console.log('symbol is =');
      if (this.state.prev.length) {
        const res = this.eval2nums();
        let prev = [...this.state.prev];

        if (!this.state.equalMode) {
          prev[0] = this.state.current;
        }
        this.setState({
          current: res,
          prev: prev,
          equalMode: true,
          decimal: res % 1 !== 0
        });

      }
    }

  }



  render() {
    const reset = <Button
      className={[style.Button, style.Clear].join(' ')}
      key='C'
      symbol='C'
      action={this.resetHandler} />;

    let buttons = symbols.map(sym => {
      let classStyle = [style.Button];
      if (sym === '=') {
        classStyle.push(style.Equal);
      }
      else if (sym >= '0' && sym <= '9') {
        classStyle.push(style.Number);
      }
      else {
        classStyle.push(style.Operator);
      }

      return (
        <Button
          className={classStyle.join(' ')}
          key={sym}
          symbol={sym}
          action={this.evalHandler}
          keyPress={this.keyHandler} />
      )
    });

    buttons = buttons.concat(reset);

    return (
      <div className={style.App} onKeyPress={(e) => this.keyHandler(e)}>
        {/* <input type='text' value={this.state.current} onChange={this.changeHandler} /> */}
        <div className={style.Result}>{this.state.current}</div>
        <div className={style.Calculator}>
          {buttons}
        </div>
      </div>
    );
  }
}

export default App;