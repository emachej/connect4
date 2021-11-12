import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';



//square function allows squares to be used as buttons
function Square(props) {
    return (
      <button className="square" onClick={props.onClick}> 
        {props.value}
      </button>//triggers event when square is clicked on
    );
  }
  

  //board class dictates visual board component as well as game behaviour
  class Board extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            squares: Array(16).fill(null), //creates board out of individual squares, with an array
            xIsNext: true,
        };
    }
    //method dictating actions when
    handleClick(i) {
        const squares = this.state.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return; //prevents squares from being clicked twice or after a winner has been decided
          }
        squares[i] = this.state.xIsNext ? '🔴' : '🔵'; 
        this.setState({
            squares: squares, //sets squares value to either red or blue depending on whos turn it is
            xIsNext: !this.state.xIsNext, //flips turn to other player
        });
      }
    //method to render squares again once they are clicked on
    renderSquare(i) {
      return (
        <Square 
            value={this.state.squares[i]} //passes value of square
            onClick={() => this.handleClick(i)} 
        />
      );
    }
    //UI telling player whos turn it is and the winner of the game
    render() {
        const winner = calculateWinner(this.state.squares);
        let status;
        if (winner) {
          status = 'Winner: ' + winner;
        } else {
          status = 'Next player: ' + (this.state.xIsNext ? '🔴' : '🔵');
        }
  
      return ( //first rendering of game board and squares
        <div> 
          <div className="status">{status}</div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)} 
            {this.renderSquare(2)}
            {this.renderSquare(3)}
          </div> 
          <div className="board-row">
            {this.renderSquare(4)}
            {this.renderSquare(5)}
            {this.renderSquare(6)}
            {this.renderSquare(7)}
          </div>
          <div className="board-row">
            {this.renderSquare(8)}
            {this.renderSquare(9)}
            {this.renderSquare(10)}
            {this.renderSquare(11)}
          </div>
          <div className="board-row">
            {this.renderSquare(12)}
            {this.renderSquare(13)}
            {this.renderSquare(14)}
            {this.renderSquare(15)}
          </div>
        </div>
      );
    }
  }
  
  //main code that runs and creates board instance
  class Game extends React.Component {
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
          </div>
        </div>
      );
    }
  }
  
  //function to calculate who is the winner of the game
  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2, 3],
      [4, 5, 6, 7],
      [8, 9, 10, 11],
      [12, 13, 14, 15],
      [0, 4, 8, 12],
      [1, 5, 9, 13],
      [2, 6, 10, 14],
      [3, 7, 11, 15],
      [0, 5, 10, 15],
      [3, 6, 9, 12], //different winning possibilities 
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c, d] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c] && squares[a] === squares[d]) { //"connect 4!"
        return squares[a];
      }
    }
    return null;
  }




  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  