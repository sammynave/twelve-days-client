import Ember from 'ember';

const {
  Controller,
  computed
} = Ember;

export default Controller.extend({
  songs: computed.filterBy('model', 'isNew', false)
});
