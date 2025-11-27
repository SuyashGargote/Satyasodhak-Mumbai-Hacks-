import { motion } from "framer-motion";
import { useState } from "react";
import { VerificationResult } from "@/pages/Dashboard";
import { VerdictBadge } from "@/components/VerdictBadge";
import { ConfidenceBar } from "@/components/ConfidenceBar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { 
  ThumbsUp, 
  BookmarkPlus, 
  Share2, 
  RefreshCw, 
  ChevronDown, 
  ChevronUp,
  ExternalLink 
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ResultCardProps {
  result: VerificationResult;
}

export const ResultCard = ({ result }: ResultCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isUseful, setIsUseful] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const { toast } = useToast();

  const handleUseful = () => {
    setIsUseful(!isUseful);
    toast({
      title: isUseful ? "Feedback removed" : "Thanks for your feedback!",
      description: isUseful ? "" : "This helps improve our verification system.",
    });
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    toast({
      title: isSaved ? "Removed from saved" : "Result saved",
      description: isSaved ? "" : "You can find this in your Saved Results.",
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(
      `SatyaShodhak Verification: "${result.claim}" - Verdict: ${result.verdict} (${result.confidence}% confidence)`
    );
    toast({
      title: "Copied to clipboard",
      description: "Share this verification result with others.",
    });
  };

  const handleReVerify = () => {
    toast({
      title: "Re-verification started",
      description: "Checking for updated information...",
    });
  };

  // Gradient backgrounds based on verdict
  const getCardGradient = () => {
    switch (result.verdict) {
      case "TRUE":
        return "bg-gradient-to-br from-truth-green/5 to-transparent";
      case "FALSE":
        return "bg-gradient-to-br from-truth-red/5 to-transparent";
      case "MISLEADING":
        return "bg-gradient-to-br from-truth-amber/5 to-transparent";
      case "PARTIALLY_TRUE":
        return "bg-gradient-to-br from-cyber-blue/5 to-transparent";
      default:
        return "bg-gradient-to-br from-truth-gray/5 to-transparent";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01, y: -4 }}
      transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
    >
      <Card className={`shadow-card border-border/50 overflow-hidden rounded-2xl ${getCardGradient()}`}>
        <CardHeader className="space-y-4 pb-4">
          {/* Verdict and Confidence */}
          <div className="flex items-start justify-between gap-4">
            <VerdictBadge verdict={result.verdict} />
            <span className="text-sm text-muted-foreground">
              {new Date(result.timestamp).toLocaleDateString()}
            </span>
          </div>

          <ConfidenceBar confidence={result.confidence} />

          {/* Claim */}
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
              Claim Verified
            </p>
            <p className="text-lg font-medium leading-relaxed">{result.claim}</p>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Explanation */}
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Explanation
            </p>
            <p className="text-sm leading-relaxed text-foreground/90">{result.explanation}</p>
          </div>

          {/* Expandable Evidence Sources */}
          <div className="space-y-3">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-cyber-blue hover:text-cyber-blue/80 transition-colors"
            >
              {isExpanded ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
              Evidence Sources ({result.sources.length})
            </button>

            <motion.div
              initial={false}
              animate={{ height: isExpanded ? "auto" : 0 }}
              className="overflow-hidden"
            >
              <div className="space-y-3 pt-2">
                {result.sources.map((source, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-muted/30 rounded-lg p-4 space-y-2 border border-border/30"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-semibold text-sm">{source.title}</h4>
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyber-blue hover:text-cyber-blue/80 transition-colors flex-shrink-0"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {source.snippet}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2 pt-4 border-t border-border/50">
            <Button
              variant="outline"
              size="sm"
              onClick={handleUseful}
              className={isUseful ? "bg-truth-green/10 text-truth-green border-truth-green/30" : ""}
            >
              <ThumbsUp className="w-4 h-4 mr-2" />
              {isUseful ? "Useful" : "Mark as Useful"}
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleSave}
              className={isSaved ? "bg-cyber-blue/10 text-cyber-blue border-cyber-blue/30" : ""}
            >
              <BookmarkPlus className="w-4 h-4 mr-2" />
              {isSaved ? "Saved" : "Save Result"}
            </Button>

            <Button variant="outline" size="sm" onClick={handleShare}>
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>

            <Button variant="outline" size="sm" onClick={handleReVerify}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Re-Verify
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
