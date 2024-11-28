import { TreesIcon as Plant, Droplet, TrendingUp, FileText } from 'lucide-react'

const features = [
  {
    icon: Plant,
    title: "Crop Prediction",
    description: "Predict the best crops for your land using advanced algorithms."
  },
  {
    icon: Droplet,
    title: "Fertilizer Recommendation",
    description: "Get personalized fertilizer recommendations for optimal yield."
  },
  {
    icon: TrendingUp,
    title: "MSP-Considered Cultivation",
    description: "Make informed decisions with MSP-considered crop suggestions."
  },
  {
    icon: FileText,
    title: "Government Schemes",
    description: "Stay updated with the latest agricultural schemes and subsidies."
  }
]

export default function Features() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-green-800 mb-12">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <feature.icon className="w-12 h-12 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold text-green-800 mb-2">{feature.title}</h3>
              <p className="text-green-700">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

