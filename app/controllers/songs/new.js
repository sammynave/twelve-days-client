import Ember from 'ember';
import { task } from 'ember-concurrency';

const {
  Controller,
  get,
  set
} = Ember;

export default Controller.extend({
  create: task(function*() {
    try {
      let attrs = {
        name: get(this, 'name'),
        lyrics: get(this, 'lyrics'),
        audio: get(this, 'audio')
      };
      let song = get(this, 'store').createRecord('song', attrs);
      yield song.save();
      this.transitionToRoute('songs.show', get(song, 'id'));
    } catch(e) {
      set(this, 'error', e);
    }
  })
});
