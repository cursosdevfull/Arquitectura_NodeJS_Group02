abstract class Upload {
  abstract newFilename: string;
  abstract saveFile(file: File): void;

  constructor() {
    this.progress();
  }

  uploadFile(file: File) {
    console.log("New Filename", this.newFilename);
    this.saveFile(file);
  }

  progress() {
    console.log("% uploaded");
  }
}

class UploadGCP extends Upload {
  newFilename: string = "informe.pdf";

  saveFile(file: File): void {
    console.log("saveFile() executed");
  }
}

const upload = new UploadGCP();
upload.uploadFile(
  new File(["informe"], "prueba.pdf", { type: "application/pdf" })
);
