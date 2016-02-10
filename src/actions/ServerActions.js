import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionTypes from '../constants/ActionTypes';

let ServerActions = {
  recieveLinks(links) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.RECIEVE_LINKS,
      links
    });
  }
}

export default ServerActions;
