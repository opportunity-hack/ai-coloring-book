import styles from "./footer.module.css";
const Footer = () => {
	return (
		<div className={styles.footerStyle}>
			<a href="" className={styles.textStyle}>
				About
			</a>
			<a href="" className={styles.textStyle}>
				Donate
			</a>
			<a href="" className={styles.textStyle}>
				Contact Us
			</a>
		</div>
	);
};

export default Footer;
