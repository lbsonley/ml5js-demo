import p5 from "p5";
import ml5 from "ml5";
import toBase64 from "../utils/base64";

const StyleTransfer = () => {
  const imageInput = document.querySelector("#image-input");
  let img = document.querySelector("#img");
  const statusMsg = document.querySelector("#status-msg");

  imageInput.addEventListener("change", e => handleFileUpload(e));

  const addStatusMessage = text => {
    const tag = document.createElement("p");
    const txt = document.createTextNode(text);
    tag.appendChild(txt);
    statusMsg.appendChild(tag);
  };

  const handleFileUpload = e => {
    toBase64(e.target.files[0])
      .then(base64Image => {
        img.src = base64Image;
      })
      .then(() => {
        addStatusMessage("Image successfully uploaded.");
        addStatusMessage("Loading models and applying styles...");
        new p5(s, "style-transfer");
      })
      .catch(err => handleError(err));
  };

  const handleError = err => {
    addStatusMessage("There was an error. See the terminal for details");
    console.log(err);
  };

  const s = p => {
    p.setup = function() {
      p.noCanvas();

      // Create two Style methods with different pre-trained models
      ml5
        .styleTransfer("../public/models/style-transfer/wave")
        .then(model => model.transfer(img))
        .then(result => p.createImg(result.src).parent("style-a"))
        .catch(err => handleError(err));

      ml5
        .styleTransfer("../public/models/style-transfer/udnie")
        .then(model => model.transfer(img))
        .then(result => p.createImg(result.src).parent("style-b"))
        .catch(err => handleError(err));
    };
  };
};

export default StyleTransfer;
