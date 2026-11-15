/**
 * @module Restore
 */

// Base Component
import { Component, Template } from "@scalable.software/component";
import { type Configuration } from "@scalable.software/component";

// Restore Metadata
import {
  Tag,
  CSS,
  Attributes,
  Visibility,
  Status,
  Appearance,
  Event,
  Gesture,
  Key
} from "./restore.meta.js";

import { type Meta } from "./restore.meta.js";

// Validation
import { Validate } from "./restore.validation.js";

/**
 * Optional Configuration: required for restores with custom layout and style
 * @category Configuration
 */
export const configuration: Configuration = {
  url: import.meta.url,
  template: {
    id: Tag
  },
  css: {
    name: CSS
  }
} as const;

/**
 * @category Restore
 */
export class Restore extends Component implements Meta {
  /**
   * The tag name of the restore
   * @category Configuration
   */
  public static get Tag() {
    return Tag;
  }

  /**
   * Only attributes defined the Attributes object will be observed in DOM
   * @category State
   */
  public static get Attributes(): Attributes {
    return Attributes;
  }

  /**
   * Helper function to load the restore template into DOM
   * @category Utility
   */
  public static Template = new Template(import.meta.url);

  /**
   * Internal Visibility state of the component
   * @category State
   * @default Visibility.VISIBLE
   * @hidden
   */
  private _visibility: Visibility = Visibility.VISIBLE;

  /**
   * Internal Status state of the component
   * @category State
   * @default Status.RELEASED
   * @hidden
   */
  private _status: Status = Status.RELEASED;

  /**
   * Internal Appearance state of the component
   * @category State
   * @default Appearance.FLOATING
   * @hidden
   */
  private _appearance: Appearance = Appearance.FLOATING;

  /**
   * onhide triggered when restore visibility changes to hidden
   * @category Events
   * @hidden
   */
  private _onhide: EventListener | null = null;

  /**
   * onshow triggered when restore visibility changes to visible
   * @category Events
   * @hidden
   */
  private _onshow: EventListener | null = null;

  /**
   * onrestore triggered each time restoring is requested
   * @category Events
   * @hidden
   */
  private _onrestore: EventListener | null = null;

  /**
   * Cache element references to improve performance
   * @category State
   * @hidden
   */
  protected elements: { icon: HTMLDivElement | null } = { icon: null };

  /**
   * @hidden
   */
  constructor() {
    super(configuration);
  }

  /**
   * Get and set the visibility of the restore button
   * @category State
   */
  public get visibility(): Visibility {
    return this._visibility;
  }
  public set visibility(visibility: Visibility | null) {
    try {
      // Normalize
      visibility = visibility ?? Visibility.VISIBLE;

      // Validate
      visibility = Validate.visibility(visibility);

      // Guard
      if (this._visibility === visibility) return;

      // Mutate
      this._visibility = visibility;
    } finally {
      // Reflect
      this._reflect(
        Attributes.VISIBILITY,
        this._visibility,
        Visibility.VISIBLE
      );
    }

    // Dispatch
    const detail = { visibility };
    visibility === Visibility.HIDDEN && this._dispatch(Event.ON_HIDE, detail);
    visibility === Visibility.VISIBLE && this._dispatch(Event.ON_SHOW, detail);
  }

  /**
   * Get the status of the restore button: whether it is being pressed.
   * Only the restore button changes it.
   * @category State
   */
  public get status(): Status {
    return this._status;
  }
  private set status(status: Status) {
    try {
      // Guard
      if (this._status === status) return;

      // Mutate
      this._status = status;
    } finally {
      // Reflect
      this._reflect(Attributes.STATUS, this._status);
    }
  }

  /**
   * Get and set the appearance of the restore button
   * @category State
   */
  public get appearance(): Appearance {
    return this._appearance;
  }
  public set appearance(appearance: Appearance | null) {
    try {
      // Normalize
      appearance = appearance ?? Appearance.FLOATING;

      // Validate
      appearance = Validate.appearance(appearance);

      // Mutate
      this._appearance = appearance;
    } finally {
      // Reflect
      this._reflect(
        Attributes.APPEARANCE,
        this._appearance,
        Appearance.FLOATING
      );
    }
  }

  /**
   * Triggered via `.hide()`
   * @event
   * @category Events
   */
  public set onhide(handler: EventListener | null) {
    this._onhide = this._subscribe(Event.ON_HIDE, this._onhide, handler);
  }

