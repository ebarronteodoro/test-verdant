"use client";

import { useState } from "react";

export default function FilterSection() {
  const [filter, setFilter] = useState("all");

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleSearch = () => {
    const cards = document.querySelectorAll(".proyectos-section__card");

    cards.forEach((card) => {
      const location = card.getAttribute("data-location");
      if (filter === "all" || location === filter) {
        card.parentElement.style.display = "block";
      } else {
        card.parentElement.style.display = "none";
      }
    });
  };

  return (
    <aside className="search-section">
      <div className="search-section__container">
        <h2>
          Elige tu depa <span>hoy</span>
        </h2>
        <select
          id="locationFilter"
          value={filter}
          onChange={handleFilterChange}
        >
          <option value="all">Todos</option>
          <option value="PUEBLO LIBRE">Pueblo Libre</option>
          <option value="SURCO">Surco</option>
          <option value="BARRANCO">Barranco</option>
          {/* <option value='SAN MIGUEL'>San Miguel</option> */}
        </select>
        <button id="searchButton" onClick={handleSearch}>
          Buscar
        </button>
      </div>
    </aside>
  );
}
