import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export const runtime = "nodejs"; // энгийн болгож node runtime ашиглая

export async function POST(req) {
  try {
    const body = await req.json();
    const messages = body.messages ?? [];

    const completion = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: messages.map((m) => ({
        role: m.role,
        content: m.content
      }))
    });

    const reply = completion.choices[0]?.message?.content ?? "";
    return Response.json({ reply });
  } catch (err) {
    console.error("Chat error", err);
    return new Response("Error", { status: 500 });
  }
}
