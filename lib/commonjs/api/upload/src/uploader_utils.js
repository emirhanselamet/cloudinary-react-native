"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildRequest = buildRequest;
exports.makeRequest = makeRequest;
var _apiConfig = require("../config/api-config");
var _utils = require("../utils");
var _networkDelegate = require("./network-delegate");
async function buildRequest(cloudinary, action, _ref) {
  let {
    file = undefined,
    headers = {},
    options = {},
    config = null
  } = _ref;
  const apiConfig = createConfiguration(cloudinary, config);
  const url = buildUrl({
    prefix: apiConfig.uploadPrefix,
    apiVersion: _apiConfig.apiVersion,
    cloudName: apiConfig.cloudName,
    resourceType: _apiConfig.defaultResourceType,
    action: action
  });
  const params = await (0, _utils.process_request_params)(apiConfig, options);
  const data = buildPayload(file, params);
  const request = {
    url,
    headers,
    data
  };
  return request;
}
function createConfiguration(cloudinary, config) {
  var _cloudinary$getConfig, _cloudinary$getConfig2, _cloudinary$getConfig3;
  const apiConfig = config ?? new _apiConfig.APIConfig();
  const cloudName = (_cloudinary$getConfig = cloudinary.getConfig().cloud) === null || _cloudinary$getConfig === void 0 ? void 0 : _cloudinary$getConfig.cloudName;
  if (cloudName == null) {
    throw new Error('Cloud name is missing in the Cloudinary configuration.');
  }
  apiConfig.cloudName = cloudName;
  apiConfig.apiKey = ((_cloudinary$getConfig2 = cloudinary.getConfig().cloud) === null || _cloudinary$getConfig2 === void 0 ? void 0 : _cloudinary$getConfig2.apiKey) ?? null;
  apiConfig.apiSecret = ((_cloudinary$getConfig3 = cloudinary.getConfig().cloud) === null || _cloudinary$getConfig3 === void 0 ? void 0 : _cloudinary$getConfig3.apiSecret) ?? null;
  return apiConfig;
}
function buildUrl(_ref2) {
  let {
    prefix,
    apiVersion,
    cloudName,
    resourceType,
    action
  } = _ref2;
  return [prefix, apiVersion, cloudName, resourceType, action].join('/');
}
function buildPayload(file, options) {
  const data = new FormData();
  if (file != undefined) {
    data.append('file', {
      name: "file",
      uri: file
    });
  }
  for (const key in options) {
    data.append(key, options[key]);
  }
  return data;
}
function parseApiResponse(response) {
  // Check if the response has a "message" property to determine the error response

  if (response.error) {
    return response.error;
  }
  return response;
}
function makeRequest(request, callback) {
  return (0, _networkDelegate.callApi)(request).then(jsonResponse => {
    const parsedResponse = parseApiResponse(jsonResponse);
    if (callback !== undefined) {
      if ('message' in parsedResponse) {
        callback(parsedResponse, undefined);
      } else {
        callback(undefined, parsedResponse);
      }
    }
  });
}
//# sourceMappingURL=uploader_utils.js.map