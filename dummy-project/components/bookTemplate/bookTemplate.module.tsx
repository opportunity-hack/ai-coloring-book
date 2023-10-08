import styles from "./bookTemplate.module.css";
import Image from "next/image";

const BookTemplate = (props: any) => {
	return (
		<div className={styles.template}>
			<label className={styles.generalPadding}>{props.name}</label>
			<div className={styles.generalPadding}>
				<Image
					src="/images/book-template-image.png"
					alt="Your Image Alt Text"
					width={70}
					height={70}
				/>
			</div>
			<div className={styles.generalPadding}>{props.description}</div>
		</div>
	);
};
export default BookTemplate;
