import React from 'react'

export default function Contatti() {
  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto p-6 bg-white shadow-md rounded-lg">
        {/* Sezione Introduttiva */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-semibold text-gray-800">Contattaci</h1>
          <p className="text-gray-600 mt-4">Siamo qui per aiutarti. Contatta il nostro team per qualsiasi domanda o richiesta di informazioni.</p>
        </div>

        {/* Sezione Recapiti */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
          {/* Recapiti Telefonici */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Recapiti Telefonici</h2>
            <p className="text-gray-700 mb-2">Telefono: <a href="tel:+391234567890" className="text-gray-800 font-medium">+39 123 456 7890</a></p>
            <p className="text-gray-700">Fax: <a href="fax:+391234567891" className="text-gray-800 font-medium">+39 123 456 7891</a></p>
          </div>

          {/* Indirizzo Email */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Email</h2>
            <p className="text-gray-700">Email: <a href="mailto:info@agenziaassicurativa.com" className="text-gray-800 font-medium">info@agenziaassicurativa.com</a></p>
            <p className="text-gray-700">Supporto Clienti: <a href="mailto:supporto@agenziaassicurativa.com" className="text-gray-800 font-medium">supporto@agenziaassicurativa.com</a></p>
          </div>

          {/* Indirizzo Fisico */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Indirizzo</h2>
            <p className="text-gray-700">Via Assicurativa, 123</p>
            <p className="text-gray-700">00100 Roma, Italia</p>
            <p className="text-gray-700">Orari di apertura: Lun-Ven 9:00 - 18:00</p>
          </div>

          {/* Social Media */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Seguici sui Social</h2>
            <div className="space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-gray-600">Facebook</a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-gray-600">LinkedIn</a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-gray-600">Instagram</a>
            </div>
          </div>
        </div>

        {/* Modulo di Contatto */}
        <div className="bg-gray-100 p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Invia un Messaggio</h2>
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome Completo</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Inserisci il tuo nome completo"
                required
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent bg-white text-gray-700"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Inserisci la tua email"
                required
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent bg-white text-gray-700"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">Messaggio</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                placeholder="Inserisci il tuo messaggio..."
                required
                className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent bg-white text-gray-700"
              ></textarea>
            </div>

            <div>
              <button
                type="submit"
                className="w-full bg-gray-700 text-white py-2 px-4 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                Invia Messaggio
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
