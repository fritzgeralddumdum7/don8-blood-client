import React from 'react';
import {
  Card,
  Table as MantineTable,
  Text,
  Pagination,
  Group,
  Stack
} from '@mantine/core';

const Table = ({ children, columns, rows = [] }) => {
  return (
    <Stack>
      <Card shadow="sm" styles={() => ({
        root: { overflow: 'auto !important' }
      })}>
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
      </Card>
      <Group position='right'>
        <Pagination total={1} />
      </Group>
    </Stack>
  )
}

export default Table;
