import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from '@router/routes';
import { AppLayout } from '@design-system/layouts';
import { NotificationProvider } from '@shared/components/Notification/NotificationProvider';
import { InsightDataStrip } from '@shared/components/Insight/InsightDataStrip';

function App() {
    return (
        <BrowserRouter>
            <NotificationProvider />
            <InsightDataStrip />
            <AppLayout>
                <AppRoutes />
            </AppLayout>
        </BrowserRouter>
    );
}

export default App;
