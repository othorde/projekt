import {React, useState, useEffect} from 'react';
import { Routes, Route, Navigate } from "react-router-dom";

import FormLogin from './components/FormLogin';
import Account from "./routes/Account";
import Admin from "./components/Admin";
import Loader from './components/loader/loader';
import AppContext from './AppContext';
import Header from './components/Header';
import Footer from './components/Footer'
import Welcome from './routes/welcome/welcome';
import Home from './routes/Home';
import History from './routes/History';
//logga in => spara användaruppgifter i state, state sätts av localStorage ? 


export default function App() {

	const [user, setUser] = useState("");
	const [auth, setAuth] = useState({}); // för att se om användare är inloggad

	useEffect(() => {
		let loggedInUser = localStorage.getItem("user");
		if (loggedInUser) {
			loggedInUser = JSON.parse(loggedInUser)
		  	setUser(loggedInUser);
		}
	  }, []);

	function PrivateRoute({ children }) {
		const authorized = auth;
		return authorized === true ? children : <Navigate to="/login" />;
	}  

    const toggleAuth = (value) => {
		setAuth(value)
    };

	const userInfo = {
		toggleAuth,
		user: user,
		auth: auth
	}

	return (
	<>
	<AppContext.Provider value={userInfo}>
	<Header/>
	<Routes>
		<Route path="/" element={ <Welcome/>} />
			<Route path="login" element={ <FormLogin/>} />
			<Route path="account" element={<Account/> } />
			<Route path="history" element={ <History/>} />
			<Route path="home" element={<PrivateRoute> <Home/> </PrivateRoute>} />
			<Route path="admin" element={<PrivateRoute> <Admin/> </PrivateRoute>} >
				<Route index element={
						<main style={{ padding: "1rem" }}>
							<p>Select an invoice</p>
						</main>
						}
				/>			
			</Route>
		{/* <Route path=":invoiceId" element={ <PrivateRoute> <Invoice/> </PrivateRoute> } />  */}
		<Route path="*" element={ <Loader/>}/>
	</Routes>
	<Footer/>
	</AppContext.Provider>

	</>
	)
}

