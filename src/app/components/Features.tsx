import { FeatureCard } from './FeatureCard';
import { Truck, RotateCcw, DollarSign, Headphones } from 'lucide-react';

export function Features() {
  return (
    <section className="bg-[#0f1419] py-16">
      <div className="max-w-[1400px] mx-auto px-4">
        <div className="grid grid-cols-4 gap-6">
          <FeatureCard 
            icon={<Truck className="w-8 h-8" />}
            title="Free Shipping"
            description="Free Shipping to Make Your Shopping Experience Seamless"
          />
          <FeatureCard 
            icon={<RotateCcw className="w-8 h-8" />}
            title="Return Policy"
            description="Flexible Returns to Ensure a Positive Shopping Experience"
          />
          <FeatureCard 
            icon={<DollarSign className="w-8 h-8" />}
            title="Save Money"
            description="Shop Smarter and Save Big with Our Great Saving Solutions"
          />
          <FeatureCard 
            icon={<Headphones className="w-8 h-8" />}
            title="Support 24/7"
            description="Unparalleled Support Tailored to Your Needs, 24 Hours a Day"
          />
        </div>
      </div>
    </section>
  );
}
