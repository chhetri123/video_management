import React from "react";
import ImageCard from "./../ImageCard/ImageCard";
import "./ImageList.css";

const ImageList = ({ images, totalIimage }) => {
  const photos = images.map((img) => {
    return <ImageCard key={img.id} image={img} />;
  });
  return (
    <>
      <div className="totalImage">Found : {totalIimage} images</div>
      <div className="Image_list">{photos}</div>
    </>
  );
};

export default ImageList;
