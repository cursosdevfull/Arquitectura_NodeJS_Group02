interface IUpload {
  save(file: File): void;
}

class UploadAWS implements IUpload {
  save(file: File): void {
    this.progress();
    console.log("nombre del archivo", file.name);
  }

  progress() {
    console.log("Archivo subiendo %");
  }
}

class UploadAzure implements IUpload {
  save(file: File): void {
    this.progress();
    console.log("nombre del archivo", file.name);
  }

  progress() {
    console.log("Archivo subiendo %");
    this.finish();
  }

  finish() {
    console.log("Archivo subido");
  }
}

class UploadGCP implements IUpload {
  save(file: File): void {
    console.log("nombre del archivo", file.name);
    this.loadEnd();
  }

  loadEnd() {
    console.log("Archivo subido");
  }
}

const uploadFile: IUpload = new UploadAzure();
const file = new File(["hola"], "data.txt", { type: "text/plain" });
uploadFile.save(file);
