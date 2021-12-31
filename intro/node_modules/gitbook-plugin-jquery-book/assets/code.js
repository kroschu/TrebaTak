/**
 * @author Anton Shevchuk
 */
/* global define,require*/
require(['jquery'], function ($) {
  'use strict';
  $(function () {
    $(document)
      .on('click', 'a.jqbook[data-type="append-style"]', appendStyle)
      .on('click', 'a.jqbook[data-type="append-script"]', appendScript)
      .on('click', 'a.jqbook[data-type="highlight"]', highlight)
      .on('click', 'button.jqbook.sticky', switchSticky)
      .on('click', 'button.jqbook.reload', reload)
      .on('click', 'button.jqbook.run', runScript)
      .on('click', 'button.jqbook.eval', evalScript);
  });

  /**
   * Append style to target iframe
   *
   * @param target
   * @param code
   * @private
   *
   * @return void
   */
  function _appendStyle(target, code) {
    $(target).contents()
      .find('head')
      .append('<style>' + code + '</style>');
  }

  /**
   * Append script to target iframe
   * @param target
   * @param code
   * @private
   */
  function _appendScript(target, code) {
    $(target).contents()
      .find('head')
      .append('<script>' + code + '</script>');
  }

  function appendStyle(event) {
    event.preventDefault();

    let $element = $(this);
    let code = $element.data('code') || $element.text();

    _appendStyle($element.data('target'), code);

    return false;
  }

  function appendScript(event) {
    event.preventDefault();

    let $element = $(this);
    let code = $element.data('code') || $element.text();

    _appendScript($element.data('target'), code);

    return false;
  }

  function runScript(event) {
    event.preventDefault();

    let $element = $(this);
    let code = $element.data('code') || $element.parent().next().text();

    _appendScript($element.data('target'), code);
    return false;
  }


  function highlight(event) {
    event.preventDefault();

    let $element = $(this);
    let code = $element.text() + '.effect("highlight", 800)';

    _appendScript($element.data('target'), code);

    return false;
  }

  function evalScript(event) {
    event.preventDefault();

    let $element = $(this);
    let code = $element.data('code') || $element.parent().next().text();

    $('head')
      .append('<script>' + code + '</script>');

    return false;
  }

  function switchSticky(event) {
    event.preventDefault();
    $(this).parent('div.jqbook').toggleClass('sticky');
    return false;
  }

  function reload(event) {
    event.preventDefault();

    let $iframe = $(this).parent('div.jqbook').find('iframe');
    $iframe.attr('src', $iframe.attr('src'));

    return false;
  }
});
