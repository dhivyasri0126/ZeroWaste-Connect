# ZeroWaste Connect - Frontend

React frontend for ZeroWaste Connect platform. Built with Create React App, React Router, and Tailwind CSS.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

## Environment Variables

Create a `.env` file in the root directory (see `.env.example` for reference):

```env
REACT_APP_API_BASE_URL=http://localhost:8081
```

- `REACT_APP_API_BASE_URL`: The base URL for the backend API. Defaults to `http://localhost:8081` if not set.

## Vercel Deployment

This frontend is configured for deployment on Vercel.

### Vercel Configuration

- **Framework Preset**: Create React App
- **Build Command**: `npm run build`
- **Output Directory**: `build`
- **Install Command**: `npm install`
- **Required Environment Variables**: `REACT_APP_API_BASE_URL`

### Deployment Steps

1. **Push your code to a Git repository** (GitHub, GitLab, or Bitbucket)

2. **Import your project in Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your repository

3. **Configure Project Settings**:
   - **Framework Preset**: Create React App (auto-detected)
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
   - **Install Command**: `npm install`

4. **Add Environment Variables**:
   - Go to Settings > Environment Variables
   - Add `REACT_APP_API_BASE_URL` with your production backend URL
   - Example: `https://your-backend-api.com`

5. **Deploy**:
   - Click "Deploy"
   - Vercel will automatically build and deploy your application

### Client-Side Routing

The `vercel.json` configuration ensures React Router works correctly on page refresh by redirecting all routes to `index.html`.

### Static Asset Caching

Static assets in `/static/` are cached with a 1-year cache-control header for optimal performance.

## Local Development

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file with your API configuration:
```bash
cp .env.example .env
```

3. Start the development server:
```bash
npm start
```

## Learn More

- [Create React App Documentation](https://facebook.github.io/create-react-app/docs/getting-started)
- [React Documentation](https://reactjs.org/)
- [React Router Documentation](https://reactrouter.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
