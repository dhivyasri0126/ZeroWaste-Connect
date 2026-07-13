# ZeroWaste Connect - Production Deployment Guide

## Overview
This guide provides step-by-step instructions for deploying the ZeroWaste Connect application to Render using Docker.

## Architecture
- **Frontend**: React application served via Nginx
- **Backend**: Spring Boot REST API
- **Database**: PostgreSQL (Render managed)
- **Deployment Platform**: Render

## Prerequisites
- Render account (free tier available)
- Git repository with the project code
- Docker installed locally (for testing)
- PostgreSQL database credentials

---

## Step 1: Database Setup (Render)

### 1.1 Create PostgreSQL Database
1. Log in to Render dashboard
2. Click **New** → **PostgreSQL**
3. Configure:
   - **Name**: `zerowaste-db` (or your preferred name)
   - **Database**: `zerowaste_connect`
   - **User**: Auto-generated
   - **Region**: Choose closest to your users
4. Click **Create Database**

### 1.2 Save Database Credentials
After creation, save these credentials:
- **Database URL**: `postgresql://username:password@host:port/database`
- **Internal Database URL**: `postgresql://username:password@host:port/database`
- **Username**: (from Render)
- **Password**: (from Render)
- **Host**: (from Render)
- **Port**: 5432

---

## Step 2: Backend Deployment (Render)

### 2.1 Create Web Service
1. In Render dashboard, click **New** → **Web Service**
2. Connect your Git repository
3. Configure settings:

**Build & Deploy:**
- **Root Directory**: `zerowaste`
- **Runtime**: Docker
- **Dockerfile Path**: `./Dockerfile`
- **Context**: `./`

**Environment Variables:**
```
PORT=8081
DATABASE_URL=postgresql://username:password@host:port/database
DATABASE_USERNAME=your_db_username
DATABASE_PASSWORD=your_db_password
LOG_LEVEL_SECURITY=INFO
SHOW_SQL=false
ALLOWED_ORIGINS=https://your-frontend-url.onrender.com
JWT_SECRET=your_strong_random_secret_here
JWT_EXPIRATION=86400000
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password
```

**Important Notes:**
- Replace `DATABASE_URL` with your Render PostgreSQL Internal Database URL
- Replace `ALLOWED_ORIGINS` with your frontend URL after deployment
- Generate a strong `JWT_SECRET` (use: `openssl rand -base64 32`)
- For Gmail, use an App Password (not your regular password)

### 2.2 Deploy
Click **Create Web Service**. Render will build and deploy your backend.

### 2.3 Verify Deployment
- Check the deployment logs for errors
- Test the health endpoint: `https://your-backend-url.onrender.com/auth/testmail`

---

## Step 3: Frontend Deployment (Render)

### 3.1 Create Web Service
1. In Render dashboard, click **New** → **Web Service**
2. Connect your Git repository
3. Configure settings:

**Build & Deploy:**
- **Root Directory**: `frontend`
- **Runtime**: Docker
- **Dockerfile Path**: `./Dockerfile`
- **Context**: `./`

**Environment Variables:**
```
REACT_APP_API_BASE_URL=https://your-backend-url.onrender.com
```

**Important Notes:**
- Replace `REACT_APP_API_BASE_URL` with your backend URL from Step 2
- The frontend will use this URL for all API calls

### 3.2 Deploy
Click **Create Web Service**. Render will build and deploy your frontend.

### 3.3 Verify Deployment
- Check the deployment logs for errors
- Visit your frontend URL and test the application
- Check browser console for any errors

---

## Step 4: Post-Deployment Verification

### 4.1 Backend Health Checks
```bash
# Test health endpoint
curl https://your-backend-url.onrender.com/auth/testmail

# Test CORS (should return 401 for protected endpoints)
curl -H "Origin: https://your-frontend-url.onrender.com" \
     https://your-backend-url.onrender.com/donation/all
```

### 4.2 Frontend Functionality
1. Open your frontend URL in a browser
2. Test user registration
3. Test user login
4. Test donation creation
5. Test donation request
6. Check browser console for errors (F12)

### 4.3 CORS Verification
- Ensure frontend can successfully call backend APIs
- Check Network tab in browser dev tools
- Verify no CORS errors in console

---

## Environment Variables Reference

### Frontend (.env)
| Variable | Description | Example | Required |
|----------|-------------|---------|----------|
| `REACT_APP_API_BASE_URL` | Backend API URL | `https://api.onrender.com` | Yes |

### Backend (application.properties)
| Variable | Description | Example | Required |
|----------|-------------|---------|----------|
| `PORT` | Server port | `8081` | No (default: 8081) |
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@host:5432/db` | Yes |
| `DATABASE_USERNAME` | Database username | `postgres` | Yes |
| `DATABASE_PASSWORD` | Database password | `password` | Yes |
| `ALLOWED_ORIGINS` | Comma-separated CORS origins | `https://app.onrender.com` | Yes |
| `JWT_SECRET` | JWT signing secret | `random-secret-key` | Yes |
| `JWT_EXPIRATION` | Token expiration in ms | `86400000` | No (default: 24h) |
| `LOG_LEVEL_SECURITY` | Security logging level | `INFO` | No |
| `SHOW_SQL` | Show SQL queries | `false` | No |
| `MAIL_HOST` | SMTP server host | `smtp.gmail.com` | Yes |
| `MAIL_PORT` | SMTP server port | `587` | Yes |
| `MAIL_USERNAME` | SMTP username | `email@gmail.com` | Yes |
| `MAIL_PASSWORD` | SMTP password | `app-password` | Yes |

