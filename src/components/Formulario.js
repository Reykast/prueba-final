import React, { useState, useEffect } from 'react';

function Formulario({ agregarProducto, productoEditado, actualizarProducto }) {
  const [nombre, setNombre] = useState('');
  const [categoria, setCategoria] = useState('');
  const [precio, setPrecio] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (productoEditado) {
      setNombre(productoEditado.nombre);
      setCategoria(productoEditado.categoria);
      setPrecio(productoEditado.precio);
    }
  }, [productoEditado]);

  //funcioon para manejar el envio del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    if (nombre === '' || categoria === '' || precio === '') {
      setError('Todos los campos son obligatorios');
      return;
    }

    //validacion de los campos 
    if (isNaN(precio)) {
      setError('El precio debe ser un número válido');
      return;
    }

    setError('');
    const nuevoProducto = { nombre, categoria, precio };

    if (productoEditado) {
      actualizarProducto(nuevoProducto);
    } else {
      agregarProducto(nuevoProducto);
    }

    setNombre('');
    setCategoria('');
    setPrecio('');
  };

  return (
    <form className="formulario" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Nombre:</label>
        <input
          type="text"
          className="form-control"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Categoría:</label>
        <input
          type="text"
          className="form-control"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Precio:</label>
        <input
          type="text"
          className="form-control"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
        />
      </div>
      {error && <p className="error">{error}</p>}
      <button type="submit" className="btn btn-primary">
        {productoEditado ? 'Actualizar Producto' : 'Agregar Producto'}
      </button>
    </form>
  );
}

export default Formulario;
