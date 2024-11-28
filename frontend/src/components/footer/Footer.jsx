import { Facebook, Twitter, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-green-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-semibold">FarmTech India</h3>
            <p className="text-sm mt-2">
              Empowering Indian farmers with technology
            </p>
          </div>
          <div className="flex space-x-4">
            <a
              href="#"
              className="hover:text-green-300 transition duration-300"
            >
              <Facebook size={20} />
            </a>
            <a
              href="#"
              className="hover:text-green-300 transition duration-300"
            >
              <Twitter size={20} />
            </a>
            <a
              href="#"
              className="hover:text-green-300 transition duration-300"
            >
              <Instagram size={20} />
            </a>
          </div>
        </div>
        <div className="border-t border-green-700 mt-8 pt-8 text-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} FarmTech India. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
