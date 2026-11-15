import { Restore, Operation } from "@scalable.software/restore";

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
