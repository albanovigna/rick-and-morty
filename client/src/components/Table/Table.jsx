import React from "react";
import { useTable } from "react-table";
import { Link, useLocation } from "react-router-dom";
import styles from "../Table/Table.module.css";
import eye from "../../assets/eye.png";

function Table({ data, episodes }) {
  const location = useLocation();
  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Status",
        accessor: "status",
      },
      {
        Header: "Species",
        accessor: "species",
      },
      {
        Header: "Gender",
        accessor: "gender",
      },
      {
        Header: "Episodes List",
        accessor: "",
        Cell: ({ row }) => (
          <Link
            className={styles.linkEpisodes}
            to="episodes"
            state={{ background: location, episodes: episodes[row.index] }}
          >
            {" "}
            <button className={styles.customBtn}>View</button>
          </Link>
        ),
      },
      {
        Header: "Detail",
        accessor: "",
        Cell: ({ row }) => (
          <Link
            className={styles.linkDetail}
            to={`/character/${row.original.id}`}
            state={{ isModal: location }}
          >
            {" "}
            <img src={eye} alt="" />
          </Link>
        ),
      },
    ],
    []
  );
  // Use the state and functions returned from useTable to build your UI
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  // Render the UI for your table
  return (
    <table className={styles.table} {...getTableProps()}>
      <thead className={styles.thead}>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody className={styles.tbody} {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr
              className={i % 2 == 0 ? styles.even : styles.odd}
              {...row.getRowProps()}
            >
              {row.cells.map((cell) => {
                return (
                  <td className={styles.td} {...cell.getCellProps()}>
                    {cell.render("Cell")}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Table;
