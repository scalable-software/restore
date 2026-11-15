import { Template } from "@scalable.software/component";

import {
  Restore,
  Tag,
  CSS,
  Attributes,
  State,
  Visibility,
  Status,
  Appearance,
  Operation
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

            when("`restore.visibility` is set to `Visibility.VISIBLE`", () => {
              beforeEach(() => {
                restore.visibility = Visibility.VISIBLE;
              });

              then("`visibility` attribute does not exist", () => {
                expect(restore.hasAttribute(Attributes.VISIBILITY)).toBeFalse();
              });
            });
          });

          and("`restore.visibility` is `Visibility.HIDDEN`", () => {
            beforeEach(() => {
              restore.visibility = Visibility.HIDDEN;
            });

            when("`visibility` attribute is set to `invalid`", () => {
              beforeEach(async () => {
                await jasmine.spyOnGlobalErrorsAsync(async () => {
                  restore.setAttribute(Attributes.VISIBILITY, "invalid");
                });
              });

              then("`visibility` attribute is `Visibility.HIDDEN`", () => {
                const value = restore.getAttribute(Attributes.VISIBILITY);
                expect(value).toBe(Visibility.HIDDEN);
              });
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

          when("`visibility` attribute is set to `invalid`", () => {
            let error: Error;
            beforeEach(async () => {
              await jasmine.spyOnGlobalErrorsAsync(async (reported) => {
                restore.setAttribute(Attributes.VISIBILITY, "invalid");
                error = reported.calls.mostRecent()?.args[0];
              });
            });

            then("`visibility` attribute does not exist", () => {
              expect(restore.hasAttribute(Attributes.VISIBILITY)).toBeFalse();
            });

            then("`restore.visibility` is `Visibility.VISIBLE`", () => {
              expect(restore.visibility).toBe(Visibility.VISIBLE);
            });

            then("an error is reported", () => {
              expect(error).toBeDefined();
            });

            then(
              "error message contains 'Invalid visibility value: invalid'",
              () => {
                expect(error.message).toBe("Invalid visibility value: invalid");
              }
            );
          });

          when("`visibility` attribute is set to `Visibility.VISIBLE`", () => {
            beforeEach(() => {
              restore.setAttribute(Attributes.VISIBILITY, Visibility.VISIBLE);
            });

            then("`visibility` attribute does not exist", () => {
              expect(restore.hasAttribute(Attributes.VISIBILITY)).toBeFalse();
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

state(State.STATUS, () => {
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

        then("`restore.status` getter exists", () => {
          expect(restore.status).toBeDefined();
        });

        when("`restore.status` getter exists", () => {
          then("`restore.status` is `Status.RELEASED`", () => {
            expect(restore.status).toBe(Status.RELEASED);
          });
        });

        then("`status` attribute exists", () => {
          const value = restore.getAttribute(Attributes.STATUS);
          expect(value).not.toBeNull();
        });

        and("`status` attribute exists", () => {
          then("`status` attribute is `Status.RELEASED`", () => {
            const value = restore.getAttribute(Attributes.STATUS);
            expect(value).toBe(Status.RELEASED);
          });

          when("`status` attribute is set to `Status.PRESSED`", () => {
            let errors: number;
            beforeEach(async () => {
              await jasmine.spyOnGlobalErrorsAsync(async (reported) => {
                restore.setAttribute(Attributes.STATUS, Status.PRESSED);
                errors = reported.calls.count();
              });
            });

            then("`status` attribute is `Status.RELEASED`", () => {
              const value = restore.getAttribute(Attributes.STATUS);
              expect(value).toBe(Status.RELEASED);
            });

            then("`restore.status` is `Status.RELEASED`", () => {
              expect(restore.status).toBe(Status.RELEASED);
            });

            then("no error is reported", () => {
              expect(errors).toBe(0);
            });
          });

          when("`status` attribute is removed", () => {
            let errors: number;
            beforeEach(async () => {
              await jasmine.spyOnGlobalErrorsAsync(async (reported) => {
                restore.removeAttribute(Attributes.STATUS);
                errors = reported.calls.count();
              });
            });

            then("`status` attribute is `Status.RELEASED`", () => {
              const value = restore.getAttribute(Attributes.STATUS);
              expect(value).toBe(Status.RELEASED);
            });

            then("no error is reported", () => {
              expect(errors).toBe(0);
            });
          });

          when("`status` attribute is set to `invalid`", () => {
            let errors: number;
            beforeEach(async () => {
              await jasmine.spyOnGlobalErrorsAsync(async (reported) => {
                restore.setAttribute(Attributes.STATUS, "invalid");
                errors = reported.calls.count();
              });
            });

            then("`status` attribute is `Status.RELEASED`", () => {
              const value = restore.getAttribute(Attributes.STATUS);
              expect(value).toBe(Status.RELEASED);
            });

            then("`restore.status` is `Status.RELEASED`", () => {
              expect(restore.status).toBe(Status.RELEASED);
            });

            then("no error is reported", () => {
              expect(errors).toBe(0);
            });
          });
        });
      });

      and("a new restore with `status` attribute `Status.PRESSED` is added to DOM", () => {
        let restore: Restore;
        beforeEach(() => {
          restore = add<Restore>(Restore.Tag, {
            [Attributes.STATUS]: Status.PRESSED
          });
        });
        afterEach(() => {
          restore.remove();
        });

        then("`restore.status` is `Status.RELEASED`", () => {
          expect(restore.status).toBe(Status.RELEASED);
        });

        then("`status` attribute is `Status.RELEASED`", () => {
          const value = restore.getAttribute(Attributes.STATUS);
          expect(value).toBe(Status.RELEASED);
        });
      });
    });
  });
});

state(State.APPEARANCE, () => {
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

        then("`restore.appearance` getter exists", () => {
          expect(restore.appearance).toBeDefined();
        });

        when("`restore.appearance` getter exists", () => {
          then("`restore.appearance` is `Appearance.FLOATING`", () => {
            expect(restore.appearance).toBe(Appearance.FLOATING);
          });
        });

        then("`appearance` attribute does not exist", () => {
          expect(restore.hasAttribute(Attributes.APPEARANCE)).toBeFalse();
        });

        then("`restore.appearance` setter exists", () => {
          expect(hasSetter(restore, "appearance")).toBeTrue();
        });

        and("`restore.appearance` setter exists", () => {
          when("`restore.appearance` is set to `Appearance.FLAT`", () => {
            beforeEach(() => {
              restore.appearance = Appearance.FLAT;
            });

            then("`restore.appearance` is `Appearance.FLAT`", () => {
              expect(restore.appearance).toBe(Appearance.FLAT);
            });

            then("restore `appearance` attribute is `Appearance.FLAT`", () => {
              const value = restore.getAttribute(Attributes.APPEARANCE);
              expect(value).toBe(Appearance.FLAT);
            });

            when("`restore.appearance` is set to `Appearance.FLOATING`", () => {
              beforeEach(() => {
                restore.appearance = Appearance.FLOATING;
              });

              then("`appearance` attribute does not exist", () => {
                expect(restore.hasAttribute(Attributes.APPEARANCE)).toBeFalse();
              });
            });
          });

          and("`restore.appearance` is `Appearance.FLAT`", () => {
            beforeEach(() => {
              restore.appearance = Appearance.FLAT;
            });

            when("`appearance` attribute is set to `invalid`", () => {
              beforeEach(async () => {
                await jasmine.spyOnGlobalErrorsAsync(async () => {
                  restore.setAttribute(Attributes.APPEARANCE, "invalid");
                });
              });

              then("`appearance` attribute is `Appearance.FLAT`", () => {
                const value = restore.getAttribute(Attributes.APPEARANCE);
                expect(value).toBe(Appearance.FLAT);
              });
            });

            when("`restore.appearance` is set to `null`", () => {
              beforeEach(() => {
                restore.appearance = null;
              });

              then("`restore.appearance` is `Appearance.FLOATING`", () => {
                expect(restore.appearance).toBe(Appearance.FLOATING);
              });
            });
          });

          when("`appearance` attribute is set to `Appearance.FLAT`", () => {
            beforeEach(() => {
              restore.setAttribute(Attributes.APPEARANCE, Appearance.FLAT);
            });

            then("`restore.appearance` is `Appearance.FLAT`", () => {
              expect(restore.appearance).toBe(Appearance.FLAT);
            });
          });

          when("`appearance` attribute is set to `invalid`", () => {
            let error: Error;
            beforeEach(async () => {
              await jasmine.spyOnGlobalErrorsAsync(async (reported) => {
                restore.setAttribute(Attributes.APPEARANCE, "invalid");
                error = reported.calls.mostRecent()?.args[0];
              });
            });

            then("`appearance` attribute does not exist", () => {
              expect(restore.hasAttribute(Attributes.APPEARANCE)).toBeFalse();
            });

            then("`restore.appearance` is `Appearance.FLOATING`", () => {
              expect(restore.appearance).toBe(Appearance.FLOATING);
            });

            then("an error is reported", () => {
              expect(error).toBeDefined();
            });

            then(
              "error message contains 'Invalid appearance value: invalid'",
              () => {
                expect(error.message).toBe("Invalid appearance value: invalid");
              }
            );
          });

          when("`appearance` attribute is set to `Appearance.FLOATING`", () => {
            beforeEach(() => {
              restore.setAttribute(Attributes.APPEARANCE, Appearance.FLOATING);
            });

            then("`appearance` attribute does not exist", () => {
              expect(restore.hasAttribute(Attributes.APPEARANCE)).toBeFalse();
            });
          });

          when("`restore.appearance` is set to `invalid`", () => {
            let error: Error;
            beforeEach(() => {
              try {
                // @ts-expect-error
                restore.appearance = "invalid";
              } catch (err) {
                error = err as Error;
              }
            });

            then("an error is thrown", () => {
              expect(error).toBeDefined();
            });

            then(
              "error message contains 'Invalid appearance value: invalid'",
              () => {
                expect(error.message).toBe("Invalid appearance value: invalid");
              }
            );

            then("`restore.appearance` is `Appearance.FLOATING`", () => {
              expect(restore.appearance).toBe(Appearance.FLOATING);
            });
          });
        });
      });
    });
  });
});

