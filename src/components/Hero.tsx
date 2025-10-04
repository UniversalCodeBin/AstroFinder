import { Telescope, Sparkles, Database } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative overflow-hidden py-24 px-6">
      <div className="absolute inset-0 bg-gradient-nebula" />
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center space-y-8 animate-float">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Powered by NASA Astronomical Data</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-cosmic bg-clip-text text-transparent leading-tight">
            Exoplanet Detection
            <br />
            Platform
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Advanced machine learning pipeline for identifying and classifying potential exoplanets 
            using data from Kepler, K2, and TESS missions
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 max-w-4xl mx-auto">
            <div className="p-6 rounded-xl border border-border bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all cosmic-glow">
              <Telescope className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-semibold text-lg mb-2">Multi-Mission Data</h3>
              <p className="text-sm text-muted-foreground">
                Integrated datasets from Kepler, K2, and TESS astronomical surveys
              </p>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all cosmic-glow">
              <Database className="w-8 h-8 text-secondary mb-3" />
              <h3 className="font-semibold text-lg mb-2">ML Classification</h3>
              <p className="text-sm text-muted-foreground">
                Ensemble models with Random Forest, XGBoost, and Neural Networks
              </p>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all cosmic-glow">
              <Sparkles className="w-8 h-8 text-accent mb-3" />
              <h3 className="font-semibold text-lg mb-2">Explainable AI</h3>
              <p className="text-sm text-muted-foreground">
                SHAP values and feature attribution for transparent predictions
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
