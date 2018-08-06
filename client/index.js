import React from 'react';
import ReactDOM from 'react-dom';

import Tile from './Tile.jsx';

class Welcome extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{textAlign: 'center'}}>
        <h1>Welcome</h1>
        <Tile src="./images/0-0.jpeg"/>
      </div>
    )
  }
}

ReactDOM.render(<Welcome/>, document.getElementById('app'));
