import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative bg-green-600 text-white py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[url('/campus-bg.jpg')] bg-cover bg-center opacity-30"></div>

      <div className="relative z-10 container mx-auto px-6 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-8 leading-tight">
            Your Campus Marketplace
            <span className="block text-green-300">Reimagined</span>
          </h1>

          <p className="text-lg md:text-xl mb-12 text-green-100">
            Buy, sell, and bid on items within your campus community. Experience
            a new way of trading that's safe, easy, and fun!
          </p>

          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <a
              href="#"
              className="bg-white text-green-600 px-8 py-4 rounded-full font-semibold shadow-lg hover:bg-green-100 hover:shadow-xl transition-all flex items-center justify-center text-lg"
            >
              Start Selling
              <ArrowRight className="ml-3 h-5 w-5" />
            </a>
            <a
              href="#"
              className="bg-green-700 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:bg-green-800 hover:shadow-xl transition-all flex items-center justify-center text-lg"
            >
              Start Buying
              <ArrowRight className="ml-3 h-5 w-5" />
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-green-600 to-transparent"></div>
    </section>
  );
}
