import { Database, Sprout } from "lucide-react";

export default function Datasets() {
  return (
    <section className="py-20 bg-green-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-green-800 mb-12">
          Our Datasets
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Database className="w-12 h-12 text-green-600 mb-4" />
            <h3 className="text-xl font-semibold text-green-800 mb-2">
              Soil Condition Dataset
            </h3>
            <p className="text-green-700 mb-4">
              Access the latest soil condition data from different regions
              across India. This comprehensive dataset is invaluable for
              research and agricultural planning.
            </p>
            <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-300">
              Learn More
            </button>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Sprout className="w-12 h-12 text-green-600 mb-4" />
            <h3 className="text-xl font-semibold text-green-800 mb-2">
              Future Crop Cultivation Dataset
            </h3>
            <p className="text-green-700 mb-4">
              Explore our predictive dataset on future crop cultivation trends.
              This data is crucial for understanding upcoming agricultural
              patterns and market demands.
            </p>
            <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-300">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
