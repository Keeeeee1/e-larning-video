import FeatureCard from "@/components/FeatureCard";
import Link from "next/link";

const CodeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
);

const VideoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>
);

const CertificateIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path><path d="M14 2v4a2 2 0 0 0 2 2h4"></path><path d="M10.5 12.5 8 15l2.5 2.5"></path><path d="m16 12.5-2.5 2.5 2.5 2.5"></path></svg>
);


export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] text-white py-12 bg-[#131313]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-balance">
          Video Learning Platform for Professionals
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
          Cutting-edge technology and engaging content to help you learn and grow.
        </p>
        <div className="mt-8">
          <Link
            href="/videos"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition-transform transform hover:scale-105"
          >
            Get Started
          </Link>
        </div>
      </div>

      <div className="w-full mt-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold mb-12">
            Why Choose Us?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<VideoIcon />}
              title="Expert-led Video Courses"
              description="Learn from industry professionals with our high-quality video tutorials."
            />
            <FeatureCard 
              icon={<CodeIcon />}
              title="Hands-on Projects"
              description="Apply what you learn with real-world projects and interactive coding exercises."
            />
            <FeatureCard 
              icon={<CertificateIcon />}
              title="Career-building Certifications"
              description="Earn recognized certificates to showcase your new skills to employers."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
