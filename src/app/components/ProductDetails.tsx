import { X, Star, ShoppingCart, Heart, Truck, RotateCcw, Shield, Minus, Plus, Check } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '../../context/CartContext';

interface ProductDetailsProps {
  product: {
    id: number;
    name: string;
    price: number;
    category: string;
    rating: number;
    image: string;
    inStock: boolean;
    description?: string;
    specs?: string[];
  };
  onClose: () => void;
}

export function ProductDetails({ product, onClose }: ProductDetailsProps) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(product.image);
  const [addedToCart, setAddedToCart] = useState(false);

  const images = [
    product.image,
    product.image.replace('.jpg', '-2.jpg'),
    product.image.replace('.jpg', '-3.jpg'),
  ].filter((img, index) => index === 0 || img !== product.image);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= 99) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    // Ajouter la quantité sélectionnée
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        rating: product.rating
      });
    }
    
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in">
      <div className="absolute inset-0" onClick={onClose}></div>
      
      <div className="relative w-full max-w-5xl max-h-[90vh] bg-gradient-to-b from-[#1a1f2e] to-[#0f1419] rounded-2xl shadow-2xl border border-purple-500/20 overflow-y-auto animate-scale-in">
        
        <button
          onClick={onClose}
          className="sticky top-4 right-4 z-20 float-right m-4 p-2 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-sm transition-colors"
        >
          <X className="w-5 h-5 text-white" />
        </button>
        
        <div className="p-6 pt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Colonne gauche - Images */}
            <div className="space-y-4">
              <div className="bg-[#0a0f1a] rounded-2xl p-8 border border-purple-500/20">
                <img 
                  src={selectedImage} 
                  alt={product.name}
                  className="w-full h-80 object-contain"
                />
              </div>
              
              {images.length > 1 && (
                <div className="flex gap-3">
                  {images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(img)}
                      className={`w-20 h-20 bg-[#0a0f1a] rounded-lg p-2 border transition-all ${
                        selectedImage === img ? 'border-cyan-400 shadow-lg shadow-cyan-400/20' : 'border-purple-500/20 hover:border-purple-500/50'
                      }`}
                    >
                      <img src={img} alt={`Vue ${index + 1}`} className="w-full h-full object-contain" />
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Colonne droite - Infos produit */}
            <div className="space-y-6">
              <span className="inline-block px-3 py-1 bg-purple-500/20 rounded-full text-purple-400 text-sm">
                {product.category === 'mouse' ? 'Souris Gaming' : 
                 product.category === 'keyboard' ? 'Clavier Gaming' :
                 product.category === 'headset' ? 'Casque Gaming' : 'Manette Gaming'}
              </span>
              
              <h1 className="text-white text-3xl font-bold">{product.name}</h1>
              
              <div className="flex items-center gap-3">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-5 h-5 ${i < product.rating ? 'fill-pink-500 text-pink-500' : 'text-gray-600'}`} />
                  ))}
                </div>
                <span className="text-gray-400">(128 avis)</span>
                <span className={`text-sm px-2 py-0.5 rounded-full ${product.inStock ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                  {product.inStock ? 'En stock' : 'Rupture'}
                </span>
              </div>
              
              <div className="flex items-baseline gap-2">
                <span className="text-cyan-400 text-3xl font-bold">{product.price.toFixed(2)} €</span>
                {product.price > 100 && (
                  <span className="text-gray-500 line-through">{(product.price * 1.2).toFixed(2)} €</span>
                )}
                {product.price > 100 && (
                  <span className="bg-green-500/20 text-green-400 text-xs px-2 py-0.5 rounded-full">-20%</span>
                )}
              </div>
              
              <div className="border-t border-purple-500/20 pt-4">
                <h3 className="text-white font-semibold mb-2">Description</h3>
                <p className="text-gray-400 leading-relaxed">
                  {product.description || `Découvrez le ${product.name}, un produit gaming haut de gamme conçu pour les joueurs exigeants. Avec ses performances exceptionnelles et son design ergonomique, il vous offrira une expérience de jeu inégalée.`}
                </p>
              </div>
              
              <div className="border-t border-purple-500/20 pt-4">
                <h3 className="text-white font-semibold mb-2">Caractéristiques</h3>
                <ul className="space-y-2">
                  {product.specs ? product.specs.map((spec, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-400">
                      <Check className="w-4 h-4 text-green-400" />
                      {spec}
                    </li>
                  )) : (
                    <>
                      <li className="flex items-center gap-2 text-gray-400">
                        <Check className="w-4 h-4 text-green-400" />
                        Connectivité sans fil ultra-rapide
                      </li>
                      <li className="flex items-center gap-2 text-gray-400">
                        <Check className="w-4 h-4 text-green-400" />
                        Autonomie de 50 heures
                      </li>
                      <li className="flex items-center gap-2 text-gray-400">
                        <Check className="w-4 h-4 text-green-400" />
                        RGB personnalisable
                      </li>
                      <li className="flex items-center gap-2 text-gray-400">
                        <Check className="w-4 h-4 text-green-400" />
                        Compatible PC, Mac, console
                      </li>
                    </>
                  )}
                </ul>
              </div>
              
              <div className="border-t border-purple-500/20 pt-4">
                <h3 className="text-white font-semibold mb-3">Quantité</h3>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-3 bg-[#0a0f1a] rounded-xl border border-purple-500/30">
                    <button
                      onClick={() => handleQuantityChange(quantity - 1)}
                      className="p-2 px-4 text-white hover:text-cyan-400 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="text-white w-12 text-center">{quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(quantity + 1)}
                      className="p-2 px-4 text-white hover:text-cyan-400 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="text-gray-400 text-sm">
                    Stock disponible: {product.inStock ? '> 10' : '0'}
                  </span>
                </div>
              </div>
              
              <div className="flex gap-4 pt-4">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock || addedToCart}
                  className={`flex-1 py-3 rounded-xl transition-all transform hover:scale-105 flex items-center justify-center gap-2 ${
                    product.inStock && !addedToCart
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white' 
                      : addedToCart
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-600 cursor-not-allowed text-gray-300'
                  }`}
                >
                  {addedToCart ? (
                    <>
                      <Check className="w-5 h-5" />
                      Ajouté !
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5" />
                      Ajouter au panier ({quantity})
                    </>
                  )}
                </button>
                <button className="px-6 py-3 rounded-xl border border-purple-500/30 text-purple-400 hover:bg-purple-500/20 hover:text-white transition-all">
                  <Heart className="w-5 h-5" />
                </button>
              </div>
              
              <div className="border-t border-purple-500/20 pt-4 space-y-3">
                <div className="flex items-center gap-3 text-gray-400 text-sm">
                  <Truck className="w-4 h-4 text-cyan-400" />
                  <span>Livraison gratuite à partir de 300€</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400 text-sm">
                  <RotateCcw className="w-4 h-4 text-cyan-400" />
                  <span>Retour gratuit sous 30 jours</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400 text-sm">
                  <Shield className="w-4 h-4 text-cyan-400" />
                  <span>Garantie 2 ans</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}