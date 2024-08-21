import PropTypes from 'prop-types';
import styles from "./BestClubsCard.module.css";

const BestClubsCard = ({
  title,
  backgroundImage,
  iconImage,
  description,
  followers,
  members,
}) => {
  return (
    <div className={styles.card}>
      <img
        src={backgroundImage}
        alt="Background"
        className={styles.backgroundImage}
      />
      <div className={styles.content}>
        <img src={iconImage} alt="Icon" className={styles.icon} />
        <div className={styles.textContainer}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.description}>{description}</p>
          <div className={styles.stats}>
            <div className={styles.left}>
              <span>Seguidores</span>
              <p>{followers}</p>
            </div>
            <div className={styles.right}>
              <span>Membros</span>
              <p>{members}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

BestClubsCard.propTypes = {
  title: PropTypes.string.isRequired,
  backgroundImage: PropTypes.string.isRequired,
  iconImage: PropTypes.string.isRequired,
  description: PropTypes.string,
  followers: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  members: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

BestClubsCard.defaultProps = {
  description: 'Descrição aqui.',
  followers: '0',
  members: '0',
};

export default BestClubsCard;
