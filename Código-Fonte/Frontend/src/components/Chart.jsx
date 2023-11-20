import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';
import axios from 'axios';

// Generate Sales Data

export default function Chart() {
  const [dependencias, setDependencias] = React.useState([]);

  React.useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
        const res = await axios.get("http://localhost:3010/vendas-horas");
        setDependencias(res.data);
    } catch (error) {
        setDependencias([]); 
    }
  }

  const theme = useTheme();

  return (
    <React.Fragment>
      <Title>Hoje </Title>
      <ResponsiveContainer>
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
          />
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
              Vendas (R$)
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
    </React.Fragment>
  );
}