import * as React from 'react';
import {Stack, TextField, Button, Typography, Snackbar, Alert, Box} from '@mui/material';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import axios from 'axios';

export default function InsertVenda(){
    const [listaVendas, setListaVendas] = React.useState([]);

    const [nome, setNome] = React.useState("");
    const [valor, setValor] = React.useState("");
    const [data, setData] = React.useState("");
    const [hora, setHora] = React.useState("");
    const [metpag, setMetPag] = React.useState("");

    const [openMessage, setOpenMessage] = React.useState(false);
    const [messageText, setMessageText] = React.useState("");
    const [messageSeverity, setMessageSeverity] = React.useState("success");
  
  React.useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
        const res = await axios.get("http://localhost:3010/lista-vendas");
        setListaVendas(res.data);
    } catch (error) {
        setListaVendas([]); 
    }
  }

  function preventDefault(event) {
    event.preventDefault();
  }
  function clearForm() {
      setNome("");
      setData("");
      setHora("");
      setValor("");
      setMetPag("");
  }

  function handleCancelClick() {
      if (valor !== "" || data !== "" || hora !== "" || metpag !== "") {
          setMessageText("Cadastro de venda cancelado!");
          setMessageSeverity("warning");
          setOpenMessage(true);
      }
      clearForm();
  }

  async function handleDeleteClick(data, hora){
    try{
      await axios.delete(`http://localhost:3010/deletar-venda?dt=${data}&hr=${hora}`);
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
    setNome(row.nomecli); 
    setValor(row.valor);
    setData(row.data);
    setHora(row.hora);
    setMetPag(row.metpag);
    handleDeleteClick(row.data, row.hora);
  }

  async function handleSubmit() {
      if (valor !== "" && data !== "" && hora !== "" && metpag !== "") {
          try {
              await axios.post("http://localhost:3010/inserir-clientes", {
                  nome: nome,
                  data: data,
                  hora: hora,
                  metpag: metpag
              });
              //console.log(`Nome: ${nome} - CPF: ${cpf} - Endereço: ${endereco} - Telefone: ${telefone}`);
              setMessageText("Venda cadastrado com sucesso!");
              setMessageSeverity("success");
              clearForm(); // limpa o formulário apenas se cadastrado com sucesso
          } catch (error) {
              console.log(error);
              setMessageText("Falha no cadastro do Venda!");
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


    return(
        <React.Fragment>
        <Box>
        <Title>Vender</Title>
              <Stack spacing={2}>
                <Stack spacing={2}>
                    <TextField
                        id="nome-input"
                        label="Nome"
                        size="small"
                        onChange={(e) => setNome(e.target.value)}
                        value={nome}
                    />
                    <TextField
                        required
                        id="data-input"
                        label="Data"
                        size="small"
                        onChange={(e) => setData(e.target.value)}
                        value={data}
                        inputProps={{ maxLength: 11 }}
                    />
                    <TextField
                        required
                        id="hora-input"
                        label="Hora"
                        size="small"
                        onChange={(e) => setHora(e.target.value)}
                        value={hora}
                    />
                    <TextField
                        required
                        id="valor-input"
                        label="Valor"
                        size="small"
                        onChange={(e) => setValor(e.target.value)}
                        value={valor}
                    />
                    <TextField
                        required
                        id="metpag-input"
                        label="Método de Pagamento"
                        size="small"
                        onChange={(e) => setMetPag(e.target.value)}
                        value={metpag}
                    />
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
              <TableCell>Nome</TableCell>
              <TableCell>Data</TableCell>
              <TableCell>Hora</TableCell>
              <TableCell>Valor</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listaVendas.map((row) => (
              <TableRow key={row.nome}>
                <TableCell>{row.dtvenda}</TableCell>
                <TableCell>{row.hrvenda}</TableCell> 
                <TableCell>{row.valorv}</TableCell> 
                <TableCell>{row.metpag}</TableCell> 
                <TableCell align='right' style={{ padding: '0' }}>
                  <Button onClick={() => 
                  recover(row)}>Editar</Button>
                  <Button onClick={() => handleDeleteClick(row.dtvenda, row.hrvenda)}>Excluir</Button>
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
      </React.Fragment>
    );
}