import { isArray, isBoolean } from "lodash";
import { isReasoning, isPremise } from "./checkers";

import { apply } from "arqeo";

/*----------------------------------------------------------------------------------------------*\
 | Boolean operators                                                                            |
\*----------------------------------------------------------------------------------------------*/

export const and = (acc, el) => acc && el;
export const or = (acc, el) => acc || el;

export const batchOperation = (list, operation, defaultValue, isCallback) => {
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

export const getPremisesEntries = (premises) => 
  apply(premises, isPremise, (premise) => [premise.key, premise.value]);

export const getPremiseKeys = (premises) => apply(premises, isPremise, (premise) => premise.key);

/*----------------------------------------------------------------------------------------------*\
 | String manipulators                                                                          |
\*----------------------------------------------------------------------------------------------*/

export const stringifier = (artifact) =>
  isArray(artifact) ? artifact.map((element) => String(element)) : String(artifact);

export const delimitify = (strings, delimiter) => stringifier(strings).join(delimiter);
export const slugify = (strings) => stringifier(strings).join("_");
export const hyphenify = (strings) => stringifier(strings).join("-");
export const andify = (strings) => stringifier(strings).join("&");
export const orify = (strings) => stringifier(strings).join("|");

