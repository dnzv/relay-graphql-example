import {EventEmitter} from 'events';
import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionTypes from '../constants/ActionTypes';

const CHANGE_EVENT = 'change';

let _links = [];

class LinkStore extends EventEmitter {
  constructor(props) {
    super(props);

    AppDispatcher.register(action => {
      switch (action.actionType) {
        case ActionTypes.RECIEVE_LINKS:
          _links = action.links;
          this.emitChange();
          break;
        default: // no op
      }
    });
  }

  addChangeListener = (callback) => {
    this.on(CHANGE_EVENT, callback);
  };

  removeChangeListener = (callback) => {
    this.removeListener(CHANGE_EVENT, callback);
  };

  emitChange = () => {
    this.emit(CHANGE_EVENT);
  };

  getAll() {
    return _links;
  }
}

export default new LinkStore();
