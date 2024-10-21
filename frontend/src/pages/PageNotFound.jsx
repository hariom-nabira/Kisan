import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';


const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center w-full h-screen bg-[#f4f0ea]">
      {/* First "4" */}
      <motion.h1
        className="text-[20vmin] text-[#142833]"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8 }}
      >
        4
      </motion.h1>

      {/* Cogwheel 1 */}
      <motion.div
        className="relative w-[20vmin] h-[20vmin] border-[2vmin] border-[#f3c623] rounded-full mt-[-5vmin]"
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          ease: 'linear',
          duration: 8,
        }}
      >
        <div className="absolute w-[5vmin] h-[5vmin] bg-[#f3c623] top-[-7vmin] left-[5vmin]"></div>
        <div className="absolute w-[5vmin] h-[5vmin] bg-[#f3c623] bottom-[-7vmin] left-[5vmin]"></div>
        <div className="absolute w-[5vmin] h-[5vmin] bg-[#f3c623] left-[-7vmin] top-[5vmin]"></div>
        <div className="absolute w-[5vmin] h-[5vmin] bg-[#f3c623] right-[-7vmin] top-[5vmin]"></div>
      </motion.div>

      {/* Cogwheel 2 */}
      <motion.div
        className="relative w-[20vmin] h-[20vmin] border-[2vmin] border-[#4f8a8b] rounded-full mt-[-15vmin]"
        animate={{ rotate: -360 }}
        transition={{
          repeat: Infinity,
          ease: 'linear',
          duration: 8,
        }}
      >
        <div className="absolute w-[5vmin] h-[5vmin] bg-[#4f8a8b] top-[-7vmin] left-[5vmin]"></div>
        <div className="absolute w-[5vmin] h-[5vmin] bg-[#4f8a8b] bottom-[-7vmin] left-[5vmin]"></div>
        <div className="absolute w-[5vmin] h-[5vmin] bg-[#4f8a8b] left-[-7vmin] top-[5vmin]"></div>
        <div className="absolute w-[5vmin] h-[5vmin] bg-[#4f8a8b] right-[-7vmin] top-[5vmin]"></div>
      </motion.div>

      {/* Second "4" */}
      <motion.h1
        className="text-[20vmin] text-[#142833] mt-[-12vmin]"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8 }}
      >
        4
      </motion.h1>

      {/* Uh Oh! Message */}
      <motion.p
        className="text-[#092532] font-semibold text-lg mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      >
        Uh Oh! Page not found!
      </motion.p>

      {/* Go back to Home Button */}
      <motion.button
        className="mt-8 px-6 py-3 bg-[#4f8a8b] text-white rounded-md text-lg font-semibold hover:bg-[#3b6a6b] transition-all duration-300 ease-in-out"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => navigate('/')}
      >
        Go Back to Home
      </motion.button>
    </div>
  );
};

export default PageNotFound;
