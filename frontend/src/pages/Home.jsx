import React from "react";
import Features from "../components/feature/Feature";
import Datasets from "../components/dataset/Dataset";

export default function Hero() {
  return (
    <>
    <section className="bg-green-100 py-20">
      <div className="container mx-auto px-4 flex flex-col md:flex-row gap-8 items-center">
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold text-green-800 mb-4">Empowering Indian Farmers with Technology</h1>
          <p className="text-xl text-green-700 mb-8">Our platform provides advanced crop prediction, fertilizer recommendations, and access to government schemes to boost your agricultural success.</p>
          <button className="bg-green-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-green-500 transition duration-300 transform hover:scale-105">Get Started</button>
        </div>
        <div className="md:w-1/2">
          <img 
            src="/bg.jpeg" 
            alt="Indian farmer in a field" 
            width={600} 
            height={400} 
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
    <Features />
    <Datasets />
    </>
  )
}

