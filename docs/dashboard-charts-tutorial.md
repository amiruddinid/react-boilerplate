# Tutorial: Implementing Dashboard Charts (Backend-Aggregated Analytics)

This guide provides step-by-step instructions to implement dashboard charts using **Recharts** on the frontend, with all timeline groupings and KPIs aggregated directly in the **backend database** (SQL Server).

### Key Features:
- **Weekly View**: Visualizes inbound receipt quantities alongside a **stacked/grouped car model breakdown** (representing what models were produced each week).
- **Monthly View**: Visualizes inbound receipt quantities alongside the **Total Production count** (macro-level monthly output).

---

## Part 1: Backend Implementation

We will create a new dashboard API route `/api/dashboard/analytics` which returns pre-aggregated monthly and weekly timeline data, summary statistics, and production status splits in a single payload.

### Step 1.1: Create the Dashboard Repository
Create `be/src/api/dashboard/dashboard.repository.js`. This handles the SQL Server queries, including joining with `TB_M_CAR_MODEL` for the weekly breakdown:

```javascript
// File: be/src/api/dashboard/dashboard.repository.js
const { poolPromise, sql } = require('../../config/db');

/**
 * Aggregates approved material receipts by month.
 */
const findReceiptsMonthly = async () => {
    const pool = await poolPromise;
    const result = await pool.request().query(`
        SELECT 
            FORMAT(r.CREATED_DT, 'yyyy-MM') AS dateKey,
            SUM(ISNULL(d.QUANTITY_RECEIVED, 0)) AS receiptQty
        FROM amir.TB_R_MATERIAL_RECEIPT r
        LEFT JOIN amir.TB_R_RECEIPT_DETAIL d ON r.ID = d.RECEIPT_ID
        WHERE r.STATUS = 'Approved'
        GROUP BY FORMAT(r.CREATED_DT, 'yyyy-MM')
    `);
    return result.recordset;
};

/**
 * Aggregates production orders by month (Total per month).
 */
const findProductionsMonthly = async () => {
    const pool = await poolPromise;
    const result = await pool.request().query(`
        SELECT 
            FORMAT(p.CREATED_DT, 'yyyy-MM') AS dateKey,
            COUNT(p.ID) AS productionCount
        FROM amir.TB_R_PRODUCTION p
        GROUP BY FORMAT(p.CREATED_DT, 'yyyy-MM')
    `);
    return result.recordset;
};

/**
 * Aggregates approved material receipts by week (Monday start).
 */
const findReceiptsWeekly = async () => {
    const pool = await poolPromise;
    const result = await pool.request().query(`
        SELECT 
            FORMAT(DATEADD(wk, DATEDIFF(wk, 0, r.CREATED_DT), 0), 'yyyy-MM-dd') AS dateKey,
            SUM(ISNULL(d.QUANTITY_RECEIVED, 0)) AS receiptQty
        FROM amir.TB_R_MATERIAL_RECEIPT r
        LEFT JOIN amir.TB_R_RECEIPT_DETAIL d ON r.ID = d.RECEIPT_ID
        WHERE r.STATUS = 'Approved'
        GROUP BY DATEADD(wk, DATEDIFF(wk, 0, r.CREATED_DT), 0)
    `);
    return result.recordset;
};

/**
 * Aggregates production orders by week and car model.
 */
const findProductionsWeekly = async () => {
    const pool = await poolPromise;
    const result = await pool.request().query(`
        SELECT 
            FORMAT(DATEADD(wk, DATEDIFF(wk, 0, p.CREATED_DT), 0), 'yyyy-MM-dd') AS dateKey,
            ISNULL(c.MODEL_NAME, 'Unknown Model') AS modelName,
            COUNT(p.ID) AS productionCount
        FROM amir.TB_R_PRODUCTION p
        LEFT JOIN amir.TB_M_CAR_MODEL c ON p.CAR_MODEL_ID = c.ID
        GROUP BY 
            DATEADD(wk, DATEDIFF(wk, 0, p.CREATED_DT), 0),
            c.MODEL_NAME
    `);
    return result.recordset;
};

/**
 * Fetches dashboard summary KPI stats.
 */
const getSummaryStats = async () => {
    const pool = await poolPromise;
    const result = await pool.request().query(`
        SELECT 
            (SELECT SUM(ISNULL(d.QUANTITY_RECEIVED, 0)) 
             FROM amir.TB_R_MATERIAL_RECEIPT r 
             LEFT JOIN amir.TB_R_RECEIPT_DETAIL d ON r.ID = d.RECEIPT_ID 
             WHERE r.STATUS = 'Approved') AS totalReceiptsQty,
            (SELECT COUNT(ID) FROM amir.TB_R_PRODUCTION WHERE STATUS = 'In Progress') AS activeProduction,
            (SELECT COUNT(ID) FROM amir.TB_R_PRODUCTION WHERE STATUS = 'Completed') AS completedProduction,
            (SELECT COUNT(ID) FROM amir.TB_R_PRODUCTION) AS totalProduction
    `);
    return result.recordset[0];
};

/**
 * Fetches production status counts for donut visualization.
 */
const getStatusBreakdown = async () => {
    const pool = await poolPromise;
    const result = await pool.request().query(`
        SELECT 
            ISNULL(STATUS, 'Unknown') AS name, 
            COUNT(ID) AS value
        FROM amir.TB_R_PRODUCTION
        GROUP BY STATUS
    `);
    return result.recordset;
};

module.exports = {
    findReceiptsMonthly,
    findProductionsMonthly,
    findReceiptsWeekly,
    findProductionsWeekly,
    getSummaryStats,
    getStatusBreakdown,
};
```

