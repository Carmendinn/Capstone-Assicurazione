import React from 'react'
import heroImg from '../public/images/freepik-export-20240828101423gt3o.jpeg'
import { motion, useAnimation, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';


export default function Hero() {
  return (
    <div className="bg-white rounded-2xl">
      <div className="container mx-auto px-6 py-16 lg:flex lg:items-center lg:justify-between">
        {/* Sezione Testuale */}
        <div className="lg:w-1/2">
          <h1 className="text-4xl font-bold text-gray-800 lg:text-6xl font-original hover:font-hover transition-font-family duration-300">
            Proteggiamo il tuo futuro con soluzioni assicurative personalizzate
          </h1>
          <p className="mt-6 text-lg text-gray-600 font-original hover:font-hover transition-font-family duration-300">
            Affidati alla nostra esperienza per trovare l'assicurazione che fa per te. Offriamo piani personalizzati per privati e aziende.
          </p>
        </div>

        {/* Sezione Immagine */}
        <div className="mt-12 ml-4 lg:mt-0 lg:w-1/2">
          <img
            className="w-full h-auto rounded-2xl shadow-lg"
            src={heroImg}
            alt="Assicurazione Immagine"
          />
        </div>
      </div>
    </div>
  )
}
