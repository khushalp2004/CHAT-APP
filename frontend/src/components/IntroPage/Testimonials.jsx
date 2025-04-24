import { FaQuoteLeft } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";

const testimonials = [
  {
    quote: "This chat app has transformed how our remote team communicates. The speed and reliability are unmatched.",
    name: "Sarah Johnson",
    role: "CTO at TechCorp"
  },
  {
    quote: "As a security-conscious company, we appreciate the robust encryption while maintaining great usability.",
    name: "Michael Chen",
    role: "Security Lead at SafeSystems"
  },
  {
    quote: "The intuitive interface means we didn't need any training. Our team adopted it immediately!",
    name: "Emma Rodriguez",
    role: "Product Manager at DesignHub"
  },
  {
    quote: "We've reduced our internal email volume by 70% since implementing this chat solution.",
    name: "David Kim",
    role: "Director of Operations"
  },
  {
    quote: "The military-grade encryption gives us peace of mind when discussing sensitive client information.",
    name: "Amanda Rodriguez",
    role: "CISO, Global Bank"
  },
  {
    quote: "The API documentation is the best I've seen. We integrated the chat into our custom CRM in under a week.",
    name: "Marcus Chen",
    role: "Lead Developer"
  }
];

const Testimonials = () => {
  const containerRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const duplicateTestimonials = [...testimonials, ...testimonials]; // Duplicate for seamless looping

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrameId;
    let speed = 1; // Pixels per frame
    let position = 0;
    const cardWidth = 320; // Width of each card (w-80 = 320px)
    const gap = 24; // gap-6 = 24px

    const animate = () => {
      if (!isPaused) {
        position -= speed;
        
        // Reset position when we've scrolled all cards
        if (-position >= (cardWidth + gap) * testimonials.length) {
          position = 0;
        }
        
        container.style.transform = `translateX(${position}px)`;
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPaused]);

  return (
    <div className="py-16 relative overflow-hidden bg-base">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-white text-center mb-12">What People Are Saying</h2>
        
        <div 
          className="relative w-full h-72 overflow-hidden" // Container with fixed height
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div 
            ref={containerRef}
            className="flex absolute left-0 top-0 gap-6 will-change-transform"
          >
            {duplicateTestimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="flex-shrink-0 w-80 bg-white/5 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-accent/50"
              >
                <div className="flex items-start">
                  <FaQuoteLeft className="text-white text-xl mt-1 mr-2 flex-shrink-0" />
                  <p className="text-white italic mb-6">{testimonial.quote}</p>
                </div>
                <div className="border-t border-white/10 pt-4">
                  <p className="font-semibold text-white/70">{testimonial.name}</p>
                  <p className="text-white/50 text-sm">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;