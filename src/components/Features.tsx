import { Code, Layers, Zap } from "lucide-react";

const features = [
  {
    icon: <Code className="h-8 w-8" />,
    title: "Modern Development",
    description: "Built with the latest React.js features and best practices.",
  },
  {
    icon: <Zap className="h-8 w-8" />,
    title: "Lightning Fast",
    description: "Optimized performance for the best user experience.",
  },
  {
    icon: <Layers className="h-8 w-8" />,
    title: "Scalable Architecture",
    description: "Designed to grow with your project needs.",
  },
];

export const Features = () => {
  return (
    <div className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 animate-fadeIn"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="text-primary mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};