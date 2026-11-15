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
  Appearance
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
  }

  /**
   * Get the status of the restore button: whether it is being pressed.
   * Only the restore button changes it.
   * @category State
   */
  public get status(): Status {
    return this._status;
  }

  /**
   * Get and set the appearance of the restore button
   * @category State
   */
  public get appearance(): Appearance {
    return this._appearance;
  }
  public set appearance(appearance: Appearance | null) {
    // Normalize
    appearance = appearance ?? Appearance.FLOATING;

    // Validate
    appearance = Validate.appearance(appearance);

    // Mutate
    this._appearance = appearance;
  }

  /**
   * List operations to perform for selected attributes being observed in the DOM.
   * @category Configuration
   * @hidden
   */
  protected _attributeHandlers = {
    [Attributes.VISIBILITY]: (value: Visibility | null) =>
      (this.visibility = value),
    [Attributes.STATUS]: () => this._reflect(Attributes.STATUS, this._status)
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
  protected _addEventListeners = () => {};

  /**
   * Called by the disconnectedCallback prototypical method
   * @category Configuration
   * @hidden
   */
  protected _removeEventListeners = () => {};
}
