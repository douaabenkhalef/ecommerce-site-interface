import { useState } from 'react';
import { X, ShoppingCart, Trash2, Plus, Minus, ArrowRight, CreditCard, Truck, Check } from 'lucide-react';
import { useCart } from '../../context/CartContext';

interface CartProps {
  onClose: () => void;
}

export function Cart({ onClose }: CartProps) {
  const { cartItems, updateQuantity, removeFromCart, clearCart, getCartTotal } = useCart();
  const [showOrderConfirmation, setShowOrderConfirmation] = useState(false);

  // Règle 6: Annulation facile - Supprimer un article avec confirmation
  const removeItem = (id: number) => {
    if (window.confirm('❌ Supprimer cet article du panier ?')) {
      removeFromCart(id);
    }
  };

  // Règle 6: Annulation facile - Vider le panier avec confirmation
  const clearCartWithConfirm = () => {
    if (window.confirm('⚠️ Voulez-vous vraiment vider votre panier ?')) {
      clearCart();
    }
  };

  // Règle 4: Dialogue de clôture - Confirmation après paiement
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('Votre panier est vide');
      return;
    }
    setShowOrderConfirmation(true);
    setTimeout(() => {
      setShowOrderConfirmation(false);
      clearCart();
      onClose();
    }, 3000);
  };

  const subtotal = getCartTotal();
  const shipping = subtotal > 300 ? 0 : 15.99;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = 'https://placehold.co/100x100/1a1f2e/00ffff?text=Gaming+Gear';
  };

  return (
    <>
      {/* Règle 4: Modal de confirmation de commande */}
      {showOrderConfirmation && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="bg-gradient-to-b from-[#1a1f2e] to-[#0f1419] rounded-2xl p-8 max-w-md text-center border border-green-500/30 animate-scale-in">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-400" />
            </div>
            <h3 className="text-white text-2xl font-bold mb-2">Commande confirmée !</h3>
            <p className="text-gray-400 mb-4">Merci pour votre achat</p>
            <p className="text-cyan-400 text-sm">Un email de confirmation vous a été envoyé</p>
          </div>
        </div>
      )}

      <div className="fixed inset-0 z-50 flex items-center justify-end p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
        {/* Overlay qui ferme le panier au clic */}
        <div className="absolute inset-0" onClick={onClose}></div>
        
        {/* Panier */}
        <div className="relative w-full max-w-2xl h-[85vh] bg-gradient-to-b from-[#1a1f2e] to-[#0f1419] rounded-2xl shadow-2xl border border-purple-500/20 overflow-hidden animate-slide-in-right">
          
          {/* En-tête fixe */}
          <div className="relative h-24 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-cyan-600/20 flex-shrink-0">
            <div className="absolute inset-0 bg-black/50"></div>
            <div className="relative flex items-center justify-between h-full px-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
                  <ShoppingCart className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-white text-2xl font-bold">Mon Panier</h2>
                <span className="text-gray-400 text-sm">({cartItems.length} articles)</span>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {/* Corps avec défilement indépendant */}
          <div className="flex flex-col h-[calc(85vh-6rem)] overflow-hidden">
            
            {/* Liste des articles - scrollable */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cartItems.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🛒</div>
                  <h3 className="text-white text-xl mb-2">Votre panier est vide</h3>
                  <p className="text-gray-400">Ajoutez des produits pour commencer</p>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className="bg-[#0a0f1a] rounded-xl p-4 border border-purple-500/20 hover:border-purple-500/40 transition-all">
                    <div className="flex gap-4">
                      {/* Image */}
                      <div className="w-20 h-20 bg-gradient-to-b from-transparent to-purple-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-full h-full object-contain rounded-lg"
                          onError={handleImageError}
                        />
                      </div>
                      
                      {/* Infos */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <h3 className="text-white font-semibold">{item.name}</h3>
                            <div className="flex gap-1 mt-1">
                              {[...Array(5)].map((_, i) => (
                                <span key={i} className={`text-xs ${i < item.rating ? 'text-pink-500' : 'text-gray-600'}`}>★</span>
                              ))}
                            </div>
                            <p className="text-cyan-400 font-bold mt-1">{item.price.toFixed(2)} €</p>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="p-2 text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        
                        {/* Quantité */}
                        <div className="flex items-center gap-3 mt-3">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 rounded-lg bg-purple-500/20 hover:bg-purple-500/40 text-white transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="text-white w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 rounded-lg bg-purple-500/20 hover:bg-purple-500/40 text-white transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                          <span className="text-gray-400 text-sm ml-auto">
                            Total: {(item.price * item.quantity).toFixed(2)} €
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Résumé de la commande - fixe en bas */}
            {cartItems.length > 0 && (
              <div className="border-t border-purple-500/20 p-6 space-y-4 bg-gradient-to-b from-[#1a1f2e] to-[#0f1419] flex-shrink-0">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-white font-semibold">Résumé de la commande</h3>
                  <button 
                    onClick={clearCartWithConfirm}
                    className="text-xs text-red-400 hover:text-red-300 transition-colors flex items-center gap-1"
                  >
                    <Trash2 className="w-3 h-3" />
                    Vider le panier
                  </button>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-gray-400">
                    <span>Sous-total</span>
                    <span>{subtotal.toFixed(2)} €</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span className="flex items-center gap-2">
                      <Truck className="w-4 h-4" />
                      Livraison
                    </span>
                    <span>{shipping === 0 ? 'Gratuite' : `${shipping.toFixed(2)} €`}</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Taxes (10%)</span>
                    <span>{tax.toFixed(2)} €</span>
                  </div>
                  <div className="border-t border-purple-500/20 pt-2 mt-2">
                    <div className="flex justify-between text-white font-bold text-lg">
                      <span>Total</span>
                      <span className="text-cyan-400">{total.toFixed(2)} €</span>
                    </div>
                  </div>
                </div>

                {/* Message livraison gratuite */}
                {subtotal < 300 && (
                  <div className="bg-purple-500/10 rounded-lg p-3 border border-purple-500/20">
                    <p className="text-purple-400 text-sm text-center">
                      Plus que {(300 - subtotal).toFixed(2)} € pour la livraison gratuite !
                    </p>
                    <div className="w-full bg-purple-500/20 rounded-full h-1 mt-2">
                      <div 
                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-1 rounded-full transition-all"
                        style={{ width: `${(subtotal / 300) * 100}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Bouton de paiement */}
                <button 
                  onClick={handleCheckout}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-3 rounded-xl transition-all transform hover:scale-105 flex items-center justify-center gap-2 group"
                >
                  <CreditCard className="w-5 h-5" />
                  <span className="font-medium">Procéder au paiement</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                {/* Logos de paiement */}
                <div className="flex items-center justify-center gap-4 pt-2 flex-wrap">
                  <img src="https://cdn-icons-png.flaticon.com/512/196/196539.png" alt="Visa" className="h-6 opacity-50 hover:opacity-100 transition-opacity" />
                  <img src="https://cdn-icons-png.flaticon.com/512/196/196561.png" alt="Mastercard" className="h-6 opacity-50 hover:opacity-100 transition-opacity" />
                  <img src="https://cdn-icons-png.flaticon.com/512/196/196578.png" alt="PayPal" className="h-6 opacity-50 hover:opacity-100 transition-opacity" />
                  <span className="text-gray-500 text-xs">🔒 Paiement 100% sécurisé</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}