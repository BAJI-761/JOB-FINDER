import React from 'react';
import styles from './EditorialInput.module.css';

const EditorialInput = ({ label, icon: Icon, value, onChange, placeholder, type = 'text', required = false, multiline = false }) => {
  return (
    <div className={styles.fieldGroup}>
      {label && <label className={styles.editorialLabel}>{label}</label>}
      <div className={styles.inputWrapper}>
        {Icon && <Icon size={16} className={styles.inputIcon} />}
        {multiline ? (
          <textarea
            className={styles.editorialTextarea}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
          />
        ) : (
          <input
            className={styles.editorialInput}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            style={{ paddingLeft: Icon ? '40px' : '12px' }}
          />
        )}
      </div>
    </div>
  );
};

export default EditorialInput;
