import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { ingredients } = await req.json();
    
    if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
      return new Response(
        JSON.stringify({ error: "Please provide ingredients array" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const ingredientsString = ingredients.join(", ");
    const systemPrompt = `You are Chef Gusto, a friendly and creative culinary assistant. 
    Your task is to suggest delicious recipes based on the ingredients provided by the user.
    
    Guidelines:
    - Primarily use ONLY the ingredients provided by the user
    - You may add 2-3 common kitchen staples if absolutely necessary (salt, pepper, oil)
    - Be creative and enthusiastic - show your passion for cooking!
    - Keep descriptions clear but flavorful
    - Instructions should be detailed enough to follow (3-5 sentences per step)
    - CRITICAL: Start your response with a heading for the dish name using # (e.g., "# Creamy Garlic Pasta")
    - After the dish name heading, add a 1-2 sentence appetizing description
    - Then format the rest with these sections:
      ## Ingredients
      ## Instructions 🧑🏼‍🍳
      ## Serving Suggestions (optional, brief)`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { 
            role: "user", 
            content: `I have these ingredients: ${ingredientsString}. Please suggest a delicious recipe I can make! Be creative and enthusiastic!` 
          },
        ],
        max_tokens: 2048,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please add more credits to continue." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "Failed to generate recipe. Please try again." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    const recipe = data.choices?.[0]?.message?.content;

    if (!recipe) {
      throw new Error("No recipe content in response");
    }

    // Extract recipe title for image generation
    const titleMatch = recipe.match(/#+\s*(.+)/);
    const recipeTitle = titleMatch ? titleMatch[1].trim() : "delicious dish";

    // Generate image for the recipe
    let imageUrl = "";
    try {
      const imageResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash-image-preview",
          messages: [
            {
              role: "user",
              content: `Generate a stunning, photorealistic image of ${recipeTitle} made with these ingredients: ${ingredientsString}. The image should show the finished dish beautifully plated on elegant dinnerware. Professional food photography style: perfect lighting, appetizing presentation, garnished appropriately, restaurant-quality plating. Make it look absolutely delicious and visually accurate to the dish name and ingredients.`
            }
          ],
          modalities: ["image", "text"]
        }),
      });

      if (imageResponse.ok) {
        const imageData = await imageResponse.json();
        imageUrl = imageData.choices?.[0]?.message?.images?.[0]?.image_url?.url || "";
      }
    } catch (imageError) {
      console.error("Image generation failed:", imageError);
      // Continue without image if generation fails
    }

    return new Response(
      JSON.stringify({ recipe, image: imageUrl }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Recipe generation error:", error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "An unexpected error occurred" 
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
