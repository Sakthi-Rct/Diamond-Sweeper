import React from "react";

import "../styles.css";

class Square extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: this.props.isGameOver,
      direction: ""
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.isGameOver !== this.props.isGameOver) {
      if (nextProps.isGameOver === true) {
        this.setState({ isOpen: true });
      }
    }
    if (nextProps.resetSquares !== this.props.resetSquares) {
      if (nextProps.resetSquares === true) {
        this.setState({ isOpen: false });
      }
    }
    if (nextProps.nextDirection !== this.props.nextDirection) {
      if (nextProps.nextDirection === "left") {
        this.setState({ direction: nextProps.nextDirection });
      }
    }
  }

  render() {
    const { isTreasure, onSquareClick } = this.props;
    const { isOpen, direction } = this.state;
    const directionIcon =
      direction === "left" ? (
        <i className="fa fa-arrow-left arrow-icon" aria-hidden="true" />
      ) : (
        <i className="fa fa-arrow-right arrow-icon" aria-hidden="true" />
      );
    const qMarkImg = (
      <img
        src="http://maxspeedandsound.com/wp-content/uploads/2018/04/window-kc.png"
        className="square__image"
        alt="not-found"
      />
    );
    const diamondImg = (
      <img
        src="https://www.sketch.com/images/pages/press/sketch-press-kit/app-icons/sketch-mac-icon@2x.png"
        className="square__image"
        alt="Treasure"
      />
    );
    const resultImg = isTreasure ? diamondImg : directionIcon;
    return (
      <div
        className={isOpen ? "square open" : "square"}
        onClick={() => {
          onSquareClick();
          if (!isOpen) {
            this.setState({ isOpen: true });
          }
        }}
      >
        {isOpen ? resultImg : qMarkImg}
      </div>
    );
  }
}

export default Square;
