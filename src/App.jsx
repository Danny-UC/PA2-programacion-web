import { useState } from "react";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";
import "./App.css";

function App() {
  const [actualizarLista, setActualizarLista] = useState(0);

  const manejarProductoAgregado = () => {
    setActualizarLista((valorActual) => valorActual + 1);
  };

  return (
    <main className="app-inventario">
      <header>
        <h1>Sistema de Inventario de Tienda</h1>
      </header>

      <ProductForm onProductoAgregado={manejarProductoAgregado} />
      <ProductList refreshKey={actualizarLista} />
    </main>
  );
}

export default App;
