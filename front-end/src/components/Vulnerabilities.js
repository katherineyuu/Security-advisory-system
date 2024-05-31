import React from 'react';
import './Vulnerabilities.css';

const data = [
    { title: "Improper Input Validation", date: "May 22 2024", severity: "Low", cve: "2024-29946" },
    { title: "Authentication Bypass", date: "February 1 2024", severity: "Critical", cve: "2024-21222" },
    { title: "Uncontrolled Resource Consumption", date: "November 15 2023", severity: "Low", cve: "2024-29946" },
]

function getSeverityClass(severity) {
    switch (severity) {
        case "Low":
            return "low-severity";
        case "Medium":
            return "medium-severity";
        case "High":
            return "high-severity";
        case "Critical":
            return "critical-severity";
    }
}

function Vulnerabilities() {
    return (
        <div className="Vulnerabilities">
            <header className="Vulnerabilities-header">
                <div className="title">FIND OUT IF YOU HAVE VULNERABILITIES THAT PUT YOU AT RISK</div>
            </header>

            <div className="Table">
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Date</th>
                            <th>Severity</th>
                            <th>CVE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((val, key) => {
                            return (
                                <tr key={key}>
                                    <td className = "cve-title">{val.title}</td>
                                    <td>{val.date}</td>
                                    <td className={getSeverityClass}>{val.severity}</td>
                                    <td>{val.cve}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div >
    );
}

export default Vulnerabilities;
