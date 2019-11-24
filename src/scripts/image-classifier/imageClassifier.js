import p5 from "p5";
import ml5 from "ml5";
import toBase64 from "../utils/base64";

const ImageClassifier = () => {
  const imageInput = document.querySelector("#image-input");
  const img = document.getElementById("img");

  const s = p => {
    const result = document.getElementById("result");
    const probability = document.getElementById("probability");

    p.setup = function() {
      ml5
        .imageClassifier("MobileNet")
        .then(classifier => {
          console.log(classifier);
          return classifier.classify(img);
        })
        .then(results => {
          result.innerText = results[0].label;
          probability.innerText = results[0].confidence.toFixed(4);
        })
        .catch(err => {
          result.innerText = err;
        });
    };
  };

  imageInput.addEventListener("change", e => {
    toBase64(e.target.files[0])
      .then(base64Image => {
        img.src = base64Image;
      })
      .then(() => {
        new p5(s, "img-classifier");
      })
      .catch(err => console.log(err));
  });
};

export default ImageClassifier;
