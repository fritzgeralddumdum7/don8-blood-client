import Wrapper from '@/components/Wrapper';
import { Table, Card, Badge, Button, Group } from '@mantine/core';
import { Receipt } from 'tabler-icons-react';

const elements = [
  { position: 6, mass: 12.011, symbol: 'C', name: 'Carbon' },
  { position: 7, mass: 14.007, symbol: 'N', name: 'Nitrogen' },
  { position: 39, mass: 88.906, symbol: 'Y', name: 'Yttrium' },
  { position: 56, mass: 137.33, symbol: 'Ba', name: 'Barium' },
  { position: 58, mass: 140.12, symbol: 'Ce', name: 'Cerium' },
];

const rows = elements.map((element) => (
  <tr key={element.name}>
    <td>{element.position}</td>
    <td>{element.position}</td>
    <td>{element.name}</td>
    <td>{element.name}</td>
    <td>{element.symbol}</td>
    <td>
      <Badge color='red' variant="filled">Pending</Badge>
    </td>
    <td>
      <Group>
        <Button leftIcon={<Receipt />}>
          Rebook
        </Button>
        <Button leftIcon={<Receipt />} color='red'>
          Cancel
        </Button>
      </Group>
    </td>
  </tr>
));

const Appointments = () => {
  return (
    <Wrapper>
      <Card shadow="sm" mt='sm'>
        <Table striped highlightOnHover>
          <thead>
            <tr>
              <th>Donor</th>
              <th>Blood Type</th>
              <th>Blood Request Type</th>
              <th>Category</th>
              <th>Schedule</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </Card>
    </Wrapper>
  );
}

export default Appointments;
