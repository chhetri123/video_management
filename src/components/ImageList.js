import React from "react";

const ImageList = ({ images, totalIimage }) => {
  const photos = images.map((img, i) => {
    return <img key={img.id} src={img.urls.regular} alt={img.description} />;
  });
  return (
    <>
      <div>Found : {totalIimage} images</div>
      <div>{photos}</div>
    </>
  );
};

export default ImageList;
