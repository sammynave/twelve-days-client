import DS from 'ember-data';
import config from 'twelve-days-client/config/environment';

export default DS.JSONAPIAdapter.extend({
  host: config.host
});
