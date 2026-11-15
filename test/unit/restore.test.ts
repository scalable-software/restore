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
  Operation,
  Event,
  Gesture,
  Key
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

            then("`div.icon` has `aria-label` `Restore`", () => {
              expect(div.getAttribute("aria-label")).toBe("Restore");
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

        then("assigning `restore.status` outside the restore does not compile", () => {
          const assign = () => {
            // @ts-expect-error: the setter of `status` is private
            restore.status = Status.PRESSED;
          };
          expect(assign).toEqual(jasmine.any(Function));
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

      and("a new restore is added to DOM and its icon is pressed", () => {
        let restore: Restore;
        beforeEach(() => {
          restore = add<Restore>(Restore.Tag);
          const icon = restore.root.querySelector(".icon") as HTMLElement;
          icon.dispatchEvent(new PointerEvent(Gesture.POINTERDOWN));
        });
        afterEach(() => {
          restore.remove();
        });

        then("`status` attribute is `Status.PRESSED`", () => {
          const value = restore.getAttribute(Attributes.STATUS);
          expect(value).toBe(Status.PRESSED);
        });

        when("`status` attribute is set to `Status.RELEASED`", () => {
          let errors: number;
          beforeEach(async () => {
            await jasmine.spyOnGlobalErrorsAsync(async (reported) => {
              restore.setAttribute(Attributes.STATUS, Status.RELEASED);
              errors = reported.calls.count();
            });
          });

          then("`status` attribute is `Status.PRESSED`", () => {
            const value = restore.getAttribute(Attributes.STATUS);
            expect(value).toBe(Status.PRESSED);
          });

          then("`restore.status` is `Status.PRESSED`", () => {
            expect(restore.status).toBe(Status.PRESSED);
          });

          then("no error is reported", () => {
            expect(errors).toBe(0);
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
events(Event.ON_HIDE, () => {
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

        then("`restore.onhide` setter exists", () => {
          expect(hasSetter(restore, Event.ON_HIDE)).toBeTrue();
        });

        and("`restore.onhide` setter exists", () => {
          and("`restore.onhide` is set to a listener", () => {
            let onhide: jasmine.Spy;
            beforeEach(() => {
              onhide = jasmine.createSpy("onhide");
              restore.onhide = onhide;
            });

            when("`restore.onhide` is set to `invalid`", () => {
              let error: Error;
              beforeEach(() => {
                try {
                  // @ts-expect-error
                  restore.onhide = "invalid";
                } catch (err) {
                  error = err as Error;
                }
              });

              then("an error is thrown", () => {
                expect(error).toBeDefined();
              });

              then("error message contains 'Invalid onhide value: invalid'", () => {
                expect(error.message).toBe("Invalid onhide value: invalid");
              });

              when("`restore.visibility` is set to `Visibility.HIDDEN`", () => {
                beforeEach(() => {
                  restore.visibility = Visibility.HIDDEN;
                });

                then("`restore.onhide` is still called", () => {
                  expect(onhide).toHaveBeenCalled();
                });
              });
            });

            and("`restore.onhide` is set to a new listener", () => {
              let onhide2: jasmine.Spy;
              beforeEach(() => {
                onhide2 = jasmine.createSpy("onhide2");
                restore.onhide = onhide2;
              });

              when("`restore.visibility` is set to `Visibility.HIDDEN`", () => {
                beforeEach(() => {
                  restore.visibility = Visibility.HIDDEN;
                });

                then("old `restore.onhide` is not called", () => {
                  expect(onhide).not.toHaveBeenCalled();
                });

                then("new `restore.onhide` is called", () => {
                  expect(onhide2).toHaveBeenCalled();
                });
              });
            });

            when("`restore.visibility` is set to `Visibility.HIDDEN` twice", () => {
              beforeEach(() => {
                restore.visibility = Visibility.HIDDEN;
                restore.visibility = Visibility.HIDDEN;
              });

              then("`restore.onhide` is called once", () => {
                expect(onhide).toHaveBeenCalledTimes(1);
              });
            });

            when("`restore.visibility` is set to `Visibility.HIDDEN`", () => {
              beforeEach(() => {
                restore.visibility = Visibility.HIDDEN;
              });

              then("`restore.onhide` is called", () => {
                expect(onhide).toHaveBeenCalled();
              });

              then(
                "`restore.onhide` is called with `{ detail: { visibility: Visibility.HIDDEN } }`",
                () => {
                  const message = {
                    detail: { visibility: Visibility.HIDDEN }
                  };
                  expect(onhide).toHaveBeenCalledWith(
                    jasmine.objectContaining(message)
                  );
                }
              );
            });
          });
        });
      });
    });
  });
});

events(Event.ON_SHOW, () => {
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

        then("`restore.onshow` setter exists", () => {
          expect(hasSetter(restore, Event.ON_SHOW)).toBeTrue();
        });

        and("`restore.onshow` setter exists", () => {
          and("`restore.visibility` is `Visibility.HIDDEN`", () => {
            beforeEach(() => {
              restore.visibility = Visibility.HIDDEN;
            });

            and("`restore.onshow` is set to a listener", () => {
              let onshow: jasmine.Spy;
              beforeEach(() => {
                onshow = jasmine.createSpy("onshow");
                restore.onshow = onshow;
              });

              when("`restore.onshow` is set to `invalid`", () => {
                let error: Error;
                beforeEach(() => {
                  try {
                    // @ts-expect-error
                    restore.onshow = "invalid";
                  } catch (err) {
                    error = err as Error;
                  }
                });

                then("an error is thrown", () => {
                  expect(error).toBeDefined();
                });

                then("error message contains 'Invalid onshow value: invalid'", () => {
                  expect(error.message).toBe("Invalid onshow value: invalid");
                });

                when("`restore.visibility` is set to `Visibility.VISIBLE`", () => {
                  beforeEach(() => {
                    restore.visibility = Visibility.VISIBLE;
                  });

                  then("`restore.onshow` is still called", () => {
                    expect(onshow).toHaveBeenCalled();
                  });
                });
              });

              and("`restore.onshow` is set to a new listener", () => {
                let onshow2: jasmine.Spy;
                beforeEach(() => {
                  onshow2 = jasmine.createSpy("onshow2");
                  restore.onshow = onshow2;
                });

                when("`restore.visibility` is set to `Visibility.VISIBLE`", () => {
                  beforeEach(() => {
                    restore.visibility = Visibility.VISIBLE;
                  });

                  then("old `restore.onshow` is not called", () => {
                    expect(onshow).not.toHaveBeenCalled();
                  });

                  then("new `restore.onshow` is called", () => {
                    expect(onshow2).toHaveBeenCalled();
                  });
                });
              });

              when("`restore.visibility` is set to `Visibility.VISIBLE` twice", () => {
                beforeEach(() => {
                  restore.visibility = Visibility.VISIBLE;
                  restore.visibility = Visibility.VISIBLE;
                });

                then("`restore.onshow` is called once", () => {
                  expect(onshow).toHaveBeenCalledTimes(1);
                });
              });

              when("`restore.visibility` is set to `Visibility.VISIBLE`", () => {
                beforeEach(() => {
                  restore.visibility = Visibility.VISIBLE;
                });

                then("`restore.onshow` is called", () => {
                  expect(onshow).toHaveBeenCalled();
                });

                then(
                  "`restore.onshow` is called with `{ detail: { visibility: Visibility.VISIBLE } }`",
                  () => {
                    const message = {
                      detail: { visibility: Visibility.VISIBLE }
                    };
                    expect(onshow).toHaveBeenCalledWith(
                      jasmine.objectContaining(message)
                    );
                  }
                );
              });
            });
          });
        });
      });
    });
  });
});

