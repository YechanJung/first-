

export async function getRecommend(assistantMessage) {
  const location = "부산광역시 대연동"
  const langPrompt = location + assistantMessage
  const response = await fetch("http://127.0.0.1:5000/api", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      langPrompt: langPrompt,
    }),
  });
  const data = await response.json();
  console.log(data.assistant);

  return data.assistant;
  ;
}
