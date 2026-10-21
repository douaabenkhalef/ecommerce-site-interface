import { CategoryCard } from './CategoryCard';
import { useState } from 'react';

export function ShopByCategories() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [feedback, setFeedback] = useState('');

  const categories = [
    {
      image: '/images/img7.jpeg',
      title: 'Keyboards Gaming',
      itemCount: '24 products'
    },
    {
      image: '/images/img8.jpeg',
      title: 'Gaming Mouse',
      itemCount: '18 products'
    },
    {
      image: '/images/img9.jpeg',
      title: 'Headphones',
      itemCount: '32 products'
    },
    {
      image: '/images/img10.jpeg',
      title: 'Gaming Controllers',
      itemCount: '15 products'
    }
  ];

  const handleCategoryClick = (title: string) => {
    setSelectedCategory(title);
    setFeedback(`Navigation vers ${title}...`);
    setTimeout(() => setFeedback(''), 2000);
  };

  return (
    <section className="bg-[#0a0f1a] py-20">
      <div className="max-w-[1400px] mx-auto px-4">
        <h2 className="text-white text-4xl text-center mb-12 tracking-wide">
          SHOP BY CATEGORIES
        </h2>
        
        {feedback && (
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-6 py-3 rounded-full shadow-lg z-50 animate-fade-in-up">
            {feedback}
          </div>
        )}

        <div className="grid grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div key={index} onClick={() => handleCategoryClick(category.title)}>
              <CategoryCard 
                image={category.image}
                title={category.title}
                itemCount={category.itemCount}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}