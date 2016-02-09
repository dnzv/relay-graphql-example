import React from 'react';
import API from '../API';
import LinkStore from '../stores/LinkStore';

class Main extends React.Component {

  state = { links: LinkStore.getAll() };

  componentWillMount() {
    console.log("Adding change listener...");
    LinkStore.addChangeListener(this.onChange);
  }

  componentDidMount() {
    API.fetchLinks();
  }

  componentWillUnmount() {
    console.log("Removing change listener...");
    LinkStore.removeChangeListener(this.onChange);
  }

  render() {
    console.log("5. this.state.links: ", this.state.links);

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

  onChange = () => {
    console.log("4. Main.onChange");
    this.setState({ links: LinkStore.getAll() });
  };
}

export default Main;
