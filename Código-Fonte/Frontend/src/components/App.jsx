import React from "react";
import axios from "axios";
import Login from "./Login.jsx";
import InsertVenda from "./InsertVenda.jsx";
import Dashboard from "./Dashboard.jsx";
import InsertProduto from "./InsertProduto.jsx";
import InsertCliente from "./InsertCliente.jsx";
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Chart from './Chart';
import Deposits from './Deposits';
import Orders from './Orders';
import { Route, Routes, useNavigate } from "react-router-dom";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

import {
	Button,
	Stack,
} from "@mui/material";

{/*axios.defaults.baseURL = "http://localhost:3010/";
axios.defaults.headers.common["Content-Type"] =
	"application/json;charset=utf-8";
*/}
//<InsertCliente></InsertCliente>
//<Login></Login>
function App(){
	const drawerWidth = 240;
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
	const [title, setTitle] = React.useState("Dashboard");
    const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
    })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
        }),
    }),
    }));

    const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        boxSizing: 'border-box',
        ...(!open && {
            overflowX: 'hidden',
            transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
            }),
            width: theme.spacing(7),
            [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
            },
        }),
        },
    }),
    );

    // TODO remove, this demo shouldn't need to reset the theme.
    const defaultTheme = createTheme();

    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };
	const navigate = useNavigate();

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

	{/*isLoggedIn ? (	 ) : (<Login onLogin={handleLogin} />)*/}
    return (
		<>
		<ThemeProvider theme={defaultTheme}>
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="absolute" open={open}>
            <Toolbar
                sx={{
                pr: '24px', // keep right padding when drawer closed
                }}
            >
                <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer}
                sx={{
                    marginRight: '36px',
                    ...(open && { display: 'none' }),
                }}
                >
                <MenuIcon />
                </IconButton>
                <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
                >
                {title}
                </Typography>
                <IconButton color="inherit">
                <Badge badgeContent={0} color="secondary">
                    <NotificationsIcon />
                </Badge>
                </IconButton>
            </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
            <Toolbar
                sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                px: [1],
                }}
            >
                <IconButton onClick={toggleDrawer}>
                <ChevronLeftIcon/>
                </IconButton>
            </Toolbar>
            <Divider />
            <List component="nav">
			<React.Fragment>
				<ListItemButton

					variant="link"
					onClick={() => {
						setTitle("Dashboard");
						navigate("/");
					}}>
				<ListItemIcon>
					<DashboardIcon />
				</ListItemIcon>
				<ListItemText primary="Dashboard" />
				</ListItemButton>
				<ListItemButton
					variant="link"
					onClick={() => {
						setTitle("Vender");
						navigate("/venda");
					}}>
				<ListItemIcon>
					<ShoppingCartIcon />
				</ListItemIcon>
				<ListItemText primary="Vender" />
				</ListItemButton>
				<ListItemButton
					variant="link"
					onClick={() => {
						setTitle("Produtos");
						navigate("/produtos");
					}}>
				<ListItemIcon>
					<AddShoppingCartIcon />
				</ListItemIcon>
				<ListItemText primary="Produtos" />
				</ListItemButton>
				<ListItemButton 		
					variant="link"
					onClick={() => {
						setTitle("Clientes");
						navigate("/clientes");
					}}>
				<ListItemIcon>
					<PeopleIcon />
				</ListItemIcon>
				<ListItemText primary="Clientes" />
				</ListItemButton>
				<ListItemButton
					variant="link"
					onClick={() => {
						setTitle("Relatórios");
						navigate("/relatorios");
					}}>
				<ListItemIcon>
					<BarChartIcon />
				</ListItemIcon>
				<ListItemText primary="Relatórios" />
				</ListItemButton>
			</React.Fragment>
                <Divider sx={{ my: 1 }} />
            </List>
            </Drawer>

     </Box>
	 <Grid container justifyContent="center" spacing={2}>
						<Grid >
							<Routes>
								<Route
									path="login"
									element={<Login onLogin={handleLogin} />}
								/>
								<Route
									path="/"
									element={
										<Dashboard
										/>
									}
								/>
								<Route
									path="clientes"
									element={
										<InsertCliente/>
									}
								/>
                                <Route
									path="produtos"
									element={
										<InsertProduto/>
									}
								/>
                                <Route
									path="venda"
									element={
										<InsertVenda/>
									}
								/>

							</Routes>
						</Grid>
			</Grid>
	 </ThemeProvider>
	 
	</>
    );
}

export default App;