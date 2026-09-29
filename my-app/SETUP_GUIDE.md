# Cyber360 Security Assessment - Frontend Setup Guide

## Project Overview
This is a React + Vite + TypeScript frontend for the Cyber360 Security Assessment and Finding Management application. It connects to SharePoint for data storage and integrates with Azure AD for authentication.

## Current Setup Status ✅

### Installed Technologies
- **React 19.2** - UI framework
- **Vite 7.2** - Build tool
- **TypeScript 5.9** - Type safety
- **React Router 7.18** - Routing
- **Zustand 5.0** - State management
- **Axios 1.20** - HTTP client
- **Microsoft Power Apps SDK** - Integration with Power Apps

### Project Structure
```
src/
├── components/          # React components
│   ├── common/         # Login component
│   ├── dashboards/     # Dashboard templates
│   ├── layout/         # Main layout wrapper
│   ├── assessments/    # Assessment components (TODO)
│   ├── findings/       # Finding components (TODO)
│   └── styles/         # Component CSS files
├── hooks/              # Custom React hooks (TODO)
├── services/           # API services
│   └── sharepointService.ts  # SharePoint integration
├── store/              # Zustand state management
│   └── authStore.ts    # Auth state
├── types/              # TypeScript interfaces
│   └── index.ts        # All type definitions
├── utils/              # Utilities
│   ├── constants.ts    # Role definitions, constants
│   └── router.tsx      # Route configuration
├── App.tsx             # Main app component
└── main.tsx            # Entry point
```

## Running the Application

### 1. Install Dependencies
```bash
cd "D:\Cyber360 PowerCodeApps\my-app"
npm install
```

### 2. Configure Environment
Copy `.env.local.example` to `.env.local` and fill in your values:
```bash
copy .env.local.example .env.local
```

**Required variables:**
- `VITE_SHAREPOINT_SITE_URL` - Your SharePoint site
- `VITE_POWER_APPS_CLIENT_ID` - Azure AD app client ID

### 3. Start Development Server
```bash
npm run dev
```

The app will start at `http://localhost:5173`

### 4. Test Login
The login page allows testing different user roles. You can:
- Enter any email and password (demo mode)
- Select multiple roles to test role-based features
- Login to access the dashboard

**Demo credentials:**
- Email: `any@email.com`
- Password: `any_password`
- Roles: Select as needed for testing

## Key Features Implemented

### ✅ Completed
- [ ] Project structure and folder organization
- [ ] Type definitions for all entities (Assessment, Finding, User, etc.)
- [ ] Zustand state management for authentication
- [ ] SharePoint service with API methods
- [ ] Role-based constants and navigation
- [ ] Login page with role selection for testing
- [ ] Layout component with navbar and sidebar
- [ ] Basic dashboard with role-based content
- [ ] React Router setup with protected routes
- [ ] Global styling and theming

### 🔄 In Progress / TODO

#### Finding Management (High Priority)
- [ ] Create/Edit Finding form
- [ ] Findings list view with filtering
- [ ] Finding details view
- [ ] Finding status transitions
- [ ] Attachment handling

#### Assessment Management
- [ ] Create/Edit Assessment form
- [ ] Assessments list view
- [ ] Assessment details with findings
- [ ] Assessment status tracking

#### Approval Workflow
- [ ] Pending Findings approval screen
- [ ] Return Finding with comments
- [ ] Returned Findings management

#### Risk Management
- [ ] Risk Register deadline extension requests
- [ ] Retest workflow screens
- [ ] SLA status display and calculations
- [ ] Nearing/Breached SLA views

#### Admin Features
- [ ] User Management
- [ ] Team Management
- [ ] Department Management
- [ ] SLA Configuration
- [ ] Root Cause Management

#### Common Components
- [ ] Data tables with sort/filter/search
- [ ] Modal dialogs
- [ ] Alert/notification system
- [ ] Loading spinners
- [ ] Error boundaries
- [ ] Confirmation dialogs

## Available npm Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## Development Guidelines

### File Naming
- Components: PascalCase (e.g., `FindingList.tsx`)
- Utilities/Services: camelCase (e.g., `sharepointService.ts`)
- CSS files: kebab-case matching component (e.g., `finding-list.css`)

### Component Structure
```typescript
import { useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import './component-name.css';

export default function ComponentName() {
  const user = useAuthStore((state) => state.user);
  
  return (
    <div>Component content</div>
  );
}
```

### State Management
- Use Zustand for global state (auth, user data)
- Use useState for local component state
- Use custom hooks for reusable logic

### Styling
- Use CSS files (not CSS-in-JS for now)
- Follow class naming: `.component-name { }`
- Use flexbox/grid for layouts
- Mobile-first responsive design

## SharePoint Integration

### Connecting to SharePoint

1. **Create Azure AD App**
   - Go to Azure Portal
   - Create new app registration
   - Get Client ID

2. **Set Environment Variables**
   ```
   VITE_SHAREPOINT_SITE_URL=https://yourtenant.sharepoint.com/sites/cyber360
   VITE_POWER_APPS_CLIENT_ID=your_client_id_here
   ```

3. **Create SharePoint Lists**
   The application expects these SharePoint lists:
   - `Assessments` - Assessment records
   - `Findings` - Finding records
   - `Users` - User records
   - `Teams` - Team records
   - `Departments` - Department records
   - `SLAConfiguration` - SLA rules

4. **Update sharepointService.ts**
   - Add authentication method (currently using mock token)
   - Implement proper OAuth/MSAL flow
   - Add error handling

## Authentication

### Current Setup
- Demo/test login (no real authentication)
- Role selection for testing
- User stored in localStorage

### Future Implementation
- Azure AD/OAuth integration
- MSAL for token management
- Proper token refresh
- Session management

## Debugging

### Enable Debug Logs
Add to browser console:
```javascript
localStorage.setItem('DEBUG', 'true');
```

### Check Auth State
```javascript
// In browser console
import { useAuthStore } from '@/store/authStore';
const store = useAuthStore.getState();
console.log(store.user);
```

### SharePoint API Testing
Use the sharepointService methods in browser console:
```javascript
import { sharepointService } from '@/services/sharepointService';
sharepointService.getAssessments().then(d => console.log(d));
```

## Troubleshooting

### Port Already in Use
```bash
# On Windows
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

### Module Not Found Errors
- Check if file exists
- Verify import path uses `@/` alias correctly
- Run `npm install` again

### Build Errors
```bash
npm run build
```
Check error messages and verify TypeScript types

## Next Steps

1. **Set up SharePoint Integration**
   - Create SharePoint lists
   - Implement Azure AD authentication
   - Test API connections

2. **Build Finding Components**
   - Start with FindingList view
   - Add CreateFinding form
   - Add FIndingDetails view

3. **Implement Workflows**
   - Status transitions
   - Approval process
   - Risk register requests

4. **Add Admin Features**
   - User management
   - SLA configuration
   - Team management

## Getting Help

- Check `/src/types/index.ts` for all type definitions
- Review `/src/utils/constants.ts` for role and status definitions
- Look at existing components for patterns

## Contact & Support

For questions about the setup or frontend development, refer to the project documentation:
- `/CLAUDE.md` - Project overview
- `/AGENTS.md` - Development guidance
- `/docs/` - Business requirements and specifications
