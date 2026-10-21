import { ArrowRight } from 'lucide-react';
import { useState } from 'react';

interface CategoryCardProps {
  image: string;
  title: string;
  itemCount: string;
}

export function CategoryCard({ image, title, itemCount }: CategoryCardProps) {
  const [isClicked, setIsClicked] = useState(false);

  // Règle 3: Feedback au clic
  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 300);
  };

  return (
    <div 
      onClick={handleClick}
      className={`bg-gradient-to-b from-[#1a1f2e] to-[#141824] rounded-2xl p-6 hover:from-[#222837] hover:to-[#1a1f2e] transition-all transform hover:scale-105 cursor-pointer group overflow-hidden relative ${
        isClicked ? 'scale-95' : ''
      }`}
    >
      {/* Purple Glow Effect */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-purple-500/30 to-transparent opacity-50 group-hover:opacity-70 transition-opacity"></div>
      
      {/* Image Container */}
      <div className="relative mb-6 h-48 flex items-center justify-center">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-contain drop-shadow-2xl transform group-hover:scale-110 transition-transform duration-300"
        />
      </div>

      {/* Text Content */}
      <div className="relative z-10">
        <h3 className="text-white text-xl mb-2">{title}</h3>
        <button className="text-cyan-400 flex items-center gap-2 text-sm group-hover:gap-3 transition-all">
          {itemCount} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}