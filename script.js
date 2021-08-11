// Unsplash API
const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

let photosArray = [];

let count = 5; //initial count for fast loading of web-page
const apiKey = "q48ja20q_YJh7_1m4B_JgUsmNCcj5VQMPf7R8TSLRD0";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if the images are loaded

function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    count = 20; //after initial page has loaded, then these counts of images gets loaded in the mean time when scrolled down
  }
}

// Helper function to set attribute on DOM elements

function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Create elements for links & photos and adding to DOM

function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;

  photosArray.forEach((photo) => {
    //   Creating the <a> to link to unsplash
    const item = document.createElement("a");

    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });

    // Create <img> for photo
    const img = document.createElement("img");

    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    //Event listener, check when each image is finished loading
    img.addEventListener("load", imageLoaded);

    // Put <img> inside <a>, then put both inside imageContainer element

    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Get photos from unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    //Catch error
  }
}

// Check to see if the scroll has reached to the bottom of the page, then load more photos

window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
    // console.log("innerheight: ", window.innerHeight);
    // console.log("scrollY: ", window.scrollY);
    // console.log("total : ", window.innerHeight + window.scrollY);
    // console.log("resultant: ", document.body.offsetHeight - 1000);
  }
});

// On Load

getPhotos();
