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

export default function InsertProduto(){
    const [listaClientes, setListaClientes] = React.useState([]);
    const [ines, setInes] = React.useState("");
    const [nome, setNome] = React.useState("");
    const [cpf, setCPF] = React.useState("");
    const [cnpj, setCNPJ] = React.useState("");
    const [endereco, setEndereco] = React.useState("");
    const [telefone, setTelefone] = React.useState("");
    const [tc, setTC] = React.useState("fisico");

    const [openMessage, setOpenMessage] = React.useState(false);
    const [messageText, setMessageText] = React.useState("");
    const [messageSeverity, setMessageSeverity] = React.useState("success");
  
  React.useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      const token = localStorage.getItem("token");
        if(tc !== 'fisico'){
          const res = await axios.get("http://localhost:3010/lista-clientes-fisico", {
            headers: {
              Authorization: `bearer ${token}`,
            },});
            setListaClientes(res.data);
            console.log("fisico", res.data);
        }
        else{
          const res = await axios.get("http://localhost:3010/lista-clientes-juridico", {
            headers: {
              Authorization: `bearer ${token}`,
            },});
            setListaClientes(res.data);
            console.log("juridico", res.data);
        }
      }
          catch (error) {
            setListaClientes([]);
            console.log(error.message); 
        }
      }
      

  function preventDefault(event) {
    event.preventDefault();
  }
  function clearForm() {
      setNome("");
      setCPF("");
      setCNPJ("");
      setInes("");
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

  async function handleDeleteClick(keyCliente){
    try{
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3010/deletar-clientes?cpf=${keyCliente}`, {
        headers: {
          Authorization: `bearer ${token}`,
        },});
      setMessageText("Cliente excluído com sucesso!");
      setMessageSeverity("success");
    } catch (error) {
      console.log(error);
      setMessageText("Falha na exclusão do cliente!");
      setMessageSeverity("error");
    } finally {
      setOpenMessage(true);
      await getData();
    }
}

  function recover(row){
    setNome(row.nomecf); 
    setCPF(row.cpf);
    setEndereco(row.enderecocf);
    setTelefone(row.telefonecf);
    handleDeleteClick(row.cpf);
  }

  function handleSubmit(){
    tc === 'fisico' ? handleSubmitCF() : handleSubmitCJ();

  }

  async function handleSubmitCF() {
      if (nome !== "" && cpf.length === 11 && endereco !== "") {
          try {
              const token = localStorage.getItem("token");
              await axios.post("http://localhost:3010/inserir-clientes-fisico", {
                  nome: nome,
                  cpf: cpf,
                  telefone: telefone,
                  endereco: endereco,
          },{
                  headers: {
                    Authorization: `bearer ${token}`,
                  }
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
  
  async function handleSubmitCJ() {
    if (nome !== "" && cnpj.length === 14 && ines !== 14 && endereco !== "") {
        try {
            const token = localStorage.getItem("token");
            await axios.post("http://localhost:3010/inserir-clientes-juridico", {
                nome: nome,
                cnpj: cnpj,
                ines: ines,
                telefone: telefone,
                endereco: endereco,
        },{
                headers: {
                  Authorization: `bearer ${token}`,
                }
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

  const handleInputChange = (event) => {
    const novoValor = event.target.value;
    // Remove todos os pontos existentes e adiciona pontos a cada dois caracteres
    const valorFormatado = novoValor.replace(/\./g, '').replace(/(.{2})/g, '$1.');
    setCPF(valorFormatado);

  };
  
  const tipoCliente = [
    {
      value: 'fisico',
      label: 'Cliente Físico',
    },
    {
      value: 'juridico',
      label: 'Cliente Jurídico',
    }]
    const handleChange = (event) => {
      setTC(event.target.value);
      getData();
    };

    return(
        <React.Fragment>
        <div style={{position: 'absolute', top: '55%', left: '50%', transform: 'translate(-50%, -50%)', width: '75%', marginLeft: '10%'}}>
        <Box>
        <Title>Clientes</Title>
              <Stack spacing={2}>
                <Stack spacing={2}>

                  <Select
                    style={{width: '20%', height: '35px'}}
                    value={tc}
                    onChange={handleChange}
                    >  
                    {tipoCliente.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                  </Select>

                    <TextField
                        required
                        id="nome-input"
                        label="Nome"
                        size="small"
                        onChange={(e) => setNome(e.target.value)}
                        value={nome}
                    />
                        {tc === "fisico" ? (
                    <TextField
                        required
                        id="cpf-input"
                        label="CPF"
                        size="small"
                        onChange={(e) => setCPF(e.target.value)}
                        value={cpf}
                        inputProps={{ maxLength: 11 }}
                        />
                        
                        ) : (
                          <>
                    <TextField
                      required
                      id="cnpj-input"
                      label="CNPJ"
                      size="small"
                      onChange={(e) => setCNPJ(e.target.value)}
                      value={cnpj}
                      inputProps={{ maxLength: 14 }}
                      />
                    <TextField
                      required
                      id="ines-input"
                      label="Inscrição Estadual"
                      size="small"
                      onChange={(e) => setInes(e.target.value)}
                      value={ines}
                      inputProps={{ maxLength: 14 }}
                      />
                    </>
                        )}
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
      {tc === 'fisico' ? (
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
                  <Button onClick={() => 
                  recover(row)}>Editar</Button>
                  <Button onClick={() => handleDeleteClick(row.cpf)}>Excluir</Button>
                  </TableCell> 
              </TableRow>
            ))}
          </TableBody>
        </Table>
                  ) : (
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
              {listaClientes.map((row) => (
                <TableRow key={row.nomecj}>
                <TableCell>{row.nomecj}</TableCell>
                <TableCell>{row.cnpjc}</TableCell>
                <TableCell>{row.inesc}</TableCell> 
                <TableCell>{row.enderecocj}</TableCell> 
                <TableCell>{row.telefonecj}</TableCell>
                <TableCell align='right' style={{ padding: '0' }}>
                  <Button onClick={() => 
                  recover(row)}>Editar</Button>
                  <Button onClick={() => handleDeleteClick(row.cnpjc)}>Excluir</Button>
                  </TableCell> 
              </TableRow>
            ))}
          </TableBody>
        </Table>
        )}
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