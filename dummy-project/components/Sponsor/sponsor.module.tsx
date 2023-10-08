import React, { useState, useEffect } from "react";
import styles from "./sponsor.module.css";
import BookTemplate from "../bookTemplate/bookTemplate.module";
const Sponsor = () => {
	const [books, setBooks] = useState([]);
	const [selectedBooks, setSelectedBooks] = useState([]);
	const getResponse = () => {
		return {
			ok: 1,
			count: 2,
			next: null,
			previous: null,
			results: [
				{
					id: 1,
					name: "book-1",
					about: "htis book is about something",
					url: null,
					is_published: null,
					created_on: "2023-10-08T01:31:31.196001Z",
					modified_on: "2023-10-08T01:31:31.196077Z",
					sponsors: [2, 3],
					nonprofits: [2],
					drawings: [],
				},
				{
					id: 2,
					name: "book-2",
					about: "htis book is about something",
					url: "https://opp-hack-asu.s3.amazonaws.com/pdf_uploads/book-2.pdf",
					is_published: null,
					created_on: "2023-10-08T04:14:14.632453Z",
					modified_on: "2023-10-08T04:14:14.632487Z",
					sponsors: [2, 3],
					nonprofits: [2],
					drawings: [1, 2, 3, 4],
				},
			],
		};
	};
	useEffect(() => {
		const fetchData = async () => {
			try {
				// const response = await fetch("api/books"); // Replace with your API endpoint
				const response = getResponse();
				if (response.ok) {
					// const data = await response.json();
					// setBooks(data.results); // Assuming your response structure has a "sponsors" array
					setBooks(response.results);
				} else {
					console.error("Failed to fetch sponsors");
				}
			} catch (error) {
				console.error("Error during sponsor fetch:", error);
			}
		};

		fetchData();
	}, []);

	const handleSelect = (bookId) => {
		// Toggle the selected state of the sponsor
		setSelectedBooks((prevSelected) =>
			prevSelected.includes(bookId)
				? prevSelected.filter((id) => id !== bookId)
				: [...prevSelected, bookId]
		);
	};

	const handleCheckout = async () => {
		// Make the update call for selected sponsors
		try {
			const response = await fetch("https://api.example.com/updateSponsors", {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ selectedBooks }),
			});

			if (response.ok) {
				console.log("Selected sponsors updated successfully");
			} else {
				console.error("Failed to update selected sponsors");
			}
		} catch (error) {
			console.error("Error during sponsor update:", error);
		}
	};

	return (
		<div className={styles.classMain}>
			<div className={styles.bookTemplateParent}>
				{books.map((book) => (
					<div key={book.id} className={styles.bookCards}>
                        <button
                            onClick={() => handleSelect(book.id)}
                            className={selectedBooks.includes(book.id) ? styles.selectedCard : ""}
                        >
							<BookTemplate name={book.name} description={book.about} />
						</button>
						{/* {book.name} 
                        {book.about} */}
					</div>
				))}
			</div>
			<button className={styles.button} onClick={handleCheckout}>
				Checkout
			</button>
		</div>
	);
};

export default Sponsor;
