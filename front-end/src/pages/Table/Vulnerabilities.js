import React from 'react';
import './Vulnerabilities.css';
import Tooltip from '@mui/material/Tooltip';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min'; // This includes Popper.js
import {useTable, useFilters} from 'react-table';



const data = [
    { cve: "2024-29946", summary: "In onCreate of WifiDialogActivity.java, there is a possible way to bypass the DISALLOW_ADD_WIFI_CONFIG restriction due to a missing permission check.", publishDate: "2024-05-07", updateDate: "2024-05-29", product: "Roothub", cvss: 2.1, epss: "0.05" },
    { cve: "2024-28888", summary: "Roothub v2.6 was discovered to contain a SQL injection vulnerability via the 's' parameter in the search() function.", publishDate: "2024-03-12", updateDate: "2024-04-22", product: "Roothub", cvss: 7.1, epss: "0.02" },
    { cve: "2024-28753", summary: "LuckyFrameWeb v3.5.2 was discovered to contain an arbitrary read vulnerability via the fileDownload method in class com.luckyframe.project.common.CommonController.", publishDate: "2023-12-15", updateDate: "2024-02-15", product: "Luckyframe", cvss: 4.6, epss: "96.2" },
];

function getSeverityClass(cvss) {
    if (cvss < 4) {
        return "Low-severity";
    }
    else if (cvss >= 4 && cvss < 7) {
        return "Medium-severity";
    }
    else if (cvss >= 7 && cvss < 9) {
        return "High-severity";
    }
    else if (cvss >= 9 && cvss <= 10) {
        return "Critical-severity";
    }
    else {
        return "n-a";
    }
}

function getEpssClass(epss) {
    if (epss < 0.05) {
        return "Low-probability";
    }
    else if (epss >= 0.05 && epss < 1) {
        return "Medium-probability";
    }
    else if (epss >= 1 && epss < 10) {
        return "High-probability";
    }
    else if (epss >= 10 && epss <= 100) {
        return "Very-high-probability";
    }
    else {
        return "n-a";
    }
}

// function SeverityColumnFilter({
//     column: {filterValue, setFilter,preFilteredRows, id}
// }) {
//     const options = React.useMemo(() => {
//         const options = new Set();
//         preFilteredRows.forEach(row => {
//             options.add(row.values[id])
//         });
//         return [...options.values()];
//     }, [id,preFilteredRows]);

//     return (
//         <select
//           value={filterValue}
//           onChange={e => {
//             setFilter(e.target.value || undefined);
//           }}
//         >
//           <option value="">All</option>
//           {options.map((option, i) => (
//             <option key={i} value={option}>
//               {option}
//             </option>
//           ))}
//         </select>
//       );
//     }

//       function Vulnerabilities() {
//         const defaultColumn = React.useMemo(
//             () => ({
//                 // No Filter property here to disable filtering by default
//             }),
//             []
//         );

//         const columns = React.useMemo(
//             () => [
//             {
//               Header: 'Info',
//               columns: [
//                 { Header: 'CVE', accessor: 'cve' },
//                 { Header: 'Summary', accessor: 'summary' },
//                 { Header: 'Published', accessor: 'publishDate' },
//                 { Header: 'Updated', accessor: 'updateDate' },
//                 { Header: 'Affected Product', accessor: 'product' },
//                 {
//                   Header: 'Severity',
//                   accessor: 'cvss',
//                   Filter: SeverityColumnFilter,
//                   filter: 'includes',
//                 },
//                 { Header: 'EPSS', accessor: 'epss' },
//               ],
//             },
//           ],
//           []
//         );
      
//         const {
//           getTableProps,
//           getTableBodyProps,
//           headerGroups,
//           rows,
//           prepareRow,
//           state,
//         } = useTable(
//           {
//             columns,
//             data,
//             defaultColumn,
//           },
//           useFilters
//         );
      
//         return (
//           <div className="Vulnerabilities">
//             <header className="Vulnerabilities-header">
//               <div className="title">Find Out If You Have Vulnerabilities That Put You at Risk</div>
//             </header>
//             <div className="Table">
//               <table {...getTableProps()}>
//                 <thead>
//                   {headerGroups.map((headerGroup) => (
//                     <tr {...headerGroup.getHeaderGroupProps()}>
//                       {headerGroup.headers.map((column) => (
//                         <th {...column.getHeaderProps()}>
//                           {column.render('Header')}
//                           <div>{column.canFilter ? column.render('Filter') : null}</div>
//                         </th>
//                       ))}
//                     </tr>
//                   ))}
//                 </thead>
//                 <tbody {...getTableBodyProps()}>
//                   {rows.map((row) => {
//                     prepareRow(row);
//                     return (
//                       <tr {...row.getRowProps()}>
//                         {row.cells.map((cell) => (
//                           <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
//                         ))}
//                       </tr>
//                     );
//                   })}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         );
//       }
      

function Vulnerabilities() {
    return (
        <div className="Vulnerabilities">
            <header className="Vulnerabilities-header">
                <div className="title">Find Out If You Have Vulnerabilities That Put You at Risk</div>
            </header>

            <div className="Table">
                <table>
                    <thead>
                        <tr>
                            <th>CVE</th>
                            <th>Summary</th>
                            <th>Published</th>
                            <th>Updated</th>
                            <th>Affected Product</th>
                            <th>Criticality</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((val, key) => (
                            <tr key={key}>
                                <td className="cve-title"><a href="#">{val.cve}</a></td>
                                <td>{val.summary}</td>
                                <td>{val.publishDate}</td>
                                <td>{val.updateDate}</td>
                                <td>{val.product}</td>
                                <td className="severityCell">
                                    <Tooltip title="Severity of security vulnerabilities (scale of 1-10)" placement="top" arrow>
                                        <span className="tooltip-target">CVSS:</span></Tooltip>
                                    <button id={getSeverityClass(val.cvss)}>
                                        <Tooltip title= {getSeverityClass(val.cvss)} placement="top" arrow>
                                            <span className="tooltip-target">{val.cvss}</span></Tooltip>
                                        </button></td>
                                <td className="severityCell">
                                    <Tooltip title="Likelihood of the vulnerability being exploited in the wild within the next 30 days" placement="top" arrow>
                                        <span className="tooltip-target">EPSS:</span> </Tooltip>
                                    <button id={getEpssClass(val.epss)}>
                                        <Tooltip title= {getEpssClass(val.epss)} placement="top" arrow>
                                            <span className="tooltip-target">{val.epss}%</span></Tooltip>
                                        </button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Vulnerabilities;