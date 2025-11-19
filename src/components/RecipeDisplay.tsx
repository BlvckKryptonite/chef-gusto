import ReactMarkdown from "react-markdown";

interface RecipeDisplayProps {
  recipe: string;
}

export default function RecipeDisplay({ recipe }: RecipeDisplayProps) {
  return (
    <section 
      className="mt-8 p-8 rounded-xl bg-card border border-border shadow-xl space-y-4 animate-in fade-in-50 slide-in-from-bottom-4 duration-500"
      aria-live="polite"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1 h-8 bg-gradient-to-b from-primary to-gusto-orange-light rounded-full" />
        <h2 className="text-2xl font-bold text-foreground">
          Chef Gusto Recommends:
        </h2>
      </div>
      
      <div className="prose prose-invert prose-orange max-w-none">
        <ReactMarkdown
          components={{
            h1: ({ children }) => (
              <h1 className="text-3xl font-bold text-foreground mb-4">{children}</h1>
            ),
            h2: ({ children }) => (
              <h2 className="text-2xl font-semibold text-foreground mt-6 mb-3">{children}</h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-xl font-semibold text-foreground mt-4 mb-2">{children}</h3>
            ),
            p: ({ children }) => (
              <p className="text-muted-foreground leading-7 mb-4">{children}</p>
            ),
            ul: ({ children }) => (
              <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
                {children}
              </ul>
            ),
            ol: ({ children }) => (
              <ol className="list-decimal list-inside space-y-2 text-muted-foreground mb-4">
                {children}
              </ol>
            ),
            li: ({ children }) => (
              <li className="text-muted-foreground leading-7">{children}</li>
            ),
            strong: ({ children }) => (
              <strong className="font-semibold text-primary">{children}</strong>
            ),
          }}
        >
          {recipe}
        </ReactMarkdown>
      </div>
    </section>
  );
}
