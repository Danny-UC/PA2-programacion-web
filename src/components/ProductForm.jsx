import { useState } from "react";
import InventoryService from "../services/InventoryService";

function ProductForm({ onProductoAgregado }) {
  const [nombreProducto, setNombreProducto] = useState("");
  const [precio, setPrecio] = useState("");
  const [cantidad, setCantidad] = useState("");

  const manejarEnvio = (evento) => {
    evento.preventDefault();

    if (!nombreProducto.trim() || !precio || !cantidad) {
      return;
    }

    InventoryService.addProduct({
      nombreProducto,
      precio,
      cantidad,
    });

    setNombreProducto("");
    setPrecio("");
    setCantidad("");

    if (onProductoAgregado) {
      onProductoAgregado();
    }
  };

  return (
    <section className="inventario-formulario">
      <h2>Agregar Producto</h2>
      <form onSubmit={manejarEnvio}>
        <label>
          Nombre del producto
          <input
            type="text"
            value={nombreProducto}
            onChange={(evento) => setNombreProducto(evento.target.value)}
            placeholder="Producto"
          />
        </label>

        <label>
          Precio
          <input
            type="number"
            value={precio}
            onChange={(evento) => setPrecio(evento.target.value)}
            placeholder="Ej. 20"
            min="0"
          />
        </label>

        <label>
          Cantidad
          <input
            type="number"
            value={cantidad}
            onChange={(evento) => setCantidad(evento.target.value)}
            placeholder="Ej. 5"
            min="0"
          />
        </label>

        <button type="submit">Agregar producto</button>
      </form>
    </section>
  );
}

export default ProductForm;
