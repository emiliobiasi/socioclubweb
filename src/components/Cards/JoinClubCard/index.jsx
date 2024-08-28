import PropTypes from 'prop-types';
import styles from './JoinClubCard.module.css';

const JoinClubCard = ({ logoImage, title, description, buttonText }) => {
  return (
    <div className={styles.card}>
      <div className={styles.logoContainer}>
        <img src={logoImage} alt="Logo" className={styles.logo} />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        <a href='/cadastrar-clube' className={styles.button}>{buttonText}</a>
      </div>
    </div>
  );
};

JoinClubCard.propTypes = {
  logoImage: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
};

export default JoinClubCard;