---

### Step 1.2: Create the Dashboard Service
Create `be/src/api/dashboard/dashboard.service.js`. This aggregates data into a format Recharts can consume:

```javascript
// File: be/src/api/dashboard/dashboard.service.js
const {
    findReceiptsMonthly,
    findProductionsMonthly,
    findReceiptsWeekly,
    findProductionsWeekly,
    getSummaryStats,
    getStatusBreakdown,
} = require('./dashboard.repository');

/**
 * Formats a Monday start-date string to "DD MMM - DD MMM".
 */
const formatDateRange = (mondayStr) => {
    try {
        const date = new Date(mondayStr);
        const startDay = date.getDate().toString().padStart(2, '0');
        const startMonth = date.toLocaleString('en-US', { month: 'short' });
        
        const endDate = new Date(date);
        endDate.setDate(date.getDate() + 6);
        const endDay = endDate.getDate().toString().padStart(2, '0');
        const endMonth = endDate.toLocaleString('en-US', { month: 'short' });

        return `${startDay} ${startMonth} - ${endDay} ${endMonth}`;
    } catch (err) {
        return mondayStr;
    }
};

/**
 * Formats a 'yyyy-MM' string to 'MMM yyyy'.
 */
const formatMonth = (monthStr) => {
    try {
        const [year, month] = monthStr.split('-');
        const monthName = new Date(year, parseInt(month) - 1, 1).toLocaleString('en-US', { month: 'short' });
        return `${monthName} ${year}`;
    } catch (err) {
        return monthStr;
    }
};

/**
 * Merges monthly data timelines (high-level aggregates).
 */
const mergeMonthlyTimeline = (receipts, productions) => {
    const map = {};

    receipts.forEach(r => {
        const key = r.dateKey;
        if (key) {
            if (!map[key]) map[key] = { dateKey: key, receiptQty: 0, productionCount: 0 };
            map[key].receiptQty = Number(r.receiptQty) || 0;
        }
    });

    productions.forEach(p => {
        const key = p.dateKey;
        if (key) {
            if (!map[key]) map[key] = { dateKey: key, receiptQty: 0, productionCount: 0 };
            map[key].productionCount = Number(p.productionCount) || 0;
        }
    });

    return Object.values(map)
        .sort((a, b) => a.dateKey.localeCompare(b.dateKey))
        .map(item => ({
            ...item,
            displayDate: formatMonth(item.dateKey)
        }));
};

/**
 * Merges weekly data and creates dynamic keys for each car model.
 */
const mergeWeeklyTimeline = (receiptsWeekly, productionsWeekly) => {
    const map = {};
    const carModelsSet = new Set();

    // 1. Process receipts
    receiptsWeekly.forEach(r => {
        const key = r.dateKey;
        if (key) {
            if (!map[key]) map[key] = { dateKey: key, receiptQty: 0, totalProductionCount: 0, productionModels: {} };
            map[key].receiptQty = Number(r.receiptQty) || 0;
        }
    });

    // 2. Process productions
    productionsWeekly.forEach(p => {
        const key = p.dateKey;
        const modelName = p.modelName || 'Unknown Model';
        carModelsSet.add(modelName);

        if (key) {
            if (!map[key]) map[key] = { dateKey: key, receiptQty: 0, totalProductionCount: 0, productionModels: {} };
            const count = Number(p.productionCount) || 0;
            map[key].productionModels[modelName] = count;
            map[key].totalProductionCount += count;
        }
    });

    // 3. Convert map to array and assign model values
    const weeklyTimeline = Object.values(map)
        .sort((a, b) => a.dateKey.localeCompare(b.dateKey))
        .map(item => {
            const flattened = {
                dateKey: item.dateKey,
                displayDate: formatDateRange(item.dateKey),
                receiptQty: item.receiptQty,
                totalProductionCount: item.totalProductionCount
            };

            // Set all active car model counts for Recharts stacked bars
            carModelsSet.forEach(model => {
                flattened[model] = item.productionModels[model] || 0;
            });

            return flattened;
        });

    return {
        weeklyTimeline,
        carModels: Array.from(carModelsSet)
    };
};

const getDashboardAnalytics = async () => {
    try {
        const [
            receiptsMonthly,
            productionsMonthly,
            receiptsWeekly,
            productionsWeekly,
            summary,
            statusBreakdown
        ] = await Promise.all([
            findReceiptsMonthly(),
            findProductionsMonthly(),
            findReceiptsWeekly(),
            findProductionsWeekly(),
            getSummaryStats(),
            getStatusBreakdown()
        ]);

        const monthlyTimeline = mergeMonthlyTimeline(receiptsMonthly, productionsMonthly);
        const { weeklyTimeline, carModels } = mergeWeeklyTimeline(receiptsWeekly, productionsWeekly);

        const totalProduction = Number(summary.totalProduction) || 0;
        const completedProduction = Number(summary.completedProduction) || 0;
        const completionRate = totalProduction > 0 ? Math.round((completedProduction / totalProduction) * 100) : 0;

        return {
            status: 200,
            data: {
                summary: {
                    totalReceiptsQty: Number(summary.totalReceiptsQty) || 0,
                    activeProduction: Number(summary.activeProduction) || 0,
                    completedProduction: completedProduction,
                    completionRate
                },
                statusBreakdown,
                monthlyTimeline,
                weeklyTimeline,
                carModels
            }
        };
    } catch (err) {
        console.error('Error in getDashboardAnalytics Service:', err);
        return {
            status: 500,
            data: { message: 'Internal Server Error: ' + err.message }
        };
    }
};

module.exports = {
    getDashboardAnalytics
};
```

