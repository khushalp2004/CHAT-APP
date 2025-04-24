import { FaShieldAlt, FaRocket, FaUsers, FaCode } from "react-icons/fa";

const features = [
  {
    icon: <FaShieldAlt className="w-8 h-8" />,
    title: "Secure Messaging",
    description: "End-to-end encryption keeps your conversations private and secure."
  },
  {
    icon: <FaRocket className="w-8 h-8" />,
    title: "Lightning Fast",
    description: "Real-time messaging with minimal latency for seamless communication."
  },
  {
    icon: <FaUsers className="w-8 h-8" />,
    title: "Team Collaboration",
    description: "Create groups, share files, and collaborate efficiently."
  },
  {
    icon: <FaCode className="w-8 h-8" />,
    title: "Developer Friendly",
    description: "Open API and extensive documentation for integration."
  }
];

const FeatureCards = () => {
  return (
    <div className="py-16">
      <h2 className="text-3xl font-bold text-white text-center mb-12">Powerful Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <div 
            key={index}
            className="bg-white/5 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-accent/50"
          >
            <div className="text-white mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
            <p className="text-white/70">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureCards;