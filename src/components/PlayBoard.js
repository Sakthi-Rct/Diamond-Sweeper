import React from "react";

import Square from "./Square";

import "../styles.css";

class PlayBoard extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      treasureStrikes: 0,
      openBoard: false,
      treasureFails: 0,
      finalScore: 0,
      clueDirection: ""
    };
  }

  componentDidMount() {
    this.strikeArray();
  }

  reset = () => {
    this.setState({
      reset: true,
      treasureStrikes: 0,
      openBoard: false,
      treasureFails: 0,
      finalScore: 0
    });
    this.props.resetGame();
    this.strikeArray();
    setTimeout(() => this.setState({ reset: false }), 1500);
    console.log("open board" + this.state.openBoard);
  };

  strikeArray = () => {
    const { gameArray } = this.props;
    const strikeArray = gameArray
      .map((item, index) => (item ? index : 0))
      .filter(x => x)
      .sort((a, b) => a - b);
    this.setState({ strikeArray: strikeArray });
  };

  onSquareClickHandle = (item, index) => {
    const { treasureStrikes, treasureFails, strikeArray } = this.state;
    const { treasureCount } = this.props;
    if (item) {
      this.setState({ treasureStrikes: treasureStrikes + 1 });
      if (treasureStrikes === treasureCount - 1) {
        this.setState({
          openBoard: true,
          finalScore: treasureCount * treasureCount - treasureFails
        });
      }
      const foundTreasureIndex = strikeArray.indexOf(index);
      strikeArray.splice(foundTreasureIndex, 1);
      this.setState({ strikeArray: strikeArray });
    } else {
      this.setState({ treasureFails: treasureFails + 1 });
      this.findNearestStrike(index);
    }
  };

  findNearestStrike = index => {
    const { strikeArray } = this.state;
    const ClueValue = strikeArray.reduce((prev, curr) =>
      Math.abs(curr - index) < Math.abs(prev - index) ? curr : prev
    );
    if (ClueValue > index) {
      this.setState({ clueDirection: "right" });
    } else {
      this.setState({ clueDirection: "left" });
    }

    console.log("clicked Value " + index);
    console.log("Diamond Value " + ClueValue);
  };

  render() {
    const { gameArray } = this.props;
    const { openBoard, finalScore, reset, clueDirection } = this.state;
    return (
      <>
        {openBoard && (
          <>
            <p className="message">{`Your Score is ${finalScore}`}</p>
            <a className="btn mt-10" onClick={() => this.reset()}>
              Reset Game!
            </a>
          </>
        )}
        {!openBoard && (
          <>
            <a
              className="btn"
              onClick={() => this.setState({ openBoard: true })}
            >
              Give Up!
            </a>
            <a className="btn" onClick={() => this.reset()}>
              Reset Game!
            </a>
          </>
        )}
        <div className="play-board">
          {gameArray.map((item, index) => (
            <Square
              isTreasure={item}
              isGameOver={openBoard}
              onSquareClick={() => {
                this.onSquareClickHandle(item, index);
              }}
              nextDirection={clueDirection}
              resetSquares={reset}
            />
          ))}
        </div>
      </>
    );
  }
}

export default PlayBoard;
