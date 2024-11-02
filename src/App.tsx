import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import { Layout } from './pages/components/Layout'
import { HOME_PATH } from './core/constants/routes'

function App() {
    return (
        <>
            <BrowserRouter>
                <Layout>
                    <Routes>
                        <Route path={HOME_PATH} element={<Home />} />
                    </Routes>
                </Layout>
            </BrowserRouter>
        </>
    )
}

export default App
