"use client"
import { useRef } from "react";
import Image from "next/image"
import figures from '../../public/figures.svg'
import {
    motion,
    useScroll,
    useSpring,
    useTransform,
    MotionValue
} from "framer-motion";

function useParallax(value: MotionValue<number>, distance: number) {
    return useTransform(value, [0, 1], [-distance, distance]);
}

export default function BackgroundImages()
{
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref });
    const y = useParallax(scrollYProgress, 300);
    return(
        <motion.div 
            style={{ y }} 
            ref={ref}
            initial={{ opacity: 0, y: -1000 }}
            animate={{ opacity: 1, y: -220 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }} 
        >
            <Image loading="lazy" src="/coin.png" alt="" width="200" height="200" style={{ position: "absolute", zIndex: 0, marginTop: 150, marginLeft: "20%"}}/>
            <Image loading="lazy" src="/circle.png" alt="" width="500" height="500" style={{ position: "absolute", zIndex: 0, marginTop: 150, marginLeft: "5%"}}/>
            <Image loading="lazy" src={figures} alt="" width="500" height="500" style={{ position: "absolute", zIndex: 0, marginLeft: "65%", marginTop: 150}}/>  
        </motion.div>
    )
}