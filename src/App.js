import {React, useState, useEffect} from 'react';
import { Routes, Route, Navigate } from "react-router-dom";

import Loader from './components/loader/loader';
import AppContext from './AppContext';
import Header from './components/Header';
import Footer from './components/Footer'
import LandingPage from './components/landingPage';
import FormLogin from './routes/FormLogin';
import Account from "./routes/Account";
import Admin from "./routes/Admin";
import Welcome from './routes/welcome/welcome';
import Home from './routes/Home';
import History from './routes/History';
import Customers from './routes/Customers';
import Logg from './components/Logg';


export default function App() {

	const [userHook, setUserHook] = useState("");
	const [userLocal, setUserLocal] = useState("");
	const [auth, setAuth] = useState({}); // för att se om användare är inloggad

	useEffect(() => {
		let loggedInUser = localStorage.getItem("user");
		let tag = localStorage.getItem("tag");
		let id = localStorage.getItem("id");

		if (loggedInUser && tag) {
			loggedInUser = JSON.parse(loggedInUser)
			setUserLocal({user: loggedInUser, tag: tag, id:id});
		}
	  }, []);

	function PrivateRoute({ children }) {
		const authorized = auth;
		return authorized === true ? children : <Navigate to="/login" />;
	}  

    const toggleAuth = (value) => {
		setAuth(value)
    };

	const setUserValues = (value) => {
		setUserHook({value})
    };

	const userInfo = {
		setUserValues,
		toggleAuth,
		userLocal: userLocal,
		userHook: userHook,
		auth: auth
	}

	return (
	<>
	<AppContext.Provider value={userInfo}>
	<Header/>
	<Routes>
		<Route path="/" element={ <Welcome/>} />
		<Route path="login/landingpage" element={ <LandingPage/>} />
		<Route path="login" element={ <FormLogin/> } />
		<Route path="login/home" element={ <PrivateRoute> <Home/> </PrivateRoute>} />
		<Route path="account" element={ <PrivateRoute><Account/> </PrivateRoute>} />
		<Route path="history" element={ <PrivateRoute> <History/> </PrivateRoute>} />
		<Route path="customers" element={ <PrivateRoute> <Customers/> </PrivateRoute>} />
		<Route path="admin" element={<PrivateRoute> <Admin/> </PrivateRoute>} />
		<Route path="testing" element={<Logg/>} >
		</Route>
		<Route path="*" element={ <Loader/>}/>
	</Routes>
	<Footer/>
	</AppContext.Provider>

	</>
	)
}

