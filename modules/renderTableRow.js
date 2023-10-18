import {tableClassList} from '../modules/data/tableData';

export const
  renderTableRow = (fieldTextContent = '', valueTextContent = '') => {
    const row = document.createElement('tr');
    row.className = `${tableClassList.row}`;
    const field = document.createElement('td');
    if (fieldTextContent) {
      field.className = `${tableClassList.field}`;
    }
    field.textContent = fieldTextContent;
    const value = document.createElement('td');
    value.className = `${tableClassList.value}`;
    if (valueTextContent) {
      value.textContent = valueTextContent;
    }

    row.append(field, value);

    return row;
  };
