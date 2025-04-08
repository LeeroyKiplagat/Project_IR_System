# Information Retrieval System Implementation Guide

## Table of Contents

1. [System Architecture](#system-architecture)
2. [Prerequisites](#prerequisites)
3. [Installation Steps](#installation-steps)
4. [Data Generation](#data-generation)
5. [Elasticsearch Operations](#elasticsearch-operations)
6. [Troubleshooting](#troubleshooting)

## System Architecture

The Information Retrieval (IR) system is built using:

- Docker for containerization
- Elasticsearch 7.10.1 for search and analytics
- Python 3 for data generation
- Faker library for realistic dummy data
- React
- Node.js (v14 or higher)
- npm (v6 or higher)

## Prerequisites

Before starting, ensure you have:

- Docker Desktop installed
- Python 3.x installed
- PowerShell or Command Prompt access
- Basic understanding of REST APIs

## Installation Steps

### 1. Docker Setup

```powershell
# Pull Elasticsearch image
docker pull docker.elastic.co/elasticsearch/elasticsearch:7.10.1

# Run Elasticsearch container
docker run -d --name elasticsearch -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" docker.elastic.co/elasticsearch/elasticsearch:7.10.1

or compose up docker-compose.yml file

# Verify Elasticsearch is running
curl.exe -X GET "http://localhost:9200"
```

### 2. Python Environment Setup

```powershell
# Install required Python packages
python -m pip install faker
```

## Data Generation

### 1. Generate Dummy Data

```powershell
# Navigate to scripts directory
cd scripts

# Run the data generation script
python generate_dummy_data.py
```

## Elasticsearch Operations

### 1. Bulk Indexing

```powershell
# Index data into Elasticsearch
curl.exe -X POST "http://localhost:9200/_bulk" -H "Content-Type: application/json" --data-binary @scripts/bulk_data.json
```

```bash
curl -X PUT "localhost:9200/dummy-index" -H "Content-Type: application/json" -d'
{
  "mappings": {
    "properties": {
      "title": { "type": "text" },
      "content": { "type": "text" },
      "category": { "type": "keyword" },
      "author": { "type": "keyword" },
      "published_date": { "type": "date" }
    }
  }
}'
```

### 2. Query Operations

```powershell
# List all indices
curl.exe -X GET "http://localhost:9200/_cat/indices?v"

# Basic search query
curl.exe -X GET "http://localhost:9200/dummy-index/_search?pretty"

# Advanced search query (filter by category)
curl.exe -X GET "http://localhost:9200/dummy-index/_search" -H "Content-Type: application/json" -d '{
  "query": {
    "match": {
      "category": "IT"
    }
  }
}'
```

http://localhost:9200/dummy-index/\_search?q=category:IT&pretty

### 3. Install Dependencies

```bash
npm install
```

This will install all required dependencies including:

- React
- Axios
- Tailwind CSS
- PostCSS
- Autoprefixer

### 4. Start the Development Server

```bash
npm start
```

## Troubleshooting

### Common Issues and Solutions

1. **Elasticsearch Container Not Starting**

   - Check if port 9200 is already in use
   - Verify Docker is running
   - Check container logs: `docker logs elasticsearch`

2. **Index Not Found Error**

   - Verify bulk data format
   - Check if indexing was successful
   - Use `curl.exe -X GET "http://localhost:9200/_cat/indices?v"` to list indices

3. **PowerShell curl Alias Issues**

   - Use `curl.exe` instead of `curl`
   - Add `-UseBasicParsing` flag if needed

4. **Data Generation Issues**
   - Ensure Python and Faker are installed correctly
   - Check file permissions in scripts directory
   - Verify JSON format of generated data

### Docker Compose Alternative

For easier container management, use the provided docker-compose.yml:

```powershell
# Start services
docker-compose up -d

# Stop services
docker-compose down



```

## Additional Resources

- [Elasticsearch Documentation](https://www.elastic.co/guide/index.html)
- [Docker Documentation](https://docs.docker.com/)
- [Faker Library Documentation](https://faker.readthedocs.io/)
