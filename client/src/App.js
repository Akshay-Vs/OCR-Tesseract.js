import { Card, Input, Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  const [image, setImage] = useState(null);
  const [text, setText] = useState("Click to start generating text");
  const [title, setTitle] = useState("Image Accepted");
  const [progress, setProgress] = useState("0%");
  const [keywords, setKeywords] = useState(null);
  const [showImage, setShowImage] = useState(false);
  const [acceptClick, setAcceptClick] = useState(true);

  const handleStart = async () => {
    if (!acceptClick) return;
    setAcceptClick(false);
    setTitle("Generating Text...");
    const res = await axios.post("http://localhost:8080/ocr", {
      image: { url: image },
      keywords: keywords ? keywords.split(" ") : [],
    });
    const data = res.data;
    setText(data.correctedText);
    setTitle("Text Generated");
    setProgress("100%");
  };

  useEffect(() => {
    setText("Click to start generating text");
    setTitle("Image Accepted");
    setProgress("0%");
    setAcceptClick(true);
  }, [keywords, image]);

  return (
    <div className="flex items-center min-h-screen w-screen p-4 justify-center ">
      <Card
        color="transparent"
        shadow={false}
        className="flex justify-center items-center flex-col meterial-gray p-10 h-screen rounded-3xl lg:h-full sm:h-screen shadow"
      >
        <div className="felx justify-center align-top mb-10 lg:mb:0">
          <Typography
            color="gray"
            variant="h3"
            className="mt-1 font-normal text-center"
          >
            Basic OCR 📑👁‍🗨
          </Typography>
        </div>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Link To Image
            </Typography>
            <Input
              size="lg"
              placeholder="https://example.com/image.png"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              required
              onChange={(e) => {
                setImage(e.target.value);
                setShowImage(true);
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Keywords (Optional)
            </Typography>
            <Input
              size="lg"
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              onChange={(e) => setKeywords(e.target.value)}
            />
          </div>
        </form>
        <figure
          className={`relative  mt-10 transition-all duration-500 ${
            showImage ? "h-96 w-96" : "h-0"
          }`}
        >
          <img
            className="h-full w-full rounded-xl object-cover object-center"
            src={image}
            onError={() => {
              setShowImage(false);
              setProgress("Invalid Image URL");
            }}
          />
          <figcaption
            className={`absolute cursor-pointer bottom-8 left-2/4 flex w-[calc(100%-4rem)] -translate-x-2/4 justify-between rounded-xl border border-white bg-white/80 py-4 px-6 shadow-lg shadow-black/5 saturate-200 backdrop-blur-sm transition-all duration-700 ${
              showImage ? "h-auto opacity-100" : "h-0 opacity-0"
            }`}
            onClick={handleStart}
          >
            <div
              className={`transition-all duration-1000 ${
                showImage ? "opacity-100" : "opacity-0"
              }`}
            >
              <Typography
                variant="h5"
                color="blue-gray"
                className={`transition-all duration-1000 ${
                  showImage ? "opacity-100" : "opacity-0"
                }`}
              >
                {title}
              </Typography>
              <Typography
                color="gray"
                className={`mt-5 font-normal max-h-56 overflow-y-scroll overflow-x-hidden transition-all duration-1000 ${
                  showImage ? "opacity-100" : "opacity-0"
                }`}
              >
                {text}
              </Typography>
            </div>
            <Typography
              variant="h5"
              color="blue-gray"
              className={`transition-all duration-1000 ${
                showImage ? "opacity-100" : "opacity-0"
              }`}
            >
              {progress}
            </Typography>
          </figcaption>
        </figure>
      </Card>
    </div>
  );
}
