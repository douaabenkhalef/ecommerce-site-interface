import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { useState, useEffect } from 'react';

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const totalSlides = 3;

  const slides = [
    {
      title: "Essential Gaming\nGadgets You Need\nin 2024",
      subtitle: "Discover the must-have gaming accessories that\nwill transform your setup",
      image: "/images/img1.jpg",
      cta: "Shop Now"
    },
    {
      title: "Best Gaming\nLaptops of 2023",
      subtitle: "Explore top-rated gaming laptops for ultimate performance",
      image: "/images/img2.jpg",
      cta: "Discover Laptops"
    },
    {
      title: "Top 10\nGaming Accessories",
      subtitle: "Highly recommended gaming gear at amazing prices",
      image: "/images/img3.jpg",
      cta: "View Collection"
    }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        nextSlide();
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [currentSlide, isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  return (
    <div 
      className="relative overflow-hidden"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Image de fond */}
      <div className="absolute inset-0 z-0">
        <img 
          src={slides[currentSlide].image}
          alt={slides[currentSlide].title}
          className="w-full h-full object-cover"
          onError={(e) => {
            console.error("Image failed to load:", slides[currentSlide].image);
            e.currentTarget.src = "https://placehold.co/1920x800/1a1f2e/00ffff?text=Gaming+Gear";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
      </div>
      
      <div className="max-w-[1400px] mx-auto px-4 py-20 relative z-10 min-h-[600px] flex items-end">
        <div className="w-full">
          <div className="max-w-2xl">
            <h1 className="text-white text-5xl leading-tight whitespace-pre-line mb-4 drop-shadow-lg">
              {slides[currentSlide].title}
            </h1>
            <p className="text-gray-100 text-lg mb-6 drop-shadow-lg whitespace-pre-line">
              {slides[currentSlide].subtitle}
            </p>
            <button className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-8 py-3 rounded-full transition-all transform hover:scale-105 shadow-lg">
              {slides[currentSlide].cta}
            </button>
          </div>
        </div>

        {/* Boutons de navigation - apparaissent uniquement au survol */}
        <button 
          onClick={prevSlide}
          className={`absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 z-20 ${
            isHovering ? 'opacity-100 visible' : 'opacity-0 invisible'
          } hover:scale-110`}
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button 
          onClick={nextSlide}
          className={`absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 z-20 ${
            isHovering ? 'opacity-100 visible' : 'opacity-0 invisible'
          } hover:scale-110`}
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Barre de progression */}
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-64 z-20">
          <div className="h-1 bg-white/30 rounded-full overflow-hidden cursor-pointer"
               onClick={(e) => {
                 const rect = e.currentTarget.getBoundingClientRect();
                 const x = e.clientX - rect.left;
                 const width = rect.width;
                 const newIndex = Math.floor((x / width) * totalSlides);
                 goToSlide(newIndex);
               }}>
            <div 
              className="h-full bg-gradient-to-r from-cyan-400 to-purple-400 transition-all duration-300"
              style={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
            />
          </div>
        </div>

        {/* Dots indicateurs */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {[...Array(totalSlides)].map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all hover:scale-125 ${
                index === currentSlide ? 'w-8 bg-cyan-400' : 'w-2 bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Bouton Play/Pause */}
        <button
          onClick={toggleAutoPlay}
          className="absolute bottom-8 right-8 text-white/70 hover:text-white text-xs bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full transition-all flex items-center gap-1 backdrop-blur-sm z-20"
          aria-label={isAutoPlaying ? "Pause auto-play" : "Play auto-play"}
        >
          {isAutoPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
          <span className="hidden sm:inline">{isAutoPlaying ? 'Pause' : 'Play'}</span>
        </button>
      </div>
    </div>
  );
}