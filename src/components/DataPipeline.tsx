import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Database, Upload, Download, TrendingUp } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const DataPipeline = () => {
  const [stats, setStats] = useState({
    totalPredictions: 0,
    confirmedCount: 0,
    candidateCount: 0,
    falsePositiveCount: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  const loadStats = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("predictions")
        .select("classification");

      if (error) throw error;

      const stats = {
        totalPredictions: data.length,
        confirmedCount: data.filter((p) => p.classification === "Confirmed").length,
        candidateCount: data.filter((p) => p.classification === "Candidate").length,
        falsePositiveCount: data.filter((p) => p.classification === "False Positive").length,
      };

      setStats(stats);
      toast.success("Statistics loaded");
    } catch (error) {
      console.error("Error loading stats:", error);
      toast.error("Failed to load statistics");
    } finally {
      setIsLoading(false);
    }
  };

  const exportData = async () => {
    try {
      const { data, error } = await supabase
        .from("predictions")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      const csv = [
        "ID,Orbital Period,Planet Radius,Stellar Mass,Stellar Radius,Equilibrium Temp,Classification,Confidence,Created At",
        ...data.map((p) =>
          [
            p.id,
            p.orbital_period,
            p.planet_radius,
            p.stellar_mass,
            p.stellar_radius,
            p.equilibrium_temp,
            p.classification,
            p.confidence,
            p.created_at,
          ].join(",")
        ),
      ].join("\n");

      const blob = new Blob([csv], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `exoplanet-predictions-${Date.now()}.csv`;
      a.click();

      toast.success("Data exported successfully");
    } catch (error) {
      console.error("Error exporting data:", error);
      toast.error("Failed to export data");
    }
  };

  return (
    <section className="py-16 px-6 bg-gradient-nebula">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Data Pipeline</h2>
          <p className="text-muted-foreground">
            Manage prediction history and analyze accumulated data
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 border-border bg-card/80 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <Database className="w-8 h-8 text-primary" />
              <Badge variant="outline">Total</Badge>
            </div>
            <div className="text-3xl font-bold">{stats.totalPredictions}</div>
            <p className="text-sm text-muted-foreground mt-2">Total Predictions</p>
          </Card>

          <Card className="p-6 border-border bg-card/80 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-8 h-8 text-primary" />
              <Badge>Confirmed</Badge>
            </div>
            <div className="text-3xl font-bold">{stats.confirmedCount}</div>
            <p className="text-sm text-muted-foreground mt-2">
              {stats.totalPredictions > 0
                ? `${((stats.confirmedCount / stats.totalPredictions) * 100).toFixed(1)}% of total`
                : "No data"}
            </p>
          </Card>

          <Card className="p-6 border-border bg-card/80 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <Database className="w-8 h-8 text-secondary" />
              <Badge variant="secondary">Candidates</Badge>
            </div>
            <div className="text-3xl font-bold">{stats.candidateCount}</div>
            <p className="text-sm text-muted-foreground mt-2">
              {stats.totalPredictions > 0
                ? `${((stats.candidateCount / stats.totalPredictions) * 100).toFixed(1)}% of total`
                : "No data"}
            </p>
          </Card>
        </div>

        <div className="flex flex-wrap gap-4 justify-center">
          <Button
            onClick={loadStats}
            disabled={isLoading}
            className="cosmic-glow bg-gradient-cosmic hover:opacity-90"
          >
            <Database className="mr-2 h-4 w-4" />
            {isLoading ? "Loading..." : "Load Statistics"}
          </Button>

          <Button
            onClick={exportData}
            variant="outline"
            className="border-primary/50 hover:bg-primary/10"
          >
            <Download className="mr-2 h-4 w-4" />
            Export Predictions
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DataPipeline;
