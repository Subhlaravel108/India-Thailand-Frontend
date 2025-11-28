// "use client";
// import { Search, Calendar, Users, MapPin } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { useEffect, useState } from "react";

// const Hero = () => {
//   const [randomImage, setRandomImage] = useState("");

//   useEffect(() => {
//     const images = [
//       "/hero-banners/banner1.jpg",
//       "/hero-banners/banner2.jpg",
//       "/hero-banners/banner3.jpg",
//       "/hero-banners/banner4.jpg",
//       "/hero-banners/banner5.jpg",
//     ];

//     const randomIndex = Math.floor(Math.random() * images.length);
//     setRandomImage(images[randomIndex]);
//   }, []);

//   return (
//     <section className="relative min-h-[40vh] py-5 lg:py-0 md:min-h-screen flex items-center justify-center">
//       {/* Background Image */}
//       <div
//         className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700"
//         style={{
//           backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${randomImage}')`,
//         }}
//       />

//       {/* Content */}
//       <div className="relative z-10 container mx-auto px-4 text-center text-white">
//         <div className="max-w-4xl mx-auto">
//           <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight">
//             Discover Your Next
//             <span className="block text-orange-500 mt-1">Adventure</span>
//           </h1>

//           <p className="text-sm sm:text-xl md:text-2xl mb-8 opacity-90">
//             Explore breathtaking destinations around the world with our expertly crafted travel experiences
//           </p>

//           {/* Button Section */}
//           <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
//             <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg rounded-full w-[220px]">
//               Explore Destinations
//             </Button>

//             <Button
//               size="lg"
//               variant="outline"
//               className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 text-lg rounded-full"
//             >
//               Watch Video
//             </Button>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Hero;

"use client";
import { Search, Calendar, Users, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import Link from "next/link";

const Hero = () => {
  const [randomImage, setRandomImage] = useState("");

  useEffect(() => {
    const images = [
      "/hero-banners/banner1.jpg",
      "/hero-banners/banner2.jpg",
      "/hero-banners/banner3.jpg",
      "/hero-banners/banner4.jpg",
      "/hero-banners/banner5.jpg",
    ];

    const randomIndex = Math.floor(Math.random() * images.length);
    setRandomImage(images[randomIndex]);
  }, []);

  return (
    <section className="relative min-h-[40vh] sm:min-h-[60vh] md:min-h-[70vh] lg:min-h-screen flex items-center justify-center py-8 sm:py-12 md:py-16 lg:py-0">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url('${randomImage}')`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-3 sm:px-4 md:px-6 text-center text-white">
        <div className="max-w-4xl mx-auto">
          {/* Heading */}
          <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold mb-4 sm:mb-6 leading-tight">
            Discover Your Next
            <span className="block text-orange-500 mt-1 sm:mt-2">Adventure</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xs xs:text-sm sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 opacity-90 px-2 sm:px-0 leading-relaxed">
            Explore breathtaking destinations around the world with our expertly crafted travel experiences
          </p>

          {/* Button Section */}
          {/* flex flex-col sm:flex-row gap-4 justify-center items-center */}
          <div className="flex flex-row gap-3 sm:gap-4 justify-center items-center px-2 sm:px-0">
  <Link href="/destinations">
    <Button
      size="lg"
      className="
        bg-orange-500 hover:bg-orange-600 text-white
        px-3 py-2  sm:px-6 sm:py-3 sm:text-sm   
        md:px-8 md:py-4 md:text-base  
        rounded-full    min-w-[130px] sm:min-w-[200px] transition-all duration-300 transform hover:scale-105
      "
    >
      Explore Destinations
    </Button>
  </Link>

  <Button
    size="lg"
    variant="outline"
    className="
      border-2 border-white text-black hover:bg-white hover:text-gray-900
      px-3 py-2                    
      text-xs                       
      sm:px-6 sm:py-3 sm:text-sm       
         md:px-8 md:py-4 md:text-base  
      rounded-full
      min-w-[110px]                     
        sm:min-w-[150px]                
            transition-all duration-300
    "
  >
    Watch Video
  </Button>
</div>


        </div>
      </div>
    </section>
  );
};

export default Hero;