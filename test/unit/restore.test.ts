import { Template } from "@scalable.software/component";

import { Restore, Tag, CSS, Attributes } from "@scalable.software/restore";

// Configuration
configuration(Configuration.TAG, () => {
  and("Restore imported", () => {
    then("Restore is defined", () => {
      expect(Restore).toBeDefined();
    });

    and("Restore is defined", () => {
      then("Restore.Tag static getter is defined", () => {
        expect(Restore.Tag).toBeDefined();
      });

      and("Restore.Tag static getter is defined", () => {
        then("Restore.Tag is Tag", () => {
          expect(Restore.Tag).toBe(Tag);
        });
      });
    });
  });
});

configuration(Configuration.ATTRIBUTES, () => {
  and("Restore imported", () => {
    then("Restore is defined", () => {
      expect(Restore).toBeDefined();
    });

    and("Restore is defined", () => {
      then("Restore.Attributes static getter is defined", () => {
        expect(Restore.Attributes).toBeDefined();
      });

      and("Restore.Attributes static getter is defined", () => {
        then("Restore.Attributes is Attributes", () => {
          expect(Restore.Attributes).toBe(Attributes);
        });
      });
    });
  });
});

// Utilities
utility(Utilities.TEMPLATE, () => {
  then("Restore.Template static property is defined", () => {
    expect(Restore.Template).toBeDefined();
  });

  and("Restore.Template static property is defined", () => {
    then("Restore.Template is a Template", () => {
      expect(Restore.Template).toBeInstanceOf(Template);
    });
  });
});

// Compositions
composition(Composition.TEMPLATE, () => {
  given("Restore is defined in custom element registry", () => {
    beforeEach(() => {
      define(Restore.Tag, Restore);
    });

    and("HTML Template is added to DOM", () => {
      let template: HTMLTemplateElement;
      beforeEach(async () => {
        template = (await Restore.Template.load(
          "restore.template.html"
        )) as HTMLTemplateElement;
      });
      afterEach(() => {
        remove(Restore.Tag);
      });

      then("template is defined", () => {
        expect(template).toBeDefined();
      });

      and("a new restore is added to DOM", () => {
        let restore: Restore;
        beforeEach(() => {
          restore = add<Restore>(Restore.Tag);
        });
        afterEach(() => {
          restore.remove();
        });

        then("restore.root contents contains template contents", () => {
          expect(restore.root.innerHTML).toContain(template.innerHTML);
        });
      });
    });
  });
});

composition(Composition.CSS, () => {
  given("Restore is defined in custom element registry", () => {
    beforeEach(() => {
      define(Restore.Tag, Restore);
    });
    and("HTML Template is added to DOM", () => {
      beforeEach(async () => {
        await Restore.Template.load("restore.template.html");
      });
      afterEach(() => {
        remove(Restore.Tag);
      });

      and("a new restore is added to DOM", () => {
        let restore: Restore;
        beforeEach(() => {
          restore = add<Restore>(Restore.Tag);
        });
        afterEach(() => {
          restore.remove();
        });

        then("restore.root contents contains a link to stylesheet", () => {
          expect(restore.root.innerHTML).toContain("stylesheet");
        });

        and("restore.root contents contains a link to stylesheet", () => {
          then("the stylesheet file's name is correct", () => {
            expect(restore.root.innerHTML).toContain(CSS);
          });
        });
      });
    });
  });
});

// State

// Operation

// Event

// Gesture
