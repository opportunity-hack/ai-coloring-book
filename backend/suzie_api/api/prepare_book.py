from PIL.ImageDraw import ImageDraw
from PIL.ImageFont import ImageFont
import requests
from io import BytesIO
from PIL import Image, ImageDraw, ImageFont
from api.s3_handler import S3Handler
import os

import logging
import sys
# logger
logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)


from dotenv import load_dotenv
load_dotenv()

colors_list = [(180, 181, 219),(254, 197, 87), (253, 162, 177), (154, 222, 221), (112, 117, 195), (255, 129, 150), (147, 192, 104), (249, 166, 92), (142, 71, 136), (0, 59, 90)]
s3_handler = S3Handler(os.getenv("AWS_BUCKET"))


def prettify_page(drawing_context, heading, color, page_no, scribble=False):
    paper_width = 2480
    paper_height = 3208
    margin = 50

    font_path = 'api/content/lilita-one.regular.ttf'
    font_size = 200
    font = ImageFont.truetype(font_path, font_size)  # You may need to change the font path

    # Draw the inner border
    border_width = 20
    border_color = color  # Black color for the border
    drawing_context.rectangle(
        [(2 * border_width, 2 * border_width),
         (paper_width - 2 * border_width, paper_height + 300 - 2 * border_width)],
        outline=border_color, width=border_width
    )

    # Set the font size for the page number
    page_number_font_size = 50  # Adjust as needed
    page_number_font = ImageFont.truetype(font_path, page_number_font_size)

    page_number = str(page_no)  # Adjust as needed

    # Calculate the position for the page number
    page_number_text_width, page_number_text_height = drawing_context.textsize(page_number, page_number_font)
    x_page_number = (paper_width - page_number_text_width) // 2
    y_page_number = paper_height + 250 - page_number_text_height + 10  # Adjust vertical position as needed

    # Draw a white background rectangle for the page number
    background_height = page_number_text_height + 20  # Adjust padding as needed
    drawing_context.rectangle(
        [(x_page_number - 10, y_page_number - 10),
         (x_page_number + page_number_text_width + 10, y_page_number + background_height)],
        fill=(255, 255, 255)
    )

    # Draw the page number
    drawing_context.text((x_page_number, y_page_number), page_number, fill=color, font=page_number_font)

    # Add the heading text at the top of the page
    heading_text = heading
    text_width, text_height = drawing_context.textsize(heading_text, font)
    x_text = (paper_width - text_width) // 2  # Center the text horizontally
    y_text = 100  # Adjust the vertical position as needed
    drawing_context.text((x_text, y_text), heading_text, fill=color, font=font)

    if scribble:
        # Assuming the image is to be centered, calculate its position and draw a border around it
        image_width, image_height = (2280, 2280)
        x_image = (paper_width - image_width) // 2
        y_image = (paper_height - image_height) // 2 + 100  # Adjust based on heading's position
        # Adjust border size and position as necessary
        drawing_context.rectangle(
            [(x_image - border_width, y_image - border_width),
             (x_image + image_width + border_width, y_image + image_height + border_width)],
            outline=color, width=border_width
        )

    return drawing_context


