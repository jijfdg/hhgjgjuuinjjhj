export const handler = async (event) => {

  const body = JSON.parse(event.body);

  if (!body.callback_query) {
    return { statusCode: 200, body: "no callback" };
  }

  const chatId = body.callback_query.message.chat.id;
  const data = body.callback_query.data;

  let response = "";

  if (data.startsWith("approve")) {
    response = "✔ APPROVED";
  }

  if (data.startsWith("reject")) {
    response = "❌ REJECTED";
  }

  await fetch(`https://api.telegram.org/botYOUR_TOKEN/sendMessage`, {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({
      chat_id: chatId,
      text: response
    })
  });

  return { statusCode: 200, body: "ok" };
};