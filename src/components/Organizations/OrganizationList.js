import { Table } from '@mantine/core';
import Organizations from '../../api/Organization'
import { useState, useEffect } from "react";

const OrganizationList = () =>{
  const [elements, setElements] = useState([]);

  useEffect(() => {
    const getOrganizations = () => {
      Organizations.getOrganizations().then((response) => {
        setElements(response.data.data);
      }).catch(err => console.log(err));      
    };

    getOrganizations();
  }, []);

  const rows = elements.map((element) => (
    <tr key={element.attributes.id}>
        <td>{element.attributes.organization_name}</td>
        <td>{element.attributes.organization_type_name}</td>
        <td>{element.attributes.city_municipality_name}</td>
        <td>{element.attributes.latitude}</td>
        <td>{element.attributes.longitude}</td>
        <td>{element.mass}</td>
      </tr>    
  ));

  return (
          <Table striped>
            <tbody>
              {rows}
            </tbody>  
          </Table>
  );
}

export default OrganizationList;