events(Event.ON_RESTORE, () => {
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

        then("`restore.onrestore` setter exists", () => {
          expect(hasSetter(restore, Event.ON_RESTORE)).toBeTrue();
        });

        and("`restore.onrestore` setter exists", () => {
          and("`restore.onrestore` is set to a listener", () => {
            let onrestore: jasmine.Spy;
            beforeEach(() => {
              onrestore = jasmine.createSpy("onrestore");
              restore.onrestore = onrestore;
            });

            when("`restore.restore` is invoked", () => {
              beforeEach(() => {
                restore.restore();
              });

              then("`restore.onrestore` is called once", () => {
                expect(onrestore).toHaveBeenCalledTimes(1);
              });

              then("`restore.onrestore` is called with no detail", () => {
                const message = { detail: null };
                expect(onrestore).toHaveBeenCalledWith(
                  jasmine.objectContaining(message)
                );
              });
            });

            when("`restore.onrestore` is set to `invalid`", () => {
              let error: Error;
              beforeEach(() => {
                try {
                  // @ts-expect-error
                  restore.onrestore = "invalid";
                } catch (err) {
                  error = err as Error;
                }
              });

              then("an error is thrown", () => {
                expect(error).toBeDefined();
              });

              then(
                "error message contains 'Invalid onrestore value: invalid'",
                () => {
                  expect(error.message).toBe("Invalid onrestore value: invalid");
                }
              );

              when("`restore.restore` is invoked", () => {
                beforeEach(() => {
                  restore.restore();
                });

                then("`restore.onrestore` is still called", () => {
                  expect(onrestore).toHaveBeenCalled();
                });
              });
            });

            and("`restore.onrestore` is set to a new listener", () => {
              let onrestore2: jasmine.Spy;
              beforeEach(() => {
                onrestore2 = jasmine.createSpy("onrestore2");
                restore.onrestore = onrestore2;
              });

              when("`restore.restore` is invoked", () => {
                beforeEach(() => {
                  restore.restore();
                });

                then("old `restore.onrestore` is not called", () => {
                  expect(onrestore).not.toHaveBeenCalled();
                });

                then("new `restore.onrestore` is called", () => {
                  expect(onrestore2).toHaveBeenCalled();
                });
              });
            });

            when("`restore.restore` is invoked twice", () => {
              beforeEach(() => {
                restore.restore();
                restore.restore();
              });

              then("`restore.onrestore` is called twice", () => {
                expect(onrestore).toHaveBeenCalledTimes(2);
              });
            });
          });
        });
      });
    });
  });
});

