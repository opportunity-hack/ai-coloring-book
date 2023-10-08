import { useState, useRef } from "react";
import styles from "./upload.module.css";
import { Button } from "@mui/material";

const Upload: React.FC = () => {
	const [file, setFile] = useState<File | null>(null);
	const [textFields, setTextFields] = useState({
		field1: "",
		field2: "",
		field3: "",
		// Add more fields as needed
	});
	const fileInputRef = useRef(null);
	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFile = event.target.files?.[0];
		if (selectedFile) {
			setFile(selectedFile);
		}
	};

	const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setTextFields((prevFields) => ({
			...prevFields,
			[name]: value,
		}));
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		// Create a FormData object to append the file and text fields
		const formData = new FormData();
		formData.append("image", file as Blob);
		formData.append("school", textFields.field1);
		formData.append("student", textFields.field2);
		formData.append("subject", textFields.field3);

		try {
			const response = await fetch("/api/drawings", {
				method: "POST",
				body: formData,
			});

			if (response.ok) {
				console.log("POST request successful");
				// Handle success, e.g., show a success message
			} else {
				console.error("POST request failed");
				// Handle failure, e.g., show an error message
			}
		} catch (error) {
			console.error("Error during POST request:", error);
			// Handle error, e.g., show an error message
		}

		// Perform your POST request here using fetch or a library like Axios
		// Include file and textFields in the request payload

		console.log("File:", file);
		console.log("Text Fields:", textFields);
	};

	const handleRectangleClick = (event) => {
			fileInputRef.current.click();
	};

	return (
		<div className={styles.uploadContainer}>
			<form onSubmit={handleSubmit}>
				<div className={styles.dashedRectangle} onClick={handleRectangleClick}>
					<div className={styles.formGroup}>
						<label className={styles.uploadLabel}>Upload your file here</label>
						<input
							ref={fileInputRef}
							id="fileInput"
							type="file"
							accept=".pdf, .jpeg, .jpg, .png"
							onChange={handleFileChange}
						/>
					</div>
				</div>

				<div className={styles.textClass}>
					<label className={styles.label}>School Name:</label>
					<input
						type="text"
						name="field1"
						value={textFields.field1}
						onChange={handleTextChange}
						className={styles.input}
						required
					/>
				</div>

				<div className={styles.textClass}>
					<label className={styles.label}>Student Name:</label>
					<input
						type="text"
						name="field2"
						value={textFields.field2}
						onChange={handleTextChange}
						className={styles.input}
						required
					/>
				</div>

				<div className={styles.textClass}>
					<label className={styles.label}>Art subject:</label>
					<input
						type="text"
						name="field3"
						value={textFields.field3}
						onChange={handleTextChange}
						className={styles.input}
						required
					/>
				</div>
				{/* Add more text fields as needed */}

				<button type="submit" className={styles.button}>
					Submit
				</button>
			</form>
		</div>
	);
};

export default Upload;
