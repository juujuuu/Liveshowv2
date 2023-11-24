import cex from "./shows/cex";
import spc from "./shows/spc";
import bre from "./shows/bre";
import fmx from "./shows/fmx";
import fme from "./shows/fme";
class Base64Images {
  //Store for base64 encoded headers, returns the encoded string based of the show acronym passed in
  constructor(show) {
    switch (show) {
      case "SPC":
        this.image = spc;
        break;
      case "BRE":
        this.image = bre;
        break;
      case "FMX":
        this.image = fmx;
        break;
      case "ABX":
        this.image = fmx;
        break;
      case "FME":
        this.image = fme;
        break;
      case "ABE":
        this.image = fme;
        break;
        case "TEE":
          this.image = fme;
          break;
      case "CEX":
        this.image = cex;
        break;
      case "TME":
        this.image = cex;
        break;
    }
  }
  getImage() {
    return this.image;
  }
}
export default Base64Images;
