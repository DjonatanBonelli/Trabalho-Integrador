import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import axios from 'axios';

export default function Checkout(){
    const [listaVendas, setListaVendas] = React.useState([]);

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
        const res = await axios.get("http://localhost:3010/produtos-lista");
        setListaVendas(res.data);
        console.log(res.data);
    } catch (error) {
        setListaVendas([]); 
    }
  }

  function clearForm() {
      setNome("");
      setEmail("");
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
              await axios.post("/cliente", {
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
        <Title>Produtos</Title>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell align="right">Valor</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listaProdutos.map((row) => (
              <TableRow key={row.dtcompra}>
                <TableCell>{row.nome}</TableCell>
                <TableCell>{row.dtcompra}</TableCell>
                <TableCell>{row.hrcompra}</TableCell>
                <TableCell>{row.metpag}</TableCell>
                <TableCell align="right">{`R$${row.valor}`}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
          Ver mais
        </Link>
      </React.Fragment>
    );
}