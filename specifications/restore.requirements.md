# Restore — Requirements

## FEATURE: Restoring a Window

**Benefit** — Product teams get a single drop-in control that lets users ask for a window,
panel or dialog to be restored, without building and styling that control themselves.

**Personas**

- **End user** — the person who sees the control and decides to use it.
- **Host application** — the application, or the taskbar, that embeds the control, decides
  when it is relevant, and acts on its requests.

**In scope**

- Expressing and reporting the request, each time it is made.
- Behaving like the matching control in the corner of a desktop window: the control looks
  pressed while it is held, the request is made when it is let go, and moving away before
  letting go makes no request.
- Showing or hiding the control depending on context.
- Operating the control with a pointer or with the keyboard.
- Standing alone, or sitting flat inside another surface such as a taskbar.
- Visual feedback on interaction and consistency with the device colour theme.

**Out of scope**

- Actually restoring anything — the host application does this in response to the request.
- Knowing the size the window returns to, or whether it is restored; the control holds no window state.
- Deciding when the request is allowed — the host application shows or hides the control.
- Application-level theme switching; the control follows the device colour scheme only.

---

### STORY: Restore Request

As an **end user**, when a window is minimized or maximized, I want to ask for it to return to its normal size, so that I get my previous layout back.

As a **host application**, I want to be told each time restoring is requested, by the end
user or by my own code, so that I can act on the request.

### STORY: Press and Release

As an **end user**, when I press the control, I want it to look pressed for as long as I hold
it and to act only when I let go on it, so that I can see my press was noticed and can still
change my mind by moving away.

### STORY: Visibility Control

As a **host application**, when the window already has its normal size, I want to hide the control and show it again later,
so that the end user only sees controls that apply.

### STORY: Hover Responsiveness

As an **end user**, when I point at the control, I want it to respond visually, so that I know
it is interactive before I press.

### STORY: Theme Compatibility

As an **end user**, I want the control to match my device's light or dark colour scheme, so
that it looks consistent with the rest of my interface.

### STORY: Keyboard Operation

As an **end user**, when I work with the keyboard, I want to reach the control and make the
request with the Enter key or the space bar, so that I do not need a pointing device.

### STORY: Flat Appearance

As a **host application**, when I place the control inside a taskbar, I want it to appear
without its own border and shadow, so that the taskbar reads as one surface.
