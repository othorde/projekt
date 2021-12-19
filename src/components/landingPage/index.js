import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
// components
import Loader from '../../components/Loader'
// style
import {Wrapper} from "./Form.styles";
//other
import AppContext from "../../AppContext";
import Api from "../../Api";
import {defaultConfigAuthenticate, PROXY_URL } from '../../config'

require('dotenv').config()

/* Hämtar ut url koden. Skickar sedan koden till backend.
   Så att den kan göra de request som behövs till github. 
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
	}, []);

  	async function getGitInfo() {

		try {
			let res;
			let result;
			setLoggedInUser("Not OK")
			myContext.toggleAuth(false);
			// skickar till backend vad den ska göra
			res = await (
				await fetch(PROXY_URL, {
					...defaultConfigAuthenticate,
					body: JSON.stringify({
						code: requestData.code,
					})
				})).json();
			/* loggar in genom api och sätter user värden i localStorage samt i hook */
			if (res && res.login) {
				result = await Api.logginUserViaGit(res.login)
				if (result && result.data.type === "success") {
					localStorage.clear();
					localStorage.setItem('user', JSON.stringify(res.login));
					localStorage.setItem('tag', JSON.stringify(result.data.user.tag));
					localStorage.setItem('id', JSON.stringify(result.data.user.id));

					const user = {
						user: res.login,
						tag: result.data.user.tag,
						id: result.data.user.id,
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

	/* Om logged in ändras och är true navigera till home */
	useEffect(() => {
		let tag = localStorage.getItem("tag");
		if(loggedInUser === true && tag) {
			navigate("/login/home")
		}
	}, [loggedInUser, setLoggedInUser])


	console.log(loggedInUser)

  return (
    <Wrapper>
		{!loggedInUser === "Not OK" ? <p>Det gick inte att logga in just nu</p> 
		: (<Loader></Loader>)}
    </Wrapper>
  );
}
