import styled from "styled-components";




export const Content = styled.div `

	position: relative;
	display: inline-block;

`;

export const UserInfo = styled.div `

	background-color: #f9f9f9;
	min-width: 160px;
	box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
	padding: 12px 16px;
	z-index: 1;

	font-size: 0.9em;
	border-radius: 5px 5px 5px 5px;
	overflow: hidden;
	box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
	background-color: #C6F4F4;

	caption {
		font-weight: bold;
		text-align: left;
	}

	table {
		border: 1px solid #ccc;
		border-collapse: collapse;
		padding: 0;
		width: 100%;
		table-layout: fixed;
		min-width: 160px;

	}
	
	table caption {
		font-size: 1.5em;
		margin: .5em 0 .75em;
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
		font-size: .85em;
		letter-spacing: .1em;
		text-transform: uppercase;
	}

	tbody tr {
		border-bottom: 2px solid #1f2a32;
	}
	
	@media screen and (max-width: 1200px) {
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
			border-bottom: 3px solid #ddd;
			display: block;
			margin-bottom: .625em;
		}
		
		table td {
			border-bottom: 1px solid #ddd;
			display: block;
			font-size: .8em;
			text-align: right;
		}
		
		table td::before {
			content: attr(data-label);
			float: left;
			font-weight: bold;
			text-transform: uppercase;
		}
		
		table td:last-child {
			border-bottom: 0;
		}
	}
	  


`;