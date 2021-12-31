'use strict';

const QRCode = require('qrcode');

module.exports = {
  blocks: {
    qrcode: {
      process: function(block) {
        let width = block.kwargs.width || 180;
        let logoWidth = block.kwargs.logoWidth || 40;
        return QRCode.toDataURL(block.body, { width, version: 10 })
        .then( url => {
          return `
            <div style="width: ${width}px; height: ${width}px">
              <img src=${url} style="width: ${width}px" />
              <img src=${block.kwargs.logosrc} style="width: ${logoWidth}px; position: relative; top: -${width/2 + logoWidth/2 }px; left: ${width/2 - logoWidth/2}px"/>
            </div>
          `
        });
      }
    }
  }
}
