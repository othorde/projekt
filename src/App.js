import {React, useState, useEffect} from 'react';
import { Routes, Route, Navigate } from "react-router-dom";

import Loader from './components/Loader';
import AppContext from './AppContext';
import Header from './components/Header';
import Footer from './components/Footer'
import LandingPage from './routes/LandingPage';
import FormLogin from './routes/FormLogin';
import Account from "./routes/Account";
import Admin from "./routes/Admin";
import Welcome from './routes/welcome/welcome';
import Home from './routes/Home';
import UserHistory from './routes/History';
import Customers from './routes/Customers';


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
		return auth === true ? children : <Navigate to="/login" />;
	}  

	// sätter auth true/false, om false kan man ej logga in
	// skickar med den i useContext, så andra komponenter kan nyttja den
    const toggleAuth = (value) => {
		setAuth(value)
    };

	// Togglar state, skickar med den i useContext, 
	// så andra komponenter kan nyttja den
	const setUserValues = (value) => {
		setUserHook({value})
    };

	/* Appcontext, fungerar som globala variabler */
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
		<Route path="history" element={ <PrivateRoute> <UserHistory/> </PrivateRoute>} />
		<Route path="customers" element={ <PrivateRoute> <Customers/> </PrivateRoute>} />
		<Route path="admin" element={<PrivateRoute> <Admin/> </PrivateRoute>} >
		</Route>
		<Route path="*" element={ <Loader/>}/>
	</Routes>
	<Footer/>
	</AppContext.Provider>

	</>
	)
}

