import math
import PIL
from PIL import Image

# # Define the dimensions of the output PDF
# pdf_width = 800  # You can adjust this based on your preference
# pdf_height = 800
from PIL import Image, ImageDraw, ImageFont

pdf_width = 500  # A4 width in pixels (8.27 inches)
pdf_height = 842  # A4 height in pixels (11.69 inches)

base = "/Users/darshansheth/Desktop/personal-projects/suzie-kids/Caffeine-Compilers--FromSketchestoSmiles-AColoringBookthatGivesBack/backend/suzie_api/"
image_paths = ["image1.png", "image2.png", "image3.png", "image4.png",
               "image5.png", "image1.png", "image2.png", "image3.png"]

# Calculate the number of rows and columns for the 4x4 grid
num_rows = 4
num_cols = 4
num_images = len(image_paths)
num_pages = math.ceil(num_images / (num_rows * num_cols))

# Create a PDF with multiple pages
pdf = Image.new('RGB', (pdf_width * num_cols, pdf_height * num_rows * num_pages), (255, 255, 255))

for page in range(num_pages):
    for row in range(num_rows):
        for col in range(num_cols):
            index = page * (num_rows * num_cols) + row * num_cols + col
            if index < num_images:
                image_path = base + image_paths[index]
                img = Image.open(image_path)
                img = img.resize((pdf_width, pdf_height), PIL.Image.LANCZOS)
                x = col * pdf_width + (pdf_width - img.width) // 2
                y = (row + (page * num_rows)) * pdf_height + (pdf_height - img.height) // 2
                pdf.paste(img, (x, y))

# Save the PDF
pdf.save('output.pdf')
print('PDF saved as output.pdf')