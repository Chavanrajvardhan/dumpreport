import React from 'react';
import styles from './TopNavbar.module.css';

const TopNavbar = ({
    sidebarOpen,
    toggleSidebar,
}: {
    sidebarOpen: boolean;
    toggleSidebar: () => void;
}) => {
    return (
        <div className={styles.navbar}>
            <div className={styles.toggleBtn}>
                <button
                    onClick={toggleSidebar}
                    title="Toggle Sidebar"
                    className={styles.toggleIcon}
                >
                    {sidebarOpen ? '<' : '>'}
                </button>
            </div>
            <div className={styles.brand}>Johnson & Johnson MedTech</div>
            <div className={styles.actions}>
                <button title="Refresh">🔄</button>
                <button title="Logout">⏻</button>
            </div>
        </div>
    );
};

export default TopNavbar;
