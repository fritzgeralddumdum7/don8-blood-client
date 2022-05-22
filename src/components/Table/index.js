import React from 'react';
import {
  Card,
  Table as MantineTable,
  Text,
  Pagination,
  Group
} from '@mantine/core';

const Table = ({ children, columns, rows = [] }) => {
  return (
    <Card shadow="sm">
      <MantineTable striped highlightOnHover>
        <thead>
          <tr>
            {columns.map(col => <th>{col}</th>)}
          </tr>
        </thead>
        {
          rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length}>
                <Text align='center' pt={15}>No data available</Text>
              </td>
            </tr>
          ) : children
        }
      </MantineTable>
      <Group position='right' mt='md'>
        <Pagination total={1} />
      </Group>
    </Card>
  )
}

export default Table;
