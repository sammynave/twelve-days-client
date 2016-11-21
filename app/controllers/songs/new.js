import Ember from 'ember';
import { task } from 'ember-concurrency';

const {
  Controller,
  get,
  set,
  isBlank,
  setProperties
} = Ember;

export default Controller.extend({
  create: task(function*() {
    set(this, 'errors', null);
    try {
      let attrs = {
        name: get(this, 'name'),
        lyrics: get(this, 'lyrics'),
        audio: get(this, 'audio')
      };

      let song = get(this, 'song');

      if (isBlank(song)) {
       song = get(this, 'store').createRecord('song');
      }

      setProperties(song, attrs);
      set(this, 'song', song);
      yield song.save();

      set(this, 'name', null);
      set(this, 'lyrics', null);
      set(this, 'audio', null);

      this.transitionToRoute('songs.show', get(song, 'id'));
    } catch(e) {
      set(this, 'errors', e.errors);
    }
  })
});
