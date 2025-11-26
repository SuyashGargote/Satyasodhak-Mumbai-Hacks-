import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { Sidebar } from "@/components/Sidebar";
import { BookmarkPlus } from "lucide-react";

const Saved = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  if (!user) {
    return null;
  }

  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar user={user} />

      <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          <div className="space-y-2 mb-8">
            <h1 className="text-4xl font-extrabold tracking-wide flex items-center gap-3">
              <BookmarkPlus className="w-8 h-8 text-cyber-blue" />
              Saved Results
            </h1>
            <p className="text-muted-foreground text-lg">
              Access your bookmarked verification results
            </p>
          </div>

          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center space-y-4">
              <BookmarkPlus className="w-16 h-16 text-muted-foreground mx-auto opacity-40" />
              <p className="text-xl text-muted-foreground">No saved results yet</p>
              <p className="text-sm text-muted-foreground max-w-md">
                When you save verification results from the dashboard, they'll appear here for easy
                access.
              </p>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Saved;
