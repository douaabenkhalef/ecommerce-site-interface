import { useState } from 'react';
import { X, Search, Filter, Star, ChevronDown, ShoppingCart, Heart } from 'lucide-react';
import { ProductDetails } from './ProductDetails';
import { useCart } from '../../context/CartContext';

interface SearchModalProps {
  onClose: () => void;
}

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  rating: number;
  image: string;
  inStock: boolean;
}

export function SearchModal({ onClose }: SearchModalProps) {
  const { addToCart } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState<'all' | 'under50' | '50to100' | '100to200' | 'over200'>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [addedToCartId, setAddedToCartId] = useState<number | null>(null);
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    const saved = localStorage.getItem('recentSearches');
    return saved ? JSON.parse(saved) : [];
  });

  const categories = [
    { id: 'all', name: 'Toutes les catégories' },
    { id: 'keyboard', name: 'Keyboards' },
    { id: 'mouse', name: 'Souris' },
    { id: 'headset', name: 'Casques' },
    { id: 'controller', name: 'Manettes' }
  ];

  const products: Product[] = [
    {
      id: 1,
      name: "Zephyr Wireless Gaming Mouse",
      price: 149.99,
      category: "mouse",
      rating: 5,
      image: "/images/img11.jpeg",
      inStock: true
    },
    {
      id: 2,
      name: "Vipersonic X Pro Headset",
      price: 199.99,
      category: "headset",
      rating: 5,
      image: "/images/img12.jpeg",
      inStock: true
    },
    {
      id: 3,
      name: "Pulsar Phantom Keyboard",
      price: 89.99,
      category: "keyboard",
      rating: 4,
      image: "/images/img13.jpeg",
      inStock: true
    },
    {
      id: 4,
      name: "Vortex Wireless Controller",
      price: 79.99,
      category: "controller",
      rating: 5,
      image: "/images/img14.jpeg",
      inStock: false
    },
    {
      id: 5,
      name: "Quantum RGB Mechanical Keyboard",
      price: 159.99,
      category: "keyboard",
      rating: 5,
      image: "/images/img15.jpeg",
      inStock: true
    },
    {
      id: 6,
      name: "Apex Precision Gaming Mouse",
      price: 129.99,
      category: "mouse",
      rating: 4,
      image: "/images/img4.jpg",
      inStock: true
    },
    {
      id: 7,
      name: "Neon Strike RGB Headset",
      price: 249.99,
      category: "headset",
      rating: 5,
      image: "/images/img12.jpeg",
      inStock: true
    },
    {
      id: 8,
      name: "Phantom Elite Controller",
      price: 69.99,
      category: "controller",
      rating: 4,
      image: "/images/img5.jpg",
      inStock: true
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    
    let matchesPrice = true;
    switch (priceRange) {
      case 'under50':
        matchesPrice = product.price < 50;
        break;
      case '50to100':
        matchesPrice = product.price >= 50 && product.price <= 100;
        break;
      case '100to200':
        matchesPrice = product.price >= 100 && product.price <= 200;
        break;
      case 'over200':
        matchesPrice = product.price > 200;
        break;
      default:
        matchesPrice = true;
    }
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      rating: product.rating
    });
    
    setAddedToCartId(product.id);
    setTimeout(() => setAddedToCartId(null), 2000);
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (term.trim() && !recentSearches.includes(term)) {
      const newSearches = [term, ...recentSearches].slice(0, 5);
      setRecentSearches(newSearches);
      localStorage.setItem('recentSearches', JSON.stringify(newSearches));
    }
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = 'https://placehold.co/200x200/1a1f2e/00ffff?text=Gaming+Gear';
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in">
        <div className="absolute inset-0" onClick={onClose}></div>
        
        <div className="relative w-full max-w-4xl h-[85vh] bg-gradient-to-b from-[#1a1f2e] to-[#0f1419] rounded-2xl shadow-2xl border border-purple-500/20 overflow-hidden animate-scale-in flex flex-col">
          
          <div className="flex-shrink-0 bg-gradient-to-b from-[#1a1f2e] to-[#0f1419] border-b border-purple-500/20">
            <div className="p-6 pb-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
                    <Search className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-white text-2xl font-bold">Rechercher</h2>
                </div>
                <button onClick={onClose} className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
              
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Rechercher un produit... (ex: souris, clavier, casque)"
                  className="w-full bg-[#0a0f1a] border border-purple-500/30 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                  autoFocus
                />
              </div>
              
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="mt-3 flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              >
                <Filter className="w-4 h-4" />
                <span className="text-sm">Filtres</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>
              
              {showFilters && (
                <div className="mt-4 p-4 bg-[#0a0f1a] rounded-xl border border-purple-500/20">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-300 text-sm mb-2">Catégorie</label>
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full bg-[#1a1f2e] border border-purple-500/30 rounded-lg py-2 px-3 text-white focus:outline-none focus:border-purple-500"
                      >
                        {categories.map(cat => (
                          <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-gray-300 text-sm mb-2">Prix</label>
                      <select
                        value={priceRange}
                        onChange={(e) => setPriceRange(e.target.value as any)}
                        className="w-full bg-[#1a1f2e] border border-purple-500/30 rounded-lg py-2 px-3 text-white focus:outline-none focus:border-purple-500"
                      >
                        <option value="all">Tous les prix</option>
                        <option value="under50">Moins de 50 €</option>
                        <option value="50to100">50 € - 100 €</option>
                        <option value="100to200">100 € - 200 €</option>
                        <option value="over200">Plus de 200 €</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            <div className="sticky top-0 z-10 bg-gradient-to-b from-[#1a1f2e] to-[#1a1f2e]/95 backdrop-blur-sm px-6 py-3 border-b border-purple-500/20">
              <p className="text-gray-300">
                <span className="font-bold text-cyan-400">{filteredProducts.length}</span> résultat(s) trouvé(s)
              </p>
            </div>
            
            <div className="p-6 pt-4">
              {/* Recherches récentes */}
              {searchTerm === '' && recentSearches.length > 0 && (
                <div className="mb-6 p-4 bg-[#0a0f1a] rounded-xl border border-purple-500/20">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-gray-400 text-sm">🕒 Recherches récentes :</p>
                    <button 
                      onClick={clearRecentSearches}
                      className="text-xs text-red-400 hover:text-red-300 transition-colors"
                    >
                      Effacer
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((search, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSearch(search)}
                        className="px-3 py-1 bg-purple-500/10 rounded-full text-sm text-purple-400 hover:bg-purple-500/20 transition-colors"
                      >
                        {search}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {filteredProducts.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-white text-xl mb-2">Aucun résultat trouvé</h3>
                  <p className="text-gray-400">Essayez d'autres mots-clés ou modifiez vos filtres</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredProducts.map((product) => (
                    <div 
                      key={product.id} 
                      onClick={() => handleProductClick(product)}
                      className="bg-[#0a0f1a] rounded-xl p-4 border border-purple-500/20 hover:border-purple-500/40 transition-all group cursor-pointer"
                    >
                      <div className="flex gap-4">
                        <div className="w-20 h-20 bg-gradient-to-b from-transparent to-purple-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-full h-full object-contain rounded-lg"
                            onError={handleImageError}
                          />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h3 className="text-white font-semibold group-hover:text-cyan-400 transition-colors">
                            {product.name}
                          </h3>
                          <div className="flex gap-1 mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`w-3 h-3 ${i < product.rating ? 'fill-pink-500 text-pink-500' : 'text-gray-600'}`} />
                            ))}
                          </div>
                          <p className="text-cyan-400 font-bold mt-1">{product.price.toFixed(2)} €</p>
                          <div className="flex items-center gap-2 mt-2 flex-wrap">
                            <span className={`text-xs px-2 py-0.5 rounded-full ${product.inStock ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                              {product.inStock ? 'En stock' : 'Rupture'}
                            </span>
                            <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-400">
                              {categories.find(c => c.id === product.category)?.name}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex flex-col gap-2 flex-shrink-0">
                          <button 
                            onClick={(e) => handleAddToCart(e, product)}
                            disabled={!product.inStock}
                            className={`p-2 rounded-lg transition-all ${
                              addedToCartId === product.id
                                ? 'bg-green-500 text-white scale-110'
                                : product.inStock 
                                  ? 'bg-purple-500/20 text-purple-400 hover:bg-purple-500 hover:text-white' 
                                  : 'bg-gray-500/20 text-gray-500 cursor-not-allowed'
                            }`}
                          >
                            {addedToCartId === product.id ? (
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            ) : (
                              <ShoppingCart className="w-4 h-4" />
                            )}
                          </button>
                          <button 
                            onClick={(e) => e.stopPropagation()}
                            className="p-2 rounded-lg bg-purple-500/20 text-purple-400 hover:bg-purple-500 hover:text-white transition-all"
                          >
                            <Heart className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {searchTerm === '' && filteredProducts.length === products.length && recentSearches.length === 0 && (
            <div className="flex-shrink-0 border-t border-purple-500/20 p-4 bg-[#0a0f1a]">
              <p className="text-gray-400 text-sm mb-2">Recherches populaires :</p>
              <div className="flex flex-wrap gap-2">
                {['souris gaming', 'clavier mécanique', 'casque rgb', 'manette', 'pc portable'].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => handleSearch(suggestion)}
                    className="px-3 py-1 bg-purple-500/10 rounded-full text-sm text-purple-400 hover:bg-purple-500/20 transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {selectedProduct && (
        <ProductDetails 
          product={{
            id: selectedProduct.id,
            name: selectedProduct.name,
            price: selectedProduct.price,
            category: selectedProduct.category,
            rating: selectedProduct.rating,
            image: selectedProduct.image,
            inStock: selectedProduct.inStock,
            description: `Découvrez le ${selectedProduct.name}, un produit gaming haut de gamme conçu pour les joueurs exigeants. Avec ses performances exceptionnelles et son design ergonomique, il vous offrira une expérience de jeu inégalée.`,
            specs: [
              "Connectivité sans fil ultra-rapide",
              "Autonomie de 50 heures",
              "RGB personnalisable",
              "Compatible PC, Mac, console"
            ]
          }}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </>
  );
}