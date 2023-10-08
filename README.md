# From Sketches to Smiles: A Coloring Book that Gives Back
## Inspiration
The **From Sketches to Smiles Project** aims to create an exceptional coloring book by harnessing the creativity of children's sketches and the power of AI. Our mission extends beyond just producing amazing coloring books; we also have a strong commitment to giving back to our community, especially kids in need, through Susie Q's Kids Comfort Bag program.

Dr. Mary has observed that children are not only eager to give back but also have a deep affinity for drawing and coloring. They take pride in seeing their creations turned into a book, making it a cherished gift for their parents, relatives, and friends.



## What it does
Our solution offers a wide range of features and capabilities to bring kids' creativity to life. With this tool, you can:

- **Convert Sketches to Coloring Book Templates**: Transform rough sketches created by school children into coloring book templates.

- **Generate Coloring Books**: Utilize these templates to effortlessly generate captivating coloring books.

- **Ad Space for Businesses**: Enable businesses to purchase advertising space within the coloring book, supporting the printing and distribution of these books.

- **Promote Nonprofit Organizations**: Use the coloring book as a platform to advertise and raise awareness for other nonprofit organizations.

- **Digital and Print Versions**: Create both digital and print versions of the coloring book. This can include printing locally or uploading to online platforms like Amazon.

- **Fundraising Capabilities**: Set up fundraising initiatives, allowing people to purchase either digital or print versions of the book, contributing to the cause.

Our solution empowers you to harness the creativity of young artists while supporting local businesses, nonprofit organizations, and fundraising efforts in the process.


## How we built it
Here's an overview of the components used:
The backend solution includes:
- Django
- PostgresSQL
- Model to convert scribbles to sketches: ControlNet (Modified Diffusion Model)
- Model hosting platform: Replicate

The frontend solution includes:
- Next.js

The cloud solution includes:
- AWS S3 Bucket
- AWS EC2



## Challenges we ran into

1. **Lack of Free Stable Diffusion API**: One of our initial challenges was finding a reliable and free API for the Diffusion Model required for our project to convert scribbles into coloring templates. Unfortunately, we couldn't identify a stable option, and running the model locally was not feasible due to its intensive computational requirements. So we settled on using a paid API which costs around 1 cent per inference.

2. **Designing Multiple User Interfaces**: Creating an intuitive and user-friendly platform for various user roles, including schools, administrators (the person generating book pdf), and businesses (to buy ad space), within a single website posed a complex design challenge. We had to carefully consider user experience and navigation to ensure each group's distinct needs were met seamlessly.

3. **Generating Cohesive PDFs**: Combining coloring templates, business advertisements, and nonprofit organization (NPO) advertisements into a cohesive PDF presented a technical challenge. We had to implement a solution that ensured these diverse elements were arranged harmoniously in the final document, maintaining visual integrity and clarity.


## Accomplishments that we're proud of
We are quite proud that our whole system is online, from the frontend all the way to the backend, storage, and models. This is the first time any of our team members have done this.

## What we learned
We learned how to use the S3 buckets to store data over the cloud, which none of our team members had done before. We also explored the Replicate API for the first time.

## What's next for the project
Future deployments of the **From Sketches to Smiles Project** could include proper payment gateways for the business to buy ad spaces and more customization of the final book pdfs, including placements of advertisements, sorting of pages, and textual blogs. Another much larger feature would be to build a small mobile app that schools can directly use to scan kids' drawings and upload them to the server.


