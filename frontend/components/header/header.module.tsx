import Image from "next/image";
import styles from "./header.module.css";
const Header = () => {
	return (
		<>
			<div className={styles.headerStyle}>
				<Image
					src="/images/Susie-Qs-Kids-Inc-Logo.png"
					alt="Your Image Alt Text"
					width={200}
					height={50}
				/>
			</div>
		</>
	);
};

export default Header;

// const Hello = (props: any) => {
// 	return (
// 		<>
// 			<div className={`${styles.mainNavContainer}`}>hello</div>
// 		</>
// 	);
// };

// export default Hello;
