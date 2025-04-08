#!/bin/bash

# Create the index with proper mapping
curl -X PUT "http://localhost:9200/dummy-index" -H "Content-Type: application/json" -d'
{
  "mappings": {
    "properties": {
      "title": {
        "type": "text",
        "analyzer": "standard"
      },
      "content": {
        "type": "text",
        "analyzer": "standard"
      },
      "author": {
        "type": "keyword"
      },
      "published_date": {
        "type": "date"
      },
      "category": {
        "type": "keyword"
      }
    }
  }
}'

# Check if the index was created successfully
curl -X GET "http://localhost:9200/dummy-index?pretty" 