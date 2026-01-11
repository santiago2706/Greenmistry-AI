/**
 * GREEN CHEMISTRY COCKPIT - ROUTES
 * Application route definitions with lazy loading
 */

import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Loader } from '@design-system/components';

// Lazy load modules for code splitting
const Dashboard = lazy(() => import('@modules/dashboard/views/DashboardView'));
const ProcessAnalysis = lazy(() => import('@modules/process-analysis/views/ProcessAnalysisView'));
const ProcessOverview = lazy(() => import('@modules/process-analysis/views/ProcessOverviewView'));
const EnvironmentalReport = lazy(() => import('@modules/environmental-report/views/EnvironmentalImpactView'));
const OptimizationEngine = lazy(() => import('@modules/optimization-engine/views/OptimizationView'));
const Regulatory = lazy(() => import('@modules/regulatory/views/RegulatoryComplianceView'));
const DemoMode = lazy(() => import('@modules/demo-mode/views/DemoView'));

// Loading fallback
const PageLoader = () => (
    <div className="page-loader">
        <Loader size="lg" />
    </div>
);

export function AppRoutes() {
    return (
        <Suspense fallback={<PageLoader />}>
            <Routes>
                {/* Dashboard - Home */}
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<Dashboard />} />

                {/* Process Analysis */}
                <Route path="/process-overview" element={<ProcessOverview />} />
                <Route path="/processes" element={<ProcessAnalysis />} />
                <Route path="/processes/:id" element={<ProcessAnalysis />} />

                {/* Environmental Report */}
                <Route path="/environmental-report" element={<EnvironmentalReport />} />

                {/* Optimization Engine */}
                <Route path="/optimization" element={<OptimizationEngine />} />

                {/* Regulatory Compliance */}
                <Route path="/regulatory" element={<Regulatory />} />

                {/* Demo Mode */}
                <Route path="/demo" element={<DemoMode />} />

                {/* 404 Fallback */}
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
        </Suspense>
    );
}
