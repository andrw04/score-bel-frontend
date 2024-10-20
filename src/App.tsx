import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import SignIn from './pages/SignIn/SignIn'
import SignUp from './pages/SignUp/SignUp'
import { Layout } from './pages/components/Layout'

function App() {
    return (
        <>
            <BrowserRouter>
                <Layout>
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/login' element={<SignIn />} />
                        <Route path='/register' element={<SignUp />} />
                    </Routes>
                </Layout>
            </BrowserRouter>
        </>
    )
}

export default App