// Operation
operation(Operation.HIDE, () => {
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

        then("`restore.hide` method exists", () => {
          expect(restore.hide).toBeDefined();
        });

        and("`restore.hide` method exists", () => {
          when("invoking `restore.hide`", () => {
            let result: unknown;
            beforeEach(() => {
              result = restore.hide();
            });

            then("`restore.visibility` is `Visibility.HIDDEN`", () => {
              expect(restore.visibility).toBe(Visibility.HIDDEN);
            });

            then("`restore.hide` returns nothing", () => {
              expect(result).toBeUndefined();
            });
          });
        });
      });
    });
  });
});

operation(Operation.SHOW, () => {
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

        then("`restore.show` method exists", () => {
          expect(restore.show).toBeDefined();
        });

        and("`restore.show` method exists", () => {
          and("`restore.visibility` is `Visibility.HIDDEN`", () => {
            beforeEach(() => {
              restore.visibility = Visibility.HIDDEN;
            });

            when("invoking `restore.show`", () => {
              let result: unknown;
              beforeEach(() => {
                result = restore.show();
              });

              then("`restore.visibility` is `Visibility.VISIBLE`", () => {
                expect(restore.visibility).toBe(Visibility.VISIBLE);
              });

              then("`restore.show` returns nothing", () => {
                expect(result).toBeUndefined();
              });
            });
          });
        });
      });
    });
  });
});

operation(Operation.RESTORE, () => {
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

        then("`restore.restore` method exists", () => {
          expect(restore.restore).toBeDefined();
        });

        and("`restore.restore` method exists", () => {
          when("invoking `restore.restore`", () => {
            let result: unknown;
            beforeEach(() => {
              result = restore.restore();
            });

            then("`restore.visibility` is `Visibility.VISIBLE`", () => {
              expect(restore.visibility).toBe(Visibility.VISIBLE);
            });

            then("`restore.status` is `Status.RELEASED`", () => {
              expect(restore.status).toBe(Status.RELEASED);
            });

            then("`restore.appearance` is `Appearance.FLOATING`", () => {
              expect(restore.appearance).toBe(Appearance.FLOATING);
            });

            then("`restore.restore` returns nothing", () => {
              expect(result).toBeUndefined();
            });
          });
        });
      });
    });
  });
});

// Event

// Gesture
