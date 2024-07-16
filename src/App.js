import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Formulario from './components/Formulario';
import Lista from './components/Lista';
import Paginacion from './components/Paginacion';

function App() {
  //estados para los productos, la barra de busqueda, la paginacion, el producto editado
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [productoEditado, setProductoEditado] = useState(null);
  const [paginaActual, setPaginaActual] = useState(1);
  const [productosPorPagina] = useState(5);

  //efecto para cargar los productos desde el localstorage
  useEffect(() => {
    const productosGuardados = JSON.parse(localStorage.getItem('productos')) || [];
    setProductos(productosGuardados);
  }, []);

  //efeco para guardar los productos en el localstorage
  useEffect(() => {
    localStorage.setItem('productos', JSON.stringify(productos));
  }, [productos]);

  const agregarProducto = (producto) => {
    setProductos([...productos, producto]);
  };

  const eliminarProducto = (index) => {
    const nuevosProductos = productos.filter((_, i) => i !== index);
    setProductos(nuevosProductos);
  };

  const editarProducto = (index) => {
    setProductoEditado({ ...productos[index], index });
  };

  const actualizarProducto = (productoActualizado) => {
    const nuevosProductos = productos.map((producto, i) =>
      i === productoEditado.index ? productoActualizado : producto
    );
    setProductos(nuevosProductos);
    setProductoEditado(null);
  };

  const productosFiltrados = productos.filter(producto =>
    producto.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    producto.categoria.toLowerCase().includes(busqueda.toLowerCase())
  );

  const indiceUltimoProducto = paginaActual * productosPorPagina;
  const indicePrimerProducto = indiceUltimoProducto - productosPorPagina;
  const productosActuales = productosFiltrados.slice(indicePrimerProducto, indiceUltimoProducto);

  const paginar = numeroPagina => setPaginaActual(numeroPagina);

  return (
    <div className="App container mt-4s bg-success">
      <h1 className='text-center mb-4'>Catálogo de Productos</h1>
      <input
        type="text"
        className="form-control search-bar"
        placeholder="Buscar productos..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />
      <Formulario
        agregarProducto={agregarProducto}
        productoEditado={productoEditado}
        actualizarProducto={actualizarProducto}
      />
      <Lista
        productos={productosActuales}
        eliminarProducto={eliminarProducto}
        editarProducto={editarProducto}
      />
      <Paginacion
        productosPorPagina={productosPorPagina}
        totalProductos={productosFiltrados.length}
        paginar={paginar}
        paginaActual={paginaActual}
      />
    </div>
  );
}

export default App;
