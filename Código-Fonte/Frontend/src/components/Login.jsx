import * as React from 'react';
import axios from "axios";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
//import Link from '@mui/material/Link';
//import Grid from '@mui/material/Grid';
import {
	Alert,
	Box,
	Button,
	Snackbar,
	Stack,
	TextField,
  Typography,
  Container,
  Checkbox,
  FormControlLabel,
  CssBaseline,
  Avatar
} from "@mui/material";

//import { createTheme, ThemeProvider } from '@mui/material/styles';

//const defaultTheme = createTheme();

export default function Login(props) {
  const [email, setEmail] = React.useState("");
	const [passwd, setPasswd] = React.useState("");

	const [openMessage, setOpenMessage] = React.useState(false);
	const [messageText, setMessageText] = React.useState("");
	const [messageSeverity, setMessageSeverity] = React.useState("success");

	async function enviaLogin(event) {
		event.preventDefault();
		try {
			const response = await axios.post("http://localhost:3010/login", {
				email: email,
				password: passwd,
			});
			console.log(response);
			if (response.status >= 200 && response.status < 300) {
				// Salva o token JWT na sessão
				localStorage.setItem("token", response.data.token);
				// seta o estado do login caso tudo deu certo
				props.onLogin();
			} else {
				// falha
				console.error("Falha na autenticação");
			}
		} catch (error) {
			console.log(error);
			setOpenMessage(true);
			setMessageText("Falha ao logar usuário!");
			setMessageSeverity("error");
		}
	}

  function handleCloseMessage(_, reason) {
		if (reason === "clickaway") {
			return;
		}
		setOpenMessage(false);
	}

  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            bgcolor: 'white',
            p: '2rem',
            borderRadius: '2rem',
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email-input"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="passwd-input"
              autoComplete="current-password"
              value={passwd}
              onChange={(event) => {
                setPasswd(event.target.value);
              }}
            />
           {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />*/}
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={enviaLogin}
            >
              Sign In
            </Button>
				<Snackbar
					open={openMessage}
					autoHideDuration={6000}
					onClose={handleCloseMessage}
				>
					<Alert
						severity={messageSeverity}
						onClose={handleCloseMessage}
					>
						{messageText}
					</Alert>
				</Snackbar>
          </Box>
        </Box>
      </Container>
  );
}