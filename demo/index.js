import {
  Restore,
  State,
  Visibility,
  Appearance,
  Operation
} from "@scalable.software/restore";

await Restore.Template.load("restore.template.html");

customElements.define(Restore.Tag, Restore);

const restore = document.querySelector(Restore.Tag);

/* ───────────────────────────── States ───────────────────────────── */

// The value list of each writable state. A state without one is readonly.
const choices = {
  [State.VISIBILITY]: Visibility,
  [State.APPEARANCE]: Appearance
};

const states = document.querySelector("#states");

const addChoice = (state, values) => {
  const select = document.createElement("select");
  select.id = state;
  Object.values(values).forEach((value) => select.add(new Option(value)));
  select.addEventListener("change", () => (restore[state] = select.value));
  return select;
};

const addText = (state) => {
  const output = document.createElement("output");
  output.id = state;
  output.title = "readonly";
  return output;
};

Object.values(State).forEach((state) => {
  const name = document.createElement("dt");
  const label = document.createElement("label");
  label.htmlFor = state;
  label.textContent = choices[state] ? state : `${state} (readonly)`;
  name.append(label);

  const value = document.createElement("dd");
  value.append(
    choices[state] ? addChoice(state, choices[state]) : addText(state)
  );

  states.append(name, value);
});

// States are attributes: follow the component when it changes one itself.
const follow = () =>
  Object.values(State).forEach(
    (state) => (states.querySelector(`#${state}`).value = restore[state])
  );

new MutationObserver(follow).observe(restore, { attributes: true });
follow();

/* ───────────────────────────── Operations ───────────────────────────── */

const operations = document.querySelector("#operations");

Object.values(Operation).forEach((operation) => {
  const button = document.createElement("button");
  button.type = "button";
  button.textContent = operation;
  button.addEventListener("click", () => restore[operation]());
  operations.append(button);
});

/* ───────────────────────────── Events ───────────────────────────── */

const events = document.querySelector("#events");

const log = (event) => {
  const entry = document.createElement("li");

  const time = document.createElement("time");
  time.textContent = new Date().toLocaleTimeString();

  const type = document.createElement("strong");
  type.textContent = event.type;

  entry.append(time, type);

  if (event.detail !== null) {
    const detail = document.createElement("code");
    detail.textContent = JSON.stringify(event.detail);
    entry.append(detail);
  }

  events.append(entry);
};

// `onevent` receives every event, and leaves the `on…` properties free.
restore.onevent = log;

document
  .querySelector("#clear")
  .addEventListener("click", () => events.replaceChildren());
