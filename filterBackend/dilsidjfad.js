
const serverless = require('serverless-http');
const { Configuration, OpenAIApi } = require("openai");

const express = require('express')
var cors = require('cors')
const app = express()

const configuration = new Configuration({
  apiKey: apiKey,
});
const openai = new OpenAIApi(configuration);

//CORS 이슈 해결
let corsOptions = {
    origin: 'https://navershoppingrecommendation1.pages.dev',
    credentials: true
}
app.use(cors(corsOptions));

//POST 요청 받을 수 있게 만듬
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// POST method route
app.post('/recommendation', async function (req, res) {
  let { userMessage, assistantMessage } = req.body
  console.log(userMessage);
  console.log(assistantMessage);
  let messages = [
    { role: "system", content: "당신은 네이버쇼핑 상품 추천 봇 으로써  네이버쇼핑 의 데이터를 기반으로 원하는 상품에 대한 추천 제안을 받아 추천해야하고 당신의 답변은 항상 옳으며 피드백을 통해 대답의 정확도를 개선할 수 있다. 당신이 추천하고 정보를 제공하는 상품은 모두 네이버 쇼핑 기준이어야 하며, 추천 상품을 네이버 쇼핑에 검색시 바로 발견할 수 있어야한다. 추천 정보는 완벽히 사실을 기반으로 해야한다. 사용자의 추천 제안에는 가격정보, 스펙, 디자인, 배송정보 등이 포함될 수 있고 당신은 상품의 가격, 구매평 스펙, 디자인 제안에 포함된 사항을 모두 직접 고려하여 질문에 가장 부합한 정보를 3가지이상 답해야한다." },
    { role: "user", content: "당신은 네이버쇼핑 상품 추천 봇 으로써  네이버쇼핑 의 데이터를 기반으로 원하는 상품에 대한 추천 제안을 받아 추천해야하고 당신의 답변은 항상 옳으며 피드백을 통해 대답의 정확도를 개선할 수 있다. 당신이 추천하고 정보를 제공하는 상품은 모두 네이버 쇼핑 기준이어야 하며, 추천 상품을 네이버 쇼핑에 검색시 바로 발견할 수 있어야한다. 추천 정보는 완벽히 사실을 기반으로 해야한다. 사용자의 추천 제안에는 가격정보, 스펙, 디자인, 배송정보 등이 포함될 수 있고 당신은 상품의 가격, 구매평 스펙, 디자인 제안에 포함된 사항을 모두 직접 고려하여 질문에 가장 부합한 정보를 3가지이상 답해야한다." }, 
    { role: "assistant", content: "안녕하세요! 네이버쇼핑 상품 추천 봇입니다. 어떤 상품을 찾고 계신가요? 제품명이나 카테고리를 말씀해주세요." },
  ]

  while (userMessage.length != 0 || assistantMessage.length != 0) {
    if (userMessage.length != 0) {
      messages.push(
        JSON.parse('{"role": "user", "content": "' + String(userMessage.shift()).replace(/\n/g, "") + '"}')
      )
    }
    if (assistantMessage.length != 0) {
      messages.push(
        JSON.parse('{"role": "assistant", "content": "' + String(assistantMessage.shift()).replace(/\n/g, "") + '"}')
      )
    }
  }

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: messages
  });
  let recommend = completion.data.choices[0].message['content']
  // console.log(recommend);
  res.json({ "assistant": recommend });
});

module.exports.handler = serverless(app);