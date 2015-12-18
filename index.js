'use strict';

var peg = require('broccoli-pegjs');
var Funnel = require('broccoli-funnel');
var mergeTrees = require('broccoli-merge-trees');

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
          var parsers = peg(new Funnel(tree, { include: [/\.pegjs$/] }), addon.options);
          return mergeTrees([tree, parsers]);
        }
      });
    }
  }
};
