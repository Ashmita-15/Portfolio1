# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

Full-stack portfolio website built with React/TypeScript frontend and Node.js/Express backend. Features a 3D hero section using Three.js, contact form with email notifications, resume download, and MongoDB data persistence.

## Development Commands

### Initial Setup
```bash
npm run install:all
```
Installs dependencies for root, backend, and frontend in one command.

### Development
```bash
# Run full stack (both frontend and backend concurrently)
npm run dev

# Run frontend only (Vite dev server on port 5173)
npm run dev:frontend
# or: cd frontend && npm run dev

# Run backend only (Node.js Express server on port 5000)
npm run dev:backend
# or: cd backend && npm run dev
```

### Testing
```bash
# Frontend tests (Vitest + React Testing Library)
cd frontend && npm test
cd frontend && npm run test:ui          # Interactive UI
cd frontend && npm run test:coverage    # Coverage report

# Backend tests (Jest + Supertest)
cd backend && npm test
cd backend && npm run test:watch        # Watch mode
cd backend && npm run test:coverage     # Coverage report
```

### Linting
```bash
# Frontend (ESLint with TypeScript)
cd frontend && npm run lint

# Backend (ESLint)
cd backend && npm run lint
```

### Production Build
```bash
# Build frontend for production
npm run build
# or: cd frontend && npm run build
# Output: frontend/dist/

# Start production backend server
npm start
# or: cd backend && npm start
```

### Preview
```bash
cd frontend && npm run preview
```
Preview production build locally.

## Architecture

### Technology Stack

**Frontend:**
- React 18 with TypeScript
- Vite (build tool & dev server)
- Tailwind CSS for styling
- Framer Motion for animations
- Three.js + React Three Fiber for 3D graphics
- React Router for navigation
- Axios for API calls

**Backend:**
- Node.js + Express
- MongoDB + Mongoose (ODM)
- Nodemailer (email notifications)
- Joi (validation)
- Helmet + CORS (security)
- express-rate-limit (DDoS protection)

### Project Structure

```
PortFolio1/
├── frontend/               # React TypeScript application
│   ├── src/
│   │   ├── App.tsx        # Main component with Router, video background, layout
│   │   ├── main.tsx       # Entry point
│   │   ├── components/    # All UI components (Hero, About, Skills, etc.)
│   │   └── test/          # Test setup and utilities
│   ├── public/            # Static assets (videos, images)
│   ├── dist/              # Production build output
│   └── vite.config.ts     # Vite configuration
├── backend/               # Express API server
│   ├── server.js          # Express app setup, middleware, MongoDB connection
│   ├── routes/            # API route handlers
│   │   ├── contact.js     # POST /api/contact, GET /api/contact
│   │   └── resume.js      # GET /api/resume/download
│   ├── models/            # Mongoose schemas
│   │   └── Contact.js     # Contact form data model
│   ├── utils/             # Shared utilities
│   │   └── email.js       # Nodemailer transporter & email templates
│   ├── tests/             # Jest test files
│   └── public/            # Static files served at /static (Resume.pdf)
└── package.json           # Root package with concurrent dev scripts
```

### Key Architecture Patterns

**Frontend Component Structure:**
- `App.tsx`: Root component managing loading state, video background, and page layout
- All components live in `src/components/`
- 3D components use lazy loading with React.lazy() and Suspense
- Error boundaries wrap 3D components to gracefully handle WebGL failures
- Framer Motion handles scroll animations and transitions

**Backend API Design:**
- RESTful endpoints under `/api/`
- Rate limiting: 100 req/15min global, 5 req/15min for contact form
- Validation with Joi schemas before database operations
- Email flow: save to DB → send notification to owner → send auto-reply to user
- Mongoose models with indexes for query performance

**Data Flow (Contact Form):**
1. User submits form → frontend validates & POSTs to `/api/contact`
2. Backend validates with Joi schema
3. Saves to MongoDB Contact collection with IP/user-agent
4. Sends email notification to portfolio owner via Nodemailer
5. Sends auto-reply to user
6. Returns success response with message ID and timestamp

### Environment Variables

**Frontend (.env):**
- `VITE_API_URL` - Backend API base URL (default: http://localhost:5000)
- Contact info, social links for Hero component

**Backend (env.example as template):**
- `MONGODB_URI` - MongoDB connection string
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` - Email configuration
- `CONTACT_TO_EMAIL` - Where contact forms are sent
- `FRONTEND_URL` - CORS origin (default: http://localhost:5173)
- `PORT` - Server port (default: 5000)

**Important:** Backend requires `.env` file created from `backend/env.example` with actual credentials. Gmail users must use App Password for `SMTP_PASS`.

### Special Considerations

**3D Graphics:**
- Hero section uses `@react-three/fiber` and `@react-three/drei`
- `Hero3D.tsx` is lazy-loaded to avoid blocking initial render
- ErrorBoundary + Suspense provide fallback for WebGL failures
- Canvas component has transparent background to show video underneath

**Video Background:**
- Background video (`public/bg.mp4`) auto-plays muted for browser policy compliance
- Overlay div provides contrast for text readability
- Refs used to ensure playback on iOS Safari

**Security:**
- Helmet.js for HTTP headers
- Rate limiting per IP address
- CORS configured for specific frontend origin
- Input validation on both frontend and backend
- IP address and user-agent logged with contact submissions

**Email Configuration:**
- Supports both SMTP (Gmail, etc.) and SendGrid
- SMTP credentials stripped of whitespace to prevent copy-paste errors
- Debug logging enabled for troubleshooting email issues
- Transports created per request to avoid connection pooling issues

## Development Tips

**When modifying components:**
- TypeScript strict mode is enabled; all types must be explicit
- Components use functional patterns with hooks
- Framer Motion variants defined inline for animations
- Check `tsconfig.json` for compiler settings

**When modifying backend routes:**
- Always validate input with Joi before database operations
- Update corresponding Mongoose model if schema changes
- Remember to handle errors and return appropriate HTTP status codes
- Test rate limiting behavior with repeated requests

**When adding new API endpoints:**
- Define route in `backend/routes/` directory
- Import and mount in `server.js` with `app.use()`
- Consider adding specific rate limiting if sensitive
- Add tests in `backend/tests/`

**When testing:**
- Frontend: Component tests use `@testing-library/react` with jsdom
- Backend: API tests use `supertest` to make HTTP requests
- Test setup files: `frontend/src/test/setup.ts` and backend tests import routes directly
- Run tests before committing changes

**When deploying:**
- Frontend build outputs to `frontend/dist/`
- Backend serves static files from `backend/public/` for resume downloads
- Set `NODE_ENV=production` for error handling differences
- Update CORS `FRONTEND_URL` to production domain
- Ensure MongoDB URI points to production database
