import { useState } from "react";
import Hero from "@/components/Hero";
import PredictionInterface from "@/components/PredictionInterface";
import ResultsDashboard from "@/components/ResultsDashboard";
import DataPipeline from "@/components/DataPipeline";

export interface PredictionResult {
  classification: "Confirmed" | "Candidate" | "False Positive";
  confidence: number;
  featureImportance: { feature: string; importance: number }[];
  shapValues: { feature: string; value: number }[];
}

const Index = () => {
  const [predictionResult, setPredictionResult] = useState<PredictionResult | null>(null);

  return (
    <div className="min-h-screen">
      <Hero />
      <PredictionInterface onPredictionComplete={setPredictionResult} />
      {predictionResult && <ResultsDashboard result={predictionResult} />}
      <DataPipeline />
    </div>
  );
};

export default Index;
