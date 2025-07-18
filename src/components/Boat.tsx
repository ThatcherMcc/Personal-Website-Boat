import { motion, useAnimate} from "motion/react";
import { useEffect } from "react";

export default function MyBoat() {

  const [scope, animate] = useAnimate();

  async function boatAnimationSequence() {

    const dropInAnimation = animate(
      scope.current,
      { y: 0, opacity: 1 },
      {
        type: "spring", // Use spring for the y movement
        stiffness: 70, // Adjust stiffness for desired "splash" impact
        damping: 7,   // Adjust damping for how quickly it settles
        mass: 1,       // Adjust mass
      }
    );

    // 2. Initial Nose Tilt and Stabilization (Spring for Rotation)
    const first = animate(
        scope.current,
        { rotate: 10 }, // Tilts down, overshoots, then settles at 0 degrees
        {
          type: "spring",
          stiffness: 40, // Softer spring for rotation
          damping: 5,
          mass: 0.5,
          delay: 0.2 // A slight delay for the rotation to start after drop-in for effect
        }
      );
    

    // Wait for BOTH the drop-in and initial rotation to complete
    await Promise.all([dropInAnimation, first]);

    // 3. Continuous Bobbing (Y and Subtle Rotation)
    // This starts ONLY after the initial animations have fully settled.
    animate(
      scope.current,
      {
        y: [0, 15, 0], // Vertical bobbing (amplitude 15px)
        rotate: [0, -2, 2, 0] // Subtle side-to-side rocking (e.g., -2 to +2 degrees)
      },
      {
        repeat: Infinity,
        repeatType: "mirror", // Smooth transition back and forth
        ease: "easeInOut",   // Smooth acceleration/deceleration
        duration: 4          // Duration of one full bob cycle
      }
    );
  }

  useEffect(() => {
    boatAnimationSequence();
  }, []);

  return (
    <div className="boat-container" >
      <motion.img
        ref={scope}
        className="boat-image"
        src="/NewBoat.png"
        alt="Ship with all my treasure"
        initial={{ y: -150, opacity: 0, rotate: -15 }} // Start from above and faded 
        whileHover={{ scale: 1.05 }}
      />
    </div>
  )
}
