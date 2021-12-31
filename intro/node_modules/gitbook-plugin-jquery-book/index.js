'use strict';

module.exports = {
  book: {
    assets: './assets',
    js: [
      'code.js'
    ],
    css: [
      'styles.css'
    ]
  },
  // Map of hooks
  hooks: {},

  // Map of new blocks
  blocks: {
    // <div class="jqbook">
    // <button class="jqbook sticky">📌</button>
    // <button class="jqbook reload">🗘</button>
    // <iframe class="jqbook" id="click-example" width="100%" height="160px" border="0" src="../code/events.click.html"></iframe>
    // </div>
    // {% jqbFrame "click-example", "../code/events.click.html", height="160px" %}
    // {% sticky %}
    // {% reload %}
    // {% endjqbFrame %}
    jqbFrame: {
      blocks: ['sticky', 'reload'],
      process: function (block) {
        let stickyFlag = false;
        let reloadFlag = false;

        // check blocks
        block.blocks.forEach((sub) => {
          if (sub.name === 'sticky') {
            stickyFlag = true;
          }
          if (sub.name === 'reload') {
            reloadFlag = true;
          }
        });

        let tag = '<div class="jqbook">';

        if (stickyFlag) {
          tag += '<button class="jqbook sticky">📌</button>';
        }

        if (reloadFlag) {
          tag += '<button class="jqbook reload">🗘</button>';
        }

        tag += '<iframe class="jqbook" border="0" id="' + block.args[0] + '" src="' + block.args[1] + '"';

        for (let item in block.kwargs) {
          if (block.kwargs.hasOwnProperty(item) && item !== '__keywords') {
            tag += ' ' + item + '="' + block.kwargs[item] + '"';
          }
        }
        tag += '></iframe>';
        tag += '</div>';

        return tag;
      }
    },
    // <a class="jqbook" href="#" data-type="append-script" data-target="#html-example">$("#radio-two").prop("disabled", false)</a>
    // {% jqbScript "#html-example" %}$("#radio-two").prop("disabled", false){% endjqbScript %}
    jqbScript: function (block) {
      let code = '';
      if (block.kwargs.hasOwnProperty('code')) {
        code = ' data-code="' + block.kwargs.code + '"';
      }
      return '<a class="jqbook" href="#" data-type="append-script" data-target="' + block.args[0] + '"' + code + '>' + block.body + '</a>';
    },
    // <a class="jqbook" href="#" data-type="append-style" data-target="#html-example">p { color: orange }</a>
    // {% jqbStyle "#html-example" %}p { color: red }{% endjqbStyle %}
    jqbStyle: function (block) {
      return '<a class="jqbook" href="#" data-type="append-style" data-target="' + block.args[0] + '">' + block.body + '</a>';
    },
    // <a class="jqbook" href="#" data-type="highlight" data-target="#html-example">$("#content")</a>
    // {% jqbHighlight "#html-example" %}$("#content"){% endjqbHighlight %}
    jqbHighlight: function (block) {
      return '<a class="jqbook" href="#" data-type="highlight" data-target="' + block.args[0] + '">' + block.body + '</a>';
    },
    // <button class="jqbook run" data-target="#handlers-example">▷</button>
    // {% jqbRun "#handlers-example" %}{% endjqbRun %}
    jqbRun: function (block) {
      let code = '';
      if (block.kwargs.hasOwnProperty('code')) {
        code = ' data-code="' + block.kwargs.code + '"';
      }
      return '<button class="jqbook run" data-target="' + block.args[0] + '"' + code + '>▷</a>';
    },
    // <button class="jqbook eval">▷</button>
    // {% jqbEval %}{% endjqbEval %}
    jqbEval: function (block) {
      let code = '';
      if (block.kwargs.hasOwnProperty('code')) {
        code = ' data-code="' + block.kwargs.code + '"';
      }
      return '<button class="jqbook eval"' + code + '>▷</a>';
    }
  },

  // Map of new filters
  filters: {}
};
