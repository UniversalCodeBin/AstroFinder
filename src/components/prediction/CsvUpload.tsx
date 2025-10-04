import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, FileText, Loader2 } from "lucide-react";
import { PredictionResult } from "@/pages/Index";
import { toast } from "sonner";

interface CsvUploadProps {
  onPredictionComplete: (result: PredictionResult) => void;
}

const CsvUpload = ({ onPredictionComplete }: CsvUploadProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.csv')) {
      toast.error("Invalid file type", {
        description: "Please upload a CSV file"
      });
      return;
    }

    setFileName(file.name);
    setIsLoading(true);

    try {
      // Parse CSV file
      const text = await file.text();
      const lines = text.split('\n').filter(line => line.trim());
      
      if (lines.length < 2) {
        throw new Error("CSV file is empty or invalid");
      }

      // Parse first data row (skip header)
      const headers = lines[0].toLowerCase().split(',');
      const firstRow = lines[1].split(',');
      
      const data: any = {};
      headers.forEach((header, index) => {
        const cleanHeader = header.trim();
        const value = parseFloat(firstRow[index]);
        
        if (cleanHeader.includes('orbital') && cleanHeader.includes('period')) {
          data.orbitalPeriod = value;
        } else if (cleanHeader.includes('planet') && cleanHeader.includes('radius')) {
          data.planetRadius = value;
        } else if (cleanHeader.includes('stellar') && cleanHeader.includes('mass')) {
          data.stellarMass = value;
        } else if (cleanHeader.includes('stellar') && cleanHeader.includes('radius')) {
          data.stellarRadius = value;
        } else if (cleanHeader.includes('equilibrium') || cleanHeader.includes('temp')) {
          data.equilibriumTemp = value;
        }
      });

      // Call ML prediction API
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const response = await fetch(`${supabaseUrl}/functions/v1/ml-predict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ parameters: data }),
      });

      if (!response.ok) {
        throw new Error("Prediction failed");
      }

      const result = await response.json();
      
      onPredictionComplete({
        classification: result.classification,
        confidence: result.confidence,
        featureImportance: result.featureImportance,
        shapValues: result.shapValues,
      });

      toast.success("CSV prediction complete!", {
        description: `Processed first entry: ${result.classification} (${(result.confidence * 100).toFixed(1)}% confidence)`
      });

      setTimeout(() => {
        document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    } catch (error) {
      console.error("CSV processing error:", error);
      toast.error("Processing failed", {
        description: error instanceof Error ? error.message : "Please check your CSV format"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-8 border-border bg-card/50 backdrop-blur-sm">
      <div className="space-y-6">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 border border-primary/20">
            <FileText className="w-10 h-10 text-primary" />
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2">Upload CSV File</h3>
            <p className="text-sm text-muted-foreground">
              CSV should contain: orbital_period, planet_radius, stellar_mass, stellar_radius, equilibrium_temp
            </p>
          </div>

          {fileName && (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 border border-primary/30">
              <FileText className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">{fileName}</span>
            </div>
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          onChange={handleFileSelect}
          className="hidden"
        />

        <Button
          onClick={() => fileInputRef.current?.click()}
          className="w-full cosmic-glow bg-gradient-cosmic hover:opacity-90"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing CSV...
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Select CSV File
            </>
          )}
        </Button>

        <div className="text-xs text-muted-foreground space-y-1">
          <p>• Maximum file size: 20MB</p>
          <p>• Batch processing available for multiple entries</p>
          <p>• Results will show first entry with downloadable full report</p>
        </div>
      </div>
    </Card>
  );
};

export default CsvUpload;
