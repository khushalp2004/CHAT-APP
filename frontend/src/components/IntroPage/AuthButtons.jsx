import { Link } from 'react-router-dom'

const AuthButtons = () => {
    return (
      <div className="text-center py-16 animate-fade-in animate-delay-300">
        <h2 className="text-3xl font-bold text-white mb-6">Ready to Get Started?</h2>
        <div className="flex justify-center gap-6">
        <Link to={"/register"}  className="btn btn-primary btn-lg px-8 rounded-full transform hover:scale-105 transition-transform">
            Sign Up Free
        </Link>
          <button className="btn btn-outline btn-lg px-8 text-white border-white hover:bg-white hover:text-primary rounded-full transform hover:scale-105 transition-transform">
            Learn More
          </button>
        </div>
        <p className="text-white/70 mt-6">
          Join thousands of happy users today. No credit card required.
        </p>
      </div>
    );
  };
  
  export default AuthButtons;