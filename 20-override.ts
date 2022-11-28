class Upload {
  /*     save(file: File): string {
            console.log("file saved", file.name)
            return "File saved"
        } */

  uploadFile(file: File) {
    //this.save(file)
    this.saveFile(file);
  }

  saveFile(file: File) {
    console.log("saveFile()", file.name);
    return "saveFile() executed";
  }
}

class UploadAWS extends Upload {
  override save(file: File): string {
    console.log("file uploaded", file.name);
    return "File uploaded";
  }
}

const upload = new UploadAWS();
const file = new File(["data"], "data.txt", { type: "text/plain" });

upload.uploadFile(file);
