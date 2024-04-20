import OpenAI from "openai";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

// 1. upload file to openaii

const openai = new OpenAI();
// await openai.files.create({
//   file:fs.createReadStream("mydata.jsonl"),
//   purpose: "fine-tune"
// })

// 2. list files

// const files = await openai.files.list()
// console.log(files.data)

// 3. A) fine tune
const fineTune = await openai.fineTuning.jobs.create({
  training_file: 'file-QDkxPfvcnYxzYVbP7nSJccPH',
  model: "gpt-3.5-turbo",
});


  // const fineTune = await openai.fineTuning.jobs.create({
  //   training_file: 'file-9mEuAI8NebhOX8URex58VPe9',
  //   model: "gpt-3.5-turbo",
  // });

//   console.log("Fine-tuning job created:", fineTune);
// } catch (error) {
//   console.error("Error during fine-tuning:", error.message);
// }
// console.log(fineTune)
// const fineTune = await openai.fineTunes
//   .create({
//     training_file: "file-SqJHYxTmk37cTuDp80jXN",
//     model: "gpt-3.5-turbo-0613",
//   })
//   .catch({err} => {
//     if(err instanceof OpenAI.APIError) {
//       console.error(err);
//     }else{
//       throw err;
//     }
//         }

// console.log(fineTune)
// async function main() {
//   const fineTune = await openai.fineTuning.jobs.create({
//     training_file: "file-abc123",
//   });

  console.log(fineTune);
// }

// main();