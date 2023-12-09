import ImageGallery from "react-image-gallery";
import React from "react";
const shul = require("../assets/shul.jpg")
const shulOutside = require("../assets/shul-outside.jpeg")



const images = [
  {
    original: "https://picsum.photos/id/1018/1000/600/",
    thumbnail: "https://picsum.photos/id/1018/250/150/",
  },
  {
    original: "https://picsum.photos/id/1015/1000/600/",
    thumbnail: "https://picsum.photos/id/1015/250/150/",
  },
  {
    original: "https://picsum.photos/id/1019/1000/600/",
    thumbnail: "https://picsum.photos/id/1019/250/150/",
  },
];
const a = [
    {original: shul, originalHeight: "400px"},
    {original: shulOutside, originalHeight: "400px"}
   
]

export default class MyGallery extends React.Component {
  render() {
    return <ImageGallery items={a}  />;
  }
}