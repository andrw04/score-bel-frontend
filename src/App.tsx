import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import { Layout } from './pages/components/Layout'
import { HOME_PATH, MATCH_DETAILS_PATH, TOURNAMENTS_PATH } from './core/constants/routes'
import Tournaments from './pages/Tournaments/Tournament'
import MatchDetails from './pages/Match/MatchDetails'

function App() {
    return (
        <>
            <BrowserRouter>
                <Layout>
                    <Routes>
                        <Route path={HOME_PATH} element={<Home />} />
                        <Route path={TOURNAMENTS_PATH} element={<Tournaments/>}/>
                        <Route path={MATCH_DETAILS_PATH} element={<MatchDetails />} />
                    </Routes>
                </Layout>
            </BrowserRouter>
        </>
    )
}

export default App