  /**
   * Triggered via `.show()`
   * @event
   * @category Events
   */
  public set onshow(handler: EventListener | null) {
    this._onshow = this._subscribe(Event.ON_SHOW, this._onshow, handler);
  }

  /**
   * Triggered via `.restore()`, each time it is called
   * @event
   * @category Events
   */
  public set onrestore(handler: EventListener | null) {
    this._onrestore = this._subscribe(
      Event.ON_RESTORE,
      this._onrestore,
      handler
    );
  }

  /**
   * Hide the restore button when it is visible
   * @category Operations
   */
  public hide = () => {
    this.visibility = Visibility.HIDDEN;
  };

  /**
   * Show the restore button when it is hidden
   * @category Operations
   */
  public show = () => {
    this.visibility = Visibility.VISIBLE;
  };

  /**
   * Request restoring. It changes no state: every call dispatches `onrestore`.
   * @category Operations
   */
  public restore = () => {
    this._dispatch(Event.ON_RESTORE);
  };

  /**
   * Press the restore button: only a gesture does this
   * @category Operations
   * @hidden
   */
  private _press = () => {
    this.status = Status.PRESSED;
  };

  /**
   * Release the restore button: only a gesture does this
   * @category Operations
   * @hidden
   */
  private _release = () => {
    this.status = Status.RELEASED;
  };

  /**
   * List operations to perform for selected attributes being observed in the DOM.
   * @category Configuration
   * @hidden
   */
  protected _attributeHandlers = {
    [Attributes.VISIBILITY]: (value: Visibility | null) =>
      (this.visibility = value),
    [Attributes.STATUS]: () => this._reflect(Attributes.STATUS, this._status),
    [Attributes.APPEARANCE]: (value: Appearance | null) =>
      (this.appearance = value)
  };

  /**
   * Cache element references to improve performance
   * @category Configuration
   * @hidden
   */
  protected _cache = () => {
    this.elements.icon = this.root.querySelector(".icon");
  };

  /**
   * Initialize restore attributes with default values
   * @category Configuration
   * @hidden
   */
  protected _initialize = () => {
    this._reflect(Attributes.STATUS, this._status);
  };

  /**
   * Called by the connectedCallback prototypical method
   * @category Configuration
   * @hidden
   */
  protected _addEventListeners = () => {
    this.elements.icon?.addEventListener(
      Gesture.POINTERDOWN,
      this._handleIconPointerdown
    );
    this.elements.icon?.addEventListener(
      Gesture.POINTERUP,
      this._handleIconPointerup
    );
    this.elements.icon?.addEventListener(
      Gesture.POINTERLEAVE,
      this._handleIconPointerleave
    );
    this.elements.icon?.addEventListener(Gesture.CLICK, this._handleIconClick);
    this.elements.icon?.addEventListener(
      Gesture.KEYDOWN,
      this._handleIconKeydown
    );
  };

  /**
   * Called by the disconnectedCallback prototypical method
   * @category Configuration
   * @hidden
   */
  protected _removeEventListeners = () => {
    this.elements.icon?.removeEventListener(
      Gesture.POINTERDOWN,
      this._handleIconPointerdown
    );
    this.elements.icon?.removeEventListener(
      Gesture.POINTERUP,
      this._handleIconPointerup
    );
    this.elements.icon?.removeEventListener(
      Gesture.POINTERLEAVE,
      this._handleIconPointerleave
    );
    this.elements.icon?.removeEventListener(Gesture.CLICK, this._handleIconClick);
    this.elements.icon?.removeEventListener(
      Gesture.KEYDOWN,
      this._handleIconKeydown
    );
  };

  /**
   * Handles the pointer going down on the icon: presses the restore button
   * @category Gesture
   * @hidden
   */
  private _handleIconPointerdown = () => this._press();

  /**
   * Handles the pointer being lifted from the icon: releases the restore button
   * @category Gesture
   * @hidden
   */
  private _handleIconPointerup = () => this._release();

  /**
   * Handles the pointer leaving the icon: releases the restore button
   * @category Gesture
   * @hidden
   */
  private _handleIconPointerleave = () => this._release();

  /**
   * Handles a click on the icon: requests restoring
   * @category Gesture
   * @hidden
   */
  private _handleIconClick = () => this.restore();

  /**
   * Handles a key pressed on the icon: Enter requests restoring
   * @category Gesture
   * @hidden
   */
  private _handleIconKeydown = (event: KeyboardEvent) =>
    event.key === Key.ENTER && this.restore();
}
