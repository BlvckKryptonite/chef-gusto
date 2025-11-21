import chefGustoLogo from "@/assets/chef-gusto.png";

export default function Header() {
  return (
    <header className="flex items-center justify-center gap-1 h-20 bg-card border-b border-border shadow-lg">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-gusto-orange-light bg-clip-text text-transparent">
        Chef Gusto
      </h1>
      <img 
        src={chefGustoLogo} 
        alt="Chef Gusto Logo" 
        className="w-14 h-14 object-contain"
      />
    </header>
  );
}
