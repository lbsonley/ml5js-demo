import page from "page";
import styleTransferTemplate from "../../pages/styleTransfer.html";
import StyleTransfer from "../style-transfer/styleTransfer";
import imageClassifierTemplate from "../../pages/imageClassifier.html";
import ImageClassifier from "../image-classifier/imageClassifier";

page("/", () => {
  const main = document.querySelector("#main");
  main.innerHTML =
    "<h2>Select a demo from the list above to see how easy it is to do amazing Machine Learning things right in the browser.</h2>";
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
