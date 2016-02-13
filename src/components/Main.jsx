import React from 'react';
import Relay from 'react-relay';
import Link from './Link';

class Main extends React.Component {
  render() {
    const linkNodes = this.props.store.links.map(link =>
      <Link key={link._id} link={link} />
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
          ${Link.getFragment('link')}
        }
      }
    `
  }
});

export default Main;
