import React from 'react';
import { Link } from 'react-router';

export class App extends React.Component {
  render() {
    return (
      <div>
        <div className="navbar">
          <Link to={'/callqueue'} activeClassName="active">
            Call Queue
          </Link>
          <Link to={'/huntstatus'} activeClassName="active">
            Hunt Status
          </Link>
          <Link to={'/teamstatus'} activeClassName="active">
            Team Status
          </Link>
          <Link to={'/submitanswer'} activeClassName="active">
            Submit Answer
          </Link>
          <div className="status">
            Mystery Hunt Admin Console
          </div>
        </div>
        {this.props.children}
      </div>
    );
  }
}
