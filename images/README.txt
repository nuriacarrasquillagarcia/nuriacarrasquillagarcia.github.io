HOW TO ADD YOUR OWN IMAGES
===========================

Drop your image files into this "images" folder, then swap the
placeholder <img src="..."> paths in the HTML for your file names.

  images/profile.jpg          -> used in about.html
  images/project-1.jpg        -> used in projects.html
  images/project-2.jpg        -> used in projects.html
  images/project-3.jpg        -> used in projects.html

The site renders images in grayscale (see .img-frame img in
css/style.css) to match the terminal theme. Remove the
`filter: grayscale(1) ...` rule there if you want full color instead.

Recommended sizes:
  profile photo   : roughly square, at least 300x300px
  project shots   : roughly 4:3 or 16:9, at least 400px wide
