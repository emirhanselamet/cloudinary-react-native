"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadPrefixKey = exports.defaultUploadPrefix = exports.defaultTimeout = exports.defaultResourceType = exports.defaultChunckSize = exports.apiVersion = exports.APIConfig = void 0;
const apiVersion = 'v1_1';
exports.apiVersion = apiVersion;
const defaultResourceType = 'video';
exports.defaultResourceType = defaultResourceType;
const defaultChunckSize = 20 * 1024 * 1024;
exports.defaultChunckSize = defaultChunckSize;
const defaultTimeout = 60;
exports.defaultTimeout = defaultTimeout;
const defaultUploadPrefix = 'https://api.cloudinary.com';
exports.defaultUploadPrefix = defaultUploadPrefix;
const uploadPrefixKey = 'upload_prefix';
exports.uploadPrefixKey = uploadPrefixKey;
const chunkSizeKey = 'chunk_size';
const readTimeoutKey = 'read_timeout';
const connectionTimeoutKey = 'connect_timeout';
const callbackUrlKey = 'callback_url';
var signature_algorithm = "sha1";
class APIConfig {
  uploadPrefix = defaultUploadPrefix;
  chunkSize = 0;
  timeout = 0;
  callbackUrl = '';
  cloudName = '';
  apiKey = '';
  apiSecret = '';
}
exports.APIConfig = APIConfig;
//# sourceMappingURL=api-config.js.map