---

### Step 1.3: Create the Dashboard Controller
Create `be/src/api/dashboard/dashboard.controller.js`:

```javascript
// File: be/src/api/dashboard/dashboard.controller.js
const express = require('express');
const router = express.Router();
const authorize = require('../../../middlewares/authorize');
const { getDashboardAnalytics } = require('./dashboard.service');

// Protect route with authorize middleware
router.use(authorize);

// GET /api/dashboard/analytics
router.get('/analytics', async (req, res, next) => {
    const serviceResponse = await getDashboardAnalytics();
    return res.status(serviceResponse.status).json(serviceResponse.data);
});

module.exports = router;
```

---

### Step 1.4: Register the Route
Modify your `be/src/router.js` file to mount the dashboard controller under the `/dashboard` path:

```diff
// File: be/src/router.js
+ const dashboardRouter = require('./api/dashboard/dashboard.controller');

  router.use('/material', materialRouter);
  // ... (existing routes)
  router.use('/inventory', inventoryRouter);
+ router.use('/dashboard', dashboardRouter);
```

---

## Part 2: Frontend Implementation

### Step 2.1: Install Recharts
Run in the `fe` directory:
```bash
npm install recharts
```

---

### Step 2.2: Create Frontend API Hook
Create `fe/src/features/dashboard/api/get-dashboard-analytics.ts` to fetch from the new endpoint using TanStack query:

