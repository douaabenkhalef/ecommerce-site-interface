import { Header } from './components/Header';
import { HeroCarousel } from './components/HeroCarousel';
import { Features } from './components/Features';
import { ShopByCategories } from './components/ShopByCategories';
import { TopRatedProducts } from './components/TopRatedProducts';
import { useRef } from 'react';

export default function App() {
  const mainContentRef = useRef<HTMLDivElement>(null);

  const skipToContent = () => {
    mainContentRef.current?.focus();
    mainContentRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0a0f1a]">
      <a 
        href="#main-content" 
        onClick={skipToContent}
        className="fixed top-0 left-0 bg-cyan-400 text-black p-2 z-50 -translate-y-full focus:translate-y-0 transition-transform text-sm font-medium"
      >
        Passer au contenu principal
      </a>
      
      <Header />
      
      <main 
        id="main-content" 
        ref={mainContentRef}
        tabIndex={-1}
        className="focus:outline-none"
      >
        {/* Section Home avec ID */}
        <div id="home">
          <HeroCarousel />
          <Features />
        </div>
        
        {/* Section SHOP BY CATEGORIES avec ID */}
        <div id="shop">
          <ShopByCategories />
        </div>
        
        {/* Section Top Rated Product's avec ID */}
        <div id="top-rated">
          <TopRatedProducts />
        </div>
      </main>
    </div>
  );
}