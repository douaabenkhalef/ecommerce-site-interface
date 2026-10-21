import { useState } from 'react';
import { X, Mail, Lock, User, Eye, EyeOff, ArrowRight, Github, Twitter } from 'lucide-react';

interface LoginSignupProps {
  onClose: () => void;
}

export function LoginSignup({ onClose }: LoginSignupProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  // Règle 5: Messages d'erreur informatifs
  const getErrorMessage = (field: string) => {
    const errorMessages: Record<string, string> = {
      name: 'Le nom complet est requis',
      email: 'Veuillez entrer une adresse email valide (exemple@domaine.com)',
      password: 'Le mot de passe doit contenir au moins 6 caractères',
      confirmPassword: 'Les mots de passe ne correspondent pas'
    };
    return errorMessages[field] || 'Champ invalide';
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!isLogin && !formData.name.trim()) {
      newErrors.name = 'name';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'email';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'email';
    }

    if (!formData.password) {
      newErrors.password = 'password';
    } else if (formData.password.length < 6) {
      newErrors.password = 'password';
    }

    if (!isLogin && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'confirmPassword';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted:', formData);
      alert(isLogin ? 'Connexion réussie !' : 'Inscription réussie !');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md">
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white/70 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="bg-gradient-to-b from-[#1a1f2e] to-[#0f1419] rounded-2xl shadow-2xl border border-purple-500/20 overflow-hidden">
          <div className="relative h-32 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-cyan-600/20">
            <div className="absolute inset-0 bg-black/50"></div>
            <div className="relative flex items-center justify-center h-full">
              <div className="text-center">
                <div className="text-cyan-400 text-3xl mb-1">⚡</div>
                <h2 className="text-white text-2xl font-bold tracking-wider">GEARNIX</h2>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="flex gap-2 mb-8 bg-[#0a0f1a] rounded-full p-1">
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-2 rounded-full transition-all ${
                  isLogin
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Connexion
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-2 rounded-full transition-all ${
                  !isLogin
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Inscription
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {!isLogin && (
                <div>
                  <label className="block text-gray-300 text-sm mb-2">Nom complet</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Jean Dupont"
                      className={`w-full bg-[#0a0f1a] border ${
                        errors.name ? 'border-red-500' : 'border-purple-500/30'
                      } rounded-xl py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors`}
                    />
                  </div>
                  {errors.name && (
                    <div className="flex items-center gap-2 mt-1 text-red-400 text-xs bg-red-500/10 rounded-lg p-2">
                      <span className="inline-block w-4 h-4 bg-red-500 rounded-full text-white text-center leading-4 text-xs">!</span>
                      <span>{getErrorMessage('name')}</span>
                    </div>
                  )}
                </div>
              )}

              <div>
                <label className="block text-gray-300 text-sm mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="exemple@email.com"
                    className={`w-full bg-[#0a0f1a] border ${
                      errors.email ? 'border-red-500' : 'border-purple-500/30'
                    } rounded-xl py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors`}
                  />
                </div>
                {errors.email && (
                  <div className="flex items-center gap-2 mt-1 text-red-400 text-xs bg-red-500/10 rounded-lg p-2">
                    <span className="inline-block w-4 h-4 bg-red-500 rounded-full text-white text-center leading-4 text-xs">!</span>
                    <span>{getErrorMessage('email')}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-gray-300 text-sm mb-2">Mot de passe</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className={`w-full bg-[#0a0f1a] border ${
                      errors.password ? 'border-red-500' : 'border-purple-500/30'
                    } rounded-xl py-3 pl-10 pr-12 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && (
                  <div className="flex items-center gap-2 mt-1 text-red-400 text-xs bg-red-500/10 rounded-lg p-2">
                    <span className="inline-block w-4 h-4 bg-red-500 rounded-full text-white text-center leading-4 text-xs">!</span>
                    <span>{getErrorMessage('password')}</span>
                  </div>
                )}
              </div>

              {!isLogin && (
                <div>
                  <label className="block text-gray-300 text-sm mb-2">Confirmer le mot de passe</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className={`w-full bg-[#0a0f1a] border ${
                        errors.confirmPassword ? 'border-red-500' : 'border-purple-500/30'
                      } rounded-xl py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors`}
                    />
                  </div>
                  {errors.confirmPassword && (
                    <div className="flex items-center gap-2 mt-1 text-red-400 text-xs bg-red-500/10 rounded-lg p-2">
                      <span className="inline-block w-4 h-4 bg-red-500 rounded-full text-white text-center leading-4 text-xs">!</span>
                      <span>{getErrorMessage('confirmPassword')}</span>
                    </div>
                  )}
                </div>
              )}

              {isLogin && (
                <div className="text-right">
                  <button type="button" className="text-sm text-purple-400 hover:text-purple-300 transition-colors">
                    Mot de passe oublié ?
                  </button>
                </div>
              )}

              {/* Règle 6: Annulation facile - Bouton Annuler */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 bg-gray-600/30 hover:bg-gray-600/50 text-white py-3 rounded-xl transition-all"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-3 rounded-xl transition-all transform hover:scale-105 flex items-center justify-center gap-2 group"
                >
                  <span>{isLogin ? 'Se connecter' : "S'inscrire"}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-purple-500/20"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-[#1a1f2e] px-4 text-gray-400">ou continuer avec</span>
              </div>
            </div>

            <div className="flex gap-4">
              <button className="flex-1 bg-[#0a0f1a] border border-purple-500/30 rounded-xl py-2.5 flex items-center justify-center gap-2 text-gray-300 hover:text-white hover:border-purple-500 transition-all">
                <Github className="w-5 h-5" />
                <span className="text-sm">GitHub</span>
              </button>
              <button className="flex-1 bg-[#0a0f1a] border border-purple-500/30 rounded-xl py-2.5 flex items-center justify-center gap-2 text-gray-300 hover:text-white hover:border-purple-500 transition-all">
                <Twitter className="w-5 h-5" />
                <span className="text-sm">Twitter</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}