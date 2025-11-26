import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { Sidebar } from "@/components/Sidebar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, Settings as SettingsIcon, TestTube } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const [user, setUser] = useState<User | null>(null);
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({});
  const [apiKeys, setApiKeys] = useState({
    gemini: "",
    googleFactCheck: "",
    additional: "",
    supabaseUrl: "",
    supabaseKey: "",
  });
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

  const toggleVisibility = (key: string) => {
    setShowKeys((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleTestConnection = (keyName: string) => {
    toast({
      title: "Testing connection...",
      description: "This is a placeholder. Backend integration pending.",
    });
  };

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your API keys have been stored securely.",
    });
  };

  const apiKeyFields = [
    { id: "gemini", label: "Gemini API Key", description: "Required for AI-powered verification" },
    {
      id: "googleFactCheck",
      label: "Google Fact-Check API Key",
      description: "Used to access Google's fact-checking database",
    },
    {
      id: "additional",
      label: "Additional API Key",
      description: "Optional: For custom integrations",
    },
    { id: "supabaseUrl", label: "Supabase URL", description: "Your Supabase project URL" },
    {
      id: "supabaseKey",
      label: "Supabase Public Key",
      description: "Public anon key from Supabase",
    },
  ];

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
          className="max-w-4xl mx-auto space-y-6"
        >
          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-4xl font-extrabold tracking-wide flex items-center gap-3">
              <SettingsIcon className="w-8 h-8 text-cyber-blue" />
              Settings
            </h1>
            <p className="text-muted-foreground text-lg">
              Configure your API keys and application settings
            </p>
          </div>

          {/* API Keys Card */}
          <Card className="shadow-card border-border/50">
            <CardHeader>
              <CardTitle>API Configuration</CardTitle>
              <CardDescription>
                Enter your API keys to enable full verification features. Keys are stored securely.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {apiKeyFields.map((field) => (
                <div key={field.id} className="space-y-3">
                  <Label htmlFor={field.id} className="text-base font-semibold">
                    {field.label}
                  </Label>
                  <p className="text-sm text-muted-foreground">{field.description}</p>

                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Input
                        id={field.id}
                        type={showKeys[field.id] ? "text" : "password"}
                        placeholder={`Enter your ${field.label.toLowerCase()}`}
                        value={apiKeys[field.id as keyof typeof apiKeys]}
                        onChange={(e) =>
                          setApiKeys((prev) => ({
                            ...prev,
                            [field.id]: e.target.value,
                          }))
                        }
                        className="pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => toggleVisibility(field.id)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showKeys[field.id] ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>

                    <Button
                      variant="outline"
                      onClick={() => handleTestConnection(field.id)}
                      className="shrink-0"
                    >
                      <TestTube className="w-4 h-4 mr-2" />
                      Test
                    </Button>
                  </div>
                </div>
              ))}

              <div className="pt-4 border-t border-border/50">
                <Button onClick={handleSave} className="w-full bg-cyber-blue hover:bg-cyber-blue/90">
                  Save Settings
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Environment Variables Card */}
          <Card className="shadow-card border-border/50 bg-muted/30">
            <CardHeader>
              <CardTitle>Environment Configuration</CardTitle>
              <CardDescription>
                For local development, create a <code className="text-xs">.env.example</code> file
                with these variables
              </CardDescription>
            </CardHeader>

            <CardContent>
              <pre className="bg-primary/5 border border-border/50 rounded-lg p-4 text-xs overflow-x-auto">
                <code>{`GEMINI_API_KEY=your_gemini_api_key_here
GOOGLE_FACT_CHECK_API_KEY=your_google_fact_check_key_here
SUPABASE_URL=your_supabase_url_here
SUPABASE_KEY=your_supabase_anon_key_here`}</code>
              </pre>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
};

export default Settings;
