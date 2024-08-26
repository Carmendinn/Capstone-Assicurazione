import React from 'react'

export default function Hero() {
  return (
    <div className="bg-white  rounded-lg">
      <div className="container mx-auto px-6 py-16 lg:flex lg:items-center lg:justify-between">
        {/* Sezione Testuale */}
        <div className="lg:w-1/2">
          <h1 className="text-4xl font-bold text-gray-800 lg:text-6xl">
            Proteggiamo il tuo futuro con soluzioni assicurative personalizzate
          </h1>
          <p className="mt-6 text-lg text-gray-600">
            Affidati alla nostra esperienza per trovare l'assicurazione che fa per te. Offriamo piani personalizzati per privati e aziende.
          </p>
          <div className="mt-8">
            <a
              href="#"
              className="bg-gray-600 text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-gray-700"
            >
              Scopri di più
            </a>
          </div>
        </div>
        
        {/* Sezione Immagine */}
        <div className="mt-12 ml-4 lg:mt-0 lg:w-1/2">
          <img
            className="w-full h-auto rounded-lg shadow-lg"
            src="https://via.placeholder.com/600x400.png?text=Assicurazione+Immagine"
            alt="Assicurazione Immagine"
          />
        </div>
      </div>
    </div>
  )
}
