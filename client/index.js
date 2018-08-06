import React from 'react';
import ReactDOM from 'react-dom';

import TileRow from './TileRow.jsx';

class Welcome extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const tileRows = [];
    for (let i = 0; i < 10; ++i) {
      tileRows.push(<TileRow row={i} col="20"/>);
    }
    return (
      <div style={{textAlign: 'center'}}>
        <h1>Welcome</h1>
        {tileRows}
      </div>
    )
  }
}

ReactDOM.render(<Welcome/>, document.getElementById('app'));
