# Information Retrieval System Setup Guide

This guide will help you set up the Information Retrieval System project, which includes a React frontend and Elasticsearch backend.

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Elasticsearch (v7.x or higher)
- Git

## Project Structure

```
Project_IR_System/
├── src/
│   ├── components/
│   │   ├── SearchBar.js
│   │   └── SearchResults.js
│   ├── App.js
│   ├── index.js
│   └── index.css
├── scripts/
│   ├── bulk_data.json
│   ├── setup_index.sh
│   └── bulk_index.sh
├── package.json
├── tailwind.config.js
└── postcss.config.js
```

## Setup Steps

### 1. Clone the Repository

```bash

cd Project_IR_System
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required dependencies including:

- React
- Axios
- Tailwind CSS
- PostCSS
- Autoprefixer

### 3. Configure Elasticsearch

1. Make sure Elasticsearch is running on your system
2. Update the Elasticsearch configuration in `elasticsearch.yml`:
   ```yaml
   http.cors.enabled: true
   http.cors.allow-origin: "*"
   http.cors.allow-methods: OPTIONS, HEAD, GET, POST, PUT, DELETE
   http.cors.allow-headers: X-Requested-With,X-Auth-Token,Content-Type,Content-Length,Authorization
   ```

### 4. Create Elasticsearch Index

Run the following command to create the index with proper mappings:



### 5. Index Sample Data

Use the bulk indexing script to load sample data:

```bash
curl -X POST "localhost:9200/dummy-index/_bulk" -H "Content-Type: application/x-ndjson" --data-binary @scripts/bulk_data.json
```

### 6. Start the Development Server

```bash
npm start
```

The application will be available at `http://localhost:3000`.

## Features

- Full-text search across documents
- Category-based filtering
- Real-time search results
- Responsive design
- Modern UI with Tailwind CSS

## Troubleshooting

### Common Issues

1. **CORS Errors**

   - Ensure Elasticsearch CORS settings are properly configured
   - Check the proxy settings in `package.json`

2. **Search Not Working**

   - Verify Elasticsearch is running
   - Check if the index exists and contains data
   - Inspect browser console for errors

3. **Styling Issues**
   - Ensure Tailwind CSS is properly configured
   - Check if PostCSS is processing CSS files correctly

### Elasticsearch Commands

- Check index status:

  ```bash
  curl.exe -X GET "localhost:9200/dummy-index/_stats"
  ```

- View index mappings:

  ```bash
  curl.exe -X GET "localhost:9200/dummy-index/_mapping"
  ```

- Delete index (if needed):
  ```bash
  curl.exe -X DELETE "localhost:9200/dummy-index"
  ```

## Development

### Available Scripts

- `npm start`: Start development server
- `npm test`: Run tests
- `npm run build`: Build for production
- `npm run eject`: Eject from Create React App

### Adding New Features

1. Create new components in `src/components/`
2. Update `App.js` to include new components
3. Add necessary API calls in the components
4. Style components using Tailwind CSS classes

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request
