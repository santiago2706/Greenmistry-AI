import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from '@router/routes';
import { AppLayout } from '@design-system/layouts';

function App() {
    return (
        <BrowserRouter>
            <AppLayout>
                <AppRoutes />
            </AppLayout>
        </BrowserRouter>
    );
}

export default App;
