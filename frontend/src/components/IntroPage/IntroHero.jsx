import image from '../../assets/demo.png';

const IntroHero = () => {
    return (
      <div className="text-center py-16 animate-fade-in">
        <h1 className="text-5xl font-bold text-white mb-6 animate-slide-down">
          Connect <span className="text-accent bg-white " >Seamlessly</span> {' '} & make new <u className="text-neutral-accent">Friends</u>
        </h1>
        <p className="text-xl text-white/80 max-w-2xl mx-auto mb-10 animate-slide-down animate-delay-100">
          Experience real-time messaging with end-to-end encryption and powerful collaboration features.
        </p>
        <div className="relative max-w-4xl mx-auto animate-slide-up animate-delay-200">
          <div className="absolute -inset-4 bg-white/10 rounded-xl blur-lg"></div>
          <div className="relative bg-white/5 rounded-lg p-1">
            <img 
              src={image} 
              alt="App Demo" 
              className="rounded-lg shadow-2xl border border-white/10 hover:transform hover:scale-105 transition-transform duration-300 ease-in-out"
            />
          </div>
        </div>
      </div>
    );
  };
  
  export default IntroHero;