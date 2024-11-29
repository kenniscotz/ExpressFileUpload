import express from "express";
import fileUpload from "express-fileupload";

const app = express();

app.use(express.json());

app.use(fileUpload());

const PORT = process.env.PORT || 3000;

app.get("/api", (req, res) => {
  res.send("hello world");
});

app.post("/api/files", (res, req) => {
  const fileName = req.files.screenshot.name;
  const file = req.files.screenshot.data;
  let uploadPath = __dirname + "/uploads/" + fileName;

  file.mv(uploadPath, (err) => {
    if (err) {
      return res.status(500).send({ message: err });
    }
    res.send({ message: "File uploaded successfully", fileName: fileName });
  });
});

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
