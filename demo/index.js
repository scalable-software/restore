import { Restore } from "@scalable.software/restore";

await Restore.Template.load("restore.template.html");

customElements.define(Restore.Tag, Restore);
