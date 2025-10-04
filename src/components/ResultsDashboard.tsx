import { PredictionResult } from "@/pages/Index";
import ClassificationCard from "./results/ClassificationCard";
import FeatureImportanceChart from "./results/FeatureImportanceChart";
import ShapValuesChart from "./results/ShapValuesChart";

interface ResultsDashboardProps {
  result: PredictionResult;
}

const ResultsDashboard = ({ result }: ResultsDashboardProps) => {
  return (
    <section id="results" className="py-16 px-6 bg-gradient-nebula">
      <div className="container mx-auto max-w-6xl space-y-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Prediction Results
          </h2>
          <p className="text-muted-foreground">
            Detailed analysis with explainable AI insights
          </p>
        </div>

        <ClassificationCard result={result} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <FeatureImportanceChart data={result.featureImportance} />
          <ShapValuesChart data={result.shapValues} />
        </div>
      </div>
    </section>
  );
};

export default ResultsDashboard;
