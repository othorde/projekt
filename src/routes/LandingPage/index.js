import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
// components
import Loader from '../../components/Loader'
// style
import {Wrapper} from "./Form.styles";
//other
import AppContext from "../../AppContext";
import {logginUserViaGit} from "../../Api";
import {PROXY_URL, defaultConfigAuthenticate} from '../../config'

require('dotenv').config()

/* Hämtar ut url koden av github, som redirectar hit. Skickar sedan koden till backend
   så att den kan göra de request som behövs till github. 
   Får sedan tillbaka användaruppg, som används för att logga in användaren
   genom vårt api.
*/
export default function LandingPage() {
	const [loggedInUser, setLoggedInUser] = useState(Boolean);
	const navigate = useNavigate();
	const myContext = useContext(AppContext);        

	useEffect(() => {
		// Hämtar url från webbläsare
		const url = window.location.href;
		const hasCode = url.includes("?code=");

		// Om github skickar tillbaka kod, ta ut koden ur URL strängen
		if (hasCode) {
			const newUrl = url.split("?code=");
			window.history.pushState({}, null, newUrl[0]);
			const requestData = {
				code: newUrl[1]
			};
			getGitInfo(requestData);
		}

		
		/* tar emot reqData från useEffect, skickar till backend och tar emot inlogg uppg. mha info från github */
		async function getGitInfo(requestData) {
			
			setLoggedInUser("Not OK")
			myContext.toggleAuth(false);
			try {
				let res;
				let result;
				res = await (
					await fetch(PROXY_URL, {
						...defaultConfigAuthenticate,
						body: JSON.stringify({
							code: requestData.code,
						})
					})).json();
				/* loggar in genom api och sätter user värden i localStorage samt i hook */
				if (res && res.login) {
					result = await logginUserViaGit(res.login)
					if (result && result.data.type === "success") {
						localStorage.clear();
						localStorage.setItem('user', JSON.stringify(res.login));
						localStorage.setItem('tag', JSON.stringify(result.data.user.tag));
						localStorage.setItem('id', JSON.stringify(result.data.user.id));

						const user = {
							user: res.login,
							tag: result.data.user.tag,
							id: result.data.user.id,
							token: result.data.token
						}
						myContext.setUserValues(user)
						myContext.toggleAuth(true);
						setLoggedInUser(true)
					}
				}
			} catch (error) {
				setLoggedInUser("Not OK")
				myContext.toggleAuth(false);
			}
		}
	});

	/* När loggedInUser eller set ändras navigera till home
	   om tag är satt och loggedInUser är true */
	useEffect(() => {
		let tag = localStorage.getItem("tag");
		(loggedInUser === true && tag) && navigate("/login/home")
	}, [loggedInUser, setLoggedInUser, navigate])

	return (
		<Wrapper>
			{!loggedInUser === "Not OK" ? 
			<p>Det gick inte att logga in just nu</p> 
			: (
				<Loader></Loader>
			)}
		</Wrapper>
	);
}
