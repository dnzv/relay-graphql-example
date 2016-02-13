import React from 'react';
import Relay from 'react-relay';
import Link from './Link';
import {debounce} from 'lodash';
import CreateLinkMutation from '../mutations/CreateLinkMutation';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.search = debounce(this.search, 300);
  }

  render() {
    const linkNodes = this.props.store.linkConnection.edges.map(edge =>
      <Link key={edge.node.id} link={edge.node} />
    );

    return (
      <div>
        <h3>Links</h3>
        <form onSubmit={this.handleSubmit}>
          <input type="text" placeholder="Title" ref="newTitle"/>
          <input type="text" placeholder="Url" ref="newUrl"/>
          <button type="submit">Add</button>
        </form>
        <input type="text" placeholder="Search" onChange={this.handleSearch}/>
        <select onChange={this.setLimit}
                defaultValue={this.props.relay.variables.limit}>
          <option value="3">3</option>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="100">100</option>
        </select>
        <ul>
          {linkNodes}
        </ul>
      </div>
    );
  }

  setLimit = (e) => {
    let newLimit = Number(e.target.value);
    this.props.relay.setVariables({limit: newLimit});
  };

  handleSubmit = (e) => {
    e.preventDefault();
    Relay.Store.commitUpdate(
      new CreateLinkMutation({
        title: this.refs.newTitle.value,
        url: this.refs.newUrl.value,
        store: this.props.store
      })
    );
    this.refs.newTitle.value = "";
    this.refs.newUrl.value = "";
  };

  handleSearch = (e) => {
    let query = e.target.value;
    this.search(query);
  };

  search = (query) => {
    this.props.relay.setVariables({ query });
  };
}

Main = Relay.createContainer(Main, {
  initialVariables: {
    limit: 100,
    query: ""
  },
  fragments: {
    store: () => Relay.QL `
      fragment on Store {
        id,
        linkConnection(first: $limit, query: $query) {
          edges {
            node {
              id,
              ${Link.getFragment('link')}
            }
          }
        }
      }
    `
  }
});

export default Main;
