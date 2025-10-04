-- Create predictions table to store ML predictions
CREATE TABLE public.predictions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  orbital_period DECIMAL,
  planet_radius DECIMAL,
  stellar_mass DECIMAL,
  stellar_radius DECIMAL,
  equilibrium_temp DECIMAL,
  transit_depth DECIMAL,
  transit_duration DECIMAL,
  insolation_flux DECIMAL,
  eccentricity DECIMAL,
  semi_major_axis DECIMAL,
  classification TEXT NOT NULL CHECK (classification IN ('Confirmed', 'Candidate', 'False Positive')),
  confidence DECIMAL NOT NULL,
  model_version TEXT DEFAULT 'v1.0',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create datasets table for uploaded training data
CREATE TABLE public.datasets (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  source TEXT CHECK (source IN ('Kepler', 'K2', 'TESS', 'Custom')),
  file_path TEXT,
  record_count INTEGER,
  uploaded_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.predictions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.datasets ENABLE ROW LEVEL SECURITY;

-- Public access policies (no auth required for this demo)
CREATE POLICY "Predictions are viewable by everyone" 
ON public.predictions 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can insert predictions" 
ON public.predictions 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Datasets are viewable by everyone" 
ON public.datasets 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can insert datasets" 
ON public.datasets 
FOR INSERT 
WITH CHECK (true);

-- Create indexes for better query performance
CREATE INDEX idx_predictions_classification ON public.predictions(classification);
CREATE INDEX idx_predictions_created_at ON public.predictions(created_at DESC);
CREATE INDEX idx_datasets_source ON public.datasets(source);