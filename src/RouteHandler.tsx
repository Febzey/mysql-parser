import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index                            from './pages/Index';

const RouteHandler = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Index />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
};

export default RouteHandler;