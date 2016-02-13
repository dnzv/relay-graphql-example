import React from 'react';
import Relay from 'react-relay';
import moment from 'moment';

class Link extends React.Component {
  render() {
    let {link, ...props} = this.props;
    return (
      <li>
        <span>{this.dateLabel()} </span>
        <a href={link.url}>{link.title}</a>
      </li>
    );
  }

  dateLabel = () => moment(this.props.link.createdAt).format('L');
}

Link = Relay.createContainer(Link, {
  fragments: {
    link: () => Relay.QL `
      fragment on Link {
        url,
        title,
        createdAt
      }
    `
  }
});

export default Link;
