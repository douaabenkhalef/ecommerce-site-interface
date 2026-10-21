interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-[#1a1f2e] rounded-xl p-6 text-center hover:bg-[#222837] transition-all transform hover:scale-105 cursor-pointer group">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full mb-4 group-hover:from-purple-500/30 group-hover:to-pink-500/30 transition-all">
        <div className="text-purple-400 group-hover:text-purple-300 transition-colors">
          {icon}
        </div>
      </div>
      <h3 className="text-white text-lg mb-2">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
    </div>
  );
}
