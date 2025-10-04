import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, AlertCircle, XCircle } from "lucide-react";
import { PredictionResult } from "@/pages/Index";

interface ClassificationCardProps {
  result: PredictionResult;
}

const ClassificationCard = ({ result }: ClassificationCardProps) => {
  const getIcon = () => {
    switch (result.classification) {
      case "Confirmed":
        return <CheckCircle2 className="w-12 h-12 text-primary" />;
      case "Candidate":
        return <AlertCircle className="w-12 h-12 text-secondary" />;
      case "False Positive":
        return <XCircle className="w-12 h-12 text-destructive" />;
    }
  };

  const getVariant = () => {
    switch (result.classification) {
      case "Confirmed":
        return "default";
      case "Candidate":
        return "secondary";
      case "False Positive":
        return "destructive";
    }
  };

  return (
    <Card className="p-8 border-border bg-card/80 backdrop-blur-sm cosmic-glow">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <div className="animate-pulse-glow">
            {getIcon()}
          </div>
          
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-2xl font-bold">Classification</h3>
              <Badge variant={getVariant()} className="text-sm">
                {result.classification}
              </Badge>
            </div>
            <p className="text-muted-foreground">
              Based on ensemble ML model analysis
            </p>
          </div>
        </div>

        <div className="text-center">
          <div className="text-5xl font-bold bg-gradient-cosmic bg-clip-text text-transparent">
            {(result.confidence * 100).toFixed(1)}%
          </div>
          <p className="text-sm text-muted-foreground mt-2">Confidence Score</p>
        </div>
      </div>
    </Card>
  );
};

export default ClassificationCard;
