import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionTypes from '../constants/ActionTypes';

let ServerActions = {
  recieveLinks(links) {
    console.log("2. ServerActions.recieveLinks");
    AppDispatcher.dispatch({
      actionType: ActionTypes.RECIEVE_LINKS,
      links
    });
  }
}

export default ServerActions;