def create_sponsors_page(heading, color, image_urls, page_no):
    # A4 paper size in pixels (3508x2480)
    paper_width = 2480
    paper_height = 3208
    margin = 50

    # Create a new blank A4-sized image
    output_image = Image.new("RGB", (paper_width, paper_height + 300), (255, 255, 255))

    # Create a drawing context
    draw = ImageDraw.Draw(output_image)

    draw = prettify_page(draw, heading, color, page_no)

    # Calculate the size of each image on the A4 page
    image_width = (paper_height - 5 * margin) // 3
    image_height = (paper_height - 5 * margin) // 3

    # Calculate the number of rows and columns
    num_columns = 2
    num_rows = (len(image_urls) + num_columns - 1) // num_columns  # Round up to the nearest whole number

    # Adjust starting positions
    starting_x = (2480 - image_width * num_columns - margin * (num_columns - 1)) // 2
    starting_y = 320 + (paper_height - margin * (num_rows + 1) - image_height * num_rows) // 2

    
    # Loop through the image URLs and paste them onto the A4 canvas
    total_images = len(image_urls)
    logger.info(f"Total images: {total_images}")

    for i, image_url in enumerate(image_urls):
        logger.info(f"Processing image {i + 1} of {total_images} for page {page_no} with URL: {image_url}")
        # Download the image from the URL
        response = requests.get(image_url)
        img = Image.open(BytesIO(response.content))

        # Resize the image to fit on the A4 page
        img = img.resize((image_width, image_height), Image.ANTIALIAS)

        # Calculate the position to paste the image
        if (total_images % 2 == 1) and (i == total_images - 1):
            x = int((2480 - image_width) / 2)
        else:
            x = int(starting_x) + ((i % 2) * (image_width + margin))
        y = int(starting_y) + ((i // 2) * (image_height + margin))

        # Paste the image onto the A4 canvas
        output_image.paste(img, (x, y))

    # Save the final image
    return output_image


def convert_images_to_pdf(book_name, scribble_urls, sponsor_urls=[], npo_urls=[], headings=None):
    if headings is None:
        headings = [""] * len(scribble_urls)
    # BASE_DIR = os.path.dirname("/content/")
    pdf_path = f"final_pdf.pdf"
    pages = []
    cover = Image.open("api/content/Cover.jpg").resize((2480, 3508))
    pages.append(cover)
    page_no = 1
    colors = colors_list

    logger.info(f"Total scribbles: {len(scribble_urls)}")
    for i, url in enumerate(scribble_urls):
        logger.info(f"Processing scribble {i + 1} of {len(scribble_urls)} with URL: {url}")
        response = requests.get(url)
        drawing = Image.open(BytesIO(response.content)).resize((2280, 2280))
        paper_width = 2480
        paper_height = 3208
        bg = Image.new("RGB", (paper_width, paper_height + 300), (255, 255, 255))
        draw = ImageDraw.Draw(bg)
        prettified_draw = prettify_page(draw, headings[i], colors[i % len(colors)], page_no, scribble=True)
        # Calculate center position for the scribble image
        x_center = (paper_width - drawing.width) // 2
        y_center = (paper_height - drawing.height) // 2 + 100  # Adjust y position to accommodate heading
        bg.paste(drawing, (x_center, y_center))
        pages.append(bg)
        page_no += 1

    logger.info(f"Total sponsors: {len(sponsor_urls)}")
    if len(sponsor_urls) != 0 and sponsor_urls is not None:
        logger.info(f"Creating sponsors pages with URLs: {sponsor_urls}")        
        for i in range(0, len(sponsor_urls), 6):
            pages.append(
                create_sponsors_page("SPONSORS", (255, 127, 0), sponsor_urls[i:min((i + 6), len(sponsor_urls))],
                                     page_no))
            page_no += 1
    if len(npo_urls) != 0 and npo_urls is not None:
        logger.info(f"Creating NGOs pages with URLs: {npo_urls}")
        for i in range(0, len(npo_urls), 6):
            pages.append(create_sponsors_page("NGOs", (0, 180, 42), npo_urls[i:min((i + 6), len(npo_urls))], page_no))
            page_no += 1

    # pages[0].save(pdf_path, "PDF", resolution=90.0, save_all=True, append_images=pages[1:])
    # return pdf_path
    pdf_bytes = BytesIO()
    pages[0].save(pdf_bytes, "PDF", resolution=90.0, save_all=True, append_images=pages[1:])
    pdf_bytes.seek(0)  # Go back to the beginning of the BytesIO object

    # Upload the final PDF to S3
    final_pdf_name = f"{book_name}_final_magazine.pdf"
    s3_handler.upload_file_to_s3(pdf_bytes, final_pdf_name)
    s3_pdf_url = s3_handler.get_s3_url(final_pdf_name)
    print(f"PDF uploaded to S3: {s3_pdf_url}")
    
    return s3_pdf_url


# convert_images_to_pdf(
#     scribble_urls=['https://i.pinimg.com/originals/55/06/eb/5506eb9218016c04241452c5bc8dd913.jpg'] * 9,
#     sponsor_urls=['https://shorturl.at/lz457'] * 11,
#     npo_urls=['https://shorturl.at/lz457'] * 11,
# )
