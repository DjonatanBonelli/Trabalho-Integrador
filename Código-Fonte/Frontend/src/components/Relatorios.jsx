import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { Box, Grid, Paper } from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
} from 'recharts';
import Title from './Title';
import axios from 'axios';

export default function Relatorios() {
  const [dependencias, setDependencias] = React.useState([]);
  const theme = useTheme();

  React.useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:3010/relatorios", {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });
      console.log(res.data);
      setDependencias(res.data);
    } catch (error) {
      setDependencias([]);
    }
  }

  return (
    <Grid container spacing={3} style={{position: 'absolute', top: '40%', left: '60%', transform: 'translate(-50%, -50%)', width: '100%', marginLeft: '10%'}}>
      <Grid item xs={12} md={8} lg={9}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 240,
          }}
        >
            <title>Vendas nos últimos 30 dias (R$)</title>
        </Paper>
      </Grid>
      <Grid item xs={12} md={8} lg={9}>
        <ResponsiveContainer width="75%" height={400}>
          <LineChart
            data={dependencias}
            margin={{
              top: 16,
              right: 16,
              bottom: 0,
              left: 24,
            }}
          >
            <XAxis
              dataKey="time"
              stroke={theme.palette.text.secondary}
              style={theme.typography.body2}
            >
            </XAxis>
            <YAxis
              stroke={theme.palette.text.secondary}
              style={theme.typography.body2}
            >
              <Label
                angle={270}
                position="left"
                style={{
                  textAnchor: 'middle',
                  fill: theme.palette.text.primary,
                  ...theme.typography.body1,
                }}
              >
                Valor (R$)
              </Label>
            </YAxis>
            <Line
              isAnimationActive={false}
              type="monotone"
              dataKey="amount"
              stroke={theme.palette.primary.main}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </Grid>
    </Grid>
  );
}