#!/bin/bash

# Setup script for optimizing Kandinsky on Mac M1/M2 chips
echo "Setting up optimized environment for Kandinsky on Apple Silicon..."

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
  echo "Creating virtual environment..."
  python3 -m venv venv
fi

# Activate virtual environment
source venv/bin/activate

# Uninstall existing torch
echo "Uninstalling existing PyTorch..."
pip uninstall torch torchvision torchaudio -y

# Install optimized PyTorch for Mac
echo "Installing optimized PyTorch for Apple Silicon..."
pip install torch torchvision torchaudio --extra-index-url https://download.pytorch.org/whl/nightly/cpu

# Install other dependencies with upgraded versions
echo "Installing dependencies..."
pip install accelerate transformers diffusers safetensors --upgrade

# Install other requirements
pip install -r requirements.txt

echo "Installation completed. Please restart the service to apply changes."
echo "Use 'uvicorn main:app --reload' to start the service." 