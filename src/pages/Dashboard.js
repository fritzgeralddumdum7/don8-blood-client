import { useEffect, useState } from 'react';
import {
  Card,
  Grid,
  Title,
  Stack
} from '@mantine/core';
import { Chart, registerables } from 'chart.js';
import moment from 'moment';

import Wrapper from '@/components/Wrapper';
import { User } from '@/services';

const Dashboard = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [monthsLastYear, setMonthsLastYear] = useState([]);

  Chart.register(...registerables);

  const fetchUserDashboard = () => {
    User.dashboard()
      .then(res => {
        console.log(res)
      })
  }

  const MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  const config = {
    type: 'line',
    data: {
      labels: MONTHS,
      datasets: [{
        label: 'Anemic',
        data: [12, 19, 3, 5, 2, 3, 12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(153, 102, 255, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)'
        ],
        borderWidth: 1
      }, {
        label: 'Walang Pera',
        data: [1, 10, 5, 12, 2, 13, 5, 12, 1, 0, 20, 15],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(153, 102, 255, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true
        }
      },
      plugins: {
        legend: {
          position: 'right',
          align: 'start'
        },
        title: {
          display: true,
          text: 'Last Year Cases',
          position: 'bottom',
          padding: 20,
          color: '#000',
          font: {
            size: 16
          }
        }
      }
    }
  }

  useEffect(() => {
    setIsMounted(true);

    setMonthsLastYear(getAllMonthsLastYear());
  }, []);

  const getAllMonthsLastYear = () => {
    let months = []

    for (let i = 11; i >= 0; i--) {
      months.push(moment().subtract(i, 'months').calendar())
    }

    months = months.map((m, i) => {
      if (i === months.length - 1) {
        return moment().format('MMM, yyyy')
      } else {
        return moment(m).format('MMM, yyyy')
      }
    })

    return months;
  }

  useEffect(() => {
    if (isMounted) {
      fetchUserDashboard();
    }

    config.data.labels = monthsLastYear;

    const ctx = document.getElementById('myChart');
    const myChart = new Chart(ctx, config);
    
    return () => {
      myChart.destroy();
    }
  }, [isMounted, monthsLastYear])

  return (
    <Wrapper>
      <Stack>
        <Grid>
          <Grid.Col span={2}>
            <Card shadow="sm">
              <Stack>
                <Title order={5}>Total Requests</Title>
                <Title align='center'>100</Title>
              </Stack>
            </Card>
          </Grid.Col>
          <Grid.Col span={2}>
            <Card shadow="sm">
              <Stack>
                <Title order={5}>Pending Appointments</Title>
                <Title align='center'>100</Title>
              </Stack>
            </Card>
          </Grid.Col>
          <Grid.Col span={2}>
            <Card shadow="sm">
              <Stack>
                <Title order={5}>Patients Near Me</Title>
                <Title align='center'>100</Title>
              </Stack>
            </Card>
          </Grid.Col>
          <Grid.Col span={2}>
            <Card shadow="sm">
              <Stack>
                <Title order={5}>Patients Helped</Title>
                <Title align='center'>100</Title>
              </Stack>
            </Card>
          </Grid.Col>
          <Grid.Col span={4}>
            <Card shadow="sm">
              <Stack>
                <Title order={5}>Next Scheduled Appointment</Title>
                <Title align='center'>100</Title>
              </Stack>
            </Card>
          </Grid.Col>
        </Grid>
        <Grid grow>
          <Grid.Col>
            <Card shadow="sm">
              <canvas id="myChart" width="400" height="600"></canvas>
            </Card>
          </Grid.Col>
        </Grid>
      </Stack>
    </Wrapper>
  );
}

export default Dashboard;
