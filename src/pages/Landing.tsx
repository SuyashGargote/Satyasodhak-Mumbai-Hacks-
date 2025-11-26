import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Globe, Shield, Zap } from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen gradient-hero text-primary-foreground overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-64 h-64 bg-cyber-blue rounded-full opacity-10 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-cyber-blue rounded-full opacity-10 blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.1, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-5xl mx-auto"
        >
          {/* Logo/Brand */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mb-8 inline-block"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <Shield className="w-16 h-16 text-cyber-blue" />
              <h1 className="text-6xl sm:text-7xl font-extrabold tracking-wider">
                SatyaShodhak
              </h1>
            </div>
          </motion.div>

          {/* Hero tagline */}
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 tracking-wide text-balance"
          >
            Verify the Truth in Seconds —{" "}
            <span className="text-cyber-blue">Powered by Agentic AI</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-lg sm:text-xl text-primary-foreground/80 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Cut through misinformation with AI-powered fact verification. Cross-reference global sources instantly and get confidence-scored verdicts.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
            className="mb-16"
          >
            <Button
              size="lg"
              onClick={() => navigate("/auth")}
              className="text-lg px-10 py-6 bg-cyber-blue text-primary hover:bg-cyber-blue/90 shadow-glow transition-all duration-300 hover:scale-105"
            >
              <Zap className="mr-2 w-5 h-5" />
              Start Fact-Checking
            </Button>
          </motion.div>

          {/* Interactive globe animation */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
            className="relative mx-auto w-full max-w-md"
          >
            <div className="relative">
              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 60,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="w-48 h-48 mx-auto"
              >
                <Globe className="w-full h-full text-cyber-blue opacity-30" />
              </motion.div>
              
              {/* Orbiting dots representing fact-checking */}
              {[0, 120, 240].map((delay, i) => (
                <motion.div
                  key={i}
                  className="absolute top-1/2 left-1/2 w-3 h-3 bg-cyber-blue rounded-full shadow-glow"
                  animate={{
                    x: [0, 80, 0, -80, 0],
                    y: [0, -80, 0, 80, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    delay: delay / 360,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-0 right-0 text-center text-sm text-primary-foreground/60"
        >
          Powered by Gemini + Google Fact-Check + Supabase
        </motion.footer>
      </div>
    </div>
  );
};

export default Landing;