// Gesture
gesture(Gesture.POINTERDOWN, () => {
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

        when("user presses the pointer down on `div` with class `icon`", () => {
          beforeEach(() => {
            const icon = restore.root.querySelector(".icon") as HTMLElement;
            icon.dispatchEvent(new PointerEvent(Gesture.POINTERDOWN));
          });

          then("`restore.status` is `Status.PRESSED`", () => {
            expect(restore.status).toEqual(Status.PRESSED);
          });

          and("user presses the pointer down on `div` with class `icon`", () => {
            beforeEach(() => {
              const icon = restore.root.querySelector(".icon") as HTMLElement;
              icon.dispatchEvent(new PointerEvent(Gesture.POINTERDOWN));
            });

            then("`restore.status` is `Status.PRESSED`", () => {
              expect(restore.status).toEqual(Status.PRESSED);
            });
          });
        });
      });
    });
  });
});

gesture(Gesture.POINTERUP, () => {
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

        and("user presses the pointer down on `div` with class `icon`", () => {
          beforeEach(() => {
            const icon = restore.root.querySelector(".icon") as HTMLElement;
            icon.dispatchEvent(new PointerEvent(Gesture.POINTERDOWN));
          });

          when("user lifts the pointer from `div` with class `icon`", () => {
            beforeEach(() => {
              const icon = restore.root.querySelector(".icon") as HTMLElement;
              icon.dispatchEvent(new PointerEvent(Gesture.POINTERUP));
            });

            then("`restore.status` is `Status.RELEASED`", () => {
              expect(restore.status).toEqual(Status.RELEASED);
            });

            then("`status` attribute is `Status.RELEASED`", () => {
              const value = restore.getAttribute(Attributes.STATUS);
              expect(value).toBe(Status.RELEASED);
            });
          });
        });
      });
    });
  });
});

