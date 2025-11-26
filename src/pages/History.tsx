import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { Sidebar } from "@/components/Sidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { VerdictBadge } from "@/components/VerdictBadge";
import { Search, RefreshCw, List, LayoutGrid } from "lucide-react";

const History = () => {
  const [user, setUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"table" | "card">("card");
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

  // Mock history data
  const historyItems = [
    {
      id: "1",
      claim: "The Earth is flat and NASA photos are fake",
      verdict: "FALSE" as const,
      date: new Date(Date.now() - 86400000),
      confidence: 98,
    },
    {
      id: "2",
      claim: "Drinking water helps maintain healthy body temperature",
      verdict: "TRUE" as const,
      date: new Date(Date.now() - 172800000),
      confidence: 95,
    },
    {
      id: "3",
      claim: "5G towers cause coronavirus",
      verdict: "FALSE" as const,
      date: new Date(Date.now() - 259200000),
      confidence: 99,
    },
    {
      id: "4",
      claim: "Coffee can improve athletic performance",
      verdict: "PARTIALLY_TRUE" as const,
      date: new Date(Date.now() - 345600000),
      confidence: 78,
    },
  ];

  const filteredItems = historyItems.filter((item) =>
    item.claim.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          {viewMode === "card" ? (
            <div className="grid gap-4 md:grid-cols-2">
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card rounded-xl border border-border/50 shadow-card p-6 space-y-4 hover:shadow-glow transition-shadow"
                >
                  <div className="flex items-start justify-between gap-4">
                    <VerdictBadge verdict={item.verdict} />
                    <span className="text-sm text-muted-foreground whitespace-nowrap">
                      {item.date.toLocaleDateString()}
                    </span>
                  </div>

                  <p className="text-sm leading-relaxed line-clamp-3">{item.claim}</p>

                  <div className="flex items-center justify-between pt-4 border-t border-border/50">
                    <span className="text-sm text-muted-foreground">
                      {item.confidence}% confidence
                    </span>
                    <Button variant="outline" size="sm">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Re-Run
                    </Button>
                  </div>
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
                      <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
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
                          <VerdictBadge verdict={item.verdict} />
                        </td>
                        <td className="px-6 py-4 text-sm text-muted-foreground whitespace-nowrap">
                          {item.date.toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-sm">{item.confidence}%</td>
                        <td className="px-6 py-4">
                          <Button variant="ghost" size="sm">
                            <RefreshCw className="w-4 h-4" />
                          </Button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No results found matching your search.</p>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
};

export default History;
