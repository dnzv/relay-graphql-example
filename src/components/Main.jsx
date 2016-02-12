import React from 'react';
import Relay from 'react-relay';

class Main extends React.Component {
  render() {
    const linkNodes = this.props.store.links.map(link =>
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

Main = Relay.createContainer(Main, {
  fragments: {
    store: () => Relay.QL `
      fragment on Store {
        links {
          _id,
          title,
          url
        }
      }
    `
  }
});

export default Main;
