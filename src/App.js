import {createBrowserRouter, RouterProvider} from "react-router-dom";
import './App.css';
import {Header} from "./components/Header";
import {HomePage} from "./pages/HomePage";
import {ScraperPage} from "./pages/ScraperPage";
import {LoginPage} from "./pages/LoginPage";
import {RegisterPage} from "./pages/RegisterPage";
import {RegisterSuccess} from "./pages/RegisterSuccess";

const router = createBrowserRouter([
    {path: '/', element: <HomePage />, loader: async() => document.body.classList.remove('public-page')},
    {path: '/scraper', element: <ScraperPage />, loader: async() => document.body.classList.remove('public-page')},
    {path: '/login', element: <LoginPage />, loader: async() => document.body.classList.add('public-page')},
    {path: '/register', element: <RegisterPage />, loader: async() => document.body.classList.add('public-page')},
    {path: '/success', element: <RegisterSuccess />, loader: async() => document.body.classList.remove('public-page')}
]);
function App() {
    return (
        <div className="app">
            <Header/>
            <RouterProvider router={router} />
        </div>
    );
}


export default App;
