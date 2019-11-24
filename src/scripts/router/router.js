import page from "page";
import "normalize.css";
import "../../styles/index.scss";
import homeTemplate from "../../pages/home.html";
import styleTransferTemplate from "../../pages/styleTransfer.html";
import StyleTransfer from "../style-transfer/styleTransfer";
import imageClassifierTemplate from "../../pages/imageClassifier.html";
import ImageClassifier from "../image-classifier/imageClassifier";

page("/", () => {
  const main = document.querySelector("#main");
  main.innerHTML = homeTemplate;
});

page("/style-transfer", () => {
  const main = document.querySelector("#main");
  main.innerHTML = styleTransferTemplate;
  StyleTransfer();
});

page("/image-classifier", () => {
  const main = document.querySelector("#main");
  main.innerHTML = imageClassifierTemplate;
  ImageClassifier();
});

page();
