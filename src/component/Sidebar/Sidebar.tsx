import React from 'react';
import styles from './Sidebar.module.css';

const Sidebar = ({ sidebarOpen }: { sidebarOpen: boolean }) => {
    return (
        <aside className={`${styles.sidebar} ${sidebarOpen ? styles.open : styles.closed}`}>
            <div className={styles.header}>JJCORE</div>
            <div className={styles.title}>JJ CORE</div>
            <nav className={styles.nav}>
                <div>• Dealer Reported Sales</div>
                <div>• Dealer Reported SNS</div>
                <div>• Dealer Price Report</div>
                <div className={styles.active}>• Dump Report</div>
                <div>• Dealer Purchase Report</div>
                <div>• Activity Log</div>
                <div>• Inventory Report</div>
                <div>• Standard Price Report</div>
                <div>• Request Report</div>
            </nav>
        </aside>
    );
};

export default Sidebar;
