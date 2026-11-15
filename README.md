![License: CC BY-NC-SA 4.0](https://flat.badgen.net/static/license/CC-BY-NC-SA-4.0/green)

# Restore

A lightweight, self-contained web component that lets users ask for a window, panel or dialog to be restored to its normal size. It can be shown or hidden on demand, responds visually to user interaction, and adapts automatically to light and dark themes, emitting an event for each request to give product teams a single drop-in control: the host application does the restoring.

---

## 1. Introduction

The **Restore** component is a press button, like the restore control in the corner of a desktop window. It does not restore anything itself: each time the user asks, it sends an `onrestore` event, and the host application does the restoring. It can be hidden and shown, and it can stand alone or lie flat inside another surface such as a taskbar.

### 1.1 Installation & Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/scalable-software/restore.git
   cd restore
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Run Tests (Optional)**

   ```bash
   npm test
   ```

   - Checks the specification, compiles, and runs the suite in headless Chrome.

4. **Start Local Server**

   ```bash
   npm run serve
   ```

   - This builds the component and opens the demo page, with `<restore-button>` on a stage and a group of controls for its operations, states and events.

---

## 2. Quick Start Usage Walkthrough

This walkthrough uses the demo page, right after installation.

1. **Open** the served page in your browser.
   - A `<restore-button>` is shown in the band across the top.

2. **Click** the `<restore-button>`.
   - The **Events** group logs `onrestore null`: the request was made, and it carries no detail.
   - While the pointer is held down, the **States** group shows `status` as `pressed`; it returns to `released` when the pointer is lifted.

3. **Press and move away**: hold the pointer down on the button, move off it, then let go.
   - `status` returns to `released` when the pointer leaves, and no `onrestore` is logged.

4. **Use the keyboard**: press Tab until the button has focus, then press and let go of Enter or the space bar.
   - While the key is held down, `status` is `pressed`; one `onrestore` is logged when the key is let go.
   - Press the key, then press Tab before letting go: `status` returns to `released`, and no `onrestore` is logged.

5. **Call an operation**: click `restore` in the **Operations** group, or in the console:

   ```js
   const restore = document.querySelector("restore-button");
   restore.restore();
   ```

   - Every call logs one `onrestore`.

6. **Listen** for the request in the console:

   ```js
   restore.onrestore = () => console.log("Restoring was requested");
   ```

7. **Hide and show** the button: click `hide` and `show`, or choose a `visibility` in the **States** group.
   - The log shows `onhide {"visibility":"hidden"}` and `onshow {"visibility":"visible"}`.

8. **Lay it flat**: choose `flat` for `appearance` in the **States** group.
   - The button loses its border, shadow and rounded corners.

For more details on **States**, **Operations**, and **Events**, consult the sections below or check the generated **API documentation** (see `npm run document`).

---

## 3. Architectural Overview

### 3.1 Composition

- **Template** (`restore.template.html`): Defines DOM structure — a `.icon` container, which can take focus, has the role of a button and is announced as "Restore", holding the SVG icon of two overlapping squares.
- **Style** (`restore.style.css`): Encapsulates appearance, including the pressed look, the flat appearance, hover effects, and light/dark theme adaptation.
- **Class** (`restore.ts`): Extends the base component class to handle lifecycle hooks, Shadow DOM creation, attribute reflection, and event dispatch.

> **Separation of Concerns**
>
> - **HTML** for structure
> - **CSS** for presentation
> - **TypeScript** for behavior

### 3.2 Class Lifecycle

Lifecycle methods are implemented in the base class and extended by the **Restore** component:

- **`connectedCallback()`**
  1. Creates a Shadow DOM.
  2. Clones the HTML template into the Shadow Root.
  3. Inserts a `<link>` for scoped CSS.
  4. Puts the compulsory `status` attribute in place.
  5. Sets up event listeners on the icon: pointer down, pointer up, pointer leave, click, key down, key up and blur.

- **`disconnectedCallback()`**
  - Removes the event listeners.

---

## 4. Core Concepts: State, Operations, Events, and Gestures

### 4.1 State

- **`visibility`** (`visible` | `hidden`)
  - Whether the restore button is displayed.
  - **Optional attribute**: absent from the DOM when `visible` (the default); present as `[visibility="hidden"]` on the host element when hidden.

- **`status`** (`released` | `pressed`)
  - Whether the restore button is being pressed. It is `pressed` from the moment the pointer goes down on the icon until it is lifted or leaves the icon, and from the moment Enter or the space bar goes down on the focused icon until the key is lifted or the icon loses focus. It is `released` at all other times.
  - **Readonly**: only the component changes it. It has no public setter, and an attribute changed from outside is put back.
  - **Compulsory attribute**: always present in the DOM, so a stylesheet can select `[status="pressed"]`.

- **`appearance`** (`floating` | `flat`)
  - Whether the restore button stands alone, with its own border, shadow and rounded corners, or lies flat inside another surface such as a taskbar.
  - **Optional attribute**: absent from the DOM when `floating` (the default); present as `[appearance="flat"]` on the host element when flat.
  - It changes how the button looks, not what it does: it has no operation and sends no event.

A writable state can be set through its property or its attribute; both follow the same path:

```typescript
restore.visibility = "hidden";
restore.setAttribute("appearance", "flat");
```

An invalid value is rejected: assigning it to the property throws, for example `Invalid visibility value: invalid`, and an invalid attribute returns to the value of the state.

---

### 4.2 Operations

1. `hide()` → sets `[visibility="hidden"]` on the host element
2. `show()` → removes the `[visibility]` attribute from the host element
3. `restore()` → requests restoring. It changes no state: every call dispatches `onrestore`

```typescript
public restore = () => {
  this._dispatch(Event.ON_RESTORE);
};
```

Pressing and releasing are not offered as operations: only a gesture on the icon changes `status`.

---

### 4.3 Events

- **`onhide`**: Fired when `visibility` changes from `visible` to `hidden`. `event.detail` is `{ visibility: "hidden" }`.
- **`onshow`**: Fired when `visibility` changes from `hidden` to `visible`. `event.detail` is `{ visibility: "visible" }`.
- **`onrestore`**: Fired each time restoring is requested, by a gesture or by `restore()`. It carries no detail.

Assign a handler directly to the property:

```js
restore.onrestore = () => console.log("Restoring was requested");
```

Or use standard DOM event listening:

```js
restore.addEventListener("onrestore", () => {
  // ...
});
```

`onevent` receives every event the component sends:

```js
restore.onevent = (event) => console.log(event.type, event.detail);
```

---

### 4.4 Gestures

| Gesture       | On the icon                                              | Result                                                                    |
| ------------- | -------------------------------------------------------- | ------------------------------------------------------------------------- |
| pointer down  | the pointer is pressed                                   | `status` becomes `pressed`                                                |
| pointer up    | the pointer is lifted                                    | `status` becomes `released`                                               |
| pointer leave | the pointer leaves while pressed                         | `status` becomes `released`; no request is made                           |
| click         | the pointer is pressed and lifted                        | `onrestore`                                                               |
| key down      | Enter or the space bar goes down, with focus on the icon | `status` becomes `pressed`; the page does not scroll                      |
| key up        | Enter or the space bar is lifted                         | `onrestore` when the control is pressed; then `status` becomes `released` |
| blur          | the icon loses focus while pressed                       | `status` becomes `released`; no request is made                           |
| hover         | the pointer is over the icon                             | the colours, border and shadow change                                     |

---

## 5. Development Workflow

### 5.1 Testing

Unit tests run with Karma + Jasmine. The suite covers metadata, validation, composition, states, operations, events, and gestures.

```bash
npm test
```

### 5.2 Documentation (Typedoc)

```bash
npm run document
```

Auto-generates API docs from TypeScript annotations.

### 5.3 Building

```bash
npm run build
```

Outputs to `dist/`.

### 5.4 Import Maps

The path in the import map depends on how the package is consumed.

**During local development** (e.g. the project's own `demo/`), the paths point into the local build output and the local `node_modules`:

```html
<script type="importmap">
  {
    "imports": {
      "@scalable.software/restore": "../dist/index.js",
      "@scalable.software/component": "../node_modules/@scalable.software/component/dist/index.js"
    }
  }
</script>
```

**After installing from npm**, the paths point to the packages inside `node_modules`:

```html
<script type="importmap">
  {
    "imports": {
      "@scalable.software/restore": "/node_modules/@scalable.software/restore/dist/index.js",
      "@scalable.software/component": "/node_modules/@scalable.software/component/dist/index.js"
    }
  }
</script>
```

The host then loads the template and defines the component:

```html
<script type="module">
  import { Restore } from "@scalable.software/restore";

  await Restore.Template.load("restore.template.html");

  customElements.define(Restore.Tag, Restore);
</script>
```

---

## License

> This software and its documentation are released under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International Public License (CC BY-NC-SA 4.0). This means you are free to share, copy, distribute, and transmit the work, and to adapt it, but only under the following conditions:
>
> Attribution: You must attribute the work in the manner specified by the author or licensor (but not in any way that suggests that they endorse you or your use of the work).
>
> NonCommercial: You may not use this material for commercial purposes.
>
> ShareAlike: If you alter, transform, or build upon this work, you may distribute the resulting work only under the same or similar license to this one.
>
> For more details, please visit the full [license agreement](https://creativecommons.org/licenses/by-nc-sa/4.0/).
