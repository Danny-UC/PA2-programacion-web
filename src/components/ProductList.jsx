import { useEffect, useState } from "react";
import InventoryService from "../services/InventoryService";

function ProductList({ refreshKey }) {
  const [listaProductos, setListaProductos] = useState([]);

  useEffect(() => {
    const productos = InventoryService.getAllProducts();
    setListaProductos(productos);
  }, [refreshKey]);

  const eliminarProducto = (id) => {
    InventoryService.deleteProduct(id);
    setListaProductos(InventoryService.getAllProducts());
  };

  return (
    <section className="inventario-lista">
      <h2>Lista de Productos</h2>
      {listaProductos.length === 0 ? (
        <p>No hay productos disponibles.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {listaProductos.map((producto) => (
              <tr key={producto.id}>
                <td>{producto.nombreProducto}</td>
                <td>S/{producto.precio.toLocaleString()}</td>
                <td>{producto.cantidad}</td>
                <td>
                  <button
                    type="button"
                    onClick={() => eliminarProducto(producto.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}

export default ProductList;
