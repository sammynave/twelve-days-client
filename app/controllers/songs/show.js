import Ember from 'ember';
import {
  task,
  all
} from 'ember-concurrency';

const {
  Controller,
  computed,
  get,
  set,
  isArray
} = Ember;

export default Controller.extend({
  timer: null,
  positions: computed('model', function() {
    return get(this, 'model.positions');
  }),
  save: task(function*() {
    if (get(this, 'isRunning')) {
      return;
    }

    let saveCalls = [];
    get(this, 'positions').forEach((p) => saveCalls.push(p.save()));
    yield all(saveCalls);
  }),
  destroy: task(function*() {
    try {
      yield get(this, 'model').destroyRecord();
      this.transitionToRoute('songs');
    } catch(e) {
      set(this, 'errors', e.errors);
    }
  }),
  addPosition: task(function*(position) {
    if (get(this, 'isRunning')) {
      let [lineIndex, wordIndex] = position;
      let newPosition = yield get(this, 'store').createRecord('position', {
        song: get(this, 'model'),
        time: Date.now(),
        lineIndex,
        wordIndex
      });
    }
  }),
  actions: {
    start() {
      set(this, 'isRunning', true);
      set(this, 'startTime', Date.now());
    },
    stop() {
      set(this, 'endTime', Date.now());
      set(this, 'isRunning', false);
    }
  }
});
