import { isArray, isBoolean } from "lodash";
import { isReasoning, isPremise } from "./checkers.js";

import { apply } from "arqeo";
import { OperationError } from "./errors.js";

export const toReasoningCandidate = (
  key = undefined,
  description = undefined,
  value = undefined,
) => {
  return { key: key, description: description, value: value };
};

/*----------------------------------------------------------------------------------------------*\
 | Boolean operators                                                                            |
\*----------------------------------------------------------------------------------------------*/

export const and = (acc, el) => acc && el;
export const or = (acc, el) => acc || el;

export const batchOperation = (list, operation, defaultValue, isCallback) => {
  if (isArray(list)) {
    if (list.length >= 2) {
      if (list.every(isCallback)) {
        return list.reduce(operation, defaultValue);
      } else {
        throw new OperationError();
      }
    } else {
      throw new OperationError();
    }
  } else {
    throw new OperationError();
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
export const enumerate = (array) => {
  let enumeratedStringArray = "";
  let line;

  const enumHandler = (index, el) => `${index}. ${String(el)}`;

  array.slice(0, array.length - 1).forEach((el, index) => {
    line = `${enumHandler(index, el)}\n`;
    enumeratedStringArray += line;
  });

  const id = array.length - 1;
  return enumeratedStringArray + enumHandler(id, array[id]);
};

/*----------------------------------------------------------------------------------------------*\
 | Apply artifact                                                                               |
\*----------------------------------------------------------------------------------------------*/

// Callbacks
const pitchCallback = (premise) => premise.pitch();
const verbalizeCallback = (premise) => premise.verbalize();
const concludeCallback = (premise) => premise.conclude();
const argueCallback = (premise) => premise.argue();
const summarizeCallback = (premise) => premise.summarize();

// Apply callbacks
export const applyPitch = (premises) => applyReasoningArtifact(premises, pitchCallback);
export const applyVerbalization = (premises) => applyReasoningArtifact(premises, verbalizeCallback);
export const applyConclusion = (premises) => applyReasoningArtifact(premises, concludeCallback);
export const applyArguing = (premises) => applyReasoningArtifact(premises, argueCallback);
export const applySummary = (premises) => applyReasoningArtifact(premises, summarizeCallback);
