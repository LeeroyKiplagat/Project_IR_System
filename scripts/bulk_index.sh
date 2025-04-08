#!/bin/bash

# Perform bulk indexing
curl -X POST "http://localhost:9200/_bulk" -H "Content-Type: application/json" --data-binary @bulk_data.json

# Check if the data was indexed successfully
curl -X GET "http://localhost:9200/dummy-index/_count?pretty" 