import Ember from 'ember';

const {
  Component,
  computed,
  get
} = Ember;

export default Component.extend({
  words: computed('line', function() {
    return get(this, 'line').split(' ');
  }),
  actions: {
    choose(wordIndex) {
      this.attrs.choose(get(this, 'lineIndex'), wordIndex);
      let span = this.$('span')[wordIndex];
      this.$(span).addClass('chosen');
    }
  }
});
