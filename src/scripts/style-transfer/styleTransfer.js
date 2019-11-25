import p5 from "p5";
import ml5 from "ml5";
import toBase64 from "../utils/base64";

const StyleTransfer = () => {
  // elements
  const imageInput = document.querySelector("#image-input");
  const waveTransferBtn = document.querySelector("#wave-transfer-btn");
  const udnieTransferBtn = document.querySelector("#udnie-transfer-btn");
  let img = document.querySelector("#img");
  const statusMsg = document.querySelector("#status-msg");

  // event listeners
  imageInput.addEventListener("change", e => handleFileUpload(e));
  waveTransferBtn.addEventListener("click", e => transferStyle(waveTransfer));
  udnieTransferBtn.addEventListener("click", e => transferStyle(udnieTransfer));

  const addStatusMessage = text => {
    const tag = document.createElement("p");
    tag.classList.add("status-text");
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
      })
      .catch(err => handleError(err));
  };

  const transferStyle = styleFn => {
    addStatusMessage("Loading models and applying styles...");
    new p5(styleFn, "style-transfer");
  };

  const handleError = err => {
    addStatusMessage("There was an error. See the terminal for details");
    console.log(err);
  };

  const waveTransfer = p => {
    p.setup = function() {
      p.noCanvas();

      ml5
        .styleTransfer("../public/models/style-transfer/wave")
        .then(model => model.transfer(img))
        .then(result => p.createImg(result.src).parent("style-wave"))
        .catch(err => handleError(err));
    };
  };

  const udnieTransfer = p => {
    p.setup = function() {
      p.noCanvas();

      ml5
        .styleTransfer("../public/models/style-transfer/udnie")
        .then(model => model.transfer(img))
        .then(result => p.createImg(result.src).parent("style-udnie"))
        .catch(err => handleError(err));
    };
  };
};

export default StyleTransfer;
