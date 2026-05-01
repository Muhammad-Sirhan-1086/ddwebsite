import { useEffect, useState, useRef } from 'react';
import { motion, useInView, useScroll, useTransform, useMotionValue, useSpring } from 'motion/react';
import { ArrowUpRight, Mail, Linkedin, Instagram } from 'lucide-react';

export default function App() {
  const [loaderProgress, setLoaderProgress] = useState(0);
  const [loaderHidden, setLoaderHidden] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    // Loader animation
    const interval = setInterval(() => {
      setLoaderProgress((prev) => {
        const increment = Math.random() * 8 + 2;
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoaderHidden(true), 300);
          return 100;
        }
        return next;
      });
    }, 60);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Mouse tracking for interactive elements
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="bg-[#0e0e10] text-[#f7f1ed] min-h-screen overflow-x-hidden relative" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* Animated Background Gradient Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full blur-[140px] opacity-20"
          style={{ background: 'radial-gradient(circle, #f1281f 0%, transparent 70%)' }}
          animate={{
            x: ['-10%', '110%'],
            y: ['10%', '90%'],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full blur-[120px] opacity-15"
          style={{ background: 'radial-gradient(circle, #f1281f 0%, #ff6b64 50%, transparent 70%)' }}
          animate={{
            x: ['100%', '-10%'],
            y: ['70%', '20%'],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Floating Shapes */}
      <FloatingShapes />

      {/* Interactive Dynamic Symbols */}
      <InteractiveSymbols mouseX={mouseX} mouseY={mouseY} />

      {/* Interactive Lines */}
      <InteractiveLines mouseX={mouseX} mouseY={mouseY} />

      {/* Orbital Animation Background */}
      <OrbitalAnimation />

      {/* Scroll-triggered Shapes */}
      <ScrollShapes />

      {/* Loader */}
      <div
        className={`fixed inset-0 bg-[#0e0e10] z-[9000] flex items-center justify-center flex-col gap-6 transition-all duration-600 ${loaderHidden ? 'opacity-0 invisible' : ''}`}
      >
        <motion.div
          className="text-[#f7f1ed] tracking-[0.15em]"
          style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(48px, 10vw, 120px)' }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          CREATIVE
        </motion.div>
        <div className="w-[280px] h-[2px] bg-white/10">
          <div className="h-full bg-[#f1281f] transition-all duration-50" style={{ width: `${loaderProgress}%` }} />
        </div>
        <div className="text-[#b9b0aa] tracking-widest" style={{ fontFamily: "'Space Mono', monospace", fontSize: '13px' }}>
          {Math.round(loaderProgress)}%
        </div>
      </div>

      {/* Navigation */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-8 md:px-12 py-6 mix-blend-difference"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ delay: 2, type: 'spring', stiffness: 100 }}
      >
        <a href="#" className="text-[20px] md:text-[24px] tracking-wider font-medium" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
          Digital Dizzles
        </a>
        <ul className="hidden md:flex gap-8 list-none">
          <li><a href="#home" className="text-[13px] tracking-wider uppercase opacity-60 hover:opacity-100 transition-opacity no-underline">Home</a></li>
          <li><a href="#about" className="text-[13px] tracking-wider uppercase opacity-60 hover:opacity-100 transition-opacity no-underline">About Us</a></li>
          <li><a href="#work" className="text-[13px] tracking-wider uppercase opacity-60 hover:opacity-100 transition-opacity no-underline">Work</a></li>
          <li><a href="#services" className="text-[13px] tracking-wider uppercase opacity-60 hover:opacity-100 transition-opacity no-underline">Services</a></li>
          <li><a href="#contact" className="text-[13px] tracking-wider uppercase opacity-60 hover:opacity-100 transition-opacity no-underline">Contact</a></li>
          <li><a href="../portfolio/index.html" className="text-[13px] tracking-wider uppercase opacity-60 hover:opacity-100 transition-opacity no-underline">Portfolio</a></li>
        </ul>
        <MagneticButton href="#contact">
          <span className="bg-[#f1281f] text-[#0e0e10] text-[11px] font-medium tracking-wider uppercase px-4 py-2 rounded-full no-underline whitespace-nowrap block" style={{ fontFamily: "'Space Mono', monospace" }}>
            Let's Talk
          </span>
        </MagneticButton>
      </motion.nav>

      {/* Hero Section */}
      <HeroSection />

      {/* Marquee */}
      <Marquee items={['Creative Direction', 'Brand Identity', 'Web Development', 'Art Direction', 'Digital Strategy', 'Visual Design']} />

      {/* About Section */}
      <section className="py-24 md:py-32 px-8 md:px-12 relative z-10" id="about">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 md:gap-20 items-center">
          <FadeUp>
            <div className="aspect-[3/4] bg-gradient-to-br from-[#202024] to-[#0e0e10] rounded-2xl overflow-hidden border border-white/5 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 rounded-full bg-[#f1281f]/10 blur-3xl" />
              </div>
              <motion.div
                className="absolute inset-0 flex items-center justify-center text-[#f1281f]/20 text-[120px]"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                animate={{ rotate: [0, 5, 0, -5, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
              >
                DD
              </motion.div>
            </div>
          </FadeUp>
          <div>
            <FadeUp delay={0.2}>
              <div className="text-[#f1281f] text-xs tracking-[0.2em] uppercase mb-6 flex items-center gap-3" style={{ fontFamily: "'Space Mono', monospace" }}>
                <div className="w-8 h-px bg-[#f1281f]" />
                About Us
              </div>
            </FadeUp>
            <FadeUp delay={0.3}>
              <h2 className="text-[#f7f1ed] mb-6 leading-tight" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(40px, 6vw, 72px)' }}>
                World-Class <span className="text-[#f1281f]">Creative</span><br />Solutions
              </h2>
            </FadeUp>
            <FadeUp delay={0.4}>
              <p className="text-[#f7f1ed]/70 text-base md:text-lg leading-relaxed mb-6">
                Digital Dizzles is a full-service creative agency delivering exceptional digital marketing, video production, and design solutions to clients across Asia, the Middle East, USA, and Europe. We're a team of passionate creatives, strategists, and technologists who understand diverse markets and global standards.
              </p>
              <p className="text-[#f7f1ed]/70 text-base md:text-lg leading-relaxed mb-6">
                What started as a small studio has grown into an international agency working with businesses of all sizes. We've helped local businesses establish their digital presence and supported international brands in reaching new audiences across multiple continents.
              </p>
              <p className="text-[#f7f1ed]/70 text-base md:text-lg leading-relaxed mb-8">
                We believe great work comes from understanding your unique story. Whether you're launching a startup or scaling an established business, we're here to help you stand out in a crowded digital landscape.
              </p>
            </FadeUp>
            <FadeUp delay={0.5}>
              <MagneticButton href="#contact">
                <span className="bg-[#f1281f] text-[#0e0e10] text-[13px] tracking-wider uppercase px-8 py-4 rounded-full no-underline block inline-block" style={{ fontFamily: "'Space Mono', monospace" }}>
                  Get In Touch
                </span>
              </MagneticButton>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 md:py-32 px-8 md:px-12 relative z-10" id="services">
        <div className="max-w-6xl mx-auto">
          <FadeUp>
            <div className="text-[#f1281f] text-xs tracking-[0.2em] uppercase mb-6 flex items-center gap-3" style={{ fontFamily: "'Space Mono', monospace" }}>
              <div className="w-8 h-px bg-[#f1281f]" />
              What We Do
            </div>
          </FadeUp>
          <FadeUp delay={0.2}>
            <h2 className="text-[#f7f1ed] mb-12 leading-tight" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(40px, 6vw, 72px)' }}>
              Our <span className="text-[#f1281f]">Services</span>
            </h2>
          </FadeUp>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ServiceCard
              title="Digital Marketing"
              description="Strategic campaigns to boost your online presence and reach your target audience effectively."
              delay={0}
            />
            <ServiceCard
              title="Video Shoots"
              description="Professional video production services capturing your brand's story with cinematic quality."
              delay={0.1}
            />
            <ServiceCard
              title="Photo Shoots"
              description="High-quality photography that brings your vision to life with stunning visual appeal."
              delay={0.2}
            />
            <ServiceCard
              title="Video Editing"
              description="Expert post-production services transforming raw footage into compelling visual narratives."
              delay={0.3}
            />
            <ServiceCard
              title="Graphics Design"
              description="Creative design solutions that communicate your brand message with visual excellence."
              delay={0.4}
            />
            <ServiceCard
              title="Web Development"
              description="Custom websites and web applications built with modern technologies and best practices."
              delay={0.5}
            />
            <ServiceCard
              title="Marketing Campaigns"
              description="Comprehensive campaign strategies that drive engagement and deliver measurable results."
              delay={0.6}
            />
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-24 md:py-32 px-8 md:px-12 relative z-10 bg-gradient-to-b from-[#0e0e10] to-[#18181b]">
        <div className="max-w-7xl mx-auto">
          <FadeUp>
            <div className="text-center mb-16">
              <div className="text-[#f1281f] text-xs tracking-[0.2em] uppercase mb-6" style={{ fontFamily: "'Space Mono', monospace" }}>
                Our Packages
              </div>
              <h2 className="text-[#f7f1ed] mb-6 leading-tight" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(40px, 6vw, 72px)' }}>
                Choose Your <span className="text-[#f1281f]">Perfect Plan</span>
              </h2>
              <p className="text-[#f7f1ed]/60 text-lg max-w-2xl mx-auto">
                Tailored packages for every service to meet your unique needs
              </p>
            </div>
          </FadeUp>

          {/* Digital Marketing Packages */}
          <PackageCategory
            title="Digital Marketing"
            packages={[
              {
                name: "Digital Marketing with Content Creation",
                price: "$2,999",
                description: "Complete digital marketing solution with custom content creation",
                features: [
                  "Social media management",
                  "Content creation & copywriting",
                  "SEO optimization",
                  "Email marketing campaigns",
                  "Analytics & reporting",
                  "Graphic design for posts",
                  "Monthly strategy sessions"
                ]
              },
              {
                name: "Digital Marketing without Content Creation",
                price: "$1,499",
                description: "Focused digital marketing management using your existing content",
                features: [
                  "Social media management",
                  "SEO optimization",
                  "Email marketing campaigns",
                  "Analytics & reporting",
                  "Monthly strategy sessions"
                ]
              },
              {
                name: "Custom Package",
                price: "Custom",
                description: "Tailored solution designed specifically for your business needs",
                features: [
                  "Personalized service selection",
                  "Flexible pricing",
                  "Custom deliverables",
                  "Dedicated account manager",
                  "Priority support"
                ]
              }
            ]}
          />

          {/* Web Development Packages */}
          <PackageCategory
            title="Web Development"
            packages={[
              {
                name: "Landing Page",
                price: "$1,999",
                description: "Single-page website optimized for conversions",
                features: [
                  "Responsive design",
                  "Custom UI/UX",
                  "Contact form integration",
                  "SEO optimization",
                  "Fast loading speed",
                  "Mobile optimized"
                ],
                isProject: true
              },
              {
                name: "Business Website",
                price: "$4,999",
                description: "Multi-page website for your business",
                features: [
                  "Up to 10 pages",
                  "Custom design",
                  "CMS integration",
                  "SEO optimization",
                  "Contact forms",
                  "Blog functionality",
                  "Analytics integration"
                ],
                isProject: true
              },
              {
                name: "Custom Web Application",
                price: "Custom",
                description: "Full-stack web application tailored to your needs",
                features: [
                  "Custom functionality",
                  "Database integration",
                  "User authentication",
                  "API development",
                  "Scalable architecture",
                  "Ongoing support"
                ]
              }
            ]}
          />

          {/* Video Production Packages */}
          <PackageCategory
            title="Video Production"
            packages={[
              {
                name: "Basic Video Package",
                price: "$999",
                description: "Essential video production for your brand",
                features: [
                  "Half-day shoot",
                  "1 final video (up to 2 min)",
                  "Basic editing",
                  "Color correction",
                  "Background music",
                  "2 rounds of revisions"
                ]
              },
              {
                name: "Professional Video Package",
                price: "$2,499",
                description: "Comprehensive video production with advanced features",
                features: [
                  "Full-day shoot",
                  "3 final videos",
                  "Advanced editing",
                  "Color grading",
                  "Motion graphics",
                  "Custom music",
                  "Unlimited revisions"
                ]
              },
              {
                name: "Custom Video Package",
                price: "Custom",
                description: "Fully customized video production solution",
                features: [
                  "Multi-day shoots",
                  "Unlimited videos",
                  "Cinematic quality",
                  "Drone footage",
                  "Professional actors",
                  "Full production crew"
                ]
              }
            ]}
          />

          {/* Graphics Design Packages */}
          <PackageCategory
            title="Graphics Design"
            packages={[
              {
                name: "Branding Package",
                price: "$1,499",
                description: "Complete brand identity design for your business",
                features: [
                  "Logo design (3 concepts)",
                  "Business card design",
                  "Letterhead & envelope",
                  "Brand style guide",
                  "Social media templates",
                  "Unlimited revisions"
                ],
                isProject: true
              },
              {
                name: "Social Media Package",
                price: "$799",
                description: "Professional social media graphics and templates",
                features: [
                  "20 custom post designs",
                  "Story templates",
                  "Highlight covers",
                  "Profile graphics",
                  "Editable templates",
                  "Brand consistent design"
                ],
                isMonthly: true
              },
              {
                name: "Custom Design Package",
                price: "Custom",
                description: "Tailored graphic design solutions for any project",
                features: [
                  "Unlimited design types",
                  "Packaging design",
                  "Marketing materials",
                  "Infographics & presentations",
                  "Print & digital assets",
                  "Dedicated designer"
                ]
              }
            ]}
          />
        </div>
      </section>

      {/* Work Section */}
      <section className="py-24 md:py-32 px-8 md:px-12 relative z-10" id="work">
        <div className="max-w-7xl mx-auto">
          <FadeUp>
            <div className="text-[#b9b0aa] text-[11px] tracking-[0.2em] uppercase mb-12 flex items-center gap-4" style={{ fontFamily: "'Space Mono', monospace" }}>
              Selected Work
              <div className="flex-1 h-px bg-white/[0.08]" />
            </div>
          </FadeUp>
          <div className="space-y-8">
            <ProjectCard
              number="01"
              title="Nebula Brand Identity"
              category="Branding • Visual Identity"
              description="Complete brand identity for a tech startup, including logo design, brand guidelines, and digital assets."
              delay={0}
              gradient="linear-gradient(135deg, #202024, #2a1718, #f1281f)"
            />
            <ProjectCard
              number="02"
              title="Aurora Digital Platform"
              category="Web Development • Design"
              description="End-to-end design and development of a digital platform for creative professionals."
              delay={0.15}
              gradient="linear-gradient(135deg, #18181b, #3a1110, #ff6b64)"
            />
            <ProjectCard
              number="03"
              title="Vertex Creative Campaign"
              category="Art Direction • Photography"
              description="Creative direction and art direction for a seasonal campaign, including concept development and photography."
              delay={0.3}
              gradient="linear-gradient(135deg, #080809, #18181b, #202024)"
            />
            <ProjectCard
              number="04"
              title="Prism E-commerce"
              category="Web Development • Strategy"
              description="Full redesign of an e-commerce platform with focus on user experience and conversion optimization."
              delay={0.45}
              gradient="linear-gradient(135deg, #100909, #2a0f0e, #7b1612)"
            />
          </div>
        </div>
      </section>

      {/* Animated Section */}
      <AnimatedShowcase />

      {/* Customer Reviews Section */}
      <section className="py-24 md:py-32 px-8 md:px-12 relative z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(241,40,31,0.05)_0%,transparent_70%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <FadeUp>
            <div className="text-center mb-16">
              <div className="text-[#f1281f] text-xs tracking-[0.2em] uppercase mb-6" style={{ fontFamily: "'Space Mono', monospace" }}>
                Testimonials
              </div>
              <h2 className="text-[#f7f1ed] mb-6 leading-tight" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(40px, 6vw, 72px)' }}>
                What Our <span className="text-[#f1281f]">Clients Say</span>
              </h2>
              <p className="text-[#f7f1ed]/60 text-lg max-w-2xl mx-auto">
                Don't just take our word for it - hear from some of our satisfied clients
              </p>
            </div>
          </FadeUp>

          <div className="grid md:grid-cols-3 gap-8">
            <ReviewCard
              name="Sarah Johnson"
              company="TechStart Inc."
              review="Digital Dizzles transformed our brand identity completely. Their creative approach and attention to detail exceeded all our expectations. The team was professional and delivered on time!"
              rating={5}
              delay={0}
            />
            <ReviewCard
              name="Michael Chen"
              company="Urban Boutique"
              review="The video production quality was outstanding! They captured our brand essence perfectly and the final videos significantly boosted our social media engagement. Highly recommend!"
              rating={5}
              delay={0.15}
            />
            <ReviewCard
              name="Emily Rodriguez"
              company="GreenLeaf Wellness"
              review="Working with Digital Dizzles on our digital marketing campaign was a game-changer. Our online presence grew by 300% in just 3 months. Their strategy is top-notch!"
              rating={5}
              delay={0.3}
            />
            <ReviewCard
              name="David Kim"
              company="NextGen Solutions"
              review="The website they built for us is not only beautiful but also incredibly functional. Our conversion rate has doubled since the launch. Couldn't be happier with the results!"
              rating={5}
              delay={0.45}
            />
            <ReviewCard
              name="Jessica Taylor"
              company="Bloom Creative Studio"
              review="Their graphics design work is phenomenal! They created a complete branding package that truly represents our vision. The team is talented, responsive, and a pleasure to work with."
              rating={5}
              delay={0.6}
            />
            <ReviewCard
              name="Robert Martinez"
              company="FitLife Gym"
              review="The photo shoot was absolutely professional. They made us feel comfortable and captured amazing shots that we now use across all our marketing materials. Exceptional service!"
              rating={5}
              delay={0.75}
            />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-8 md:px-12 bg-[#f1281f] relative z-10">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0">
          <StatItem num="8+" label="Years Experience" delay={0} />
          <StatItem num="100+" label="Projects Completed" delay={0.1} />
          <StatItem num="50+" label="Happy Clients" delay={0.2} />
          <StatItem num="15+" label="Awards Won" delay={0.3} />
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-32 md:py-40 px-8 md:px-12 text-center relative overflow-hidden z-10" id="contact">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(241,40,31,0.08)_0%,transparent_70%)] pointer-events-none" />
        <div className="max-w-4xl mx-auto">
          <FadeUp>
            <div className="text-[#f1281f] text-xs tracking-[0.2em] uppercase mb-8" style={{ fontFamily: "'Space Mono', monospace" }}>
              Let's Work Together
            </div>
          </FadeUp>
          <FadeUp delay={0.15}>
            <h2 className="mb-6 leading-[0.9] tracking-tight" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(56px, 10vw, 140px)' }}>
              Ready to<br /><span className="text-[#f1281f]">Get Started?</span>
            </h2>
          </FadeUp>
          <FadeUp delay={0.3}>
            <p className="text-base md:text-lg text-[#b9b0aa] mb-12 max-w-2xl mx-auto leading-relaxed">
              We're always open to discussing new projects, creative ideas, or opportunities to help your business grow.
            </p>
          </FadeUp>

          <FadeUp delay={0.4}>
            <div className="space-y-6 mb-12">
              {/* Email */}
              <div className="flex items-center justify-center gap-3 text-[#f7f1ed]">
                <Mail size={20} className="text-[#f1281f]" />
                <a href="mailto:info@digitaldizzles.com" className="text-lg hover:text-[#f1281f] transition-colors">
                  info@digitaldizzles.com
                </a>
              </div>

              {/* WhatsApp */}
              <div className="flex items-center justify-center gap-3 text-[#f7f1ed]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#f1281f]">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                </svg>
                <a href="https://wa.me/923001234567" className="text-lg hover:text-[#f1281f] transition-colors">
                  +92 300 1234567
                </a>
              </div>

              {/* Phone */}
              <div className="flex items-center justify-center gap-3 text-[#f7f1ed]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#f1281f]">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                <a href="tel:+923001234567" className="text-lg hover:text-[#f1281f] transition-colors">
                  +92 300 1234567
                </a>
              </div>

              {/* Instagram */}
              <div className="flex items-center justify-center gap-3 text-[#f7f1ed]">
                <Instagram size={20} className="text-[#f1281f]" />
                <a href="https://instagram.com/digitaldizzles" target="_blank" rel="noopener noreferrer" className="text-lg hover:text-[#f1281f] transition-colors">
                  @digitaldizzles
                </a>
              </div>
            </div>
          </FadeUp>

          <FadeUp delay={0.5}>
            <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
              <MagneticButton href="mailto:info@digitaldizzles.com">
                <span className="bg-[#f1281f] text-[#0e0e10] text-[13px] tracking-wider uppercase px-8 py-4 rounded-full no-underline flex items-center gap-2" style={{ fontFamily: "'Space Mono', monospace" }}>
                  <Mail size={16} />
                  Send Email
                </span>
              </MagneticButton>
              <MagneticButton href="https://wa.me/923001234567">
                <span className="bg-transparent border-2 border-[#f1281f] text-[#f1281f] text-[13px] tracking-wider uppercase px-8 py-4 rounded-full no-underline flex items-center gap-2" style={{ fontFamily: "'Space Mono', monospace" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                  </svg>
                  WhatsApp Us
                </span>
              </MagneticButton>
            </div>
          </FadeUp>

          <FadeUp delay={0.6}>
            <div className="mt-12 flex gap-4 justify-center">
              <MagneticButton href="https://www.linkedin.com/company/digitaldizzles">
                <span className="w-12 h-12 rounded-full border border-[#f1281f]/30 hover:border-[#f1281f] flex items-center justify-center transition-colors">
                  <Linkedin size={18} className="text-[#f1281f]" />
                </span>
              </MagneticButton>
              <MagneticButton href="https://instagram.com/digitaldizzles">
                <span className="w-12 h-12 rounded-full border border-[#f1281f]/30 hover:border-[#f1281f] flex items-center justify-center transition-colors">
                  <Instagram size={18} className="text-[#f1281f]" />
                </span>
              </MagneticButton>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#18181b] border-t border-white/[0.08] px-8 md:px-12 py-12 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <span className="block text-[28px] tracking-wider mb-2" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              Digital Dizzles
            </span>
            <p className="text-[13px] text-[#b9b0aa]">Making Brands Unforgettable</p>
          </div>
          <div className="text-[11px] tracking-widest text-[#b9b0aa]" style={{ fontFamily: "'Space Mono', monospace" }}>
            © 2026 Digital Dizzles. All Rights Reserved.
          </div>
          <a href="../portfolio/index.html" className="text-[11px] tracking-widest text-[#f1281f] hover:text-[#ff6b64] transition-colors uppercase no-underline" style={{ fontFamily: "'Space Mono', monospace" }}>
            Portfolio
          </a>
        </div>
      </footer>

      <style>{`
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
}

// Hero Section with Parallax
function HeroSection() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <motion.section
      style={{ y, opacity }}
      className="min-h-screen flex flex-col justify-center px-8 md:px-12 pt-20 pb-12 relative overflow-hidden"
      id="home"
      onMouseMove={handleMouseMove}
    >
      {/* Interactive particles in hero */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-[#f1281f]"
            style={{
              left: `${(i * 15) % 100}%`,
              top: `${(i * 20) % 100}%`,
              x: useTransform(mouseX, [0, 1000], [0, (i % 2 ? 30 : -30)]),
              y: useTransform(mouseY, [0, 800], [0, (i % 3 ? 20 : -20)]),
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <motion.div
          className="absolute top-[-86px] right-0 hidden md:block w-[clamp(150px,14vw,235px)] aspect-square overflow-hidden rounded-lg border border-white/10 bg-[#050506] shadow-[0_24px_80px_rgba(0,0,0,0.46)]"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.35, duration: 0.8 }}
          aria-hidden="true"
        >
          <img
            src="../portfolio/DD logo.png"
            alt=""
            className="w-full h-full object-cover [filter:invert(1)_hue-rotate(180deg)_saturate(1.18)_contrast(1.08)]"
          />
        </motion.div>

        <motion.div
          className="text-[#f1281f] text-xs tracking-[0.2em] uppercase mb-6 flex items-center gap-3"
          style={{ fontFamily: "'Space Mono', monospace" }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2.3, duration: 0.8 }}
        >
          <motion.div
            className="w-8 h-px bg-[#f1281f]"
            initial={{ width: 0 }}
            animate={{ width: 32 }}
            transition={{ delay: 2.3, duration: 0.6 }}
          />
          Digital Marketing • Video Production • Web Development
        </motion.div>

        <motion.h1
          className="text-[#f7f1ed] mb-6 leading-[0.9] tracking-tight"
          style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(56px, 12vw, 180px)' }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 1 }}
        >
          We Build Brands<br />
          That Get <span className="text-[#f1281f]">Noticed</span>
        </motion.h1>

        <motion.p
          className="max-w-2xl text-lg md:text-xl text-[#f7f1ed]/70 leading-relaxed mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.7, duration: 0.8 }}
        >
          Serving clients across Asia, the Middle East, USA, and Europe — digital marketing, video production, and creative solutions that drive real results.
        </motion.p>

        <motion.div
          className="flex flex-wrap gap-4 items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.9, duration: 0.8 }}
        >
          <MagneticButton href="#contact">
            <span
              className="bg-[#f1281f] text-[#0e0e10] text-[13px] font-medium tracking-wider uppercase px-8 py-4 rounded-full no-underline block"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              Get a Free Quote
            </span>
          </MagneticButton>
          <MagneticButton href="#work">
            <span
              className="bg-transparent border-2 border-[#f1281f] text-[#f1281f] text-[13px] font-medium tracking-wider uppercase px-8 py-4 rounded-full no-underline block"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              See Our Work
            </span>
          </MagneticButton>
        </motion.div>

        <motion.div
          className="absolute bottom-12 right-8 md:right-12 flex flex-col items-center gap-2.5 opacity-35"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.35 }}
          transition={{ delay: 3.2 }}
        >
          <div className="text-[9px] tracking-widest uppercase [writing-mode:vertical-lr]" style={{ fontFamily: "'Space Mono', monospace" }}>
            Scroll
          </div>
          <motion.div
            className="w-px h-[60px] bg-gradient-to-b from-[#f1281f] to-transparent"
            animate={{ scaleY: [0, 1, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transformOrigin: 'top' }}
          />
        </motion.div>
      </div>
    </motion.section>
  );
}

// Floating Shapes
function FloatingShapes() {
  const shapes = [
    { size: 100, top: '12%', left: '8%', duration: 22, delay: 0 },
    { size: 140, top: '65%', left: '88%', duration: 28, delay: 2 },
    { size: 80, top: '45%', left: '3%', duration: 20, delay: 4 },
    { size: 120, top: '80%', left: '75%', duration: 25, delay: 1 },
    { size: 90, top: '28%', left: '82%', duration: 23, delay: 3 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {shapes.map((shape, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border-2 border-[#f1281f]/10"
          style={{
            width: shape.size,
            height: shape.size,
            top: shape.top,
            left: shape.left,
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: shape.duration,
            repeat: Infinity,
            ease: 'linear',
            delay: shape.delay,
          }}
        />
      ))}
    </div>
  );
}

// Interactive Symbols that follow mouse
function InteractiveSymbols({ mouseX, mouseY }: any) {
  const symbols = [
    { char: '✦', size: 24, speed: 0.05, offsetX: -100, offsetY: -100, opacity: 0.3 },
    { char: '◆', size: 20, speed: 0.08, offsetX: 150, offsetY: -80, opacity: 0.25 },
    { char: '●', size: 16, speed: 0.06, offsetX: -120, offsetY: 100, opacity: 0.2 },
    { char: '▲', size: 18, speed: 0.07, offsetX: 180, offsetY: 120, opacity: 0.28 },
    { char: '■', size: 22, speed: 0.04, offsetX: -150, offsetY: -50, opacity: 0.22 },
    { char: '◉', size: 26, speed: 0.09, offsetX: 200, offsetY: 0, opacity: 0.18 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-[5]">
      {symbols.map((symbol, i) => (
        <motion.div
          key={i}
          className="absolute text-[#f1281f]"
          style={{
            fontSize: symbol.size,
            opacity: symbol.opacity,
            x: useTransform(mouseX, [0, window.innerWidth], [symbol.offsetX * 0.5, symbol.offsetX * 1.5]),
            y: useTransform(mouseY, [0, window.innerHeight], [symbol.offsetY * 0.5, symbol.offsetY * 1.5]),
            left: '50%',
            top: '50%',
          }}
        >
          <motion.span
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 20 - i * 2,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            {symbol.char}
          </motion.span>
        </motion.div>
      ))}
    </div>
  );
}

// Interactive Lines that react to mouse
function InteractiveLines({ mouseX, mouseY }: any) {
  const lines = [
    { width: 150, angle: 45, speed: 0.03, top: '20%', left: '15%' },
    { width: 100, angle: -30, speed: 0.04, top: '60%', left: '80%' },
    { width: 120, angle: 60, speed: 0.035, top: '40%', left: '10%' },
    { width: 80, angle: -45, speed: 0.045, top: '75%', left: '70%' },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-[4]">
      {lines.map((line, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            top: line.top,
            left: line.left,
            rotate: line.angle,
            x: useTransform(mouseX, [0, window.innerWidth], [-20, 20]),
            y: useTransform(mouseY, [0, window.innerHeight], [-15, 15]),
          }}
        >
          <motion.div
            className="h-[2px] bg-gradient-to-r from-transparent via-[#f1281f]/30 to-transparent"
            style={{ width: line.width }}
            animate={{
              opacity: [0.2, 0.5, 0.2],
              scaleX: [1, 1.2, 1],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}

// Magnetic Button
function MagneticButton({ children, href }: { children: React.ReactNode; href: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPosition({ x: x * 0.3, y: y * 0.3 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15 }}
      className="inline-block cursor-none"
    >
      {children}
    </motion.a>
  );
}

// Marquee
function Marquee({ items }: { items: string[] }) {
  const doubledItems = [...items, ...items];

  return (
    <div className="overflow-hidden border-t border-b border-white/[0.08] py-4 bg-[#18181b] relative z-10">
      <motion.div
        className="flex gap-12 w-max"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      >
        {doubledItems.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-12 whitespace-nowrap text-xs tracking-[0.12em] uppercase text-[#b9b0aa]"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            {item}
            <span className="text-[#f1281f] text-[10px]">✦</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

// Animated Showcase Section
function AnimatedShowcase() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  return (
    <section
      ref={ref}
      className="py-32 md:py-40 px-8 md:px-12 relative overflow-hidden z-10 bg-gradient-to-b from-[#0e0e10] via-[#080809] to-[#0e0e10]"
    >
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px bg-[#f1281f]"
            style={{
              left: 0,
              right: 0,
              top: `${i * 5}%`,
            }}
            animate={{
              opacity: [0.1, 0.3, 0.1],
              scaleX: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 3 + i * 0.2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.1,
            }}
          />
        ))}
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-[#f1281f]"
            style={{
              left: `${(i * 7) % 100}%`,
              top: `${(i * 13) % 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, (i % 2 ? 50 : -50), 0],
              opacity: [0, 0.6, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 5 + i * 0.3,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.4,
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <FadeUp>
          <div className="text-center mb-16">
            <motion.div
              className="inline-block"
              animate={isInView ? {
                scale: [1, 1.1, 1],
              } : {}}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <h2
                className="text-[#f7f1ed] mb-6 leading-[0.9] tracking-tight"
                style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(56px, 10vw, 120px)' }}
              >
                We Create<br />
                <span className="text-[#f1281f]">Digital Magic</span>
              </h2>
            </motion.div>
            <p className="text-[#f7f1ed]/60 text-lg max-w-2xl mx-auto">
              Transforming brands through innovative design and strategic thinking
            </p>
          </div>
        </FadeUp>

        {/* Animated Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: '⚡', title: 'Lightning Fast', desc: 'Quick turnaround without compromising quality' },
            { icon: '✨', title: 'Creative Excellence', desc: 'Award-winning designs that stand out' },
            { icon: '🎯', title: 'Results Driven', desc: 'Focused on measurable business impact' },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              whileHover={{ y: -10 }}
              className="bg-[#18181b] border border-[#f1281f]/10 rounded-2xl p-8 relative overflow-hidden group"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-[#f1281f]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
              <div className="relative z-10">
                <motion.div
                  className="text-6xl mb-6"
                  animate={{
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  {item.icon}
                </motion.div>
                <h3 className="text-[#f7f1ed] text-2xl mb-3" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                  {item.title}
                </h3>
                <p className="text-[#f7f1ed]/60 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Animated Circle Pattern */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-20">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute border border-[#f1281f] rounded-full"
              style={{
                width: 200 + i * 150,
                height: 200 + i * 150,
                left: '50%',
                top: '50%',
                x: '-50%',
                y: '-50%',
              }}
              animate={{
                rotate: [0, 360],
                scale: [1, 1.1, 1],
              }}
              transition={{
                rotate: { duration: 15 + i * 5, repeat: Infinity, ease: 'linear' },
                scale: { duration: 3 + i, repeat: Infinity, ease: 'easeInOut' },
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// Project Card
function ProjectCard({ number, title, category, description, delay, gradient }: any) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay }}
      className="group"
    >
      <motion.div
        className="bg-[#18181b] border border-white/5 rounded-2xl overflow-hidden hover:border-[#f1281f]/20 transition-all"
        whileHover={{ scale: 1.02 }}
      >
        <div className="grid md:grid-cols-5 gap-8 p-8 md:p-10">
          <div className="md:col-span-2">
            <div className="aspect-[4/3] rounded-xl overflow-hidden relative">
              <motion.div
                className="absolute inset-0"
                style={{ background: gradient }}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.6 }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="text-[80px] text-white/10"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  whileHover={{ scale: 1.2, opacity: 0.3 }}
                >
                  {number}
                </motion.div>
              </div>
            </div>
          </div>
          <div className="md:col-span-3 flex flex-col justify-center">
            <div className="text-[#f1281f] text-[10px] tracking-[0.15em] uppercase mb-3" style={{ fontFamily: "'Space Mono', monospace" }}>
              {category}
            </div>
            <h3 className="text-[#f7f1ed] text-3xl md:text-4xl mb-4 leading-tight" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              {title}
            </h3>
            <p className="text-[#f7f1ed]/60 text-base leading-relaxed mb-6">
              {description}
            </p>
            <motion.div
              className="flex items-center gap-2 text-[#f1281f] text-sm"
              style={{ fontFamily: "'Space Mono', monospace" }}
              whileHover={{ x: 5 }}
            >
              View Project
              <ArrowUpRight size={16} />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Stat Item
function StatItem({ num, label, delay }: { num: string; label: string; delay: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="text-center"
    >
      <motion.div
        className="text-[#0e0e10] leading-none tracking-tight mb-2"
        style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(48px, 6vw, 80px)' }}
        initial={{ scale: 0.5 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 0.5, delay: delay + 0.2, type: 'spring' }}
      >
        {num}
      </motion.div>
      <div className="text-[13px] text-black/60 tracking-wide uppercase" style={{ fontFamily: "'Space Mono', monospace" }}>
        {label}
      </div>
    </motion.div>
  );
}

// Fade Up
function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay }}
    >
      {children}
    </motion.div>
  );
}

// Service Card
function ServiceCard({ title, description, delay }: any) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="bg-[#18181b] hover:bg-[#202024] border border-white/5 hover:border-[#f1281f]/20 rounded-xl p-6 transition-all group"
      whileHover={{ scale: 1.05 }}
    >
      <h3 className="text-[#f7f1ed] text-xl mb-3" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
        {title}
      </h3>
      <p className="text-[#f7f1ed]/60 text-sm leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}

// Package Category
function PackageCategory({ title, packages }: { title: string; packages: any[] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <div ref={ref} className="mb-20 last:mb-0">
      <FadeUp>
        <h3 className="text-[#f1281f] text-2xl md:text-3xl mb-8 tracking-wide" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
          {title}
        </h3>
      </FadeUp>
      <div className="grid md:grid-cols-3 gap-6">
        {packages.map((pkg, i) => (
          <PackageCard key={i} package={pkg} delay={i * 0.15} isInView={isInView} />
        ))}
      </div>
    </div>
  );
}

// Package Card
function PackageCard({ package: pkg, delay, isInView }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="bg-[#0e0e10] border border-[#f1281f]/20 rounded-2xl p-8 hover:border-[#f1281f]/40 transition-all group relative overflow-hidden"
      whileHover={{ y: -10 }}
    >
      {/* Hover gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#f1281f]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="relative z-10">
        {/* Package name */}
        <h4 className="text-[#f7f1ed] text-2xl mb-2" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
          {pkg.name}
        </h4>

        {/* Price */}
        <div className="mb-4">
          <span className="text-[#f1281f] text-4xl font-bold" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            {pkg.price}
          </span>
          {pkg.price !== "Custom" && !pkg.isProject && (
            <span className="text-[#f7f1ed]/40 text-sm ml-2">
              {pkg.isMonthly ? "/month" : ""}
            </span>
          )}
          {pkg.price !== "Custom" && pkg.isProject && (
            <span className="text-[#f7f1ed]/40 text-sm ml-2">/project</span>
          )}
        </div>

        {/* Description */}
        <p className="text-[#f7f1ed]/60 text-sm mb-6 leading-relaxed">
          {pkg.description}
        </p>

        {/* Features list */}
        <ul className="space-y-3 mb-8">
          {pkg.features.map((feature: string, i: number) => (
            <li key={i} className="flex items-start gap-3 text-[#f7f1ed]/70 text-sm">
              <span className="text-[#f1281f] mt-1">✓</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <motion.a
          href="#contact"
          className="block text-center bg-[#f1281f] text-[#0e0e10] text-[13px] tracking-wider uppercase px-6 py-3 rounded-full no-underline transition-all"
          style={{ fontFamily: "'Space Mono', monospace" }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Get Started
        </motion.a>
      </div>
    </motion.div>
  );
}

// Review Card
function ReviewCard({ name, company, review, rating, delay }: any) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="bg-[#18181b] border border-[#f1281f]/10 rounded-2xl p-8 hover:border-[#f1281f]/30 transition-all relative overflow-hidden group"
      whileHover={{ y: -5 }}
    >
      {/* Quote icon background */}
      <div className="absolute top-4 right-4 text-[#f1281f]/10 text-6xl leading-none" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
        "
      </div>

      <div className="relative z-10">
        {/* Star rating */}
        <div className="flex gap-1 mb-4">
          {[...Array(rating)].map((_, i) => (
            <motion.span
              key={i}
              className="text-[#f1281f]"
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: delay + i * 0.1 }}
            >
              ★
            </motion.span>
          ))}
        </div>

        {/* Review text */}
        <p className="text-[#f7f1ed]/70 text-sm leading-relaxed mb-6">
          "{review}"
        </p>

        {/* Customer info */}
        <div className="border-t border-[#f1281f]/10 pt-4">
          <h4 className="text-[#f7f1ed] font-medium mb-1" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '18px' }}>
            {name}
          </h4>
          <p className="text-[#f1281f]/60 text-xs" style={{ fontFamily: "'Space Mono', monospace" }}>
            {company}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// Orbital Animation - Company name at center with services orbiting
function OrbitalAnimation() {
  const services = [
    'Digital Marketing',
    'Video Shoots',
    'Photo Shoots',
    'Video Editing',
    'Graphics Design',
    'Marketing Campaigns',
  ];

  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-[3] opacity-20">
      {/* Center Company Name */}
      <motion.div
        className="absolute text-[#f1281f]"
        style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(32px, 4vw, 48px)' }}
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        Digital Dizzles
      </motion.div>

      {/* Orbiting Services */}
      {services.map((service, i) => {
        const angle = (i / services.length) * 360;
        const radius = 250;

        return (
          <motion.div
            key={i}
            className="absolute text-[#f7f1ed]/40 text-xs whitespace-nowrap"
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '11px',
            }}
            animate={{
              rotate: [angle, angle + 360],
            }}
            transition={{
              duration: 40,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            <motion.div
              style={{
                x: radius * Math.cos((angle * Math.PI) / 180),
                y: radius * Math.sin((angle * Math.PI) / 180),
              }}
              animate={{
                rotate: [-angle, -angle - 360],
              }}
              transition={{
                duration: 40,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              {service}
            </motion.div>
          </motion.div>
        );
      })}

      {/* Orbit Circle */}
      <motion.div
        className="absolute border border-[#f1281f]/10 rounded-full"
        style={{ width: 500, height: 500 }}
        animate={{
          rotate: [0, 360],
          scale: [1, 1.05, 1],
        }}
        transition={{
          rotate: { duration: 50, repeat: Infinity, ease: 'linear' },
          scale: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
        }}
      />
    </div>
  );
}

// Scroll-triggered Shapes that zoom on hover
function ScrollShapes() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const shapes = [
    { type: 'circle', size: 80, top: '15%', left: '20%', color: '#f1281f', rotation: 0 },
    { type: 'square', size: 60, top: '35%', right: '15%', color: '#f1281f', rotation: 45 },
    { type: 'triangle', size: 70, top: '55%', left: '10%', color: '#f1281f', rotation: 0 },
    { type: 'circle', size: 90, top: '75%', right: '25%', color: '#f1281f', rotation: 0 },
    { type: 'square', size: 55, top: '25%', left: '75%', color: '#f1281f', rotation: 30 },
    { type: 'triangle', size: 65, top: '90%', left: '50%', color: '#f1281f', rotation: 180 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-[6]">
      {shapes.map((shape, i) => (
        <ScrollShape
          key={i}
          index={i}
          shape={shape}
          isHovered={hoveredIndex === i}
          onHoverStart={() => setHoveredIndex(i)}
          onHoverEnd={() => setHoveredIndex(null)}
        />
      ))}
    </div>
  );
}

function ScrollShape({ index, shape, isHovered, onHoverStart, onHoverEnd }: any) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  const renderShape = () => {
    const baseClasses = `absolute pointer-events-auto`;

    if (shape.type === 'circle') {
      return (
        <motion.div
          className={`${baseClasses} rounded-full border-2`}
          style={{
            width: shape.size,
            height: shape.size,
            borderColor: shape.color,
            opacity: 0.15,
          }}
        />
      );
    }

    if (shape.type === 'square') {
      return (
        <motion.div
          className={`${baseClasses} border-2`}
          style={{
            width: shape.size,
            height: shape.size,
            borderColor: shape.color,
            opacity: 0.15,
            rotate: shape.rotation,
          }}
        />
      );
    }

    if (shape.type === 'triangle') {
      return (
        <motion.div
          className={baseClasses}
          style={{
            width: 0,
            height: 0,
            borderLeft: `${shape.size / 2}px solid transparent`,
            borderRight: `${shape.size / 2}px solid transparent`,
            borderBottom: `${shape.size}px solid ${shape.color}`,
            opacity: 0.15,
            rotate: shape.rotation,
          }}
        />
      );
    }
  };

  return (
    <motion.div
      ref={ref}
      className="absolute"
      style={{
        top: shape.top,
        left: shape.left,
        right: shape.right,
      }}
      initial={{ opacity: 0, scale: 0, rotate: 0 }}
      animate={isInView ? {
        opacity: 1,
        scale: isHovered ? 3.5 : 1,
        rotate: isHovered ? shape.rotation + 180 : shape.rotation,
        zIndex: isHovered ? 50 : 6,
      } : { opacity: 0, scale: 0 }}
      transition={{
        opacity: { duration: 0.6, delay: index * 0.1 },
        scale: { type: 'spring', stiffness: 200, damping: 20 },
        rotate: { duration: 0.4 },
      }}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
    >
      {renderShape()}
    </motion.div>
  );
}

