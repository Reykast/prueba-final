import React from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';

function Lista({ productos, elimarProducto, editarProducto }) {
  return (
    <div className="lista">
      {productos.length === 0 ? (
        <p>No hay productos en el catálogo.</p>
      ) : (
        productos.map((producto, index) => (
          <div key={index} className="producto">
            <span>{producto.nombre} - {producto.categoria} - ${producto.precio}</span>
            <div>
              <button onClick={() => editarProducto(index)} className="btn btn-secondary btn-sm">
                <FaEdit />
              </button>
              <button onClick={() => elimarProducto(index)} className="btn btn-danger btn-sm">
                <FaTrash />
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Lista;
