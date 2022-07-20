import { Component } from "solid-js";
import styles from "./Footer.module.css";

const Footer: Component = () => {
  return (
    <footer class={styles.Footer}>
      Running List Manager, provided by <strong>
        <a href="https://github.com/enchant97">enchant97</a></strong>
    </footer>
  );
};

export default Footer;