gesture(Gesture.POINTERLEAVE, () => {
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

        when("the pointer leaves `div` with class `icon`", () => {
          beforeEach(() => {
            const icon = restore.root.querySelector(".icon") as HTMLElement;
            icon.dispatchEvent(new PointerEvent(Gesture.POINTERLEAVE));
          });

          then("`restore.status` is `Status.RELEASED`", () => {
            expect(restore.status).toEqual(Status.RELEASED);
          });
        });

        and("user presses the pointer down on `div` with class `icon`", () => {
          beforeEach(() => {
            const icon = restore.root.querySelector(".icon") as HTMLElement;
            icon.dispatchEvent(new PointerEvent(Gesture.POINTERDOWN));
          });

          when("the pointer leaves `div` with class `icon`", () => {
            let onrestore: jasmine.Spy;
            beforeEach(() => {
              onrestore = jasmine.createSpy("onrestore");
              restore.onrestore = onrestore;
              const icon = restore.root.querySelector(".icon") as HTMLElement;
              icon.dispatchEvent(new PointerEvent(Gesture.POINTERLEAVE));
            });

            then("`restore.status` is `Status.RELEASED`", () => {
              expect(restore.status).toEqual(Status.RELEASED);
            });

            then("`status` attribute is `Status.RELEASED`", () => {
              const value = restore.getAttribute(Attributes.STATUS);
              expect(value).toBe(Status.RELEASED);
            });

            then("`onrestore` is not called", () => {
              expect(onrestore).not.toHaveBeenCalled();
            });
          });
        });
      });
    });
  });
});

gesture(Gesture.CLICK, () => {
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

        when("user `click` on `div` with class `icon`", () => {
          let onrestore: jasmine.Spy;
          beforeEach(() => {
            onrestore = jasmine.createSpy("onrestore");
            restore.onrestore = onrestore;
            const icon = restore.root.querySelector(".icon") as HTMLElement;
            icon.click();
          });

          then("`onrestore` is called once", () => {
            expect(onrestore).toHaveBeenCalledTimes(1);
          });

          and("user `click` on `div` with class `icon`", () => {
            beforeEach(() => {
              const icon = restore.root.querySelector(".icon") as HTMLElement;
              icon.click();
            });

            then("`onrestore` is called twice", () => {
              expect(onrestore).toHaveBeenCalledTimes(2);
            });
          });
        });
      });
    });
  });
});

