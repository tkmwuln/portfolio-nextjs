#!/bin/bash

# Configuration
DIAGRAMS_DIR="docs/diagrams"
OUTPUT_DIR="docs/output"
PLANTUML_VERSION="1.2024.3" # Latest as of now

# Create output directory
mkdir -p "$OUTPUT_DIR"

echo "🎨 Generating Sequence Diagrams..."

# Function to run PlantUML
run_plantuml() {
    local input_file=$1
    
    # Try local plantuml command
    if command -v plantuml &> /dev/null; then
        echo "Using local plantuml command..."
        plantuml -tpng "$input_file" -o "output"
        return $?
    fi

    # Try npx (might require internet)
    if command -v npx &> /dev/null; then
        echo "Using npx -y plantuml..."
        npx -y plantuml "$input_file" -o "$(pwd)/$OUTPUT_DIR"
        return $?
    fi

    # Try downloading JAR if nothing else works
    if [ ! -f "scripts/plantuml.jar" ]; then
        echo "Downloading plantuml.jar..."
        curl -L "https://github.com/plantuml/plantuml/releases/download/v${PLANTUML_VERSION}/plantuml-${PLANTUML_VERSION}.jar" -o scripts/plantuml.jar
    fi

    if [ -f "scripts/plantuml.jar" ]; then
        echo "Using scripts/plantuml.jar..."
        java -jar scripts/plantuml.jar -tpng "$input_file" -o "$(pwd)/$OUTPUT_DIR"
        return $?
    fi

    echo "❌ Error: Could not find plantuml in PATH, npx, or locally as JAR."
    return 1
}

# Find all .puml files and generate diagrams
for puml_file in "$DIAGRAMS_DIR"/*.puml; do
    if [ -f "$puml_file" ]; then
        echo "Processing $puml_file..."
        run_plantuml "$puml_file"
    fi
done

echo "✅ Done! Diagrams are in $OUTPUT_DIR"
