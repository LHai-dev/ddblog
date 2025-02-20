import { useState } from "react";
import { ShoppingCart, Minus, Plus } from "lucide-react";

type ProductSize = {
  size: string;
  price: number;
};

type Product = {
  id: number;
  name: string;
  description: string;
  imageUrl?: string;
  sizes: ProductSize[];
};

type ProductsProps = {
  products: Product[];
};

const Products = ({ products }: ProductsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(
    product.sizes.length > 0 ? product.sizes[0] : null
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [isHovered, setIsHovered] = useState(false);

  const handleQuickSale = () => {
    if (!selectedSize) {
      alert("Please select a size first");
      return;
    }
    // Handle sale logic here
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div 
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <ProductImage imageUrl={product.imageUrl} name={product.name} isHovered={isHovered} />
      </div>
      <div className="p-4">
        <h2 className="text-xl font-bold tracking-tight">{product.name}</h2>
        <p className="text-sm text-gray-600 line-clamp-2 mt-1">{product.description}</p>

        <div className="mt-4">
          <SizeSelector 
            sizes={product.sizes} 
            selectedSize={selectedSize} 
            setSelectedSize={setSelectedSize} 
          />
          <div className="flex items-center justify-between mt-4">
            <PriceDisplay selectedSize={selectedSize} />
            <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
          </div>
          <QuickSaleButton onClick={handleQuickSale} />
        </div>
      </div>
    </div>
  );
};

type ProductImageProps = {
  imageUrl?: string;
  name: string;
  isHovered: boolean;
};

const ProductImage = ({ imageUrl, name, isHovered }: ProductImageProps) => (
  <div className="relative aspect-square overflow-hidden bg-gray-100">
    <img
      src={imageUrl || "/api/placeholder/400/400"}
      alt={name}
      className={`w-full h-full object-cover transition-transform duration-300 ${
        isHovered ? 'scale-110' : 'scale-100'
      }`}
    />
  </div>
);

type SizeSelectorProps = {
  sizes: ProductSize[];
  selectedSize: ProductSize | null;
  setSelectedSize: (size: ProductSize) => void;
};

const SizeSelector = ({ sizes, selectedSize, setSelectedSize }: SizeSelectorProps) => (
  <div className="mt-2">
    <label className="text-sm font-medium text-gray-700 mb-2 block">Size</label>
    <div className="flex flex-wrap gap-2">
      {sizes.map((size) => (
        <button
          key={size.size}
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors
            ${
              selectedSize?.size === size.size
                ? "bg-gray-900 text-white"
                : "bg-gray-100 text-gray-900 hover:bg-gray-200"
            }`}
          onClick={() => setSelectedSize(size)}
        >
          {size.size}
        </button>
      ))}
    </div>
  </div>
);

type PriceDisplayProps = {
  selectedSize: ProductSize | null;
};

const PriceDisplay = ({ selectedSize }: PriceDisplayProps) => (
  <div className="text-lg font-bold">
    R{selectedSize ? selectedSize.price.toFixed(2) : "0.00"}
  </div>
);

type QuantitySelectorProps = {
  quantity: number;
  setQuantity: (quantity: number | ((prevQuantity: number) => number)) => void;
};

const QuantitySelector = ({ quantity, setQuantity }: QuantitySelectorProps) => (
  <div className="flex items-center gap-1">
    <button
      className="p-1 rounded-md hover:bg-gray-100 transition-colors"
      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
    >
      <Minus className="w-4 h-4" />
    </button>
    <span className="w-8 text-center font-medium">{quantity}</span>
    <button
      className="p-1 rounded-md hover:bg-gray-100 transition-colors"
      onClick={() => setQuantity((q) => q + 1)}
    >
      <Plus className="w-4 h-4" />
    </button>
  </div>
);

type QuickSaleButtonProps = {
  onClick: () => void;
};

const QuickSaleButton = ({ onClick }: QuickSaleButtonProps) => (
  <button 
    onClick={onClick}
    className="mt-4 w-full bg-gray-900 text-white py-2 rounded-md font-medium
      flex items-center justify-center gap-2 hover:bg-gray-800 
      transition-colors duration-200"
  >
    <ShoppingCart className="w-4 h-4" />
    Quick Sale
  </button>
);

export default Products;