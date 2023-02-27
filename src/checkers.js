import { isUndefined } from "lodash";
import { is } from "arqeo";

import { Conjunction, Disjunction, Premise, Reasoning } from "./classes";

export const isDefined = (candidate) => !isUndefined(candidate);
export const isReasoning = (candidate) => candidate instanceof Reasoning;
export const isPremise = (candidate) => candidate instanceof Premise;
export const isConjunction = (candidate) => candidate instanceof Conjunction;
export const isDisjunction = (candidate) => candidate instanceof Disjunction;

export const isReasoningArtifact = (candidate) => is(candidate, isReasoning);
export const isPremiseArtifact = (candidate) => is(candidate, isPremise);
export const isDisjunctionArtifact = (candidate) => is(candidate, isDisjunction);
export const isConjunctionArtifact = (candidate) => is(candidate, isConjunction);
