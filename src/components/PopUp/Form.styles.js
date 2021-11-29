import styled from "styled-components";

export const PopUpStyle = styled.div `{

    background-color: #C6F4F4;
	height: 100%;
	width: 100%;
    text-align: left;
    box-shadow: 0 10 20px rgb(0 0 0 / 15%);
    padding: 1em;
    margin: 3em 0em 1em 0em;
	border: 2px solid black;
    
    div {
        
        display: flex;
        flex-direction: column;

        
    }

    table {
		position: relative;
		border: 1px solid #ccc;
		border-collapse: collapse;
		padding: 0;
		width: 100%;
		table-layout: fixed;
		
	}
	
	table caption {
		font-size: 1.5em;
		margin: .5em 0 .75em;
		font-weight: bold;

	}
	thead tr{
		color: #ffffff;
		text-aling: left;
		font-weight:bold;
		
	}
	th {
		background-color: #1f2a32;
	}
	
	table tr {
		background-color: #f8f8f8;
		border: 1px solid #ddd;
		padding: .35em;
	}
	
	table th,
	table td {
		padding: 12px 8px;
		text-align: center;
		font-size: 0.9em;
		word-wrap:break-word;
	}
	
	table th {
		font-size: .9em;
		letter-spacing: .1em;
		text-transform: uppercase;
	}

	tbody tr {
		border-bottom: 1px solid #1f2a32;
		
	}

    table tr:nth-child(even) {
        background: #ccc;
    }
	
	
	@media (max-width: 720px) {
		flex-direction: column;
		width: 100%;
		height: 100%;
		padding: 0em;
    }

	@media screen and (max-width: 1000px) {
		flex-direction: column;
		width: 100%;
		height: 100%;
	    padding: 0em;

		
		table {
			border: 0;

		}
	
		table caption {
			font-size: 1.3em;
		}
		
		table thead {
			border: none;
			clip: rect(0 0 0 0);
			height: 1px;
			margin: -1px;
			overflow: hidden;
			padding: 0;
			position: absolute;
			width: 1px;
		}
		
		table tr {
			display: block;
			margin: 0em 1em 1em 1em;
		}
		
		table td {
			border-bottom: 1px solid #ddd;
			display: block;
			font-size: .9em;
			text-align: right;
		}

		table td::before {
			content: attr(data-label);
			float: left;
			font-weight: bold;
			text-transform: uppercase;
		}
		
        table tr:nth-child(even) {
            background: #f8f8f8;
        }

		table td:last-child {
			border-bottom: 0;
		}
	}   

}


button {
    margin-bottom: 1em;
	width: 100%;
	max-width: 15em;
	background: #292929;
	color: #F1F1F1;
	border: 1px solid #ffd343;
	:hover {
		background: #ffd343;
		color: black;
		border: 1px solid black;
	}

	@media screen and (max-width: 1000px) {
		margin: 1em;
	}
}

select {
    margin: 2em 1em 2em 0em;
    padding: 0.7em;
	width: 100%;
	max-width: 20em;
	font-size: 0.9em;
	@media screen and (max-width: 1000px) {
		margin: 1em;
	}

}
p {
    padding: 0em;
    margin: 0em;
    display: inline;
    font-size: 1.2em;
    font-weight: bold;
}

}
`;