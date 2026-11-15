/**
 * @module Restore
 */

import { Visibility, Appearance } from "./restore.meta.js";

/**
 * @category Validation
 */
export class Validate {
  /**
   * Validates that the value is a member of the `Visibility` enum.
   * Throws if the value is not a recognized visibility state.
   * @category Validation
   */
  public static visibility = (value: unknown) => {
    const valid = Object.values(Visibility).includes(value as Visibility);
    if (!valid) {
      throw new Error(`Invalid visibility value: ${value}`);
    }
    return value as Visibility;
  };

  /**
   * Validates that the value is a member of the `Appearance` enum.
   * @category Validation
   */
  public static appearance = (value: unknown) => {
    return value as Appearance;
  };
}
