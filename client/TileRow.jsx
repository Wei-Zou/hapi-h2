import React from 'react';

import Tile from './Tile.jsx';

class TileRow extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const tiles = [];
    for (let i = 0; i < this.props.col; ++i) {
      const imgPath = `./images/${this.props.row}-${i}.jpeg`;
      tiles.push(<Tile src={imgPath}/>);
    }
    return (
      <div>
        {tiles}
      </div>
    )
  }
}

export default TileRow;
