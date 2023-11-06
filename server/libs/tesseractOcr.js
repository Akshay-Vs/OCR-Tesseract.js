const { createWorker, createScheduler } = require("tesseract.js");

const ocr = async (image) => {
  const scheduler = createScheduler();
  const worker1 = await createWorker("eng");
  const worker2 = await createWorker("eng");

  scheduler.addWorker(worker1);
  scheduler.addWorker(worker2);

  const res = [await scheduler.addJob("recognize", image.url)];
  await scheduler.terminate();
  return res;
};

module.exports = { ocr };
