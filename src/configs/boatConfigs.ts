export type BoatAnimationOptions = {
  amplitude: number;     // Vertical bobbing magnitude (how much it moves up/down)
  length: number;        // Duration of one full bob/rock cycle (in seconds)
  distanceX: number;     // Horizontal sway magnitude (how much it moves left/right)
  rotation: number;
}

export const BoatAnimationConfig: {[key in 'sunny' | 'cloudy' | 'rainy' | 'stormy']: BoatAnimationOptions} = {
  sunny: {amplitude: 10, length: 10, distanceX: 8, rotation: 2},
  cloudy: {amplitude: 15, length: 8, distanceX: 10, rotation: 2},
  rainy: {amplitude: 20, length: 8, distanceX: 15, rotation: 3},
  stormy: {amplitude: 30, length: 6, distanceX: 20, rotation: 4},
} 