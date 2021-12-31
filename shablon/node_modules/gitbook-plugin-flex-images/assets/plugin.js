'use strict';

var options = {};

function blockFilter( imageItem ) {
  var image = imageItem.trim()
  return image.length > 1;
}

function parseMarkdown( text ) {
  var MarkupIt = require( 'markup-it' );
  var markdownSyntax = require( 'markup-it/syntaxes/markdown' );
  var htmlSyntax = require( 'markup-it/syntaxes/html' );

  var markdown = new MarkupIt( markdownSyntax );
  var html = new MarkupIt( htmlSyntax );

  md = markdown.toContent( text );
  parsed = html.toText( md );
  return parsed;
};

function buildFigures( block ) {
  var blockText, images = [], figures = [];

  blockText = block.body.split( /\r?\n/ );
  images = blockText.filter( blockFilter );
  images.forEach( function( img ) {
    var inner;

    if ( options.parseInternalMarkdown ) {
      inner = parseMarkdown( img.trim() ).replace( /<p>|<\/p>/g, "" );
    } else {
      img = img.trim().replace( /\\_/g, "_" );
      inner = '<img src="' + options.baseImageUrl + img + '" alt="" />';
    }

    figures.push(
      '<div>' +
      inner +
      '</div>'
    );
  });

  return figures;
}

var Flexbox = function(block, baseImageUrl, parseInternalMarkdown) {
  options.baseImageUrl = baseImageUrl;
  options.parseInternalMarkdown = parseInternalMarkdown;

  var figures = buildFigures(block);

  var output = ( '<div class="figure-block">' +
    figures.join( '\n' )
    + '</div>'
  );

  return output;
};

var Tables = function(block, baseImageUrl, parseInternalMarkdown) {
  // not implemented
};

module.exports = {
  Flexbox: Flexbox,
  Tables: Tables
};