gesture(Gesture.KEYDOWN, () => {
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

        when("user presses `Key.ENTER` on `div` with class `icon`", () => {
          let onrestore: jasmine.Spy;
          beforeEach(() => {
            onrestore = jasmine.createSpy("onrestore");
            restore.onrestore = onrestore;
            const icon = restore.root.querySelector(".icon") as HTMLElement;
            icon.dispatchEvent(
              new KeyboardEvent(Gesture.KEYDOWN, { key: Key.ENTER })
            );
          });

          then("`restore.status` is `Status.PRESSED`", () => {
            expect(restore.status).toEqual(Status.PRESSED);
          });

          then("`status` attribute is `Status.PRESSED`", () => {
            const value = restore.getAttribute(Attributes.STATUS);
            expect(value).toBe(Status.PRESSED);
          });

          then("`onrestore` is not called", () => {
            expect(onrestore).not.toHaveBeenCalled();
          });

          and("user holds `Key.ENTER` down on `div` with class `icon`", () => {
            beforeEach(() => {
              const icon = restore.root.querySelector(".icon") as HTMLElement;
              icon.dispatchEvent(
                new KeyboardEvent(Gesture.KEYDOWN, {
                  key: Key.ENTER,
                  repeat: true
                })
              );
            });

            then("`restore.status` is `Status.PRESSED`", () => {
              expect(restore.status).toEqual(Status.PRESSED);
            });

            then("`onrestore` is not called", () => {
              expect(onrestore).not.toHaveBeenCalled();
            });
          });
        });

        when("user presses `Key.SPACE` on `div` with class `icon`", () => {
          let onrestore: jasmine.Spy;
          beforeEach(() => {
            onrestore = jasmine.createSpy("onrestore");
            restore.onrestore = onrestore;
            const icon = restore.root.querySelector(".icon") as HTMLElement;
            icon.dispatchEvent(
              new KeyboardEvent(Gesture.KEYDOWN, { key: Key.SPACE })
            );
          });

          then("`restore.status` is `Status.PRESSED`", () => {
            expect(restore.status).toEqual(Status.PRESSED);
          });

          then("`status` attribute is `Status.PRESSED`", () => {
            const value = restore.getAttribute(Attributes.STATUS);
            expect(value).toBe(Status.PRESSED);
          });

          then("`onrestore` is not called", () => {
            expect(onrestore).not.toHaveBeenCalled();
          });

          and("user holds `Key.SPACE` down on `div` with class `icon`", () => {
            beforeEach(() => {
              const icon = restore.root.querySelector(".icon") as HTMLElement;
              icon.dispatchEvent(
                new KeyboardEvent(Gesture.KEYDOWN, {
                  key: Key.SPACE,
                  repeat: true
                })
              );
            });

            then("`restore.status` is `Status.PRESSED`", () => {
              expect(restore.status).toEqual(Status.PRESSED);
            });

            then("`onrestore` is not called", () => {
              expect(onrestore).not.toHaveBeenCalled();
            });
          });
        });

        when("user presses another key on `div` with class `icon`", () => {
          let onrestore: jasmine.Spy;
          beforeEach(() => {
            onrestore = jasmine.createSpy("onrestore");
            restore.onrestore = onrestore;
            const icon = restore.root.querySelector(".icon") as HTMLElement;
            icon.dispatchEvent(new KeyboardEvent(Gesture.KEYDOWN, { key: "a" }));
          });

          then("`restore.status` is `Status.RELEASED`", () => {
            expect(restore.status).toEqual(Status.RELEASED);
          });

          then("`onrestore` is not called", () => {
            expect(onrestore).not.toHaveBeenCalled();
          });
        });

        when("user presses `Key.ENTER` on `div` with class `icon`, and the press can be cancelled", () => {
          let keydown: KeyboardEvent;
          beforeEach(() => {
            keydown = new KeyboardEvent(Gesture.KEYDOWN, {
              key: Key.ENTER,
              cancelable: true
            });
            const icon = restore.root.querySelector(".icon") as HTMLElement;
            icon.dispatchEvent(keydown);
          });

          then("the default action of the key is prevented", () => {
            expect(keydown.defaultPrevented).toBeTrue();
          });
        });

        when("user presses `Key.SPACE` on `div` with class `icon`, and the press can be cancelled", () => {
          let keydown: KeyboardEvent;
          beforeEach(() => {
            keydown = new KeyboardEvent(Gesture.KEYDOWN, {
              key: Key.SPACE,
              cancelable: true
            });
            const icon = restore.root.querySelector(".icon") as HTMLElement;
            icon.dispatchEvent(keydown);
          });

          then("the default action of the key is prevented: the page does not scroll", () => {
            expect(keydown.defaultPrevented).toBeTrue();
          });
        });

        when("user presses another key on `div` with class `icon`, and the press can be cancelled", () => {
          let keydown: KeyboardEvent;
          beforeEach(() => {
            keydown = new KeyboardEvent(Gesture.KEYDOWN, {
              key: "a",
              cancelable: true
            });
            const icon = restore.root.querySelector(".icon") as HTMLElement;
            icon.dispatchEvent(keydown);
          });

          then("the default action of the key is not prevented", () => {
            expect(keydown.defaultPrevented).toBeFalse();
          });
        });
      });
    });
  });
});
