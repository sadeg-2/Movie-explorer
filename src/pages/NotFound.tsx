import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="text-white w-full h-screen flex flex-col items-center justify-center bg-black px-6">
      <h1 className="text-[100px] md:text-[140px] font-extrabold text-red-600 leading-none animate-pulse">
        404
      </h1>

      <p className="text-gray-400 max-w-md text-center mb-8">
        Oops! The page you're looking for doesn’t exist — maybe it's still in production 👀
      </p>

      <Link
        to="/"
        className="
          bg-red-600 hover:bg-red-700 
          text-white font-semibold 
          px-6 py-3 rounded-lg 
          transition-all
          hover:scale-105
        "
      >
        Back to Home
      </Link>
    </div>
  );
}
