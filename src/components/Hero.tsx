import heroImage from "@/assets/hero-beach.jpg";

interface HeroProps {
  title: string;
  subtitle?: string;
  description?: string;
}

const Hero = ({ title, subtitle, description }: HeroProps) => {
  return (
    <section 
      className="relative min-h-[60vh] flex items-center justify-center text-center px-4"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="max-w-4xl mx-auto text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          {title}
        </h1>
        {subtitle && (
          <h2 className="text-xl md:text-2xl mb-6 font-light opacity-90">
            {subtitle}
          </h2>
        )}
        {description && (
          <p className="text-lg md:text-xl opacity-80 max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </section>
  );
};

export default Hero;