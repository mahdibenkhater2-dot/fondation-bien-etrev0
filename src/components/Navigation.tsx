import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Leaf, Menu } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Navigation = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Accueil" },
    { href: "/formations", label: "Formations" },
    { href: "/tarifs", label: "Tarifs" },
    { href: "/contact", label: "Contact" },
  ];

  const NavLinks = ({ mobile = false }: { mobile?: boolean }) => (
    <div className={`${mobile ? "flex flex-col space-y-4" : "hidden md:flex space-x-8"}`}>
      {navItems.map((item) => (
        <Link
          key={item.href}
          to={item.href}
          className={`text-foreground/80 hover:text-primary transition-colors font-medium ${
            location.pathname === item.href ? "text-primary" : ""
          }`}
          onClick={() => mobile && setIsOpen(false)}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Leaf className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold text-foreground">Fondation Bien Ensemble</span>
        </Link>

        <NavLinks />

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <div className="flex items-center space-x-2 mb-8">
              <Leaf className="h-6 w-6 text-primary" />
              <span className="font-bold">Fondation Bien Ensemble</span>
            </div>
            <NavLinks mobile />
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Navigation;