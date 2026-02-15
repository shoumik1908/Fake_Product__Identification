# Use official Python runtime as a parent image
FROM python:3.9-slim

# Create a non-root user
RUN useradd -m -u 1000 user

# Set the working directory in the container
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements file first (for better caching)
COPY --chown=user requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy all files with correct ownership
COPY --chown=user . .

# Create uploads directory explicitly with permissions
RUN mkdir -p uploads && chown -R user:user uploads

# Switch to the non-root user
USER user

# Set environment variables
ENV HOME=/home/user \
    PATH=/home/user/.local/bin:$PATH

# Expose the port that the application listens on
EXPOSE 7860

# Command to run the application
CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "7860"]
