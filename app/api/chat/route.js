import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(req) {
  try {
    const { messages } = await req.json();

    const completion = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      messages
    });

    return Response.json({
      reply: completion.choices[0].message.content
    });
  } catch (err) {
    console.error(err);
    return new Response("Error", { status: 500 });
  }
}
