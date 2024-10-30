import { motion } from "framer-motion";
import { Edit, Search, Trash2, Plus } from "lucide-react";
import { useState } from "react";

const PRODUCT_DATA = [
  { id: 1, name: "Logitech g pro x", category: "perifericos", price: 60.5, stock: 150, sales: 500 },
  { id: 2, name: "Ryzen 7 7800x3d", category: "procesadores", price: 120, stock: 32, sales: 1000 },
  { id: 3, name: "ROG Swift OLED PG27AQDM", category: "Monitores", price: 3500, stock: 100, sales: 50 },
  { id: 4, name: "Airpods pro", category: "perifericos", price: 90, stock: 100, sales: 320 },
  { id: 5, name: "RTX 5090", category: "tarjeta grafica", price: 7000, stock: 9, sales: 499 },
];

const ProductsTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(PRODUCT_DATA);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: "", category: "", price: "", stock: "", sales: "" });

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = PRODUCT_DATA.filter(
      (product) =>
        product.name.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term)
    );
    setFilteredProducts(filtered);
  };

  const openEditModal = (product) => {
    setProductToEdit(product);
    setIsModalOpen(true);
  };

  const closeEditModal = () => {
    setIsModalOpen(false);
    setProductToEdit(null);
  };

  const handleEditProductChange = (e) => {
    setProductToEdit({ ...productToEdit, [e.target.name]: e.target.value });
  };

  const saveEditedProduct = () => {
    const updatedProducts = filteredProducts.map((product) =>
      product.id === productToEdit.id
        ? {
            ...productToEdit,
            price: parseFloat(productToEdit.price),
            stock: parseInt(productToEdit.stock),
            sales: parseInt(productToEdit.sales),
          }
        : product
    );
    setFilteredProducts(updatedProducts);
    closeEditModal();
  };

  const deleteProduct = (id) => {
    const updatedProducts = filteredProducts.filter((product) => product.id !== id);
    setFilteredProducts(updatedProducts);
  };

  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
    setNewProduct({ name: "", category: "", price: "", stock: "", sales: "" }); 
  };

  const handleNewProductChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const addNewProduct = () => {
    const newId = filteredProducts.length ? Math.max(filteredProducts.map(p => p.id)) + 1 : 1;
    const productToAdd = {
      ...newProduct,
      id: newId,
      price: parseFloat(newProduct.price),
      stock: parseInt(newProduct.stock),
      sales: parseInt(newProduct.sales),
    };
    setFilteredProducts([...filteredProducts, productToAdd]);
    closeAddModal();
  };

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-100">Lista de productos</h2>
        <button 
          onClick={openAddModal} 
          className="flex items-center bg-green-500 text-white px-4 py-2 rounded">
          <Plus size={18} className="mr-2" /> Añadir Producto
        </button>
        <div className="flex gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleSearch}
              value={searchTerm}
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Nombre del producto
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Categoria
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Precio
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Stock
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Ventas
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Modificación
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {filteredProducts.map((product) => (
              <motion.tr key={product.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">
                  {product.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {product.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  ${product.price.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{product.stock}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{product.sales}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  <button className="text-indigo-400 hover:text-indigo-300 mr-2" onClick={() => openEditModal(product)}>
                    <Edit size={18} />
                  </button>
                  <button className="text-red-400 hover:text-red-300" onClick={() => deleteProduct(product.id)}>
                    <Trash2 size={18} />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && productToEdit && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-4 w-80 max-h-[400px] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4 text-black">Editar Producto</h2>
            <div className="mb-2">
              <label className="block text-black">Name</label>
              <input
                type="text"
                name="name"
                value={productToEdit.name}
                onChange={handleEditProductChange}
                className="w-full p-2 border rounded text-black"
              />
            </div>
            <div className="mb-2">
              <label className="block text-black">Category</label>
              <input
                type="text"
                name="category"
                value={productToEdit.category}
                onChange={handleEditProductChange}
                className="w-full p-2 border rounded text-black"
              />
            </div>
            <div className="mb-2">
              <label className="block text-black">Price</label>
              <input
                type="number"
                name="price"
                value={productToEdit.price}
                onChange={handleEditProductChange}
                className="w-full p-2 border rounded text-black"
              />
            </div>
            <div className="mb-2">
              <label className="block text-black">Stock</label>
              <input
                type="number"
                name="stock"
                value={productToEdit.stock}
                onChange={handleEditProductChange}
                className="w-full p-2 border rounded text-black"
              />
            </div>
            <div className="mb-2">
              <label className="block text-black">Sales</label>
              <input
                type="number"
                name="sales"
                value={productToEdit.sales}
                onChange={handleEditProductChange}
                className="w-full p-2 border rounded text-black"
              />
            </div>
            <div className="flex justify-between mt-4">
              <button onClick={closeEditModal} className="bg-gray-300 px-4 py-2 rounded">Cancelar</button>
              <button onClick={saveEditedProduct} className="bg-blue-500 text-white px-4 py-2 rounded">Guardar</button>
            </div>
          </div>
        </div>
      )}

      {isAddModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-4 w-80 max-h-[400px] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4 text-black">Añadir Producto</h2>
            <div className="mb-2">
              <label className="block text-black">Name</label>
              <input
                type="text"
                name="name"
                value={newProduct.name}
                onChange={handleNewProductChange}
                className="w-full p-2 border rounded text-black"
              />
            </div>
            <div className="mb-2">
              <label className="block text-black">Category</label>
              <input
                type="text"
                name="category"
                value={newProduct.category}
                onChange={handleNewProductChange}
                className="w-full p-2 border rounded text-black"
              />
            </div>
            <div className="mb-2">
              <label className="block text-black">Price</label>
              <input
                type="number"
                name="price"
                value={newProduct.price}
                onChange={handleNewProductChange}
                className="w-full p-2 border rounded text-black"
              />
            </div>
            <div className="mb-2">
              <label className="block text-black">Stock</label>
              <input
                type="number"
                name="stock"
                value={newProduct.stock}
                onChange={handleNewProductChange}
                className="w-full p-2 border rounded text-black"
              />
            </div>
            <div className="mb-2">
              <label className="block text-black">Sales</label>
              <input
                type="number"
                name="sales"
                value={newProduct.sales}
                onChange={handleNewProductChange}
                className="w-full p-2 border rounded text-black"
              />
            </div>
            <div className="flex justify-between mt-4">
              <button onClick={closeAddModal} className="bg-gray-300 px-4 py-2 rounded">Cancelar</button>
              <button onClick={addNewProduct} className="bg-green-500 text-white px-4 py-2 rounded">Añadir</button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ProductsTable;
