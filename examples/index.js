const rtc = require("retoric");
const { Premise, Conjunction, Disjunction } = rtc;

const talk = (description, reason, callback) => {
    console.log(`This is ${description}: ${callback(reason)}`);
};

const descriptionCallback = (name) => `This is a ${name}`;

const DisConjProps = (type, premises) => {
    return {
        key: `${type}`,
        description: descriptionCallback(type),
        value: premises,
    };
}

const argue = (reason) => talk('argumentation', reason, (reason) => reason.argue());
const conclude = (reason) => talk('conclusion', reason, (reason) => reason.conclude());
const summarize = (reason) => talk('summary', reason, (reason) => reason.summarize());
const pitch = (reason) => talk('pitch', reason, (reason) => reason.pitch());
const verbalize = (reason) => talk('verbalization', reason, (reason) => reason.verbalize());

const expose = (reason) => {
    console.log('------------------------');
    console.log(reason.description);
    console.log("\n");
    argue(reason);
    conclude(reason);
    summarize(reason);
    pitch(reason);
    verbalize(reason);
    console.log('------------------------');
};

const truePremise = new Premise("true_premise", "This is a true premise", true);
const falsePremise = new Premise("false_premise", "This is a false premise", false);

const premiseArtifacts = [
  [truePremise, truePremise],
  [truePremise, falsePremise],
  [falsePremise, truePremise],
  [falsePremise, falsePremise],
];

let props
let disjunctions = []; 
let conjunctions = [];

for (const premises of premiseArtifacts) {
    props = DisConjProps('disjunction', premises);
    disjunction = new Disjunction(props.key, props.description, props.value);
    
    props = DisConjProps('conjunction', premises);
    conjunction = new Conjunction(props.key, props.description, props.value);

    disjunctions.push(disjunction);
    conjunctions.push(conjunction);
}

expose(truePremise);
expose(falsePremise);

disjunctions.forEach(disjunction => expose(disjunction)); 
conjunctions.forEach(conjunction => expose(conjunction)); 
