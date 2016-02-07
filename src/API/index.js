import {get} from 'jquery';
import ServerActions from '../actions/ServerActions';

let API = {
  fetchLinks() {
    console.log("1. API.fetchLinks");
    get("/data/links").done(resp => {
      console.log(resp);
      ServerActions.recieveLinks(resp);
    });
  }
}

export default API;
