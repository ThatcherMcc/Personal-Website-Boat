/**
 * @file Defines animation configurations for the boat based on different weather conditions.
 * This file centralizes the properties that control the boat's movement.
 */

/**
 * @property {number} amplitude - The boat's vertical bobbing motion (how much it moves up/down) in pixels.
 * @property {number} length - The duration, in seconds, of one complete bob cycle.
 * @property {number} rotation - The degree of rotation (tilt) during its animation cycle.
 */
export type BoatAnimationOptions = {
  amplitude: number;
  length: number;
  rotation: number;
};

/**
 * A global constant object that maps various weather conditions to their
 * corresponding `BoatAnimationOptions`.
 */
export const BOAT_ANIMATION_CONFIG: {
  [key in "sunny" | "cloudy" | "rainy" | "stormy"]: BoatAnimationOptions;
} = {
  sunny: { amplitude: 10, length: 10, rotation: 2 },
  cloudy: { amplitude: 15, length: 8, rotation: 2 },
  rainy: { amplitude: 20, length: 8, rotation: 3 },
  stormy: { amplitude: 30, length: 6, rotation: 4 },
};
