const CLAVE_INVENTARIO = "inventarioTienda";

const datosIniciales = [
  {
    id: "prod-1",
    nombreProducto: "Camiseta",
    precio: 35,
    cantidad: 10,
  },
  {
    id: "prod-2",
    nombreProducto: "Jeans",
    precio: 40,
    cantidad: 7,
  },
  {
    id: "prod-3",
    nombreProducto: "Gorra",
    precio: 15,
    cantidad: 30,
  },
];

const obtenerProductosAlmacenados = () => {
  const datosGuardados = localStorage.getItem(CLAVE_INVENTARIO);
  if (!datosGuardados) {
    localStorage.setItem(CLAVE_INVENTARIO, JSON.stringify(datosIniciales));
    return datosIniciales;
  }

  try {
    return JSON.parse(datosGuardados);
  } catch (error) {
    console.error("Error al leer productos desde localStorage:", error);
    localStorage.setItem(CLAVE_INVENTARIO, JSON.stringify(datosIniciales));
    return datosIniciales;
  }
};

const guardarProductos = (listaProductos) => {
  localStorage.setItem(CLAVE_INVENTARIO, JSON.stringify(listaProductos));
};

const generarIdProducto = () =>
  `prod-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

const InventoryService = {
  getAllProducts() {
    return obtenerProductosAlmacenados();
  },

  addProduct(producto) {
    const listaProductos = obtenerProductosAlmacenados();
    const nuevoProducto = {
      id: generarIdProducto(),
      nombreProducto: producto.nombreProducto.trim(),
      precio: Number(producto.precio),
      cantidad: Number(producto.cantidad),
    };

    const listaActualizada = [...listaProductos, nuevoProducto];
    guardarProductos(listaActualizada);
    return nuevoProducto;
  },

  deleteProduct(id) {
    const listaProductos = obtenerProductosAlmacenados();
    const listaActualizada = listaProductos.filter(
      (producto) => producto.id !== id,
    );
    guardarProductos(listaActualizada);
    return listaActualizada;
  },
};

export default InventoryService;
