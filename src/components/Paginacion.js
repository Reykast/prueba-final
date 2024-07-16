import React from 'react';

function Paginacion({ productosPorPagina, totalProductos, paginar, paginaActual }) {
  const numeroDePaginas = [];

  for (let i = 1; i <= Math.ceil(totalProductos / productosPorPagina); i++) {
    numeroDePaginas.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {numeroDePaginas.map(numero => (
          <li key={numero} className={`page-item ${numero === paginaActual ? 'active' : ''}`}>
            <a onClick={() => paginar(numero)} className="page-link" href="#!">
              {numero}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Paginacion;
