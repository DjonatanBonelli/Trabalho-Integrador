import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import { TextField, Button, Snackbar, Alert } from '@mui/material';
import Stack from '@mui/material/Stack';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import axios from 'axios';

export default function InsertProduto(){
    const [listaProdutos, setListaProdutos] = React.useState([]);

    const [nome, setNome] = React.useState("");
    const [valor, setValor] = React.useState("");
  
    const [openMessage, setOpenMessage] = React.useState(false);
    const [messageText, setMessageText] = React.useState("");
    const [messageSeverity, setMessageSeverity] = React.useState("success");
  
  React.useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
        const res = await axios.get("http://localhost:3010/lista-produto");
        setListaProdutos(res.data);
        console.log(res.data);
    } catch (error) {
        setListaProdutos([]); 
    }
  }

  function preventDefault(event) {
    event.preventDefault();
  }
  function clearForm() {
      setNome("");
      setValor("");
  }

  async function handleDeleteClick(produtoID){
    try{
      await axios.delete(`http://localhost:3010/deletar-produto?id=${produtoID}`);
      setMessageText("Produto excluído com sucesso!");
      setMessageSeverity("success");
    } catch (error) {
      console.log(error);
      setMessageText("Falha na exclusão do produto!");
      setMessageSeverity("error");
    } finally {
      setOpenMessage(true);
      await getData();
    }
}

  function recover(row){
    setNome(row.nome);
    setValor(row.valor); 
    handleDeleteClick(row.id);
  }

  function handleCancelClick() {
      if (nome !== "" || valor !== "") {
          setMessageText("Cadastro de produto cancelado!");
          setMessageSeverity("warning");
          setOpenMessage(true);
      }
      clearForm();
  }

  async function handleSubmit() {
      if (nome !== "" && valor !== "") {
          try {
              await axios.post("http://localhost:3010/inserir-produto", {
                  nome: nome,
                  valor: valor,
              });
              console.log(`Nome: ${nome} - Valor: ${valor}`);
              setMessageText("Produto cadastrado com sucesso!");
              setMessageSeverity("success");
              clearForm(); // limpa o formulário apenas se cadastrado com sucesso
          } catch (error) {
              console.log(error);
              setMessageText("Falha no cadastro do produto!");
              setMessageSeverity("error");
          } finally {
              setOpenMessage(true);
              await getData();
          }
      } else {
          setMessageText("Dados de produto inválidos!");
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
<div style={{position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', width: '75%', marginLeft: '10%'}}>
        <Title>Produtos</Title>
        <Stack spacing={2}>
                <Stack spacing={2}>
                    <TextField
                        required
                        id="nome-input"
                        label="Nome"
                        size="small"
                        onChange={(e) => setNome(e.target.value)}
                        value={nome}
                    />
                    <TextField
                        required
                        id="valor-input"
                        label="Valor"
                        size="small"
                        onChange={(e) => setValor(e.target.value)}
                        value={valor}
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
              <TableCell>ID</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Valor</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listaProdutos.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.nome}</TableCell>
                <TableCell>{`R$ ${row.valor}`}</TableCell> 
                <TableCell align='right' style={{ padding: '0' }}>
                  <Button onClick={() => 
                  recover(row)}>Editar</Button>
                  <Button onClick={() => handleDeleteClick(row.id)}>Excluir</Button>
                  </TableCell> 
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </Stack>
        <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
          Ver mais
        </Link>
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
        </div>
      </React.Fragment>
    );
}