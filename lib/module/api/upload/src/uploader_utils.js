import { APIConfig, apiVersion, defaultResourceType } from '../config/api-config';
import { process_request_params } from '../utils';
import { callApi } from './network-delegate';
export async function buildRequest(cloudinary, action, _ref) {
  let {
    file = undefined,
    headers = {},
    options = {},
    config = null
  } = _ref;
  const apiConfig = createConfiguration(cloudinary, config);
  const url = buildUrl({
    prefix: apiConfig.uploadPrefix,
    apiVersion,
    cloudName: apiConfig.cloudName,
    resourceType: defaultResourceType,
    action: action
  });
  const params = await process_request_params(apiConfig, options);
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
  const apiConfig = config ?? new APIConfig();
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
export function makeRequest(request, callback) {
  return callApi(request).then(jsonResponse => {
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