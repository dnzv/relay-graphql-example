import React from 'react';
import API from '../API';
import LinkStore from '../stores/LinkStore';

class Main extends React.Component {

  state = { links: LinkStore.getAll() };

  componentWillMount() {
    LinkStore.addChangeListener(this.onChange);
  }

  componentDidMount() {
    API.fetchLinks();
  }

  componentWillUnmount() {
    LinkStore.removeChangeListener(this.onChange);
  }

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

  onChange = () => {
    this.setState({ links: LinkStore.getAll() });
  };
}

export default Main;
