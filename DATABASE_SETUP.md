# Cloud Database Setup Guide

This guide will help you set up a cloud PostgreSQL database for the Esmart Solutions Agency project.

## Option 1: Neon (Recommended)

Neon is a serverless PostgreSQL platform with excellent free tier and auto-scaling.

### Steps:

1. **Sign up for Neon**
   - Go to [https://neon.tech](https://neon.tech)
   - Sign up with GitHub or email

2. **Create a new project**
   - Click "Create Project"
   - Name: `esmart-solutions`
   - Region: Choose closest to your users
   - PostgreSQL version: 16 (latest)

3. **Get connection string**
   - After project creation, you'll see connection details
   - Copy the connection string

4. **Update your `.env` file**
   ```env
   DB_HOST=ep-xxx-xxx.neon.tech
   DB_PORT=5432
   DB_NAME=neondb
   DB_USER=your_username
   DB_PASSWORD=your_password
   DB_SSL=true
   ```

5. **Test connection**
   ```bash
   cd server
   npm run dev
   ```

### Neon Features:
- ✅ Auto-scales to zero (saves costs)
- ✅ Instant database branching
- ✅ 0.5 GB storage free
- ✅ Generous compute hours

---

## Option 2: Supabase

Supabase provides PostgreSQL + Auth + Storage + Realtime features.

### Steps:

1. **Sign up for Supabase**
   - Go to [https://supabase.com](https://supabase.com)
   - Sign up with GitHub

2. **Create a new project**
   - Click "New Project"
   - Name: `esmart-solutions`
   - Database Password: Generate strong password
   - Region: Choose closest to your users

3. **Get connection details**
   - Go to Project Settings → Database
   - Under "Connection string" → "URI"
   - Copy connection details

4. **Update your `.env` file**
   ```env
   DB_HOST=db.xxx.supabase.co
   DB_PORT=5432
   DB_NAME=postgres
   DB_USER=postgres
   DB_PASSWORD=your_database_password
   DB_SSL=true
   ```

5. **Test connection**
   ```bash
   cd server
   npm run dev
   ```

### Supabase Features:
- ✅ 500 MB database storage
- ✅ Built-in authentication
- ✅ Real-time subscriptions
- ✅ File storage included

---

## Option 3: Railway

Railway offers PostgreSQL with simple deployment.

### Steps:

1. **Sign up for Railway**
   - Go to [https://railway.app](https://railway.app)
   - Sign up with GitHub

2. **Create PostgreSQL database**
   - Create new project
   - Click "New" → "Database" → "PostgreSQL"

3. **Get connection details**
   - Click on PostgreSQL service
   - Go to "Connect" tab
   - Copy connection variables

4. **Update your `.env` file**
   ```env
   DB_HOST=containers-us-west-xxx.railway.app
   DB_PORT=5432
   DB_NAME=railway
   DB_USER=postgres
   DB_PASSWORD=your_password
   DB_SSL=true
   ```

### Railway Features:
- ✅ $5 free credit/month
- ✅ Easy deployment
- ✅ Built-in monitoring

---

## Environment Variables for CI/CD

### GitHub Actions Secrets

Add these secrets in your GitHub repository:

1. Go to Repository Settings → Secrets and variables → Actions
2. Add new repository secrets:
   - `DB_HOST`
   - `DB_PORT`
   - `DB_NAME`
   - `DB_USER`
   - `DB_PASSWORD`
   - `DB_SSL` (set to `true`)

### Netlify/Vercel Environment Variables

Add the same variables in your deployment platform:

**Netlify:**
- Site Settings → Environment variables

**Vercel:**
- Project Settings → Environment Variables

---

## Database Initialization

Once connected, the database tables will be created automatically when you start the server:

```bash
cd server
npm run dev
```

The server will:
1. Test database connection
2. Sync all models (creates tables)
3. Run any pending migrations

## Verify Database Connection

Check server logs for:
```
✅ Database connection has been established successfully.
✅ All PostgreSQL models were synchronized successfully.
```

---

## Separate Databases for Environments

### Recommended Setup:

- **Development**: Neon branch or separate project
- **Staging**: Neon branch or Supabase project
- **Production**: Neon main branch or Supabase production

### Neon Branching:
```bash
# Create staging branch
neon branches create --name staging --project-id your-project-id
```

---

## Troubleshooting

### Connection Timeout
- Verify DB_SSL=true for cloud databases
- Check firewall/network settings
- Ensure correct host and port

### SSL Certificate Error
```env
# Make sure this is set:
DB_SSL=true
```

### Tables Not Created
- Check server logs for errors
- Verify database user has CREATE permissions
- Manually run migrations if needed:
```bash
cd server
node config/runMigrations.js
```

### Connection String Format
If your provider gives a full connection string like:
```
postgresql://user:password@host:5432/database
```

Extract the parts:
- `DB_HOST=host`
- `DB_USER=user`
- `DB_PASSWORD=password`
- `DB_NAME=database`
- `DB_PORT=5432`
- `DB_SSL=true`

---

## Next Steps

1. Choose your cloud database provider
2. Follow the setup steps above
3. Update your `server/.env` file
4. Start the server and verify connection
5. Add environment variables to your CI/CD platform
6. Deploy! 🚀

## Support

- Neon Docs: [https://neon.tech/docs](https://neon.tech/docs)
- Supabase Docs: [https://supabase.com/docs](https://supabase.com/docs)
- Railway Docs: [https://docs.railway.app](https://docs.railway.app)
