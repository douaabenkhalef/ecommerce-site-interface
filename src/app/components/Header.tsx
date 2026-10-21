import { Search, User, Heart, ShoppingCart, ChevronDown, X } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { LoginSignup } from './LoginSignup';
import { Cart } from './Cart';
import { SearchModal } from './SearchModal';
import { Account } from './Account';
import { useCart } from '../../context/CartContext';
import { Navigation } from './Navigation';

export function Header() {
  const { cartCount } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showAccount, setShowAccount] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === '/') {
        e.preventDefault();
        setShowSearchModal(true);
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
        e.preventDefault();
        setShowCart(true);
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
        e.preventDefault();
        setShowLoginModal(true);
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'h') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      if (e.key === 'F1') {
        e.preventDefault();
        alert('🎮 RACCOURCIS GEARNIX 🎮\n\n• Ctrl+/ : Recherche avancée\n• Ctrl+E : Ouvrir le panier\n• Ctrl+L : Connexion\n• Ctrl+H : Haut de page\n• Escape : Fermer les fenêtres');
      }
      if (e.key === 'Escape') {
        if (showSearch) {
          setShowSearch(false);
          setSearchQuery('');
          setErrorMessage('');
        }
        setShowCart(false);
        setShowLoginModal(false);
        setShowSearchModal(false);
        setShowAccount(false);
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [showSearch]);

  const handleQuickSearch = () => {
    if (searchQuery.length < 2) {
      setErrorMessage('⚠️ Minimum 2 caractères pour la recherche !');
      return;
    }
    setErrorMessage('');
    setShowSearchModal(true);
    setShowSearch(false);
    setSearchQuery('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleQuickSearch();
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setErrorMessage('');
    setShowSearch(false);
  };

  return (
    <>
      <header className="bg-[#0a0f1a] border-b border-gray-800 sticky top-0 z-40">
        <div className="max-w-[1400px] mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-8">
            <div className="flex items-center gap-2 cursor-pointer group">
              <div className="text-cyan-400 text-2xl group-hover:scale-110 transition-transform">⚡</div>
              <span className="text-white text-2xl font-bold tracking-wider">GEARNIX</span>
            </div>

            {/* Navigation avec sections synchronisées */}
            <Navigation />

            <div className="flex items-center gap-6">
              {/* Recherche */}
              <div className="relative">
                {showSearch ? (
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-64 bg-[#1a1f2e] rounded-lg p-2 flex items-center gap-2 z-50 border border-cyan-400/30">
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setErrorMessage('');
                      }}
                      onKeyDown={handleKeyDown}
                      placeholder="Rechercher... (Ctrl+/)"
                      className="flex-1 bg-transparent text-white outline-none text-sm"
                      autoFocus
                    />
                    <button onClick={clearSearch} className="text-gray-400 hover:text-white transition-colors">
                      <X className="w-4 h-4" />
                    </button>
                    <button onClick={handleQuickSearch} className="text-cyan-400 hover:text-cyan-300 transition-colors">
                      <Search className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <button onClick={() => setShowSearchModal(true)} className="text-gray-300 hover:text-cyan-400 transition-colors relative group">
                    <Search className="w-5 h-5" />
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      Rechercher (Ctrl+/)
                    </span>
                  </button>
                )}
                {errorMessage && (
                  <div className="absolute right-0 top-full mt-2 bg-red-500 text-white text-xs rounded-lg p-2 whitespace-nowrap z-50 animate-pulse">
                    {errorMessage}
                  </div>
                )}
              </div>

              {/* Wishlist */}
              <button className="text-gray-300 hover:text-cyan-400 transition-colors relative group">
                <Heart className="w-5 h-5" />
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Wishlist
                </span>
              </button>
              
              {/* Panier */}
              <button onClick={() => setShowCart(true)} className="text-gray-300 hover:text-cyan-400 transition-all relative group">
                <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Panier (Ctrl+E)
                </span>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center transition-all duration-200 animate-pulse">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Mon compte (icône) + Sign In / Register */}
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setShowAccount(true)}
                  className="relative group"
                  aria-label="Mon compte"
                >
                  <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent transition-all">
                    <User className="w-5 h-5" />
                  </span>
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Mon compte
                  </span>
                </button>
                <button 
                  onClick={() => setShowLoginModal(true)}
                  className="relative group transition-transform hover:scale-105"
                >
                  <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent text-sm font-medium">
                    Sign In / Register
                  </span>
                  {/* Trait de soulignement dégradé cyan → violet */}
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"></span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Modals */}
      {showLoginModal && <LoginSignup onClose={() => setShowLoginModal(false)} />}
      {showCart && <Cart onClose={() => setShowCart(false)} />}
      {showSearchModal && <SearchModal onClose={() => setShowSearchModal(false)} />}
      {showAccount && <Account onClose={() => setShowAccount(false)} />}
    </>
  );
}