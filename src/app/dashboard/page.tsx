'use client';

import React, { useState } from 'react';
import Sidebar from '../../component/Sidebar/Sidebar';
import TopNavbar from '../../component/TopNavbar/TopNavbar';
import styles from './page.module.css';

const DumpReportPage = () => {
    const [month, setMonth] = useState('2024-10');
    const [franchise, setFranchise] = useState('SYNTHES');
    const [distributor, setDistributor] = useState('All');
    const [organizationSegment, setOrganizationSegment] = useState('All');
    const [errors, setErrors] = useState<{ month?: string; franchise?: string }>({});
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const handleSubmit = () => {
        const newErrors: typeof errors = {};
        if (!month) newErrors.month = 'Month is required';
        if (!franchise) newErrors.franchise = 'Franchise is required';
        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            alert('Form submitted!');
        }
    };

    return (
        <div className={styles.container}>
            <Sidebar sidebarOpen={sidebarOpen} />
            <div className={styles.rightSide}>
                <TopNavbar
                    sidebarOpen={sidebarOpen}
                    toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
                />
                <main className={styles.main}>
                    <h1 className={styles.heading}>Dump Report</h1>
                    <div className={styles.card}>
                        <div className={styles.formGroup}>
                            <label>Month :</label>
                            <input
                                type="month"
                                value={month}
                                onChange={(e) => setMonth(e.target.value)}
                            />
                            {errors.month && <p className={styles.error}>{errors.month}</p>}
                        </div>

                        <div className={styles.formGroup}>
                            <label>Franchise :</label>
                            <select
                                value={franchise}
                                onChange={(e) => setFranchise(e.target.value)}
                            >
                                <option value="">Select Franchise</option>
                                <option value="SYNTHES">SYNTHES</option>
                                <option value="ETHICON">ETHICON</option>
                            </select>
                            {errors.franchise && <p className={styles.error}>{errors.franchise}</p>}
                        </div>

                        <div className={styles.formGroup}>
                            <label>Distributor Name :</label>
                            <select
                                value={distributor}
                                onChange={(e) => setDistributor(e.target.value)}
                            >
                                <option value="All">-- All Distributors --</option>
                                <option value="Distributor A">Distributor A</option>
                            </select>
                        </div>

                        <div className={styles.formGroup}>
                            <label>Organization Segment :</label>
                            <select
                                value={organizationSegment}
                                onChange={(e) => setOrganizationSegment(e.target.value)}
                            >
                                <option value="All">-- All Segments --</option>
                                <option value="Hospital">Hospital</option>
                            </select>
                        </div>

                        <div className={styles.action}>
                            <button onClick={handleSubmit}>View</button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DumpReportPage;
