import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import Header from "@/components/Header";
import IngredientsList from "@/components/IngredientsList";
import RecipeDisplay from "@/components/RecipeDisplay";
import LoadingAnimation from "@/components/LoadingAnimation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { Plus } from "lucide-react";

const Index = () => {
  const [ingredients, setIngredients] = useState<string[]>([
    "chicken",
    "garlic",
    "olive oil",
    "tomatoes",
    "pasta",
  ]);
  const [recipe, setRecipe] = useState("");
  const [recipeImage, setRecipeImage] = useState("");
  const [newIngredient, setNewIngredient] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const recipeSection = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (recipe && recipeSection.current) {
      const yCoord = recipeSection.current.getBoundingClientRect().top + window.scrollY;
      window.scroll({
        top: yCoord - 100,
        behavior: "smooth",
      });
    }
  }, [recipe]);

  async function getRecipe() {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("generate-recipe", {
        body: { ingredients },
      });

      if (error) {
        throw error;
      }

      if (data?.recipe) {
        setRecipe(data.recipe);
        setRecipeImage(data.image || "");
        toast.success("Recipe ready! Bon appétit!");
      } else {
        throw new Error("No recipe received");
      }
    } catch (error: any) {
      console.error("Error generating recipe:", error);
      toast.error(error.message || "Failed to generate recipe. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  function addIngredient(e: React.FormEvent) {
    e.preventDefault();
    if (newIngredient.trim()) {
      setIngredients((prev) => [...prev, newIngredient.trim()]);
      setNewIngredient("");
      toast.success(`Added ${newIngredient}!`);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-4xl mx-auto px-6 py-10">
        <div className="space-y-8">
          {/* Add Ingredient Form */}
          <form 
            onSubmit={addIngredient} 
            className="flex gap-3 max-w-2xl mx-auto"
          >
            <Input
              type="text"
              placeholder="e.g. oregano, basil, cheese..."
              aria-label="Add ingredient"
              value={newIngredient}
              onChange={(e) => setNewIngredient(e.target.value)}
              className="flex-1 bg-input border-border text-foreground placeholder:text-muted-foreground focus:ring-primary"
            />
            <Button 
              type="submit"
              className="bg-primary hover:bg-gusto-orange-light text-primary-foreground font-medium px-6 shadow-md hover:shadow-lg transition-all duration-300"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add
            </Button>
          </form>

          {/* Ingredients List */}
          {ingredients.length > 0 && (
            <IngredientsList
              ref={recipeSection}
              ingredients={ingredients}
              getRecipe={getRecipe}
              isLoading={isLoading}
            />
          )}

          {/* Loading Animation */}
          {isLoading && <LoadingAnimation />}

          {/* Recipe Display */}
          {recipe && <RecipeDisplay recipe={recipe} image={recipeImage} />}
        </div>
      </main>
    </div>
  );
};

export default Index;
