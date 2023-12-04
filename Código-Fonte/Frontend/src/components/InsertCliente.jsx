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

export default function InsertProduto(){
    const [listaClientes, setListaClientes] = React.useState([]);

    const [nome, setNome] = React.useState("");
    const [cpf, setCPF] = React.useState("");
    const [endereco, setEndereco] = React.useState("");
    const [telefone, setTelefone] = React.useState("");
  
    const [openMessage, setOpenMessage] = React.useState(false);
    const [messageText, setMessageText] = React.useState("");
    const [messageSeverity, setMessageSeverity] = React.useState("success");
  
  React.useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
        const res = await axios.get("http://localhost:3010/lista-clientes");
        setListaClientes(res.data);
        console.log(res.data);
    } catch (error) {
        setListaClientes([]); 
    }
  }

  function preventDefault(event) {
    event.preventDefault();
  }
  function clearForm() {
      setNome("");
      setCPF("");
      setEndereco("");
      setTelefone("");
  }

  function handleCancelClick() {
      if (nome !== "" || cpf !== "" || endereco !== "") {
          setMessageText("Cadastro de cliente cancelado!");
          setMessageSeverity("warning");
          setOpenMessage(true);
      }
      clearForm();
  }

  async function handleDeleteClick(clienteCPF){
    try{
      await axios.delete(`http://localhost:3010/deletar-clientes?cpf=${clienteCPF}`);
      setMessageText("Cliente excluído com sucesso!");
      setMessageSeverity("success");
    } catch (error) {
      console.log(error);
      setMessageText("Falha na exclusão do cliente!");
      setMessageSeverity("error");
    } finally {
      setOpenMessage(true);
      getData();
    }
}
  async function handleEditClick(row, clienteCPF){
    try{
      axios.put(`http://localhost:3000/atualizar-clientes/${clienteCPF}`, {
        nome: row.nome,
        cpf: row.cpf,
        endereco: row.endereco,
        telefone: row.telefone
      })
      setMessageText("Cliente atualizado com sucesso!");
      setMessageSeverity("success");
    } catch (error) {
      console.log(error);
      setMessageText("Falha na exclusão do cliente!");
      setMessageSeverity("error");
    } finally {
      setOpenMessage(true);
      getData();
    }
  }

  async function handleSubmit() {
      if (nome !== "" && cpf.length === 11 && endereco !== "") {
          try {
              await axios.post("http://localhost:3010/inserir-clientes", {
                  nome: nome,
                  cpf: cpf,
                  telefone: telefone,
                  endereco: endereco
              });
              //console.log(`Nome: ${nome} - CPF: ${cpf} - Endereço: ${endereco} - Telefone: ${telefone}`);
              setMessageText("Cliente cadastrado com sucesso!");
              setMessageSeverity("success");
              clearForm(); // limpa o formulário apenas se cadastrado com sucesso
          } catch (error) {
              console.log(error);
              setMessageText("Falha no cadastro do cliente!");
              setMessageSeverity("error");
          } finally {
              setOpenMessage(true);
              await getData();
          }
      } else {
          setMessageText("Dados de cliente inválidos!");
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
        <Title>Clientes</Title>
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
                        id="cpf-input"
                        label="CPF"
                        size="small"
                        onChange={(e) => setCPF(e.target.value)}
                        value={cpf}
                        inputProps={{ maxLength: 11 }}
                    />
                    <TextField
                        required
                        id="endereco-input"
                        label="Endereco"
                        size="small"
                        onChange={(e) => setEndereco(e.target.value)}
                        value={endereco}
                    />
                    <TextField
                        id="telefone-input"
                        label="Telefone"
                        size="small"
                        onChange={(e) => setTelefone(e.target.value)}
                        value={telefone}
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
              <TableCell>CPF</TableCell>
              <TableCell>Endereço</TableCell>
              <TableCell>Telefone</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listaClientes.map((row) => (
              <TableRow key={row.nomecf}>
                <TableCell>{row.nomecf}</TableCell>
                <TableCell>{row.cpf}</TableCell> 
                <TableCell>{row.enderecocf}</TableCell> 
                <TableCell>{row.telefonecf}</TableCell> 
                <TableCell align='right' style={{ padding: '0' }}>
                  <Button onClick={() => handleEditClick(row, row.cpf)}>Editar</Button>
                  <Button onClick={() => handleDeleteClick(row.cpf)}>Excluir</Button>
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