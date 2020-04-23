import React from 'react';

import Link from './Link';

function renderContent({ item, column, i18n }) {
  let inner = item[column.key];
  if (column.icons) {
    return column.icons.map(({ key, linkRef }) => {
      return item[linkRef] && <Link to={item[linkRef]}>{key}</Link>;
    });
  }
  if (inner && column.text) {
    inner = column.text;
  }
  if (column.textRef) {
    inner = i18n[item[column.textRef]];
  }
  if (column.checkRef) {
    inner = item[column.checkRef] ? 'O' : 'X';
  }
  if (column.linkRef && item[column.linkRef]) {
    return <Link to={item[column.linkRef]}>{inner}</Link>;
  }
  return inner;
}

const DynamicTable = ({ items, columns, hideHead, i18n }) => {
  return (
    <>
      <table>
        {!hideHead && (
          <thead>
            <tr>
              {columns.map(({ name, key, className }) => (
                <th key={key} className={className}>
                  {name}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {items.map(item => (
            <tr key={item.key} className={item.className}>
              {columns.map(column => (
                <td key={column.key} className={column.className}>
                  {renderContent({ item, column, i18n })}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default DynamicTable;