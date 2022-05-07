import { Table } from '@mantine/core';
import Organizations from '../../api/Organization'
import { useState, useEffect } from "react";

const OrganizationList = () =>{
  const [elements, setElements] = useState([]);

  useEffect(() => {
    const getOrganizations = () => {
      Organizations.getOrganizations().then((response) => {
        console.log(response.data)
        setElements(response.data);
      }).catch(err => console.log(err));      
    };

    getOrganizations();
  }, []);

  

  const rows = elements.map((element) => (
    <tr key={element.id}>
        <td>{element.name}</td>
        <td>{element.created_at}</td>
        <td>{element.symbol}</td>
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