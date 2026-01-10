/**
 * DASHBOARD MODULE - VIEW PLACEHOLDER
 * Main dashboard view component
 */

import { Card, CardHeader, CardTitle, CardContent } from '@design-system/components';

function DashboardView() {
    return (
        <div className="dashboard-view">
            <h1>Dashboard</h1>
            <p>Vista principal del Green Chemistry Cockpit</p>

            {/* Placeholder cards for dashboard widgets */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
                <Card>
                    <CardHeader>
                        <CardTitle>Green Score Global</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {/* Score component placeholder */}
                        <p>Componente de Score se implementará aquí</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Alertas Regulatorias</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {/* Alerts component placeholder */}
                        <p>Componente de Alertas se implementará aquí</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Procesos Activos</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {/* Processes list placeholder */}
                        <p>Lista de procesos se implementará aquí</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default DashboardView;
