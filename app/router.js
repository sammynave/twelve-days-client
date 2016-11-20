import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('songs', function() {
    this.route('new');
    this.route('show', { path: ':songId' });
  });
});

export default Router;
