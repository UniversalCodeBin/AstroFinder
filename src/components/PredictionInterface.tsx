import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ManualInput from "./prediction/ManualInput";
import CsvUpload from "./prediction/CsvUpload";
import { PredictionResult } from "@/pages/Index";

interface PredictionInterfaceProps {
  onPredictionComplete: (result: PredictionResult) => void;
}

const PredictionInterface = ({ onPredictionComplete }: PredictionInterfaceProps) => {
  return (
    <section className="py-16 px-6">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Run Prediction
          </h2>
          <p className="text-muted-foreground">
            Input astronomical parameters manually or upload a CSV file for batch predictions
          </p>
        </div>

        <Tabs defaultValue="manual" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="manual">Manual Input</TabsTrigger>
            <TabsTrigger value="csv">CSV Upload</TabsTrigger>
          </TabsList>

          <TabsContent value="manual">
            <ManualInput onPredictionComplete={onPredictionComplete} />
          </TabsContent>

          <TabsContent value="csv">
            <CsvUpload onPredictionComplete={onPredictionComplete} />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default PredictionInterface;
