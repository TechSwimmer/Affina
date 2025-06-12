import { motion } from "framer-motion";       // For future animation potential (not used in this component)
import { useState,useRef } from "react";

/**
 * TiltCard component creates a 3D hover effect by tilting based on mouse position.
 * 
 * Props:
 * - children: React elements to wrap inside the tilting container
 * - maxTilt: Maximum degrees to tilt in X or Y direction
 * - scaleFactor: How much the card should scale on hover
 */


const TiltCard = ({ children,maxTilt=24, scaleFactor = 1.05 }) => {
    
    const [rotate, setRotate] = useState({ x: 0, t: 0 })    // Not used directly, optional for stateful UI

    const cardRef = useRef(null);                     // Ref to access the DOM node

    // Handle mouse movement over the card
    const handleMouseMove = (e) => {
        const card = cardRef.current;
    const rect = card.getBoundingClientRect();

    // Get mouse position relative to center
    // Calculate mouse position relative to the card center
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Normalize tilt angles
    const rotateX = ((y - centerY) / centerY) * maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    // Apply 3D tilt and scale using inline style
    card.style.transform = `
      perspective(1000px)
      scale(${scaleFactor})
      rotateX(${-rotateX}deg)
      rotateY(${rotateY}deg)
    `;

    }


    // Reset transform when mouse leaves
    const handleMouseLeave = () => {
        const card = cardRef.current;
        card.style.transform = 'perspective(1000px) scale(1) rotateX(0deg) rotateY(0deg)';
    }


    return (
         <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="transition-transform duration-300 ease-out rounded-xl"
    >
      {children}
    </div>

    )

}


export default TiltCard;