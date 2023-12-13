import * as React from 'react';
import {Stack, TextField, Button, Typography, Select, Snackbar, Alert, MenuItem, Box} from '@mui/material';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import axios from 'axios';

export default function InsertFornecedor(){
    const [listaFornecedores, setListaFornecedores] = React.useState([]);
    const [nomef, setNomef] = React.useState("");
    const [cnpjf, setCNPJf] = React.useState("");
    const [inesf, setInesf] = React.useState("");
    const [enderecof, setEnderecof] = React.useState("");
    const [telefonef, setTelefonef] = React.useState("");

    const [openMessage, setOpenMessage] = React.useState(false);
    const [messageText, setMessageText] = React.useState("");
    const [messageSeverity, setMessageSeverity] = React.useState("success");
  
  React.useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:3010/lista-fornecedores", {
          headers: {
            Authorization: `bearer ${token}`,
          },});
        setListaFornecedores(res.data);
    } catch (error) {
        setListaFornecedores([]); 
    }
  }

  function preventDefault(event) {
    event.preventDefault();
  }
  function clearForm() {
      setNomef("");
      setCNPJf("");
      setInesf("");
      setEnderecof("");
      setTelefonef("");
  }

  function handleCancelClick() {
      if (nomef !== "" || cnpjf !== "" || inesf !== "" || enderecof !== "") {
          setMessageText("Cadastro de fornecedor cancelado!");
          setMessageSeverity("warning");
          setOpenMessage(true);
      }
      clearForm();
  }

  async function handleDeleteClick(keyFornecedor){
    try{
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3010/deletar-fornecedor2?cnpjf=${keyFornecedor}`, {
        headers: {
          Authorization: `bearer ${token}`,
        },});
      setMessageText("Fornecedor excluído com sucesso!");
      setMessageSeverity("success");
    } catch (error) {
      console.log(error);
      setMessageText("Falha na exclusão do fornecedor!");
      setMessageSeverity("error");
    } finally {
      setOpenMessage(true);
      await getData();
    }
}

  function recover(row){
    setNomef(row.nomef); 
    setCNPJf(row.cnpjf);
    setInesf(row.inesf);
    setEnderecof(row.enderecof);
    setTelefonef(row.telefonef);
    handleDeleteClick(row.cnpjf);
  }

  async function handleSubmit() {
      if ((nomef !== "" && cnpjf.length === 14 && inesf.length === 14 && enderecof !== "")) {
          try {
              const token = localStorage.getItem("token");
              await axios.post("http://localhost:3010/inserir-fornecedor", {
                  nome: nomef,
                  cnpj: cnpjf,
                  ines: inesf,
                  telefone: telefonef,
                  endereco: enderecof,
          },{
                  headers: {
                    Authorization: `bearer ${token}`,
                  }
              });
              setMessageText("Fornecedor cadastrado com sucesso!");
              setMessageSeverity("success");
              clearForm(); // limpa o formulário apenas se cadastrado com sucesso
          } catch (error) {
              console.log(error);
              setMessageText("Falha no cadastro do fornecedor!");
              setMessageSeverity("error");
          } finally {
              setOpenMessage(true);
              await getData();
          }
      } else {
          setMessageText("Dados de fornecedor inválidos!");
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

  const handleInputChange = (event) => {
    const novoValor = event.target.value;
    // Remove todos os pontos existentes e adiciona pontos a cada dois caracteres
    const valorFormatado = novoValor.replace(/\./g, '').replace(/(.{2})/g, '$1.');
    setCNPJf(valorFormatado);

  };
  

    return(
        <React.Fragment>
        <div style={{position: 'absolute', top: '45%', left: '50%', transform: 'translate(-50%, -50%)', width: '75%', marginLeft: '10%'}}>
        <Box>
        <Title>Fornecedores</Title>
              <Stack spacing={2}>
                <Stack spacing={2}>

                    <TextField
                        required
                        id="nome-input"
                        label="Nome"
                        size="small"
                        onChange={(e) => setNomef(e.target.value)}
                        value={nomef}
                    />
                    <TextField
                      required
                      id="cnpj-input"
                      label="CNPJ"
                      size="small"
                      onChange={(e) => setCNPJf(e.target.value)}
                      value={cnpjf}
                      inputProps={{ maxLength: 14 }}
                      />
                    <TextField
                      required
                      id="ines-input"
                      label="Inscrição Estadual"
                      size="small"
                      onChange={(e) => setInesf(e.target.value)}
                      value={inesf}
                      inputProps={{ maxLength: 14 }}
                      />
                    <TextField
                    required
                    id="endereco-input"
                    label="Endereco"
                    size="small"
                    onChange={(e) => setEnderecof(e.target.value)}
                    value={enderecof}
                    />
                    <TextField
                        id="telefone-input"
                        label="Telefone"
                        size="small"
                        onChange={(e) => setTelefonef(e.target.value)}
                        value={telefonef}
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
              <TableCell>CNPJ</TableCell>
              <TableCell>Inscrição Estadual</TableCell>
              <TableCell>Endereço</TableCell>
              <TableCell>Telefone</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listaFornecedores.map((row) => (
              <TableRow key={row.nomef}>
                <TableCell>{row.nomef}</TableCell>
                <TableCell>{row.cnpjf}</TableCell>
                <TableCell>{row.inesf}</TableCell> 
                <TableCell>{row.enderecof}</TableCell> 
                <TableCell>{row.telefonef}</TableCell> 
                <TableCell align='right' style={{ padding: '0' }}>
                  <Button onClick={() => 
                  recover(row)}>Editar</Button>
                  <Button onClick={() => handleDeleteClick(row.cnpj)}>Excluir</Button>
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