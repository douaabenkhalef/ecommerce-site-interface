import { Star, ShoppingCart, Check } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '../../context/CartContext';

interface ProductCardProps {
  id: number;
  image: string;
  name: string;
  price?: string;
  rating?: number;
  onClick?: () => void;
}

export function ProductCard({ id, image, name, price, rating = 5, onClick }: ProductCardProps) {
  const { addToCart } = useCart();
  const [addedToCart, setAddedToCart] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    addToCart({
      id,
      name,
      price: parseFloat(price || '0'),
      image,
      rating
    });
    
    setAddedToCart(true);
    setShowFeedback(true);
    
    setTimeout(() => {
      setShowFeedback(false);
      setTimeout(() => setAddedToCart(false), 500);
    }, 2000);
  };

  return (
    <div 
      onClick={onClick}
      className="bg-[#1a1f2e] rounded-2xl p-6 hover:bg-[#222837] transition-all transform hover:scale-105 cursor-pointer group relative"
    >
      {showFeedback && (
        <div className="absolute top-4 right-4 bg-green-500 text-white text-xs rounded-full px-3 py-1 animate-bounce z-20 flex items-center gap-1 shadow-lg">
          <Check className="w-3 h-3" />
          Ajouté!
        </div>
      )}

      <div className="relative mb-6 h-48 flex items-center justify-center bg-gradient-to-b from-transparent to-purple-500/10 rounded-xl">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-contain drop-shadow-2xl transform group-hover:scale-110 transition-transform duration-300"
          onError={(e) => {
            e.currentTarget.src = 'https://placehold.co/300x300/1a1f2e/00ffff?text=' + encodeURIComponent(name);
          }}
        />
      </div>

      <div className="space-y-3">
        <h3 className="text-white text-lg">{name}</h3>
        
        <div className="flex gap-1">
          {[...Array(5)].map((_, index) => (
            <Star 
              key={index}
              className={`w-4 h-4 ${
                index < rating 
                  ? 'fill-pink-500 text-pink-500' 
                  : 'fill-gray-600 text-gray-600'
              }`}
            />
          ))}
        </div>

        <div className="flex items-center justify-between">
          {price && (
            <p className="text-cyan-400 text-xl">{price} €</p>
          )}
          
          <button
            onClick={handleAddToCart}
            disabled={addedToCart}
            className={`p-2 rounded-full transition-all relative group/btn ${
              addedToCart 
                ? 'bg-green-500 text-white scale-110' 
                : 'bg-purple-500/20 text-purple-400 hover:bg-purple-500 hover:text-white hover:scale-110'
            }`}
            aria-label="Add to cart"
          >
            {addedToCart ? <Check className="w-4 h-4" /> : <ShoppingCart className="w-4 h-4" />}
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover/btn:opacity-100 transition-opacity whitespace-nowrap">
              Ajouter au panier
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}