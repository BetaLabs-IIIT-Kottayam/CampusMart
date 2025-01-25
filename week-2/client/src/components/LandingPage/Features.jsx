import { ShoppingCart, Gavel, Shield, Zap } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: <ShoppingCart className="h-12 w-12 text-green-500" />,
      title: "Easy Selling",
      description:
        "List your items quickly and reach the entire campus community with our user-friendly interface.",
    },
    {
      icon: <Gavel className="h-12 w-12 text-green-500" />,
      title: "Dynamic Bidding",
      description:
        "Get the best deals by participating in our exciting and fair bidding system.",
    },
    {
      icon: <Shield className="h-12 w-12 text-green-500" />,
      title: "Secure Transactions",
      description:
        "Enjoy peace of mind with our trusted and secure payment system for all your trades.",
    },
    {
      icon: <Zap className="h-12 w-12 text-green-500" />,
      title: "Instant Notifications",
      description:
        "Stay updated with real-time alerts on your bids, sales, and purchases.",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
          Why Choose campusMart?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg text-center transform transition duration-500 hover:scale-105">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
