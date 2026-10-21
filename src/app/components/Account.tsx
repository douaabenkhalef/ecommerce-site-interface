import { useState } from 'react';
import { X, User, Mail, Lock, ShoppingBag, Heart, Settings, LogOut, ChevronRight, Edit2, Camera, Check, AlertCircle } from 'lucide-react';

interface AccountProps {
  onClose: () => void;
}

export function Account({ onClose }: AccountProps) {
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'wishlist' | 'settings'>('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    avatar: 'https://ui-avatars.com/api/?background=a855f7&color=fff&name=Alex+Johnson',
    joinDate: 'Janvier 2024',
    orders: 12,
    wishlistCount: 5
  });

  const [formData, setFormData] = useState({
    name: userData.name,
    email: userData.email,
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const orders = [
    { id: '#ORD-001', date: '15 Mars 2024', total: 299.99, status: 'Livré', items: 2 },
    { id: '#ORD-002', date: '28 Février 2024', total: 149.99, status: 'En cours', items: 1 },
    { id: '#ORD-003', date: '10 Janvier 2024', total: 89.99, status: 'Livré', items: 1 }
  ];

  const wishlist = [
    { id: 1, name: 'Zephyr Wireless Gaming Mouse', price: 149.99, image: '/images/img11.jpeg', inStock: true },
    { id: 2, name: 'Quantum RGB Headset', price: 159.99, image: '/images/img15.jpeg', inStock: true },
    { id: 3, name: 'Phantom Elite Controller', price: 69.99, image: '/images/img5.jpg', inStock: false }
  ];

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
      showNotification('error', 'Les mots de passe ne correspondent pas');
      return;
    }
    setUserData({ ...userData, name: formData.name, email: formData.email });
    setIsEditing(false);
    showNotification('success', 'Profil mis à jour avec succès');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Livré': return 'bg-green-500/20 text-green-400';
      case 'En cours': return 'bg-yellow-500/20 text-yellow-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in">
      <div className="absolute inset-0" onClick={onClose}></div>
      
      <div className="relative w-full max-w-5xl h-[85vh] bg-gradient-to-b from-[#1a1f2e] to-[#0f1419] rounded-2xl shadow-2xl border border-purple-500/20 overflow-hidden animate-scale-in flex flex-col">
        
        {/* En-tête */}
        <div className="relative h-32 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-cyan-600/20 flex-shrink-0">
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="relative flex items-center justify-between h-full px-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
                <User className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-white text-2xl font-bold">Mon Compte</h2>
            </div>
            <button onClick={onClose} className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
          
          {/* Avatar et infos utilisateur */}
          <div className="absolute -bottom-12 left-6 flex items-center gap-4">
            <div className="relative">
              <img src={userData.avatar} alt="Avatar" className="w-20 h-20 rounded-full border-4 border-purple-500/50 bg-[#1a1f2e]" />
              <button className="absolute bottom-0 right-0 p-1.5 bg-purple-500 rounded-full hover:bg-purple-600 transition-colors">
                <Camera className="w-3 h-3 text-white" />
              </button>
            </div>
            <div className="mt-8">
              <h3 className="text-white text-xl font-bold">{userData.name}</h3>
              <p className="text-gray-400 text-sm">Membre depuis {userData.joinDate}</p>
            </div>
          </div>
        </div>

        {/* Contenu principal avec tabs */}
        <div className="flex flex-1 overflow-hidden mt-12">
          
          {/* Menu latéral */}
          <div className="w-64 border-r border-purple-500/20 p-4 space-y-2">
            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all ${
                activeTab === 'profile'
                  ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-cyan-400 border border-purple-500/30'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <User className="w-5 h-5" />
              <span className="flex-1 text-left">Profil</span>
              <ChevronRight className="w-4 h-4 opacity-50" />
            </button>
            
            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all ${
                activeTab === 'orders'
                  ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-cyan-400 border border-purple-500/30'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="flex-1 text-left">Commandes</span>
              <span className="text-xs bg-purple-500/30 px-2 py-0.5 rounded-full">{userData.orders}</span>
            </button>
            
            <button
              onClick={() => setActiveTab('wishlist')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all ${
                activeTab === 'wishlist'
                  ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-cyan-400 border border-purple-500/30'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Heart className="w-5 h-5" />
              <span className="flex-1 text-left">Liste d'envies</span>
              <span className="text-xs bg-purple-500/30 px-2 py-0.5 rounded-full">{userData.wishlistCount}</span>
            </button>
            
            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all ${
                activeTab === 'settings'
                  ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-cyan-400 border border-purple-500/30'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Settings className="w-5 h-5" />
              <span className="flex-1 text-left">Paramètres</span>
            </button>
            
            <div className="border-t border-purple-500/20 my-2 pt-2">
              <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-red-400 hover:bg-red-500/10 transition-all">
                <LogOut className="w-5 h-5" />
                <span className="flex-1 text-left">Déconnexion</span>
              </button>
            </div>
          </div>

          {/* Contenu principal */}
          <div className="flex-1 overflow-y-auto p-6">
            
            {/* Profil */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-white text-xl font-bold">Informations personnelles</h3>
                  {!isEditing && (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center gap-2 px-4 py-2 bg-purple-500/20 text-purple-400 rounded-xl hover:bg-purple-500/30 transition-all"
                    >
                      <Edit2 className="w-4 h-4" />
                      Modifier
                    </button>
                  )}
                </div>
                
                {isEditing ? (
                  <form onSubmit={handleProfileUpdate} className="space-y-4">
                    <div>
                      <label className="block text-gray-300 text-sm mb-2">Nom complet</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-[#0a0f1a] border border-purple-500/30 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-purple-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 text-sm mb-2">Email</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-[#0a0f1a] border border-purple-500/30 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-purple-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 text-sm mb-2">Nouveau mot de passe</label>
                      <input
                        type="password"
                        value={formData.newPassword}
                        onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                        placeholder="Laisser vide pour ne pas changer"
                        className="w-full bg-[#0a0f1a] border border-purple-500/30 rounded-xl py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 text-sm mb-2">Confirmer le mot de passe</label>
                      <input
                        type="password"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        className="w-full bg-[#0a0f1a] border border-purple-500/30 rounded-xl py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                      />
                    </div>
                    <div className="flex gap-3">
                      <button type="submit" className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white hover:scale-105 transition-transform">
                        Enregistrer
                      </button>
                      <button type="button" onClick={() => setIsEditing(false)} className="px-6 py-2 bg-gray-600/30 rounded-xl text-gray-300 hover:bg-gray-600/50 transition-all">
                        Annuler
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-4 bg-[#0a0f1a] rounded-xl p-6 border border-purple-500/20">
                    <div className="flex justify-between pb-3 border-b border-purple-500/20">
                      <span className="text-gray-400">Nom complet</span>
                      <span className="text-white">{userData.name}</span>
                    </div>
                    <div className="flex justify-between pb-3 border-b border-purple-500/20">
                      <span className="text-gray-400">Email</span>
                      <span className="text-white">{userData.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Membre depuis</span>
                      <span className="text-white">{userData.joinDate}</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Commandes */}
            {activeTab === 'orders' && (
              <div className="space-y-4">
                <h3 className="text-white text-xl font-bold">Mes commandes</h3>
                {orders.map((order) => (
                  <div key={order.id} className="bg-[#0a0f1a] rounded-xl p-4 border border-purple-500/20 hover:border-purple-500/40 transition-all">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <span className="text-cyan-400 font-mono text-sm">{order.id}</span>
                        <p className="text-gray-500 text-xs mt-1">{order.date}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">{order.items} article(s)</span>
                      <span className="text-white font-bold">{order.total.toFixed(2)} €</span>
                    </div>
                    <button className="mt-3 text-sm text-purple-400 hover:text-purple-300 transition-colors">
                      Voir les détails →
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Liste d'envies */}
            {activeTab === 'wishlist' && (
              <div className="space-y-4">
                <h3 className="text-white text-xl font-bold">Ma liste d'envies</h3>
                {wishlist.map((item) => (
                  <div key={item.id} className="bg-[#0a0f1a] rounded-xl p-4 border border-purple-500/20 hover:border-purple-500/40 transition-all flex gap-4">
                    <div className="w-16 h-16 bg-gradient-to-b from-transparent to-purple-500/10 rounded-lg flex items-center justify-center">
                      <img src={item.image} alt={item.name} className="w-full h-full object-contain rounded-lg" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-semibold">{item.name}</h4>
                      <p className="text-cyan-400 font-bold">{item.price.toFixed(2)} €</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${item.inStock ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                        {item.inStock ? 'En stock' : 'Rupture'}
                      </span>
                    </div>
                    <button className="px-4 py-2 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500 hover:text-white transition-all">
                      Ajouter au panier
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Paramètres */}
            {activeTab === 'settings' && (
              <div className="space-y-6">
                <h3 className="text-white text-xl font-bold">Paramètres</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-[#0a0f1a] rounded-xl border border-purple-500/20">
                    <div>
                      <p className="text-white font-medium">Notifications</p>
                      <p className="text-gray-400 text-sm">Recevoir des alertes sur vos commandes</p>
                    </div>
                    <button className="w-12 h-6 bg-purple-500 rounded-full relative">
                      <span className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></span>
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-[#0a0f1a] rounded-xl border border-purple-500/20">
                    <div>
                      <p className="text-white font-medium">Newsletter</p>
                      <p className="text-gray-400 text-sm">Recevoir les offres exclusives</p>
                    </div>
                    <button className="w-12 h-6 bg-gray-600 rounded-full relative">
                      <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Notification */}
        {notification && (
          <div className={`absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-lg animate-slide-in-up ${
            notification.type === 'success' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'
          }`}>
            {notification.type === 'success' ? <Check className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            <span className="text-sm">{notification.message}</span>
          </div>
        )}
      </div>
    </div>
  );
}