```typescript
// File: fe/src/features/dashboard/api/get-dashboard-analytics.ts
import { queryOptions, useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';

export type DashboardAnalyticsResponse = {
  summary: {
    totalReceiptsQty: number;
    activeProduction: number;
    completedProduction: number;
    completionRate: number;
  };
  statusBreakdown: { name: string; value: number }[];
  monthlyTimeline: any[];
  weeklyTimeline: any[];
  carModels: string[]; // List of models produced
};

export const getDashboardAnalytics = (): Promise<DashboardAnalyticsResponse> => {
  return api.get('/dashboard/analytics');
};

export const getDashboardAnalyticsQueryOptions = () => {
  return queryOptions({
    queryKey: ['dashboard-analytics'],
    queryFn: getDashboardAnalytics,
  });
};

type UseDashboardAnalyticsOptions = {
  queryConfig?: QueryConfig<typeof getDashboardAnalyticsQueryOptions>;
};

export const useDashboardAnalytics = ({ queryConfig }: UseDashboardAnalyticsOptions = {}) => {
  return useQuery({
    ...getDashboardAnalyticsQueryOptions(),
    ...queryConfig,
  });
};
```

---

### Step 2.3: Create visual DashboardCharts Component
Create `fe/src/features/dashboard/components/dashboard-charts.tsx`. In the weekly view, it renders a stacked Bar chart mapping over each car model with beautiful colors. In the monthly view, it renders a clean purple Area chart representing total production:

