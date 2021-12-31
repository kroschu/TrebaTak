'use strict';
module.exports = {
  book: {
    assets: './assets',
    css: [ 'plugin.css' ],
    js: [ 'plugin.js' ]
  },
  blocks: {
    fleximages: {
      process: function( block ) {
        var Plugin = require('../assets/plugin.js')

        var defaults = {
          baseImageUrl: '',
          parseInternalMarkdown: true
        };

        var config = this.config.get('pluginsConfig').flexImages || defaults;

        return Plugin.Flexbox(block, config.baseImageUrl, config.parseInternalMarkdown);
      }
    }
  }
};
