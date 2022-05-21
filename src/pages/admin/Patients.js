import { useState, useEffect } from 'react';
import Wrapper from '@/components/Wrapper';
import {
  Table,
  Card,
  Badge,
  Button,
  Stack,
  TextInput,
  Select,
  Group,
  Drawer,
  Text,
  ListItem
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { Clock, Pencil, Receipt, Receipt2, Trash } from 'tabler-icons-react';
import AlertDialog from '@/components/AlertDialog';
import Alert from '@/components/AlertDialog';
import { User } from '@/services';
import moment from 'moment';

const Patients = () => {
  const [isDrawerOpened, setIsDrawerOpened] = useState(false);
  const [isDialogOpened, setIsDialogOpened] = useState(false);
  const [toProceed, setToProceed] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [errors, setErrors] = useState({});
  const [isShowAlert, setIsShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');
  const [transactionType, setTransactionType] = useState('');
  //for table items
  const [patients, setPatients] = useState([]);
  
  //table items
  const getPatients = () => {
    User.getByRole(3).then((response) => {//Patient = Role 3 
      setPatients(response.data.data);    
    }).catch(err => console.log(err));
  };

  useEffect(() => {
    getPatients();
  }, []);

  const rows = patients.map((element) => (
    <tr key={element.id}>
      <td>{element.attributes.name}</td>
      <td>{element.attributes.blood_type_name}</td>
      <td>{element.attributes.city_municipality_name}</td>
      <td>{element.attributes.province_name}</td>
      <td></td>
    </tr>
  ));

  return (
    <Wrapper>
      <Drawer
        opened={isDrawerOpened}
        onClose={() => setIsDrawerOpened(false)}
        title={isEdit ? 'Edit Patient' : 'Create Patient'}
        padding="xl"
        size="xl"
        styles={() => ({
          title: { fontWeight: 'bold' }
        })}
      >
      </Drawer>
      <Alert
        isShow={isShowAlert}
        setIsShow={setIsShowAlert}
        type='error'
        text={alertMsg}
      />
      <AlertDialog
        isToggled={isDialogOpened}
        setIsToggled={setIsDialogOpened}
        setToProceed={setToProceed}
        text={alertMsg}
        type={transactionType}
      />
      <Card shadow="sm" mt='sm'>
        <Table striped highlightOnHover>
          <thead>
            <tr>
              <th>Patient</th>
              <th>Blood Type</th>
              <th>City/Municipality</th>
              <th>Province</th>              
              <th>Age</th>              
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </Card>      
    </Wrapper>
  );
}

export default Patients;
