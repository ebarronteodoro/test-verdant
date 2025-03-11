'use client'

import { useState } from 'react'

export default function RecorridoSection({ project }) {
  if (project.id !== 'soil') {
    return (
      <section className="recorrido-section">
        <iframe
          src="https://cdn.seedsurco.pe/seed/index.htm"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </section>
    )
  }

  // Opciones para proyecto "soil"
  const options = [
    { id: 'btn-1', label: '1 Dormitorio', key: '1', src: 'https://cdn.soilpueblolibre.pe/soil/neo/1dormitorio_soil' },
    { id: 'btn-2', label: '2 Dormitorios', key: '2', src: 'https://cdn.soilpueblolibre.pe/soil/neo/2dormitorios_soil' },
    { id: 'btn-3', label: '3 Dormitorios', key: '3', src: 'https://cdn.soilpueblolibre.pe/soil/neo/3dormitorios_soil' },
    { id: 'btn-4', label: 'Vista Balcón', key: 'balcon', src: 'https://praux3d.com/verdant/soil/' }
  ]

  const [activeOption, setActiveOption] = useState(options[0].key)

  const handleClick = (optionKey) => {
    setActiveOption(optionKey)
  }

  const currentOption = options.find((opt) => opt.key === activeOption)

  return (
    <section className="recorrido-section">
      <div className="iframe-options">
        {options.map((option) => (
          <button
            key={option.id}
            id={option.id}
            className={activeOption === option.key ? 'active' : ''}
            onClick={() => handleClick(option.key)}
          >
            {option.label}
          </button>
        ))}
      </div>

      <div className="iframe-soil">
        <iframe
          id="iframe-soil"
          src={currentOption.src}
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
    </section>
  )
}
