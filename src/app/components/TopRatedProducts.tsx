import { ProductCard } from './ProductCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { ProductDetails } from './ProductDetails';

interface Product {
  id: number;
  name: string;
  price: string;
  rating: number;
  image: string;
  category: string;
  inStock: boolean;
}

export function TopRatedProducts() {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const productsPerPage = 5;
  
  const allProducts: Product[] = [
    {
      id: 8,
      image: '/images/img5.jpg',
      name: 'Phantom Elite Controller',
      rating: 4,
      price: "69.99",
      category: "controller",
      inStock: true
    },
    {
      id: 7,
      image: '/images/img4.jpg',
      name: 'Apex Precision Gaming Mouse',
      rating: 4,
      price: "129.99",
      category: "mouse",
      inStock: true
    },
    {
      id: 2,
      image: '/images/img12.jpeg',
      name: 'Vipersonic X Pro',
      rating: 5,
      price: "199.99",
      category: "headset",
      inStock: true
    },
    {
      id: 4,
      image: '/images/img6.jpg',
      name: 'Vortex Wireless Gaming',
      rating: 5,
      price: "129.99",
      category: "mouse",
      inStock: true
    },
    {
      id: 6,
      image: '/images/img15.jpeg',
      name: 'Quantum RGB Headset',
      rating: 4,
      price: "159.99",
      category: "headset",
      inStock: true
    },
    {
      id: 1,
      image: '/images/img11.jpeg',
      name: 'Zephyr Wireless Gaming',
      rating: 5,
      price: "149.99",
      category: "mouse",
      inStock: true
    },
    {
      id: 3,
      image: '/images/img13.jpeg',
      name: 'Pulsar Phantom',
      rating: 5,
      price: "89.99",
      category: "keyboard",
      inStock: true
    },
    {
      id: 5,
      image: '/images/img14.jpeg',
      name: 'Apex Precision Controller',
      rating: 5,
      price: "79.99",
      category: "controller",
      inStock: true
    }
  ];

  const totalPages = Math.ceil(allProducts.length / productsPerPage);
  const displayedProducts = allProducts.slice(
    currentPage * productsPerPage,
    (currentPage + 1) * productsPerPage
  );

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  return (
    <>
      <section className="bg-[#0f1419] py-20">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="text-center mb-4">
            <h2 className="text-white text-4xl mb-3 tracking-wide">
              Top Rated Product's
            </h2>
            <p className="text-gray-400 text-lg">
              Master Your Battleground Elevate Your Game with Our Elite-Reviewed Gear
            </p>
          </div>

          <div className="relative mt-12">
            <div className="grid grid-cols-5 gap-6">
              {displayedProducts.map((product, index) => (
                <div key={index} onClick={() => handleProductClick(product)} className="cursor-pointer">
                  <ProductCard 
                    id={product.id}
                    image={product.image}
                    name={product.name}
                    rating={product.rating}
                    price={product.price}
                  />
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <>
                <button 
                  onClick={prevPage}
                  className="absolute -left-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-3 rounded-full transition-all hover:scale-110"
                  aria-label="Previous products"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button 
                  onClick={nextPage}
                  className="absolute -right-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-3 rounded-full transition-all hover:scale-110"
                  aria-label="Next products"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

          {totalPages > 1 && (
            <div className="text-center mt-8">
              <div className="inline-flex gap-2 bg-[#1a1f2e] rounded-full px-4 py-2">
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index)}
                    className={`w-2 h-2 rounded-full transition-all hover:scale-125 ${
                      index === currentPage 
                        ? 'w-6 bg-cyan-400' 
                        : 'bg-gray-600 hover:bg-gray-500'
                    }`}
                    aria-label={`Go to page ${index + 1}`}
                  />
                ))}
              </div>
              <p className="text-gray-500 text-xs mt-2">
                Page {currentPage + 1} sur {totalPages}
              </p>
            </div>
          )}
        </div>
      </section>

      {selectedProduct && (
        <ProductDetails 
          product={{
            id: selectedProduct.id,
            name: selectedProduct.name,
            price: parseFloat(selectedProduct.price),
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