import { Card } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";

interface FeatureImportance {
  feature: string;
  importance: number;
}

interface FeatureImportanceChartProps {
  data: FeatureImportance[];
}

const FeatureImportanceChart = ({ data }: FeatureImportanceChartProps) => {
  const maxImportance = Math.max(...data.map(d => d.importance));

  return (
    <Card className="p-6 border-border bg-card/80 backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-6">
        <BarChart3 className="w-5 h-5 text-primary" />
        <h3 className="text-xl font-semibold">Feature Importance</h3>
      </div>

      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">{item.feature}</span>
              <span className="text-muted-foreground">{(item.importance * 100).toFixed(1)}%</span>
            </div>
            
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-cosmic rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${(item.importance / maxImportance) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-muted-foreground mt-6">
        Shows relative importance of each feature in the classification decision
      </p>
    </Card>
  );
};

export default FeatureImportanceChart;
