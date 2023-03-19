import { log } from "./logger.js";
import _ from "lodash";

/**
 * @abstract throw an error with prescribed unable task message
 *
 * @param {String} message
 */
export const debug = (message) => log("debug", message);

/**
 * @abstract throw an error with prescribed unable task message
 *
 * @param {String} message
 */
export const warn = (message) => log("warn", message);

/**
 * @abstract throw an error with prescribed unable task message
 *
 * @param {String} message
 */
export const raise = (error) => {
  log("error", error.message);
  throw error;
};

/**
 * @abstract throw an error with prescribed unable task message
 *
 * @param {String} message
 */
export const report = (message) => log("info", message);

/**
 * @abstract throw an error with prescribed unable task message
 *
 * @param {String} message
 */
export const joke = (message) => log("silly", message);
