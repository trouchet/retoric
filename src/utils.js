import { isArray, isBoolean } from "lodash";
import { isReasoning, isPremise } from "./checkers";

import { apply } from "arqeo";

/*----------------------------------------------------------------------------------------------*\
 | Boolean operators                                                                            |
\*----------------------------------------------------------------------------------------------*/

export const and = (acc, el) => acc && el;
export const or = (acc, el) => acc || el;

const batchOperation = (list, operation, defaultValue, isCallback) => {
  const error_message =
    "Batch operations expect a list of true-isCallback values.";

  if (isArray(list)) {
    if (list.every(isCallback)) {
      return list.reduce(operation, defaultValue);
    } else {
      throw TypeError(error_message);
    }
  } else {
    throw TypeError(error_message);
  }
};

export const batchAnd = (booleanList) => batchOperation(booleanList, and, true, isBoolean);
export const batchOr = (booleanList) => batchOperation(booleanList, or, false, isBoolean);

export const applyReasoningArtifact = (candidate, reasoningCallback) =>
  apply(candidate, isReasoning, reasoningCallback);

const premiseKeyValueCallback = (premise) => [premise.key, premise.value];
export const getPremisesEntries = (premises) => 
  apply(premises, isPremise, premiseKeyValueCallback);

const premiseKeyCallback = (premise) => premise.key;
export const getPremiseKeys = (premises) => apply(premises, isPremise, premiseKeyCallback);

/*----------------------------------------------------------------------------------------------*\
 | String manipulators                                                                          |
\*----------------------------------------------------------------------------------------------*/

const stringifyMap = (element) => String(element);
export const stringifier = (artifact) =>
  isArray(artifact) ? artifact.map(stringifyMap) : String(artifact);

export const delimitify = (strings, delimiter) => stringifier(strings).join(delimiter);
export const slugify = (strings) => stringifier(strings).join("_");
export const hyphenify = (strings) => stringifier(strings).join("-");
export const andify = (strings) => stringifier(strings).join("&");
export const orify = (strings) => stringifier(strings).join("|");

