import React from "react";
import ReactDOM from "react-dom";

import PlayBoard from "./components/PlayBoard";

import "./styles.css";

const gridValue = 8;
const grid = gridValue * gridValue;

class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      mainArray: []
    };
  }
  componentDidMount() {
    this.startGame(gridValue);
  }

  startGame(gridValue) {
    let randomArray = new Array(grid).fill(0);
    let tempvalue = 0;

    for (let i = 0; i < gridValue; i++) {
      tempvalue = Math.floor(Math.random() * grid);
      if (randomArray[tempvalue] !== 1) {
        randomArray[tempvalue] = 1;
      } else {
        i--;
      }
    }
    this.setState({ mainArray: randomArray });
  }

  render() {
    console.log(this.state.mainArray);
    const { mainArray } = this.state;
    return (
      <div className="App">
        <h1>The Pittsburgh Pirates</h1>
        <h2 className="sub-heading">Start Gaming now !!</h2>
        {mainArray.length && (
          <PlayBoard
            gameArray={this.state.mainArray}
            treasureCount={gridValue}
            resetGame={() => this.startGame(gridValue)}
          />
        )}
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
