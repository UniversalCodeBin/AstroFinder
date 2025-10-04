import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Loader2, Rocket } from "lucide-react";
import { PredictionResult } from "@/pages/Index";
import { toast } from "sonner";

interface FormData {
  orbitalPeriod: number;
  planetRadius: number;
  stellarMass: number;
  stellarRadius: number;
  equilibriumTemp: number;
  transitDepth?: number;
  transitDuration?: number;
  insolationFlux?: number;
  eccentricity?: number;
  semiMajorAxis?: number;
}

interface ManualInputProps {
  onPredictionComplete: (result: PredictionResult) => void;
}

const ManualInput = ({ onPredictionComplete }: ManualInputProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const callMLPrediction = async (data: FormData): Promise<PredictionResult> => {
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
    return {
      classification: result.classification,
      confidence: result.confidence,
      featureImportance: result.featureImportance,
      shapValues: result.shapValues,
    };
  };

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    
    try {
      const result = await callMLPrediction(data);
      onPredictionComplete(result);
      
      toast.success("AI Prediction complete!", {
        description: `Classification: ${result.classification} (${(result.confidence * 100).toFixed(1)}% confidence)`
      });

      // Scroll to results
      setTimeout(() => {
        document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    } catch (error) {
      toast.error("Prediction failed", {
        description: "Please check your inputs and try again"
      });
      console.error("Prediction error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-8 border-border bg-card/50 backdrop-blur-sm">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="orbitalPeriod">Orbital Period (days)</Label>
            <Input
              id="orbitalPeriod"
              type="number"
              step="0.001"
              placeholder="e.g., 365.25"
              {...register("orbitalPeriod", { required: true, min: 0 })}
              className="bg-background/50"
            />
            {errors.orbitalPeriod && (
              <p className="text-xs text-destructive">Valid orbital period required</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="planetRadius">Planet Radius (Earth radii)</Label>
            <Input
              id="planetRadius"
              type="number"
              step="0.01"
              placeholder="e.g., 1.0"
              {...register("planetRadius", { required: true, min: 0 })}
              className="bg-background/50"
            />
            {errors.planetRadius && (
              <p className="text-xs text-destructive">Valid planet radius required</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="stellarMass">Stellar Mass (Solar masses)</Label>
            <Input
              id="stellarMass"
              type="number"
              step="0.01"
              placeholder="e.g., 1.0"
              {...register("stellarMass", { required: true, min: 0 })}
              className="bg-background/50"
            />
            {errors.stellarMass && (
              <p className="text-xs text-destructive">Valid stellar mass required</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="stellarRadius">Stellar Radius (Solar radii)</Label>
            <Input
              id="stellarRadius"
              type="number"
              step="0.01"
              placeholder="e.g., 1.0"
              {...register("stellarRadius", { required: true, min: 0 })}
              className="bg-background/50"
            />
            {errors.stellarRadius && (
              <p className="text-xs text-destructive">Valid stellar radius required</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="equilibriumTemp">Equilibrium Temperature (K)</Label>
            <Input
              id="equilibriumTemp"
              type="number"
              step="0.1"
              placeholder="e.g., 288"
              {...register("equilibriumTemp", { required: true, min: 0 })}
              className="bg-background/50"
            />
            {errors.equilibriumTemp && (
              <p className="text-xs text-destructive">Valid temperature required</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="transitDepth">Transit Depth (ppm) - Optional</Label>
            <Input
              id="transitDepth"
              type="number"
              step="0.1"
              placeholder="e.g., 1000"
              {...register("transitDepth", { min: 0 })}
              className="bg-background/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="transitDuration">Transit Duration (hours) - Optional</Label>
            <Input
              id="transitDuration"
              type="number"
              step="0.01"
              placeholder="e.g., 3.5"
              {...register("transitDuration", { min: 0 })}
              className="bg-background/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="insolationFlux">Insolation Flux (Earth flux) - Optional</Label>
            <Input
              id="insolationFlux"
              type="number"
              step="0.01"
              placeholder="e.g., 1.0"
              {...register("insolationFlux", { min: 0 })}
              className="bg-background/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="eccentricity">Eccentricity - Optional</Label>
            <Input
              id="eccentricity"
              type="number"
              step="0.001"
              placeholder="e.g., 0.017"
              {...register("eccentricity", { min: 0, max: 1 })}
              className="bg-background/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="semiMajorAxis">Semi-major Axis (AU) - Optional</Label>
            <Input
              id="semiMajorAxis"
              type="number"
              step="0.001"
              placeholder="e.g., 1.0"
              {...register("semiMajorAxis", { min: 0 })}
              className="bg-background/50"
            />
          </div>
        </div>

        <Button 
          type="submit" 
          className="w-full cosmic-glow bg-gradient-cosmic hover:opacity-90"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Rocket className="mr-2 h-4 w-4" />
              Run Prediction
            </>
          )}
        </Button>
      </form>
    </Card>
  );
};

export default ManualInput;
