import type { FunctionComponent } from 'react';
import styles from './FloatingButton.module.css';
import { useNavigate } from 'react-router-dom';

const FloatingButton: FunctionComponent = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.floatingButton} onClick={() => navigate('/write')} style={{ cursor: 'pointer' }}>
      <img className={styles.icons} alt="" src="Icons.svg" />
    </div>
  );
};

export default FloatingButton; 