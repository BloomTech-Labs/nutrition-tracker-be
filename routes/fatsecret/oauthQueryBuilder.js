require("dotenv").config();
const axios = require("axios");
const hmacsha1 = require("hmacsha1");

const API_PATH = "https://platform.fatsecret.com/rest/server.api";
const OAUTH_VERSION = "1.0";
const OAUTH_SIGNATURE_METHOD = "HMAC-SHA1";

module.exports = (uniqueParams = {}, method = "GET") => {
  let queryParams = orderedObject({
    ...getOauthParameters(),
    ...uniqueParams
  });

  const sha = signRequest(queryParams);

  queryParams = {
    ...queryParams,
    oauth_signature: sha
  };

  // Axios does not support params as of 2019-11-01
  // return axios.request({
  //   baseURL: API_PATH,
  //   params: queryParams
  // });
  return axios.create({
    baseURL: `${API_PATH}?${objectToString(queryParams)}`
  });
};

/********************************************************
 *                   OAUTH FUNCTIONS                    *
 ********************************************************/
function getOauthParameters() {
  const timestamp = Math.round(new Date().getTime() / 1000);

  return {
    oauth_consumer_key: process.env.FS_CONSUMER_KEY,
    oauth_nonce: `${timestamp}${Math.floor(Math.random() * 1000000)}`,
    oauth_signature_method: OAUTH_SIGNATURE_METHOD,
    oauth_timestamp: timestamp,
    oauth_version: OAUTH_VERSION,
    format: "json"
  };
}

function signRequest(queryParams, httpMethod = "GET") {
  const signatureBaseString = [
    httpMethod,
    encodeURIComponent(API_PATH),
    encodeURIComponent(objectToString(queryParams))
  ].join("&");
  const signatureKey = `${process.env.FS_CONSUMER_SECRET}&`;
  return encodeURIComponent(hmacsha1(signatureKey, signatureBaseString));
}

function objectToString(queryParams) {
  return Object.entries(queryParams)
    .map(entry => `${entry.join("=")}`)
    .join("&");
}

function orderedObject(queryParams) {
  const ordered = {};

  Object.keys(queryParams)
    .sort()
    .forEach(key => {
      ordered[key] = queryParams[key];
    });

  return ordered;
}
