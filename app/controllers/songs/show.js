import Ember from 'ember';
import { task } from 'ember-concurrency';

const {
  Controller,
  get,
  set,
  isArray
} = Ember;

export default Controller.extend({
  destroy: task(function*() {
    try {
      yield get(this, 'model').destroyRecord();
      this.transitionToRoute('songs');
    } catch(e) {
      set(this, 'errors', e.errors);
    }
  }),
  addPosition: task(function*(position) {
    // add new Position model
    // {
    //  belongsTo song
    //  time
    //  lineIndex
    //  wordIndex
    // }
    console.log(position);
  })
});