```tsx
// File: fe/src/features/dashboard/components/dashboard-charts.tsx
import { useState } from 'react';
import {
  ComposedChart,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  TrendingUp,
  PackageCheck,
  Flame,
  CheckCircle,
} from 'lucide-react';
import { DashboardAnalyticsResponse } from '../api/get-dashboard-analytics';

interface DashboardChartsProps {
  data: DashboardAnalyticsResponse;
}

const STATUS_COLORS = {
  'Completed': '#10B981',
  'In Progress': '#8B5CF6',
  'Draft Order': '#F59E0B',
  'Cancelled': '#EF4444',
  'Unknown': '#9CA3AF',
};

// Premium palette for different car models in stacked bars
const CAR_MODEL_COLORS = [
  '#8B5CF6', // Indigo
  '#EC4899', // Pink
  '#06B6D4', // Cyan
  '#F59E0B', // Amber
  '#10B981', // Emerald
  '#EF4444', // Rose Red
  '#3B82F6', // Blue
];

const getColorForIndex = (index: number) => {
  return CAR_MODEL_COLORS[index % CAR_MODEL_COLORS.length];
};

export const DashboardCharts = ({ data }: DashboardChartsProps) => {
  const [groupBy, setGroupBy] = useState<'week' | 'month'>('month');

  // Toggle between pre-aggregated backend timelines
  const timelineData = groupBy === 'month' ? data.monthlyTimeline : data.weeklyTimeline;

  return (
    <div className="space-y-6">
      {/* 1. Header & Grouping Selector */}
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Plant Analytics</h2>
          <p className="text-sm text-muted-foreground">
            Visual inbound receipt quantities compared to production outputs.
          </p>
        </div>
        <div className="inline-flex rounded-md shadow-sm bg-muted p-1">
          <button
            onClick={() => setGroupBy('week')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
              groupBy === 'week'
                ? 'bg-white text-black shadow-sm'
                : 'text-muted-foreground hover:text-black'
            }`}
          >
            Per Week
          </button>
          <button
            onClick={() => setGroupBy('month')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
              groupBy === 'month'
                ? 'bg-white text-black shadow-sm'
                : 'text-muted-foreground hover:text-black'
            }`}
          >
            Per Month
          </button>
        </div>
      </div>

      {/* 2. Key Performance Indicators Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* KPI: Materials Inbound */}
        <div className="rounded-xl border bg-card p-6 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Total Material Inflow</span>
            <PackageCheck className="size-5 text-blue-500" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-bold">{data.summary.totalReceiptsQty.toLocaleString()}</span>
            <span className="text-xs text-muted-foreground">units</span>
          </div>
        </div>

        {/* KPI: Active Production */}
        <div className="rounded-xl border bg-card p-6 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Active Production</span>
            <Flame className="size-5 text-purple-500 animate-pulse" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-purple-600">{data.summary.activeProduction}</span>
            <span className="text-xs text-muted-foreground">runs</span>
          </div>
        </div>

        {/* KPI: Completed Production */}
        <div className="rounded-xl border bg-card p-6 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Completed Production</span>
            <CheckCircle className="size-5 text-emerald-500" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-emerald-600">{data.summary.completedProduction}</span>
            <span className="text-xs text-muted-foreground">runs</span>
          </div>
        </div>

        {/* KPI: Completion Rate */}
        <div className="rounded-xl border bg-card p-6 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Completion Rate</span>
            <TrendingUp className="size-5 text-amber-500" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-bold">{data.summary.completionRate}%</span>
            <div className="w-full bg-gray-100 rounded-full h-1.5 dark:bg-gray-700 ml-2 self-center">
              <div
                className="bg-amber-500 h-1.5 rounded-full"
                style={{ width: `${data.summary.completionRate}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Charts Panel */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Trend Composed Chart (Inflow vs Production Outputs) */}
        <div className="md:col-span-2 rounded-xl border bg-card p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-semibold">
              {groupBy === 'week' ? 'Weekly Car Model Output vs. Inflow' : 'Monthly Production Outputs vs. Inflow'}
            </h3>
            <p className="text-xs text-muted-foreground mb-4">
              {groupBy === 'week'
                ? 'Weekly breakdown of production by Car Model (stacked bars) compared with total material inflows.'
                : 'Monthly view of Total Production runs compared with total material inflows.'}
            </p>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={timelineData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorReceipt" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.0}/>
                  </linearGradient>
                  <linearGradient id="colorProduction" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                <XAxis
                  dataKey="displayDate"
                  tickLine={false}
                  axisLine={false}
                  fontSize={12}
                  tickMargin={8}
                />
                <YAxis
                  yAxisId="left"
                  tickLine={false}
                  axisLine={false}
                  fontSize={11}
                  label={{ value: 'Material Qty Received', angle: -90, position: 'insideLeft', offset: 10, fontSize: 10 }}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  tickLine={false}
                  axisLine={false}
                  fontSize={11}
                  label={{ value: 'Production Output', angle: 90, position: 'insideRight', offset: 10, fontSize: 10 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    borderColor: 'transparent',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
                <Legend iconSize={10} verticalAlign="top" height={36} iconType="circle" />
                
                {/* Always show inbound material receipts as a background area curve */}
                <Area
                  yAxisId="left"
                  type="monotone"
                  dataKey="receiptQty"
                  name="Materials Restocked (Qty)"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorReceipt)"
                />

                {/* Switch between stacked car models (Weekly) and total aggregate area (Monthly) */}
                {groupBy === 'week' ? (
                  data.carModels.map((model, index) => (
                    <Bar
                      key={model}
                      yAxisId="right"
                      dataKey={model}
                      stackId="production"
                      name={model}
                      fill={getColorForIndex(index)}
                      radius={[index === data.carModels.length - 1 ? 4 : 0, index === data.carModels.length - 1 ? 4 : 0, 0, 0]}
                    />
                  ))
                ) : (
                  <Area
                    yAxisId="right"
                    type="monotone"
                    dataKey="productionCount"
                    name="Production (Total Runs)"
                    stroke="#8B5CF6"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorProduction)"
                  />
                )}
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Status Donut Chart */}
        <div className="rounded-xl border bg-card p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-semibold">Production Status Split</h3>
            <p className="text-xs text-muted-foreground mb-4">
              Operational state distribution of all orders.
            </p>
          </div>
          <div className="h-64 flex justify-center items-center">
            {data.statusBreakdown.length === 0 ? (
              <p className="text-sm text-muted-foreground">No production data available</p>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data.statusBreakdown}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {data.statusBreakdown.map((entry, index) => {
                      const color =
                        STATUS_COLORS[entry.name as keyof typeof STATUS_COLORS] ||
                        STATUS_COLORS.Unknown;
                      return <Cell key={`cell-${index}`} fill={color} />;
                    })}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(0, 0, 0, 0.8)',
                      borderColor: 'transparent',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '12px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
          {/* Status Donut Legend */}
          <div className="flex flex-wrap gap-x-4 gap-y-2 justify-center pt-2 border-t text-xs">
            {data.statusBreakdown.map((entry) => {
              const color =
                STATUS_COLORS[entry.name as keyof typeof STATUS_COLORS] ||
                STATUS_COLORS.Unknown;
              return (
                <div key={entry.name} className="flex items-center gap-1.5">
                  <span
                    className="size-2.5 rounded-full inline-block"
                    style={{ backgroundColor: color }}
                  ></span>
                  <span className="text-muted-foreground font-medium text-xs">
                    {entry.name}: <span className="text-black">{entry.value}</span>
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
```

---

### Step 2.4: Integrate in Dashboard Page Route
Update `fe/src/app/routes/app/dashboard.tsx` to read from the unified backend API endpoint:

```tsx
// File: fe/src/app/routes/app/dashboard.tsx
import { ContentLayout } from '@/components/layouts';
import { useUser } from '@/lib/auth';
import { useDashboardAnalytics } from '@/features/dashboard/api/get-dashboard-analytics';
import { DashboardCharts } from '@/features/dashboard/components/dashboard-charts';

const DashboardRoute = () => {
  const user = useUser();
  const analyticsQuery = useDashboardAnalytics();

  return (
    <ContentLayout title="Dashboard">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">
          Welcome back, {user.data?.firstName || 'User'}
        </h1>
        <p className="text-sm text-muted-foreground">
          Here is a summary of the plant's production stats.
        </p>
      </div>

      {analyticsQuery.isLoading ? (
        <div className="flex h-72 items-center justify-center rounded-xl border bg-card p-6 shadow-sm">
          <div className="flex flex-col items-center gap-2">
            <div className="size-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            <span className="text-sm font-semibold text-muted-foreground">Loading dashboard analytics...</span>
          </div>
        </div>
      ) : analyticsQuery.isError ? (
        <div className="rounded-xl border border-destructive bg-destructive/10 p-6 text-destructive">
          Error loading dashboard analytics. Please try again later.
        </div>
      ) : (
        <DashboardCharts data={analyticsQuery.data} />
      )}
    </ContentLayout>
  );
};

export default DashboardRoute;
```
