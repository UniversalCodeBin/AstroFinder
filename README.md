🌌 A World Away: Hunting for Exoplanets

🚀 Overview

This project focuses on automating the identification and classification of exoplanets using data from Kepler, K2, and TESS missions. It analyzes planetary and stellar parameters to determine whether an observed object is a Confirmed Exoplanet, Candidate, or False Positive.

🧠 Objective

To create a reliable system that:

Learns from NASA’s open exoplanet datasets.

Classifies new observations into scientific categories.

Explains how each physical parameter affects the final classification.

Provides a simple, interactive interface for exploration.

🪐 Key Features

Data-Driven Classification: Uses real mission data for identifying exoplanetary status.

Parameter Interpretation: Shows how orbital period, radius, mass, and other factors influence results.

Interactive Interface: Input values, upload datasets, and view classification results instantly.

Transparency: Displays detailed reasoning behind each classification.

🧩 Data Sources

Kepler KOI Table

Kepler False Positives Table

TESS Candidates Table

K2 Planets and Candidates Table

Planetary Systems Table
(All publicly available via NASA’s Exoplanet Archive)

⚙️ Tech Stack

Component	Technology Used
Programming Language	Python
Data Processing	Pandas, NumPy
Modeling & Analysis	Scikit-learn
Visualization	Plotly, Matplotlib
Interface	Streamlit / Gradio

🧪 Workflow

Input planetary data such as orbital period, radius, and temperature.

The system compares it with trained mission data.

Classification is displayed as Confirmed, Candidate, or False Positive.

Each output includes a breakdown of how key parameters influenced the decision.

🌍 Impact

This project streamlines the process of identifying potential exoplanets, helping researchers and students explore planetary data efficiently while maintaining scientific accuracy and clarity.

🏁 Future Work

Extend analysis to include light-curve data.

Add live visual dashboards for continuous exploration.

Enable dataset updates from new missions.
