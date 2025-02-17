import { Line } from 'react-chartjs-2';
import { Box } from '@mui/material';

function LineChart({ attacks }) {
  const data = {
    labels: attacks.map(attack => new Date(attack.timestamp).toLocaleTimeString()),
    datasets: [{
      label: 'Attack Confidence',
      data: attacks.map(attack => attack.confidence),
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Recent Attack Trends'
      }
    }
  };

  return (
    <Box sx={{ mt: 2, height: 300 }}>
      <Line data={data} options={options} />
    </Box>
  );
}

export default LineChart; 