import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';
import axios from 'axios';

function preventDefault(event) {
  event.preventDefault();
}

export default function Deposits() {
  
  const [dependencias, setDependencias] = React.useState([]);

  React.useEffect(() => {
    getData();
  }, []);

  async function getData() {

    try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:3010/vendas-geral", {
          headers: {
            Authorization: `bearer ${token}`,
          },});
          console.log(res.data);
        setDependencias(res.data);
    } catch (error) {
        setDependencias([]); 
    }
  
  }
  return (
    <React.Fragment>
      <Title>Total de Hoje</Title>
      <Typography component="p" variant="h4" color={'green'}>
        {dependencias !== null ? <> +${dependencias.sum} </> : <>+$0,00</> }
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        {dependencias !== null ? <>{dependencias.data}</> : <></>}
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          Ver Detalhes
        </Link>
      </div>
    </React.Fragment>
  );
}