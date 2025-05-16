'use client';

import { FC } from 'react';
import { IoIosClose } from 'react-icons/io';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import styles from './LogoutPage.module.css';

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const LogoutModal: FC<LogoutModalProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <div className={styles.modalTitle}>
            <AiOutlineInfoCircle className={styles.infoIcon} />
            <span>Logout</span>
          </div>
          <button onClick={onClose} className={styles.closeButton}>
            <IoIosClose />
          </button>
        </div>

        <hr className={styles.divider} />

        <div className={styles.message}>Are you sure</div>

        <hr className={styles.divider} />

        <div className={styles.footer}>
          <button className={styles.button} onClick={onClose}>No</button>
          <button className={styles.button} onClick={onConfirm}>Yes</button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
