"use client";
import React from "react";
import { motion } from "framer-motion";
import { LampContainer } from "./ui/lamp";
import Btn from "./Btn";

export function Hero() {
  return (
    <LampContainer>
      <motion.h1
        initial={{ opacity: 0.5, y: 250 }}
        whileInView={{ opacity: 1, y: 180 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="mt-8 bg-gradient-to-br from-slate-300 to-white py-4 bg-clip-text text-center text-2xl font-medium tracking-tight text-transparent md:text-4xl flex flex-col items-center justify-center gap-[5rem]"
      >
        Offset Your Carbon Footprint Today
        <Btn title="Explore More" />
      </motion.h1>
    </LampContainer>
  );
}
