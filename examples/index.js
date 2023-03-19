const rtc = require("retoric");
const { Premise, Conjunction, Disjunction } = rtc;


const premise = new Premise("true_premise", "This is a true premise", true);
const disjunction = new Disjunction_(injprops.key, injprops.description, injprops.value);
const conjunction = new Conjunction_(conjprops.key, conjprops.description, conjprops.value);

const talk = (description, reason, callback) => {
    console.log(`This is ${description}: ${callback(reason)}`);
};

const argue = (reason) => talk('argumentation', reason, (reason) => reason.argue());
const conclude = (reason) => talk('conclusion', reason, (reason) => reason.conclude());
const summarize = (reason) => talk('summary', reason, (reason) => reason.summarize());
const pitch = (reason) => talk('pitch', reason, (reason) => reason.pitch());
const verbalize = (reason) => talk('verbalization', reason, (reason) => reason.verbalize());

argue(premise);
conclude(premise);
summarize(premise);
pitch(premise);
verbalize(premise);