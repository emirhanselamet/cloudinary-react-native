"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.explicit = explicit;
exports.rename = rename;
exports.unsignedUpload = unsignedUpload;
exports.upload = upload;
exports.uploadBase64 = uploadBase64;
var _uploader_utils = require("./uploader_utils");
async function upload(cloudinary, _ref) {
  let {
    file,
    headers = {},
    options = {},
    config = null,
    callback
  } = _ref;
  const request = await (0, _uploader_utils.buildRequest)(cloudinary, 'upload', {
    file,
    headers,
    options,
    config
  });
  return (0, _uploader_utils.makeRequest)(request, callback);
}
;
function unsignedUpload(cloudinary, _ref2) {
  let {
    file,
    upload_preset,
    headers = {},
    options = {},
    config = null,
    callback
  } = _ref2;
  options.upload_preset = upload_preset;
  options.unsigned = true;
  return upload(cloudinary, {
    file,
    headers,
    options,
    config: config,
    callback
  });
}
function uploadBase64(cloudinary, _ref3) {
  let {
    file,
    headers = {},
    options = {},
    config = null,
    callback
  } = _ref3;
  file = 'data:image/jpeg;base64,' + file;
  return upload(cloudinary, {
    file,
    headers,
    options,
    config: config,
    callback
  });
}
;
async function rename(cloudinary, _ref4) {
  let {
    from_public_id,
    to_public_id,
    options = {},
    config = null,
    callback
  } = _ref4;
  options.from_public_id = from_public_id;
  options.to_public_id = to_public_id;
  const request = await (0, _uploader_utils.buildRequest)(cloudinary, 'rename', {
    file: undefined,
    headers: undefined,
    options,
    config
  });
  return (0, _uploader_utils.makeRequest)(request, callback);
}
;
async function explicit(cloudinary, _ref5) {
  let {
    publicId,
    options = {},
    config = null,
    callback
  } = _ref5;
  options.public_id = publicId;
  const request = await (0, _uploader_utils.buildRequest)(cloudinary, 'explicit', {
    headers: undefined,
    options,
    config
  });
  return (0, _uploader_utils.makeRequest)(request, callback);
}
;
//# sourceMappingURL=uploader.js.map