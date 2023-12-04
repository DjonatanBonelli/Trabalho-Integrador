import React from "react";
import axios from "axios";
import Login from "./Login.jsx";
import Dashboard from "./Dashboard.jsx";
import InsertProduto from "./InsertProduto.jsx";
import InsertCliente from "./InsertCliente.jsx";
import NavBar from "./NavBar.jsx";

import { Route, Routes, useNavigate } from "react-router-dom";
import {
	Box,
	Button,
	Container,
	CssBaseline,
	Grid,
	Stack,
} from "@mui/material";

axios.defaults.baseURL = "http://localhost:3010/";
axios.defaults.headers.common["Content-Type"] =
	"application/json;charset=utf-8";

//<InsertCliente></InsertCliente>
//<Login></Login>
function App(){

    const [isLoggedIn, setIsLoggedIn] = React.useState(false);

	React.useEffect(() => {
		// verifica se já está logado
		const token = localStorage.getItem("token");
		if (token) {
			setIsLoggedIn(true);
		}
	}, []);

	const handleLogin = () => {
		setIsLoggedIn(true);
	};

	const handleLogout = () => {
		// Clear the token from localStorage
		localStorage.removeItem("token");
		setIsLoggedIn(false);
	};

    return (
        <>
        {isLoggedIn ? (
            <>
            <NavBar></NavBar>
            <Routes>
                <Route
                    path="login"
                    element={<Login onLogin={handleLogin} />}
                />




            </Routes>
            </>
        ) : (<Login onLogin={handleLogin} />)}
        </>
    );
}

export default App;