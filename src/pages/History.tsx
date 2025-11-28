import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { Navbar } from "@/components/Navbar";
import { ResultCard } from "@/components/ResultCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Loader2, List, LayoutGrid } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const History = () => {
  const [user, setUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"table" | "card">("card");
  const [history, setHistory] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

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

  useEffect(() => {
    if (user) {
      fetchHistory();
    }
  }, [user]);

  const fetchHistory = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("verification_results")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      setHistory(data || []);
    } catch (error: any) {
      console.error("Failed to fetch history:", error);
      toast({
        title: "Failed to load history",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filteredItems = history.filter((item) =>
    item.claim.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen w-full bg-background">
      <Navbar user={user} />

      <main className="p-6 lg:p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto space-y-6"
        >
          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-4xl font-extrabold tracking-wide">Verification History</h1>
            <p className="text-muted-foreground text-lg">
              Review your past fact-checking results
            </p>
          </div>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search your history..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex gap-2">
              <Button
                variant={viewMode === "card" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("card")}
              >
                <LayoutGrid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "table" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("table")}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Results */}
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-cyber-blue" />
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="text-center py-12 bg-card rounded-xl border border-border/50 shadow-card">
              <p className="text-muted-foreground">
                {searchQuery
                  ? "No results found matching your search."
                  : "Your verification history will appear here. Start by verifying a claim on the dashboard."}
              </p>
            </div>
          ) : viewMode === "card" ? (
            <div className="space-y-4">
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ResultCard
                    result={{
                      id: item.id,
                      claim: item.claim,
                      verdict: item.verdict,
                      confidence: item.confidence,
                      explanation: item.explanation,
                      sources: item.sources,
                      timestamp: new Date(item.created_at),
                    }}
                    savedResultId={item.id}
                    onSaveToggle={fetchHistory}
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="bg-card rounded-xl border border-border/50 shadow-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50 border-b border-border/50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Claim</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Verdict</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Date</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Confidence</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredItems.map((item, index) => (
                      <motion.tr
                        key={item.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className="border-b border-border/30 hover:bg-muted/30 transition-colors"
                      >
                        <td className="px-6 py-4 max-w-md">
                          <p className="text-sm truncate">{item.claim}</p>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm font-semibold">{item.verdict}</span>
                        </td>
                        <td className="px-6 py-4 text-sm text-muted-foreground whitespace-nowrap">
                          {new Date(item.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-sm">{item.confidence}%</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
};

export default History;