---

## Docker Commands (Local Testing)

### Build Images
```bash
# Frontend
cd frontend
docker build -t zerowaste-frontend:latest .

# Backend
cd zerowaste
docker build -t zerowaste-backend:latest .
```

### Run Containers Locally
```bash
# Backend with environment variables
docker run -d \
  -p 8081:8081 \
  -e DATABASE_URL="jdbc:postgresql://localhost:5432/zerowaste_connect" \
  -e DATABASE_USERNAME="postgres" \
  -e DATABASE_PASSWORD="password" \
  -e ALLOWED_ORIGINS="http://localhost:3000" \
  -e JWT_SECRET="your-secret" \
  zerowaste-backend:latest

# Frontend with environment variable
docker run -d \
  -p 3000:80 \
  -e REACT_APP_API_BASE_URL="http://localhost:8081" \
  zerowaste-frontend:latest
```

### Test Container Health
```bash
# Check container logs
docker logs <container-id>

# Check container status
docker ps

# Execute shell in container
docker exec -it <container-id> sh
```

---

## Rollback Plan

### Automatic Rollback
Render automatically keeps previous deployments. To rollback:
1. Go to your web service in Render dashboard
2. Click **Deployments** tab
3. Find the previous successful deployment
4. Click **Rollback** → **Confirm**

### Manual Rollback
If automatic rollback fails:
1. Revert changes in Git to the working commit
2. Push to your repository
3. Render will automatically redeploy the previous version

### Database Rollback
- Render PostgreSQL does not support automatic rollback
- Use database migrations for schema changes
- Keep backups of critical data

---

## Troubleshooting

### Common Issues

#### 1. CORS Errors
**Symptom**: Browser console shows CORS policy errors
**Solution**:
- Verify `ALLOWED_ORIGINS` includes your frontend URL
- Check SecurityConfig has `setAllowCredentials(true)`
- Ensure no wildcard origins with credentials

#### 2. Database Connection Failed
**Symptom**: Backend logs show database connection errors
**Solution**:
- Verify `DATABASE_URL` is correct
- Check Render PostgreSQL is running
- Ensure database credentials are correct
- Check network connectivity

#### 3. JWT Token Invalid
**Symptom**: 401 Unauthorized on protected endpoints
**Solution**:
- Ensure `JWT_SECRET` matches between deployments
- Check token expiration time
- Verify token is being sent in Authorization header

#### 4. Frontend Cannot Reach Backend
**Symptom**: Network errors in browser console
**Solution**:
- Verify `REACT_APP_API_BASE_URL` is correct
- Check backend is running and accessible
- Test backend URL directly in browser
- Check Render service status

#### 5. Build Failed
**Symptom**: Render deployment fails during build
**Solution**:
- Check build logs for specific error
- Ensure Dockerfile is correct
- Verify all dependencies are in package.json/pom.xml
- Test build locally with Docker

---

## Security Best Practices

1. **Never commit secrets**: Use environment variables only
2. **Strong JWT secret**: Use at least 32 characters, randomly generated
3. **HTTPS only**: Render provides SSL certificates automatically
4. **Database security**: Use Render's internal network for database connections
5. **CORS restrictions**: Only allow your frontend domain
6. **Logging**: Set `LOG_LEVEL_SECURITY=INFO` in production
7. **SQL logging**: Set `SHOW_SQL=false` in production

---

## Monitoring

### Render Dashboard
- Monitor service health in dashboard
- Check deployment logs
- Set up alerts for service failures

### Application Logs
```bash
# View backend logs
docker logs <backend-container-id>

# View frontend logs
docker logs <frontend-container-id>
```

### Health Checks
- Frontend: `https://your-frontend-url.onrender.com/health`
- Backend: `https://your-backend-url.onrender.com/auth/testmail`

---

## Cost Optimization

### Render Free Tier
- **Web Services**: 750 hours/month free
- **PostgreSQL**: 90 days free, then ~$7/month
- **Storage**: 100GB free

### Optimization Tips
- Use environment variables efficiently
- Optimize Docker image size (multi-stage builds already implemented)
- Monitor resource usage in Render dashboard
- Consider scaling only when needed

---

## Support

For issues related to:
- **Render Platform**: https://render.com/docs
- **Spring Boot**: https://spring.io/projects/spring-boot
- **React**: https://react.dev
- **Docker**: https://docs.docker.com

---

## Summary Checklist

### Pre-Deployment
- [ ] Git repository is up to date
- [ ] All changes committed and pushed
- [ ] Environment variables documented
- [ ] Docker builds tested locally
- [ ] Database credentials ready

### Backend Deployment
- [ ] PostgreSQL database created on Render
- [ ] Backend web service created
- [ ] Environment variables configured
- [ ] Deployment successful
- [ ] Health endpoint accessible

### Frontend Deployment
- [ ] Frontend web service created
- [ ] REACT_APP_API_BASE_URL configured
- [ ] Deployment successful
- [ ] Frontend accessible

### Post-Deployment
- [ ] User registration works
- [ ] User login works
- [ ] Donation creation works
- [ ] Donation request works
- [ ] No console errors
- [ ] No network errors
- [ ] CORS working correctly
- [ ] Email notifications working (if configured)

### Documentation
- [ ] Environment variables saved securely
- [ ] Rollback plan documented
- [ ] Team notified of deployment
- [ ] Monitoring configured
