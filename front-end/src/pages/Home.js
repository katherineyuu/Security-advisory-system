import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import BarGraph from '../components/BarGraph';
import DotPlot from '../components/DotPlot'; 
import VulnerabilityCard from '../components/Card.js';
import { getTopVulnerabilities } from '../components/TopThree.js';

function Home() {
  // State to hold the top vulnerabilities
  const [topVulnerabilities, setTopVulnerabilities] = useState([]);

  // Fetch and set top vulnerabilities
  const fetchAndSetTopVulnerabilities = async () => {
    const topVulns = await getTopVulnerabilities();
    setTopVulnerabilities(topVulns);
  };

  useEffect(() => {
    // Initial fetch of top vulnerabilities
    fetchAndSetTopVulnerabilities(); 

    // Fetch the top vulnerabilities every 5 seconds
    const interval = setInterval(fetchAndSetTopVulnerabilities, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="Home">
      <main className="home-main-content">
        <div className="subtitle1">Duke’s database for open source vulnerabilities and cloud misconfigurations</div>
        <div className="flex-container">

          <div className="graph-container">
            <h2 className="graph-title">Number of CVEs for CVSS score</h2>
            <BarGraph />
          </div>

          <div className="graph-container">
            <h2 className="graph-title">CVEs for CVSS and EPSS score</h2>
            <DotPlot />
          </div>
        </div>

        <div className="content">
          <div className="subtitle2">Top Vulnerabilities in the past month</div>
          <div className="cards">
            {/* Render a card for each top vulnerability */}
            {topVulnerabilities.map(vulnerability => (
              <VulnerabilityCard
                key={vulnerability.id}
                title={`${vulnerability.cve_id} ${vulnerability.vendor.name}`}
                text={vulnerability.summary}
                link={`/learn-more/${vulnerability.cve_id}`} // Pass the cve_id as a URL parameter
                value={vulnerability.max_cvss_base_score}
                image={vulnerability.vendor.vendor_url} // Pass the vendor image URL
              />
            ))}
          </div>
          {/* Link to view all vulnerabilities */}
          <Link to="/table" className="view">View all</Link>
        </div>
      </main>
    </div>
  );
}

export default Home;
