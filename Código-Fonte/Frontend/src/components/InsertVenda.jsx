import * as React from 'react';
import {Stack, Select, MenuItem, TextField, Button, Typography, Snackbar, Alert, Box} from '@mui/material';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import axios from 'axios';
import { Label } from 'recharts';

export default function InsertVenda(){
    const [listaVendas, setListaVendas] = React.useState([]);

    const [valor, setValor] = React.useState("");
    const [metpag, setMetPag] = React.useState("Dinheiro");
    const [openMessage, setOpenMessage] = React.useState(false);
    const [messageText, setMessageText] = React.useState("");
    const [messageSeverity, setMessageSeverity] = React.useState("success");
  
  React.useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:3010/lista-vendas-geral", {
          headers: {
            Authorization: `bearer ${token}`,
          },});
        setListaVendas(res.data);
    } catch (error) {
        setListaVendas([]); 
    }
  }

  function preventDefault(event) {
    event.preventDefault();
  }
  function clearForm() {
      setValor("");
      setMetPag("");
  }

  function handleCancelClick() {
      if (valor !== "" || metpag !== "") {
          setMessageText("Cadastro de venda cancelado!");
          setMessageSeverity("warning");
          setOpenMessage(true);
      }
      clearForm();
  }

  async function handleDeleteClick(idv){
    try{
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3010/deletar-venda?idv=${idv}`, {
				headers: {
					Authorization: `bearer ${token}`,
				}
      },);
      setMessageText("Venda excluída com sucesso!");
      setMessageSeverity("success");
    } catch (error) {
      console.log(error);
      setMessageText("Falha na exclusão da venda!");
      setMessageSeverity("error");
    } finally {
      setOpenMessage(true);
      await getData();
    }
}

  function recover(row){
    setValor(row.valor);
    setMetPag(row.metpag);
    handleDeleteClick(row.idv);
  }

  async function handleSubmit() {
      if (valor !== "" && metpag !== "") {
          try {
              const token = localStorage.getItem("token");
              await axios.post("http://localhost:3010/inserir-venda", {
                  valor: valor,
                  metpag: metpag,
                  },{
                  headers: {
                    Authorization: `bearer ${token}`,
                  }},
              );

              setMessageText("Venda cadastrada com sucesso!");
              setMessageSeverity("success");
              clearForm(); // limpa o formulário apenas se cadastrado com sucesso
          } catch (error) {
              console.log(error);
              setMessageText("Falha no cadastro da venda!");
              setMessageSeverity("error");
          } finally {
              setOpenMessage(true);
              await getData();
          }
      } else {
          setMessageText("Dados de venda inválidos!");
          setMessageSeverity("warning");
          setOpenMessage(true);
      }
  }

  function handleCloseMessage(_, reason) {
      if (reason === "clickaway") {
          return;
      }
      setOpenMessage(false);
  }

  const metPag = [
    {
      value: 'Dinheiro',
      label: 'Dinheiro',
    },
    {
      value: 'Crédito',
      label: 'Crédito',
    },
    {
      value: 'Débito',
      label: 'Débito',
    },
    {
      value: 'Cheque',
      label: 'Cheque',
    }]
    const handleChange = (event) => {
      setMetPag(event.target.value);
};

    return(
        <React.Fragment>
        <div style={{position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', width: '75%', marginLeft: '10%'}}>
        <Box>
        <Title>Vender</Title>
              <Stack spacing={2}>
                <Stack spacing={2}>
                    <TextField
                        required
                        id="valor-input"
                        label="Valor da Venda"
                        size="small"
                        onChange={(e) => setValor(e.target.value)}
                        value={valor}
                    />
                    <Box>
                  <label>Método de Pagamento: 
                  </label>
                  <Select
                    style={{width: '20%', height: '35px', marginLeft: '10px'}}
                    value={metpag}
                    onChange={handleChange}
                    >  
                    {metPag.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                  </Select>
                      </Box>
                      
                </Stack>
                <Stack direction="row" spacing={3}>
                    <Button
                        variant="contained"
                        style={{
                            maxWidth: "100px",
                            minWidth: "100px",
                        }}
                        onClick={handleSubmit}
                        type="submit"
                        color="primary"
                    >
                        Enviar
                    </Button>
                    <Button
                        variant="outlined"
                        style={{
                            maxWidth: "100px",
                            minWidth: "100px",
                        }}
                        onClick={handleCancelClick}
                        color="error"
                    >
                        Cancelar
                    </Button>
                </Stack>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Data</TableCell>
              <TableCell>Hora</TableCell>
              <TableCell>Valor</TableCell>
              <TableCell>Método de Pagamento</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listaVendas.map((row) => (
              <TableRow key={row.idv}>
                <TableCell>{row.idv}</TableCell>
                <TableCell>{row.dtvenda}</TableCell>
                <TableCell>{row.hrvenda}</TableCell> 
                <TableCell>{row.valorv}</TableCell> 
                <TableCell>{row.metpag}</TableCell> 
                <TableCell align='right' style={{ padding: '0' }}>
                  <Button onClick={() => 
                  recover(row)}>Editar</Button>
                  <Button onClick={() => handleDeleteClick(row.idv)}>Excluir</Button>
                  </TableCell> 
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </Stack>
        {/* 
        <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
          Ver mais
        </Link>
        */} 
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
        </div>
      </React.Fragment>
    );
}