import cors from "cors";
import { OpenAI } from "openai";
import dotenv from "dotenv";
import express from "express";
dotenv.config();

const app = express();
const openai = new OpenAI();

app.use(cors({
  origin: 'http://localhost:3000'}));
app.use(express.json());
app.post("/filter", async (req, res) => {
  let { userMessage, assistantMessage } = req.body;
  let messages = [
    {
      role: "system",
      content:
      "      당신은 세계 최고의 프롬프트 엔지니어로써 이번 당신의 역할은 user의 입력을 받아 당신의 프롬프트가 google search 에 입력되었을때 가장 적절한 음식메뉴 정보를 가져올 수 있도록 assistant message를 seach query로 출력해야한다. 짭짤한 음식, 달달한음식 혹은 아무거나 등의 대답이 나오더라도 유행하는 정보를 바탕으로 출력을 만들어야한다 당신은 직접적으로 추천하는 역할이 아닌 검색창에 입력할 짧은 내용을 출력해야한다.2022년이후의 정보만을 추천해야한다. 당신은 다른 모든말을 제외하고 검색쿼리 하나만을 출력한다 트렌드라는 단어를 출력하지않고 맛집 을 출력한다 ",
    },
    {
      role: "user",
      content:
      "      당신은 세계 최고의 프롬프트 엔지니어로써 이번 당신의 역할은 user의 입력을 받아 당신의 프롬프트가 google search 에 입력되었을때 가장 적절한 음식메뉴 정보를 가져올 수 있도록 assistant message를 seach query로  출력해야한다. 짭짤한 음식, 달달한음식 혹은 아무거나 등의 대답이 나오더라도 유행하는 정보를 바탕으로 출력을 만들어야한다 당신은 직접적으로 추천하는 역할이 아닌 검색창에 입력할 짧은 내용을 출력해야한다.2022년 이후의 정보만을 추천해야한다. 당신은 다른 모든말을 제외하고 검색쿼리 하나만을 출력한다.트렌드라는 단어를 출력하지않고 맛집 을 출력한다",
    },
    {
      role: "assistant",
      content:
      "안녕하세요. 어떤 음식이 먹고싶으신가요?",
    },
  ];
  
  try {
    const response = await openai.chat.completions.create({
      messages: messages,
      model: "ft:gpt-3.5-turbo-0125:personal:jmc11:94Hu5fCP",
      temperature: 1.2,
    });
    
    const prompt = response.choices[0].message["content"];
      console.log(prompt);
    res.json({ assistant: prompt });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error processing your request" });
  }
});

const port = 5500;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
