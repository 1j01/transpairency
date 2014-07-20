// Generated by CoffeeScript 1.7.1
var transpairent;

transpairent = function(black, white) {
  var a, bb, bw, c0, c1, canvas, cr, ctx0, ctx1, ctxr, gb, gw, h, i, id0, id1, idr, rb, rw, w, _i, _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6;
  if (black.naturalWidth * black.naturalHeight < white.naturalWidth * white.naturalHeight) {
    w = black.naturalWidth;
    h = black.naturalHeight;
  } else {
    w = white.naturalWidth;
    h = white.naturalHeight;
  }
  if (w === 0 || h === 0) {
    throw new Error("Invalid dimensions " + w + "x" + h);
  }
  canvas = function(el) {
    var c, ctx;
    c = document.createElement("canvas");
    c.width = w;
    c.height = h;
    ctx = c.getContext("2d");
    ctx.drawImage(el, 0, 0, w, h);
    return [ctx, c];
  };
  _ref = canvas(black), ctx0 = _ref[0], c0 = _ref[1];
  _ref1 = canvas(white), ctx1 = _ref1[0], c1 = _ref1[1];
  _ref2 = canvas(white || black), ctxr = _ref2[0], cr = _ref2[1];
  id0 = ctx0.getImageData(0, 0, c0.width, c0.height);
  id1 = ctx1.getImageData(0, 0, c1.width, c1.height);
  idr = ctxr.getImageData(0, 0, cr.width, cr.height);
  for (i = _i = 0, _ref3 = id0.data.length; _i < _ref3; i = _i += 4) {
    rb = id0.data[i + 0];
    gb = id0.data[i + 1];
    bb = id0.data[i + 2];
    rw = id1.data[i + 0];
    gw = id1.data[i + 1];
    bw = id1.data[i + 2];
    if (rb > rw) {
      _ref4 = [rb, rw], rw = _ref4[0], rb = _ref4[1];
    }
    if (gb > gw) {
      _ref5 = [gb, gw], gw = _ref5[0], gb = _ref5[1];
    }
    if (bb > bw) {
      _ref6 = [bb, bw], bw = _ref6[0], bb = _ref6[1];
    }
    a = 255 - (rw + gw + bw - rb - gb - bb) / 3;
    idr.data[i + 0] = 255 * rb / a;
    idr.data[i + 1] = 255 * gb / a;
    idr.data[i + 2] = 255 * bb / a;
    idr.data[i + 3] = a;
  }
  ctxr.putImageData(idr, 0, 0);
  return cr;
};
