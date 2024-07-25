"use client";
import {useEffect} from "react";
import { useRouter } from 'next/navigation';
import { motion } from "framer-motion";
import { LampContainer } from "./ui/lamp";
import Link from "next/link";

export function Hero() {
  const router = useRouter();

  useEffect(() => {
    const handleUrlWithToken = () => {
        const hash = window.location.hash; // Use hash to get URL fragment
        console.log('URL hash:', hash); // Log hash to debug

        if (hash) {
            // Extract access_token from hash
            const params = new URLSearchParams(hash.replace('#', ''));
            const accessToken = params.get('access_token');
            //console.log('Access token:', accessToken); // Log token to debug

            if (accessToken) {
                // Store token or use it as needed
                localStorage.setItem('access_token', accessToken);
                router.push('/');
            } else {
                console.warn('Access token not found in URL'); // Log warning if token is not found
            }
        } else {
            console.warn('URL hash is empty'); // Log warning if hash is empty
        }
    };

    handleUrlWithToken();
}, [router]);

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
        <Link href="/raise-funds">
          <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
              Explore Projects
            </span>
          </button>
        </Link>
      </motion.h1>
    </LampContainer>
  );
}


