import styles from "../styles/Footer.module.css";

function Footer() {
  return (
    <footer className={styles['footer']}>
      Running List Manager, provided by <strong>
        <a href="https://github.com/enchant97">enchant97</a></strong>
    </footer>
  );
}

export default Footer;
