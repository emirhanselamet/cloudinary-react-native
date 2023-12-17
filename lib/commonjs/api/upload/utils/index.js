"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hashToParameters = hashToParameters;
exports.present = present;
exports.process_request_params = process_request_params;
exports.timestamp = void 0;
var _consts = require("./consts");
var _util = require("util");
var Crypto = _interopRequireWildcard(require("expo-crypto"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const entries = require('./entries');
const toArray = require('./toArray');
const timestamp = () => Math.floor(new Date().getTime() / 1000);
exports.timestamp = timestamp;
function present(value) {
  return value != null && ("" + value).length > 0;
}
async function sign_request(apiConfig, params) {
  let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  let apiKey = apiConfig.apiKey;
  let apiSecret = apiConfig.apiSecret;
  params = clear_blank(params);
  params.signature = await api_sign_request(params, apiSecret);
  params.api_key = apiKey;
  return params;
}
async function api_sign_request(params_to_sign, api_secret) {
  let to_sign = entries(params_to_sign).filter(_ref => {
    let [k, v] = _ref;
    return present(v);
  }).map(_ref2 => {
    let [k, v] = _ref2;
    return `${k}=${toArray(v).join(",")}`;
  }).sort().join("&");
  const signature = computeHash(to_sign + api_secret, /*APIConfig().signature_algorithm || */_consts.DEFAULT_SIGNATURE_ALGORITHM, 'hex');
  return Promise.resolve(signature);
}
function clear_blank(hash) {
  let filtered_hash = {};
  entries(hash).filter(_ref3 => {
    let [k, v] = _ref3;
    return present(v);
  }).forEach(_ref4 => {
    let [k, v] = _ref4;
    filtered_hash[k] = v.filter ? v.filter(x => x) : v;
  });
  return filtered_hash;
}

/**
* Computes hash from input string using specified algorithm.
* @private
* @param {string} input string which to compute hash from
* @param {string} signature_algorithm algorithm to use for computing hash
* @param {string} encoding type of encoding
* @return {string} computed hash value
*/
async function computeHash(input, signature_algorithm, encoding) {
  let hash;
  if (signature_algorithm === 'sha256') {
    const digest = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, input);
    hash = digest;
  } else if (signature_algorithm === 'sha1') {
    const digest = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA1, input);
    hash = digest;
  }
  return hash;
}
async function process_request_params(apiConfig, options) {
  let params = clear_blank(options);
  if (options.unsigned != null && options.unsigned) {
    params = clear_blank(options);
    //   delete params.timestamp;
    // } else if (options.oauth_token || config().oauth_token) {
    //   params = clear_blank(params);
  } else if (options.signature) {
    params = clear_blank(options);
  } else {
    params.timestamp = timestamp();
    params = await sign_request(apiConfig, params, options);
  }
  return Promise.resolve(params);
}
function hashToParameters(hash) {
  return entries(hash).reduce((parameters, _ref5) => {
    let [key, value] = _ref5;
    if ((0, _util.isArray)(value)) {
      key = key.endsWith('[]') ? key : key + '[]';
      const items = value.map(v => [key, v]);
      parameters = parameters.concat(items);
    } else {
      parameters.push([key, value]);
    }
    return parameters;
  }, []);
}
//# sourceMappingURL=index.js.map