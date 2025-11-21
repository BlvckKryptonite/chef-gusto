import { forwardRef } from "react";
import { Button } from "@/components/ui/button";
import { ChefHat, X } from "lucide-react";

interface IngredientsListProps {
  ingredients: string[];
  getRecipe: () => void;
  removeIngredient: (index: number) => void;
  clearAllIngredients: () => void;
  isLoading?: boolean;
}

const IngredientsList = forwardRef<HTMLDivElement, IngredientsListProps>(
  ({ ingredients, getRecipe, removeIngredient, clearAllIngredients, isLoading }, ref) => {
    const ingredientsListItems = ingredients.map((ingredient, index) => (
      <li 
        key={`${ingredient}-${index}`} 
        className="text-muted-foreground leading-7 pl-6 pr-8 relative before:content-['•'] before:absolute before:left-2 before:text-primary group"
      >
        {ingredient}
        <button
          onClick={() => removeIngredient(index)}
          className="absolute right-0 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
          aria-label={`Remove ${ingredient}`}
        >
          <X className="w-4 h-4" />
        </button>
      </li>
    ));

    return (
      <section className="space-y-6">
        {ingredients.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              Ingredients on hand:
            </h2>
            <ul className="space-y-1 mb-4" aria-live="polite">
              {ingredientsListItems}
            </ul>
            <div className="flex justify-center mb-8">
              <Button
                variant="ghost"
                onClick={clearAllIngredients}
                className="text-muted-foreground hover:text-destructive text-sm"
              >
                Clear all ingredients
              </Button>
            </div>
          </div>
        )}

        {ingredients.length > 3 && (
          <div 
            ref={ref}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-xl bg-card border border-border shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="space-y-1">
              <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
                <ChefHat className="w-5 h-5 text-primary" />
                Ready for a recipe?
              </h3>
              <p className="text-sm text-muted-foreground">
                Let Chef Gusto create something delicious from your ingredients.
              </p>
            </div>
            <Button 
              onClick={getRecipe} 
              disabled={isLoading}
              className="bg-primary hover:bg-gusto-orange-light text-primary-foreground font-medium px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50"
            >
              {isLoading ? "Cooking up ideas..." : "Get Recipe"}
            </Button>
          </div>
        )}
      </section>
    );
  }
);

IngredientsList.displayName = "IngredientsList";

export default IngredientsList;
