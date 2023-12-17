import { buildRequest, makeRequest } from './uploader_utils';
export async function upload(cloudinary, _ref) {
  let {
    file,
    headers = {},
    options = {},
    config = null,
    callback
  } = _ref;
  const request = await buildRequest(cloudinary, 'upload', {
    file,
    headers,
    options,
    config
  });
  return makeRequest(request, callback);
}
;
export function unsignedUpload(cloudinary, _ref2) {
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
export function uploadBase64(cloudinary, _ref3) {
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
export async function rename(cloudinary, _ref4) {
  let {
    from_public_id,
    to_public_id,
    options = {},
    config = null,
    callback
  } = _ref4;
  options.from_public_id = from_public_id;
  options.to_public_id = to_public_id;
  const request = await buildRequest(cloudinary, 'rename', {
    file: undefined,
    headers: undefined,
    options,
    config
  });
  return makeRequest(request, callback);
}
;
export async function explicit(cloudinary, _ref5) {
  let {
    publicId,
    options = {},
    config = null,
    callback
  } = _ref5;
  options.public_id = publicId;
  const request = await buildRequest(cloudinary, 'explicit', {
    headers: undefined,
    options,
    config
  });
  return makeRequest(request, callback);
}
;
//# sourceMappingURL=uploader.js.map