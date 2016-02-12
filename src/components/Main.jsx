import React from 'react';

class Main extends React.Component {
  render() {
    const linkNodes = this.state.links.map(link =>
      <li key={link._id}><a href={link.url}>{link.title}</a></li>
    );

    return (
      <div>
        <h3>Links</h3>
        <ul>
          {linkNodes}
        </ul>
      </div>
    );
  }
}

export default Main;
