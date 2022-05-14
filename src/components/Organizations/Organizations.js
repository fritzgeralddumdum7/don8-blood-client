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
import { DatePicker, TimeInput } from '@mantine/dates';
import { Pencil, Trash } from 'tabler-icons-react';
import AlertDialog from '@/components/AlertDialog';
import { Organization, OrganizationType, CityMunicipality } from '@/services';

const Organizations = () => {
  const [isDrawerOpened, setIsDrawerOpened] = useState(false);
  const [isDialogOpened, setIsDialogOpened] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [errors, setErrors] = useState({});
  //for dropdowns items
  const [organizationTypes, setOrganizationTypes] = useState([]); 
  const [cityMunicipalities, setCityMunicipalities] = useState([]); 
  //for table items
  const [organizations, setOrganizations] = useState([]);
  
  const form = useForm({
    initialValues: {
      name: '',
      address: '',
      city_municipality_id: '',
      organization_type_id: ''
    },

    validate: {
      name: (value) => value ? null : 'No name',
      address: (value) => value ? null : 'No address',
      city_municipality_id: (value) => value ? null : 'No selected city/municipality',
      organization_type_id: (value) => value ? null : 'No organization type',
    },
  });

  useEffect(() => {
    const getOrganizations = () => {
      Organization.getOrganizations().then((response) => {
        setOrganizations(response.data.data);
      }).catch(err => console.log(err));      
    };

    getOrganizations();
  }, []);

  const rows = organizations.map((element) => (
    <tr key={element.id}>
      <td>{element.attributes.name}</td>
      <td>{element.attributes.organization_type_name}</td>      
      <td>
        <Button leftIcon={<Pencil />} onClick={() => {
          setIsEdit(true);
        }}>
          Edit
        </Button>
        <Button ml={8} color='red' leftIcon={<Trash />} >
          Delete
        </Button>
      </td>
    </tr>
  ));

  //for edit on modal   
  const getSpecificOrganization = (id) => {
    Organization.getSpecificOrganization(id).then((response) => {
      form.setValues({name: response.data.data[0].attributes.name,
                      address: response.data.data[0].attributes.address,
                      city_municipality_id: response.data.data[0].attributes.city_municipality_id,
                      organization_type_id: response.data.data[0].attributes.organization_type_id});
                         
      setErrors(response.data.errors);      
      console.log(form.values);
    }).catch(err => console.log(err));    
  }    

  //dropdown items
  useEffect(() => {
    const getCityMunicipalities = () => {
      CityMunicipality.getCityMunicipalities(51).then((response) => {
        setCityMunicipalities(response.data.data);    
      }).catch(err => console.log(err));
    };

    getCityMunicipalities();
  }, []);

  //dropdown items
  useEffect(() => {
    const getOrganizationTypes = () => {
      OrganizationType.getOrganizationTypes().then((response) => {
        setOrganizationTypes(response.data.data);    
      }).catch(err => console.log(err));
    };

    getOrganizationTypes();
  }, []);

  const createOrganization = (payload) => {
    Organization.create(payload).then((response) => {
      setErrors(response.data.errors);
      setIsDrawerOpened(false);      
    }).catch(err => console.log(err));    
  }

  return (
    <Wrapper>
      <Drawer
        opened={isDrawerOpened}
        onClose={() => setIsDrawerOpened(false)}
        title={isEdit ? 'Edit Request' : 'Create Request'}
        padding="xl"
        size="xl"
        styles={() => ({
          title: { fontWeight: 'bold' }
        })}
      >
        <form onSubmit={form.onSubmit((values) => createOrganization(values))}>
          <Stack>
            <TextInput
              label="Name"
              {...form.getInputProps('name')}
              required
            />
            <TextInput
              label="Street Address"
              {...form.getInputProps('address')}
              required
            />
            <Select
              label="Organization Type"
              placeholder="Select here"
              {...form.getInputProps('organization_type_id')}
              data = {organizationTypes.map(element => {
                let item = {};
                item["value"] = element.id;
                item["label"] = element.attributes.name;
                return item;
              })}
              searchable
            />
            <Select
              label="City/Municipality"
              placeholder="Select here"
              {...form.getInputProps('city_municipality_id')}
              data={cityMunicipalities.map(element => {
                let item = {};
                item["value"] = element.id;
                item["label"] = element.attributes.name;
                return item;
              })}
              searchable
            />
            <Button type='submit'>Save</Button>
          </Stack>
        </form>        
      </Drawer>
      <AlertDialog
        isToggled={isDialogOpened}
        setIsToggled={setIsDialogOpened}
        text='Would you like to delete?'
        type='delete'
      />      
      <Card shadow="sm" mt='sm'>
        <Table striped highlightOnHover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </Card>
      <Group position="right" py='md'>
        <Button onClick={() => {
         setIsDrawerOpened(true);
         setIsEdit(false);
        }}>Create an Organization</Button>
      </Group>
    </Wrapper>
  );
}

export default Organizations;
