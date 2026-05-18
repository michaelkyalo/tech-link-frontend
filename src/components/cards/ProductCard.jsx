import useCart from "../../hooks/usecart";
import { formatCurrency } from "../../utils/helpers";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="border rounded-lg p-4 shadow-md">
      <img
        src={product.image_url}
        alt={product.name}
        className="w-full h-48 object-cover rounded"
      />

      <h2 className="text-xl font-bold mt-2">
        {product.name}
      </h2>

      <p className="text-gray-600">
        {product.description}
      </p>

      <p className="font-bold text-green-700 mt-2">
        {formatCurrency(product.price)}
      </p>

      <button
        onClick={() => addToCart(product)}
        className="bg-green-600 text-white px-4 py-2 mt-3 rounded"
      >
        Add To Cart
      </button>
    </div>
  );
};

export default ProductCard;