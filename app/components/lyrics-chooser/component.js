import Ember from 'ember';

const {
  Component,
  computed,
  get
} = Ember;

export default Component.extend({
  actions: {
    choose(lineIndex, wordIndex) {
      get(this, 'addPosition').perform([lineIndex, wordIndex]);
    }
  }
});
