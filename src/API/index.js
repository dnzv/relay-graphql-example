import {get} from 'jquery';

export default {
  fetchLinks() {
    console.log("1. In API fetchLinks");
    get("/data/links").done(resp => console.log(resp));
  }
}
