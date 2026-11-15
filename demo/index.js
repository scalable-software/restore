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

/* Operations: one button for each operation the package exports */
const operations = document.querySelector("#operations");

Object.values(Operation).forEach((name) => {
  const button = document.createElement("button");
  button.textContent = name;
  button.addEventListener("click", () => restore[name]());
  operations.append(button);
});

/* States: a choice for each writable state, text for each readonly state */
const states = document.querySelector("#states");

const writable = {
  [State.VISIBILITY]: Visibility,
  [State.APPEARANCE]: Appearance
};

const followers = Object.values(State).map((name) => {
  const term = document.createElement("dt");
  term.textContent = name;

  const description = document.createElement("dd");
  states.append(term, description);

  if (name in writable) {
    const select = document.createElement("select");
    Object.values(writable[name]).forEach((value) =>
      select.append(new Option(value, value))
    );
    select.addEventListener("change", () => (restore[name] = select.value));
    description.append(select);

    return () => (select.value = restore[name]);
  }

  const value = document.createElement("output");
  description.append(value, " (readonly)");

  return () => (value.textContent = restore[name]);
});

const follow = () => followers.forEach((follower) => follower());

new MutationObserver(follow).observe(restore, { attributes: true });

follow();
