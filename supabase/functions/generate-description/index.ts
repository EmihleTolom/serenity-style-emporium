import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed." }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const apiKey = Deno.env.get("OPENAI_API_KEY");
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "The description generator is not connected yet. Add the OPENAI_API_KEY secret to your Supabase Edge Functions, then try again." }), {
        status: 503,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = await req.json();
    const name = String(body.name ?? "").trim();
    if (!name) {
      return new Response(JSON.stringify({ error: "A product name is required." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const category = String(body.category ?? "Fashion");
    const sizes = String(body.sizes ?? "").trim();
    const colours = String(body.colours ?? "").trim();
    const price = String(body.price ?? "").trim();
    const extraDetails = String(body.extraDetails ?? "").trim();

    const prompt = [
      "Write a polished, concise product description for a South African fashion boutique called Serenity Wears.",
      "Tone: elegant, warm, confident and inviting; premium boutique style, not exaggerated or overly flowery.",
      "Use 2 to 4 sentences. Make it ready to display on an online product page.",
      "Only state facts supplied below. Do not invent fabric, fit, material, occasion, features, availability, shipping promises or care instructions.",
      "If details are limited, write an appealing but honest description based on the product name and category without making unsupported claims.",
      "Do not mention the price or sizes unless they are useful in the sentence. Do not add a heading, quotation marks, emojis or hashtags.",
      "",
      "Product name: " + name,
      "Category: " + category,
      "Available sizes: " + (sizes || "Not supplied"),
      "Colours: " + (colours || "Not supplied"),
      "Price: " + (price ? "R" + price : "Not supplied"),
      "Additional product details supplied by the seller: " + (extraDetails || "None"),
    ].join("\n");

    const aiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are a careful, accurate fashion e-commerce copywriter." },
          { role: "user", content: prompt },
        ],
        temperature: 0.7,
        max_tokens: 180,
      }),
    });

    const result = await aiResponse.json();
    if (!aiResponse.ok) {
      const detail = result?.error?.message || "The AI service could not generate the description.";
      return new Response(JSON.stringify({ error: detail }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const description = result?.choices?.[0]?.message?.content?.trim();
    if (!description) throw new Error("The AI service returned an empty description.");

    return new Response(JSON.stringify({ description }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected description generation error.";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
