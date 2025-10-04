import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

interface ShapValue {
  feature: string;
  value: number;
}

interface ShapValuesChartProps {
  data: ShapValue[];
}

const ShapValuesChart = ({ data }: ShapValuesChartProps) => {
  const maxAbsValue = Math.max(...data.map(d => Math.abs(d.value)));

  return (
    <Card className="p-6 border-border bg-card/80 backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="w-5 h-5 text-secondary" />
        <h3 className="text-xl font-semibold">SHAP Values</h3>
      </div>

      <div className="space-y-4">
        {data.map((item, index) => {
          const isPositive = item.value > 0;
          const percentage = (Math.abs(item.value) / maxAbsValue) * 100;

          return (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{item.feature}</span>
                <div className="flex items-center gap-1">
                  {isPositive ? (
                    <TrendingUp className="w-3 h-3 text-primary" />
                  ) : (
                    <TrendingDown className="w-3 h-3 text-destructive" />
                  )}
                  <span className={isPositive ? "text-primary" : "text-destructive"}>
                    {item.value > 0 ? "+" : ""}{item.value.toFixed(3)}
                  </span>
                </div>
              </div>

              <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className={`absolute h-full transition-all duration-1000 ease-out ${
                    isPositive 
                      ? "bg-primary left-1/2" 
                      : "bg-destructive right-1/2"
                  }`}
                  style={{ width: `${percentage / 2}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-xs text-muted-foreground mt-6">
        SHAP values explain how each feature influenced the prediction. Positive values push toward positive classification, negative values toward negative.
      </p>
    </Card>
  );
};

export default ShapValuesChart;
