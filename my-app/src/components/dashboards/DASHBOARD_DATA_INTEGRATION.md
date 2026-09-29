# Assessment Lead Dashboard - Data Integration Guide

## Overview
This guide explains how to connect the Assessment Lead Dashboard to real data sources instead of the mock data currently used.

## Current State
The dashboard currently uses hardcoded mock data defined in `AssessmentLeadDashboardComprehensive.tsx`. The data is structured to match the dashboard sections documented in `DASHBOARD_DOCUMENTATION.md`.

## Integration Steps

### Step 1: Create Data Fetching Hooks

Create custom hooks to fetch data from your backend API:

```typescript
// hooks/useAssessmentMetrics.ts
import { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';

interface AssessmentMetrics {
  overall: number;
  draft: number;
  open: number;
  closed: number;
}

export const useAssessmentMetrics = () => {
  const [data, setData] = useState<AssessmentMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        const response = await fetch(`/api/assessments/metrics?userId=${user.id}`);
        if (!response.ok) throw new Error('Failed to fetch assessment metrics');
        const metrics = await response.json();
        setData(metrics);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user?.id]);

  return { data, loading, error };
};
```

### Step 2: Create Similar Hooks for Other Sections

```typescript
// hooks/useFindingsSummary.ts
export const useFindingsSummary = () => {
  const [data, setData] = useState<FindingsSummaryData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (!user) return;

    fetch(`/api/findings/summary?userId=${user.id}`)
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => setError(err));
  }, [user?.id]);

  return { data, loading, error };
};
```

Create similar hooks for:
- `useFindingsBySecurityStream()`
- `useSeverityDistribution()`
- `useAssessmentLeadSummary()`
- `useRootCauseAnalysis()`
- `useSLARemediationPlans()`

### Step 3: Update Component to Use Hooks

```typescript
// AssessmentLeadDashboardComprehensive.tsx
import { useFindingsSummary } from '@/hooks/useFindingsSummary';
import { useAssessmentMetrics } from '@/hooks/useAssessmentMetrics';
// ... import other hooks

export default function AssessmentLeadDashboardComprehensive() {
  const { data: assessmentData, loading: assessmentLoading } = useAssessmentMetrics();
  const { data: findingsData, loading: findingsLoading } = useFindingsSummary();
  // ... other hooks

  if (assessmentLoading || findingsLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="comprehensive-dashboard">
      {/* Use fetched data instead of hardcoded mock data */}
      {assessmentData && (
        <div className="dashboard-card assessment-status-card">
          {/* Render with real data */}
        </div>
      )}
    </div>
  );
}
```

### Step 4: Handle Loading and Error States

Add loading and error state components:

```typescript
// components/common/LoadingSpinner.tsx
export const LoadingSpinner = () => (
  <div className="loading-spinner">
    <div className="spinner"></div>
    <p>Loading dashboard...</p>
  </div>
);

// components/common/ErrorMessage.tsx
export const ErrorMessage = ({ error }: { error: Error }) => (
  <div className="error-message">
    <p>Failed to load dashboard: {error.message}</p>
    <button onClick={() => window.location.reload()}>Retry</button>
  </div>
);
```

### Step 5: Update Component with Error Handling

```typescript
export default function AssessmentLeadDashboardComprehensive() {
  const { data: assessmentData, loading: assessmentLoading, error: assessmentError } = 
    useAssessmentMetrics();

  if (assessmentLoading) return <LoadingSpinner />;
  if (assessmentError) return <ErrorMessage error={assessmentError} />;
  if (!assessmentData) return <ErrorMessage error={new Error('No data')} />;

  return (
    <div className="comprehensive-dashboard">
      {/* Render dashboard with real data */}
    </div>
  );
}
```

## API Endpoints Required

### 1. Assessment Status Endpoint
```
GET /api/assessments/metrics?userId={userId}

Response:
{
  "overall": 62.9,
  "draft": 12,
  "open": 115,
  "closed": 35,
  "trend": [
    { "month": "Jan", "percentage": 45 },
    { "month": "Feb", "percentage": 52 },
    ...
  ]
}
```

