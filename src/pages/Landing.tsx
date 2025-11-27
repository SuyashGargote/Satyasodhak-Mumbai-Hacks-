import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Globe, Shield, Zap } from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen gradient-hero text-primary-foreground overflow-hidden relative">
      {/* Abstract background patterns */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-96 h-96 bg-cyber-blue rounded-full opacity-10 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.25, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-cyber-blue rounded-full opacity-15 blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.15, 0.08, 0.15],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        {/* Abstract node network pattern */}
        <motion.div
          className="absolute top-1/3 right-1/4 w-64 h-64 opacity-5"
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <circle cx="50" cy="10" r="3" fill="currentColor" />
            <circle cx="90" cy="50" r="3" fill="currentColor" />
            <circle cx="50" cy="90" r="3" fill="currentColor" />
            <circle cx="10" cy="50" r="3" fill="currentColor" />
            <line x1="50" y1="10" x2="90" y2="50" stroke="currentColor" strokeWidth="0.5" />
            <line x1="90" y1="50" x2="50" y2="90" stroke="currentColor" strokeWidth="0.5" />
            <line x1="50" y1="90" x2="10" y2="50" stroke="currentColor" strokeWidth="0.5" />
            <line x1="10" y1="50" x2="50" y2="10" stroke="currentColor" strokeWidth="0.5" />
          </svg>
        </motion.div>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="flex-1 flex items-center justify-center py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-6xl mx-auto space-y-12"
          >
            {/* Logo/Brand */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-block"
            >
              <div className="flex items-center justify-center gap-4 mb-6">
                <motion.div
                  animate={{
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Shield className="w-20 h-20 text-cyber-blue drop-shadow-glow" />
                </motion.div>
                <h1 className="text-6xl sm:text-7xl lg:text-8xl font-extrabold tracking-wider">
                  SatyaShodhak
                </h1>
              </div>
            </motion.div>

            {/* Hero Headline */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="space-y-4"
            >
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-wide text-balance">
                Verify Truth in Seconds.
              </h2>
              <p className="text-xl sm:text-2xl text-primary-foreground/80 max-w-3xl mx-auto leading-relaxed">
                An AI-powered platform to detect misinformation and confirm facts from reliable global sources.
              </p>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
              className="space-y-3"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  size="lg"
                  onClick={() => navigate("/auth")}
                  className="text-xl px-12 py-7 bg-cyber-blue text-primary hover:bg-cyber-blue/90 shadow-glow transition-all duration-300 rounded-xl font-bold"
                >
                  <Zap className="mr-3 w-6 h-6" />
                  Start Fact-Checking
                </Button>
              </motion.div>
              <p className="text-sm text-primary-foreground/60 italic">No sign-in required to try</p>
            </motion.div>

            {/* Feature Preview - Three Columns */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 max-w-5xl mx-auto"
            >
              {[
                {
                  icon: "🔍",
                  label: "Real-time Fact Checking",
                  message: "Verify claims instantly",
                  delay: 0.9,
                },
                {
                  icon: "🧠",
                  label: "AI Evidence Analysis",
                  message: "Powered by agentic AI reasoning",
                  delay: 1.0,
                },
                {
                  icon: "🛡",
                  label: "Trustworthy Sources",
                  message: "Based on verifiable data",
                  delay: 1.1,
                },
              ].map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: feature.delay }}
                  whileHover={{ y: -5 }}
                  className="bg-primary-foreground/5 backdrop-blur-sm rounded-2xl p-6 border border-primary-foreground/10 hover:border-cyber-blue/30 transition-all duration-300"
                >
                  <div className="text-5xl mb-4">{feature.icon}</div>
                  <h3 className="text-lg font-bold mb-2 tracking-wide">{feature.label}</h3>
                  <p className="text-sm text-primary-foreground/70">{feature.message}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Abstract visualization */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, duration: 1 }}
              className="relative mx-auto w-full max-w-sm pt-8"
            >
              <div className="relative">
                <motion.div
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 50,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="w-40 h-40 mx-auto"
                >
                  <Globe className="w-full h-full text-cyber-blue opacity-20" />
                </motion.div>
                
                {/* Orbiting verification dots */}
                {[0, 90, 180, 270].map((angle, i) => (
                  <motion.div
                    key={i}
                    className="absolute top-1/2 left-1/2 w-2.5 h-2.5 bg-cyber-blue rounded-full shadow-glow"
                    animate={{
                      x: [
                        Math.cos((angle * Math.PI) / 180) * 70,
                        Math.cos(((angle + 90) * Math.PI) / 180) * 70,
                        Math.cos(((angle + 180) * Math.PI) / 180) * 70,
                        Math.cos(((angle + 270) * Math.PI) / 180) * 70,
                        Math.cos((angle * Math.PI) / 180) * 70,
                      ],
                      y: [
                        Math.sin((angle * Math.PI) / 180) * 70,
                        Math.sin(((angle + 90) * Math.PI) / 180) * 70,
                        Math.sin(((angle + 180) * Math.PI) / 180) * 70,
                        Math.sin(((angle + 270) * Math.PI) / 180) * 70,
                        Math.sin((angle * Math.PI) / 180) * 70,
                      ],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      delay: i * 0.5,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="py-8 text-center text-sm text-primary-foreground/50"
        >
          Powered by Gemini + Google Fact-Check + Supabase
        </motion.footer>
      </div>
    </div>
  );
};

export default Landing;
