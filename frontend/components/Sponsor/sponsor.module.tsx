import React, { useState, useEffect } from "react";
import styles from "./sponsor.module.css";
import BookTemplate from "../bookTemplate/bookTemplate.module";
const Sponsor = () => {
	const [books, setBooks] = useState([]);
	const [selectedBooks, setSelectedBooks] = useState([]);
	let response;
	const getResponse = () => {
		return {
			ok: 1,
			count: 2,
			next: null,
			previous: null,
			results: [
				{
					id: 1,
					name: "Book Title 1",
					about: "Something about this book 101",
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
					name: "Book Title 2",
					about: "Something about this book 102",
					url: "https://opp-hack-asu.s3.amazonaws.com/pdf_uploads/book-2.pdf",
					is_published: null,
					created_on: "2023-10-08T04:14:14.632453Z",
					modified_on: "2023-10-08T04:14:14.632487Z",
					sponsors: [2, 3],
					nonprofits: [2],
					drawings: [1, 2, 3, 4],
				},
				{
					id: 3,
					name: "Book Title 3",
					about: "Something about this book 103",
					url: "https://opp-hack-asu.s3.amazonaws.com/pdf_uploads/book-2.pdf",
					is_published: null,
					created_on: "2023-10-08T04:14:14.632453Z",
					modified_on: "2023-10-08T04:14:14.632487Z",
					sponsors: [2, 3],
					nonprofits: [2],
					drawings: [1, 2, 3, 4],
				},
				{
					id: 4,
					name: "Book Title 4",
					about: "Something about this book 104",
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
				// const response = await fetch("http://204.236.243.72:8000/api/books"); // Replace with your API endpoint
				response = getResponse();
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

	const handleCheckout = () => {
		response.results.map(async (book) => {
			if (selectedBooks.includes(book.id)) {
				const sponsorId = 1;
				const updatedBook = {
					...book,
					sponsors: [...book.sponsors, sponsorId],
				};

				// Make the update call for the current book ID
				await makeUpdateCall(book.id, updatedBook);
			}
		});
	};

	const makeUpdateCall = async (bookId, updatedBook) => {
		// Make the update call for selected sponsors
		try {
			const response = await fetch(
				"http://204.236.243.72:8000/api/update/${bookId}/",
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(updatedBook),
				}
			);

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
							className={
								selectedBooks.includes(book.id) ? styles.selectedCard : ""
							}
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