### 2. Findings Summary Endpoint
```
GET /api/findings/summary?userId={userId}

Response:
{
  "open": 48,
  "pending": 12,
  "retest": 8,
  "closed": 95
}
```

### 3. Findings by Security Stream Endpoint
```
GET /api/findings/by-security-stream?userId={userId}

Response:
[
  {
    "stream": "Cloud Infrastructure",
    "open": 28,
    "pending": 5,
    "closed": 42
  },
  ...
]
```

### 4. Severity Distribution Endpoint
```
GET /api/findings/severity-distribution?userId={userId}

Response:
[
  { "name": "Critical", "value": 48 },
  { "name": "High", "value": 62 },
  ...
]
```

### 5. Assessment Lead Summary Endpoint
```
GET /api/assessment-leads/summary?userId={userId}

Response:
[
  {
    "id": 1,
    "name": "Sarah Johnson",
    "open": 8,
    "pending": 2,
    "retest": 1,
    "closed": 3,
    "trend": "+35%"
  },
  ...
]
```

### 6. Root Cause Analysis Endpoint
```
GET /api/findings/root-cause-analysis?userId={userId}

Response:
[
  {
    "category": "Misconfiguration",
    "critical": 25,
    "high": 35,
    "medium": 42,
    "low": 18,
    "info": 8
  },
  ...
]
```

### 7. SLA Remediation Plans Endpoint
```
GET /api/sla/remediation-plans?userId={userId}&limit=10

Response:
[
  {
    "id": 1,
    "team": "Infrastructure",
    "withinSLA": 30,
    "nearingSLA": 2,
    "breachedSLA": 7,
    "pending": 3,
    "retest": 2,
    "closed": 5,
    "status": "Open (3 Days)",
    "statusType": "warning"
  },
  ...
]
```

## Data Aggregation Strategy

### Option 1: Single Endpoint (Recommended for Performance)
Create a single endpoint that returns all dashboard data:

```
GET /api/dashboards/assessment-lead?userId={userId}

Response:
{
  "assessmentMetrics": {...},
  "findingsSummary": {...},
  "findingsByStream": [...],
  "severityDistribution": [...],
  "assessmentLeadSummary": [...],
  "rootCauseAnalysis": [...],
  "slaRemediationPlans": [...]
}
```

This reduces the number of API calls and improves performance.

### Option 2: Multiple Endpoints with Request Batching
Use a batching strategy to request multiple endpoints efficiently:

```typescript
const params = new URLSearchParams({ userId: user.id });

const [
  assessmentRes,
  findingsRes,
  severityRes
] = await Promise.all([
  fetch(`/api/assessments/metrics?${params}`),
  fetch(`/api/findings/summary?${params}`),
  fetch(`/api/findings/severity?${params}`)
]);
```

## Caching Strategy

Implement caching to avoid redundant API calls:

```typescript
// hooks/useDashboardData.ts
import { useQuery } from '@tanstack/react-query';

export const useDashboardData = (userId: string) => {
  return useQuery({
    queryKey: ['dashboard', userId],
    queryFn: async () => {
      const res = await fetch(`/api/dashboards/assessment-lead?userId=${userId}`);
      return res.json();
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000,   // 10 minutes
  });
};
```

## Real-time Updates

For live SLA status updates, consider:

