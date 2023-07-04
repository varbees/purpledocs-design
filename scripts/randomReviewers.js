const URL = 'https://randomuser.me/api/';
const PlaceholderImgURL = '../images/avatar.png';

async function generateFaces(parentSelector, numFaces) {
  const container = document.querySelector(parentSelector);

  if (!container) {
    console.error(`Element with selector "${selector}" not found.`);
    return;
  }

  // Create default image placeholder
  const placeholderImgages = [];
  for (let i = 0; i < numFaces; i++) {
    const PlaceholderImg = new Image();
    PlaceholderImg.src = PlaceholderImgURL;
    PlaceholderImg.alt = `Placeholder Image ${i}`;
    container.appendChild(PlaceholderImg);
    placeholderImgages.push(PlaceholderImg);
  }

  // making sure we get all images
  const imgPromises = [];
  for (let i = 0; i < numFaces; i++) {
    const imgPromise = fetch(URL)
      .then(res => res.json())
      .then(data => {
        const imgSrc = data.results[0].picture.medium;
        const imgEle = new Image();
        imgEle.src = imgSrc;
        imgEle.alt = `random user ${i}`;
        imgEle.onload = () => {};

        container.replaceChild(imgEle, placeholderImgages[i]);
      })
      .catch(err => console.log(err.message));
    imgPromises.push(imgPromise);
  }
  await Promise.all(imgPromises);
}

generateFaces('.reviewer-imgs', 7);
