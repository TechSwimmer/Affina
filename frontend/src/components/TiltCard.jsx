import { motion } from "framer-motion";
import { useState,useRef } from "react";

const TiltCard = ({ children,maxTilt=24, scaleFactor = 1.05 }) => {
    
    const [rotate, setRotate] = useState({ x: 0, t: 0 })

    const cardRef = useRef(null);

    const handleMouseMove = (e) => {
        const card = cardRef.current;
    const rect = card.getBoundingClientRect();

    // Get mouse position relative to center
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    card.style.transform = `
      perspective(1000px)
      scale(${scaleFactor})
      rotateX(${-rotateX}deg)
      rotateY(${rotateY}deg)
    `;

    }

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