1. **WebSocket Connection**:
```typescript
useEffect(() => {
  const ws = new WebSocket(`wss://api.example.com/live/sla-status/${user.id}`);
  
  ws.onmessage = (event) => {
    const updatedSLAPlans = JSON.parse(event.data);
    setSLARemediationPlans(updatedSLAPlans);
  };

  return () => ws.close();
}, [user.id]);
```

2. **Polling**:
```typescript
useEffect(() => {
  const interval = setInterval(() => {
    refetch(); // Refetch data every 30 seconds
  }, 30000);

  return () => clearInterval(interval);
}, [refetch]);
```

## Database Queries Example

### Assessment Metrics Query
```sql
SELECT 
  COUNT(CASE WHEN status = 'Draft' THEN 1 END) as draft,
  COUNT(CASE WHEN status = 'Open' THEN 1 END) as open,
  COUNT(CASE WHEN status = 'Closed' THEN 1 END) as closed,
  ROUND(
    COUNT(CASE WHEN status = 'Closed' THEN 1 END) * 100.0 / COUNT(*),
    1
  ) as overall
FROM Assessments
WHERE assessmentLead = @userId
  AND createdDate >= DATEADD(year, -1, GETDATE());
```

### Findings Summary Query
```sql
SELECT 
  COUNT(CASE WHEN status = 'Open' THEN 1 END) as open,
  COUNT(CASE WHEN status = 'Pending' THEN 1 END) as pending,
  COUNT(CASE WHEN status = 'Retest' THEN 1 END) as retest,
  COUNT(CASE WHEN status = 'Closed' THEN 1 END) as closed
FROM Findings f
JOIN Assessments a ON f.assessmentId = a.id
WHERE a.assessmentLead = @userId;
```

### SLA Status Query
```sql
SELECT 
  t.name as team,
  COUNT(CASE WHEN f.slaStatus = 'WithinSLA' THEN 1 END) as withinSLA,
  COUNT(CASE WHEN f.slaStatus = 'NearingSLA' THEN 1 END) as nearingSLA,
  COUNT(CASE WHEN f.slaStatus = 'BreachedSLA' THEN 1 END) as breachedSLA,
  COUNT(CASE WHEN f.status = 'Pending' THEN 1 END) as pending,
  COUNT(CASE WHEN f.status = 'Retest' THEN 1 END) as retest,
  COUNT(CASE WHEN f.status = 'Closed' THEN 1 END) as closed
FROM Teams t
LEFT JOIN Findings f ON t.id = f.teamId
LEFT JOIN Assessments a ON f.assessmentId = a.id
WHERE a.assessmentLead = @userId
GROUP BY t.id, t.name
ORDER BY withinSLA DESC;
```

## Testing Data Integration

### Mock Data for Testing
Keep mock data available for testing/development:

```typescript
const MOCK_ASSESSMENT_DATA = { /* existing mock data */ };

const isDevelopment = process.env.NODE_ENV === 'development';
const useMockData = import.meta.env.VITE_USE_MOCK_DATA === 'true';

export const useAssessmentMetrics = () => {
  if (isDevelopment && useMockData) {
    return {
      data: MOCK_ASSESSMENT_DATA,
      loading: false,
      error: null
    };
  }
  
  // Fetch real data
  // ...
};
```

### Environment Variables
```env
# .env.development
VITE_USE_MOCK_DATA=true
VITE_API_BASE_URL=http://localhost:3000/api

# .env.production
VITE_USE_MOCK_DATA=false
VITE_API_BASE_URL=https://api.example.com
```

## Performance Optimization Tips

1. **Lazy Load Charts**: Delay rendering charts until data is ready
2. **Use React Query/SWR**: For better data management
3. **Implement Pagination**: For SLA table if > 100 teams
4. **Add Data Virtualization**: For large tables
5. **Compress API Responses**: Use gzip compression
6. **Cache Aggressively**: Set appropriate cache headers

## Troubleshooting

### Issue: Dashboard shows "Loading..." indefinitely
- **Cause**: API endpoint not responding
- **Solution**: Check API endpoint URL, verify network access, check authentication

### Issue: Data doesn't update when you expect
- **Cause**: Cache is too aggressive or polling interval too long
- **Solution**: Adjust staleTime/gcTime or polling interval

### Issue: Charts don't render properly with real data
- **Cause**: Data structure doesn't match expected format
- **Solution**: Verify API response matches documented schema

---

For more details on dashboard sections, see `DASHBOARD_DOCUMENTATION.md`.
