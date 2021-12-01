import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
// components
import Loader from '../loader/loader'
// style
import {Wrapper} from "./Form.styles";
//other
import AppContext from "../../AppContext";
import Api from "../../api";


require('dotenv').config()


export default function LandingPage() {
  const [loggedInUser, setLoggedInUser] = useState(Boolean);
  const navigate = useNavigate();
  const myContext = useContext(AppContext);        

  useEffect(() => {
    // Hämtar url från webbläsare
    const url = window.location.href;
    const hasCode = url.includes("?code=");

    // Om github skickar tillbaka kod
    if (hasCode) {
      const newUrl = url.split("?code=");
      window.history.pushState({}, null, newUrl[0]);
      
      const requestData = {
        code: newUrl[1]
      };

	  // skickar till backend vad den ska göra
      const proxy_url = "http://localhost:1337/api/oauth/authenticate";
		async function getGitInfo() {
			const defaultConfig = {
				method: 'POST',
				headers: {
				'Content-Type': 'application/json',
					"Access-Control-Allow-Origin": "*"
				},
			};

		try {
			const endpoint = `${proxy_url}`;
			let res;
			let result;
			res = await (
				await fetch(endpoint, {
					...defaultConfig,
					body: JSON.stringify({
						code: requestData.code,
					})
				})).json();

			/* HÄR MÅSTE KOLLA SÅ ATT LOGGIN ÄR OK FRÅN VÅRT API SÄTT SEN ALLA PARAMETRAR TILL ANVÄNDAREN
				FIXA SEN SÅ ATT HAN NAVIGERAS VIDARE TILL LOGINHOME
			*/
			// Om backend skickar användaruppg, be sen om att logga in användaren
			if (res && res.login) {
				result = await Api.logginUserViaGit(res.login)
				if (result && result.data.type === "success") {
					localStorage.clear();
					localStorage.setItem('user', JSON.stringify(res.login));
					localStorage.setItem('tag', JSON.stringify(result.data.user.tag));
					myContext.toggleAuth(true);
					setLoggedInUser(true)
				}
			} else {
				setLoggedInUser("Not OK")
				myContext.toggleAuth(false);
			}

		} catch (error) {
			console.log((error))
			setLoggedInUser("Not OK")
			myContext.toggleAuth(false);
		}
	}
	getGitInfo();
	}
  }, []);

	
	useEffect(() => {
		let tag = localStorage.getItem("tag");
		if(loggedInUser === true && tag) {
			navigate("/login/home")
		}
	}, [loggedInUser, setLoggedInUser])




  return (
    <Wrapper>
		{!loggedInUser == "Not OK" ? 
		<p>Det gick inte att logga in just nu</p> 
		: (
        	<Loader></Loader>
		)}
    </Wrapper>
  );
}
