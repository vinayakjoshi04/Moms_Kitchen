// /src/utils/imageLoader.js

function importAll(r) {
    let images = {};
    r.keys().forEach((fileName) => {
      // fileName might look like: "./butterchicken.png"
      // Remove "./", remove extension, and lower-case everything
      const cleanedName = fileName
        .replace("./", "")                         // remove leading "./"
        .replace(/\.(png|jpe?g|svg)$/i, "")        // remove file extension
        .toLowerCase()                             // convert to lower case
        .replace(/[^\w]/g, "");                    // remove non-alphanumeric/underscore
  
      // e.g. "butterchicken"
      images[cleanedName] = r(fileName);
    });
    return images;
  }
  
  // Recursively loads all .png, .jpg, .jpeg, .svg in ../assets/dish_images
  //  - The false parameter means "do not look in subfolders"
  const dishImages = importAll(
    require.context("../assets/dish_images", false, /\.(png|jpe?g|svg)$/i)
  );
  
  export default dishImages;
  