'use strict';

var peg = require('broccoli-pegjs');

module.exports = {
  name: 'ember-cli-pegjs',
  included: function(app) {
    this._super.included.apply(this, arguments);

    this.options = app.options.pegOptions || {};
    this.options.wrapper = this.options.wrapper || function(src, parser) {
      return 'export default ' + parser;
    };
  },

  setupPreprocessorRegistry: function(type, registry) {
    if (type === 'parent') {
      var addon = this;

      registry.add('js', {
        name: 'ember-cli-pegjs',
        ext: 'pegjs',
        toTree: function(tree) {
          return peg(tree, this.options);
        }
      });
    }
  }
};
