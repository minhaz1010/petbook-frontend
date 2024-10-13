import { jetbrains } from '@/config/font';
import { PawPrint, Heart, Users, BookOpen, Award, Coffee } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className={`${jetbrains.className} min-h-screen w-full text-white  p-6 sm:p-12 overflow-hidden relative`}>
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-[#000000] bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:30px_30px]" />

      <div className="max-w-4xl mx-auto animate-fade-in">
        <h1 className="text-4xl sm:text-5xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          About Pet Care Tips & Stories
        </h1>

        <section className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4">Our Mission</h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            At Pet Care Tips & Stories, we are passionate about nurturing the bond between pets and their owners. Our platform is designed to be a comprehensive resource for pet care knowledge and a heartwarming space for sharing the joys of pet ownership. We believe that well-informed pet parents lead to happier, healthier pets, and our mission is to facilitate this through education, community, and inspiration.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4">What We Offer</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { icon: <PawPrint className="w-8 h-8 text-purple-400" />, title: "Expert Care Tips", description: "Practical advice on nutrition, grooming, and health." },
              { icon: <Heart className="w-8 h-8 text-pink-400" />, title: "Heartwarming Stories", description: "Real-life tales of the incredible bonds between pets and owners." },
              { icon: <Users className="w-8 h-8 text-blue-400" />, title: "Vibrant Community", description: "Connect with fellow pet lovers, share experiences, and learn together." },
              { icon: <BookOpen className="w-8 h-8 text-green-400" />, title: "Rich Content", description: "In-depth articles and guides for both new and experienced pet owners." },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-gray-800 bg-opacity-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {item.icon}
                <h3 className="text-xl font-semibold mt-4 mb-2">{item.title}</h3>
                <p className="text-gray-300">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4">Our Team</h2>
          <p className="text-lg text-gray-300 leading-relaxed mb-6">
            Behind Pet Care Tips & Stories is a dedicated team of animal lovers, veterinary professionals, and tech enthusiasts. We are united by our love for pets and our commitment to providing the best possible resources for pet owners worldwide.
          </p>
          <div className="flex justify-center space-x-8">
            <div className="flex flex-col items-center transition-transform duration-300 ease-in-out hover:scale-105">
              <Award className="w-12 h-12 text-yellow-400 mb-2" />
              <p className="text-center">Expert Contributors</p>
            </div>
            <div className="flex flex-col items-center transition-transform duration-300 ease-in-out hover:scale-105">
              <Coffee className="w-12 h-12 text-orange-400 mb-2" />
              <p className="text-center">Passionate Developers</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4">Join Our Community</h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            Whether you are a new pet owner looking for guidance or an experienced animal lover with stories to share, we welcome you to our community. Join us in our mission to make the world a better place for pets and their humans, one tip and story at a time.
          </p>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;