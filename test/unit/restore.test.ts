import { Template } from "@scalable.software/component";

import {
  Restore,
  Tag,
  CSS,
  Attributes,
  State,
  Visibility
} from "@scalable.software/restore";

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

        and("`restore.root` contents contains template contents", () => {
          then("`restore.root` contains `div.icon`", () => {
            const div = restore.root.querySelector("div.icon");
            expect(div).not.toBeNull();
          });

          when("`restore.root` contains `div.icon`", () => {
            let div: HTMLDivElement;
            beforeEach(() => {
              div = restore.root.querySelector("div.icon") as HTMLDivElement;
            });

            then("`div.icon` contains `svg.restore`", () => {
              const svg = div.querySelector("svg.restore");
              expect(svg).not.toBeNull();
            });

            then("`div.icon` has `tabindex` `0`", () => {
              expect(div.getAttribute("tabindex")).toBe("0");
            });

            then("`div.icon` has `role` `button`", () => {
              expect(div.getAttribute("role")).toBe("button");
            });
          });
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

composition(Composition.ELEMENT, () => {
  and("Restore is defined in custom element registry", () => {
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

        then("`restore.elements.icon` is defined", () => {
          expect(restore["elements"].icon).toBeDefined();
        });

        when("`restore.elements.icon` is defined", () => {
          then(
            "`restore.elements.icon` is a cached reference to the `div` with class `icon`",
            () => {
              const icon = restore.root.querySelector(".icon") as HTMLDivElement;
              expect(restore["elements"].icon).toBe(icon);
            }
          );
        });
      });
    });
  });
});

// State
state(State.VISIBILITY, () => {
  given("Restore is defined in custom element registry", () => {
    beforeEach(() => {
      define(Restore.Tag, Restore);
    });

    and("a HTML Template is added to DOM", () => {
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

        then("`restore.visibility` getter exists", () => {
          expect(restore.visibility).toBeDefined();
        });

        when("`restore.visibility` getter exists", () => {
          then("`restore.visibility` is `Visibility.VISIBLE`", () => {
            expect(restore.visibility).toBe(Visibility.VISIBLE);
          });
        });

        then("`visibility` attribute does not exist", () => {
          expect(restore.hasAttribute(Attributes.VISIBILITY)).toBeFalse();
        });

        then("`restore.visibility` setter exists", () => {
          expect(hasSetter(restore, "visibility")).toBeTrue();
        });

        and("`restore.visibility` setter exists", () => {
          when("`restore.visibility` is set to `Visibility.HIDDEN`", () => {
            beforeEach(() => {
              restore.visibility = Visibility.HIDDEN;
            });

            then("`restore.visibility` is `Visibility.HIDDEN`", () => {
              expect(restore.visibility).toBe(Visibility.HIDDEN);
            });

            then("restore `visibility` attribute is `Visibility.HIDDEN`", () => {
              const value = restore.getAttribute(Attributes.VISIBILITY);
              expect(value).toBe(Visibility.HIDDEN);
            });
          });

          and("`restore.visibility` is `Visibility.HIDDEN`", () => {
            beforeEach(() => {
              restore.visibility = Visibility.HIDDEN;
            });

            when("`restore.visibility` is set to `null`", () => {
              beforeEach(() => {
                restore.visibility = null;
              });

              then("`restore.visibility` is `Visibility.VISIBLE`", () => {
                expect(restore.visibility).toBe(Visibility.VISIBLE);
              });
            });
          });

          when("`visibility` attribute is set to `Visibility.HIDDEN`", () => {
            beforeEach(() => {
              restore.setAttribute(Attributes.VISIBILITY, Visibility.HIDDEN);
            });

            then("`restore.visibility` is `Visibility.HIDDEN`", () => {
              expect(restore.visibility).toBe(Visibility.HIDDEN);
            });
          });

          when("`restore.visibility` is set to `invalid`", () => {
            let error: Error;
            beforeEach(() => {
              try {
                // @ts-expect-error
                restore.visibility = "invalid";
              } catch (err) {
                error = err as Error;
              }
            });

            then("an error is thrown", () => {
              expect(error).toBeDefined();
            });

            then(
              "error message contains 'Invalid visibility value: invalid'",
              () => {
                expect(error.message).toBe("Invalid visibility value: invalid");
              }
            );

            then("`restore.visibility` is `Visibility.VISIBLE`", () => {
              expect(restore.visibility).toBe(Visibility.VISIBLE);
            });
          });
        });
      });
    });
  });
});

// Operation

// Event

// Gesture
