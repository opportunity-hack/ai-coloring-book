import styles from "./bookTemplate.module.css";
import Image from "next/image";

const BookTemplate = (props: any) => {
	return (
		<div className={styles.template}>
			<div>
				<label>{props.name}</label>
				<Image
					src="/images/book-template-image.png"
					alt="Your Image Alt Text"
					width={50}
					height={50}
				/>
			</div>
			{props.description}
		</div>
	);
};
export default BookTemplate;
