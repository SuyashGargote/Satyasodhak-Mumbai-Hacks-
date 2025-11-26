import { motion } from "framer-motion";
import { NavLink } from "@/components/NavLink";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  LayoutDashboard, 
  History, 
  BookmarkPlus, 
  Settings, 
  LogOut,
  Shield
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SidebarProps {
  user: User;
}

export const Sidebar = ({ user }: SidebarProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive",
      });
    } else {
      navigate("/");
    }
  };

  const navItems = [
    { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/history", icon: History, label: "History" },
    { to: "/saved", icon: BookmarkPlus, label: "Saved Results" },
    { to: "/settings", icon: Settings, label: "Settings" },
  ];

  return (
    <motion.aside
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      className="w-72 bg-card border-r border-border/50 flex flex-col shadow-card"
    >
      {/* Brand Header */}
      <div className="p-6 border-b border-border/50">
        <div className="flex items-center gap-3">
          <Shield className="w-8 h-8 text-cyber-blue" />
          <span className="text-xl font-extrabold tracking-wide">SatyaShodhak</span>
        </div>
      </div>

      {/* User Profile */}
      <div className="p-6 border-b border-border/50">
        <div className="flex items-center gap-3">
          <Avatar className="w-12 h-12 border-2 border-cyber-blue/30">
            <AvatarImage src={user.user_metadata?.avatar_url} alt={user.email || ""} />
            <AvatarFallback className="bg-cyber-blue/20 text-cyber-blue font-bold">
              {user.email?.[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate">
              {user.user_metadata?.full_name || user.email}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {user.email}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/dashboard"}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-all duration-200"
            activeClassName="bg-cyber-blue/10 text-cyber-blue border border-cyber-blue/30 font-semibold"
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-border/50">
        <Button
          onClick={handleLogout}
          variant="ghost"
          className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </Button>
      </div>
    </motion.aside>
  );
};
