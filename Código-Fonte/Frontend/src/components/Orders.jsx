import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import axios from 'axios';

function preventDefault(event) {
  event.preventDefault();
}

export default function Orders() {
  const [listaVendas, setListaVendas] = React.useState([]);

  React.useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:3010/vendas-lista", {
          headers: {
            Authorization: `bearer ${token}`,
          },
        });
        
        setListaVendas(res.data);
        console.log(res.data);
    } catch (error) {
        setListaVendas([]);
    }
  }

  return (
    <React.Fragment>
      <Title>Últimas Vendas</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Data</TableCell>
            <TableCell>Hora</TableCell>
            <TableCell>Método de Pagamento</TableCell>
            <TableCell align="right">Valor</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listaVendas.map((row) => (
            <TableRow key={row.dtvenda}>
              <TableCell>{row.idv}</TableCell>
              <TableCell>{row.dtvenda}</TableCell>
              <TableCell>{row.hrvenda}</TableCell>
              <TableCell>{row.metpag}</TableCell>
              <TableCell align="right">{`R$${row.valorv}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}