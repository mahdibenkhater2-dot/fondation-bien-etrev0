import Hero from "@/components/Hero";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Check, Users, BookOpen, User } from "lucide-react";

const Tarifs = () => {
  const pricingOptions = [
    {
      icon: <User className="w-8 h-8" />,
      title: "Séance Individuelle",
      price: "60€",
      description: "Séance personnalisée adaptée à vos besoins spécifiques",
      features: [
        "Durée : 1 heure",
        "Approche personnalisée",
        "Suivi individuel",
        "Techniques adaptées"
      ],
      popular: false
    },
    {
      icon: <Check className="w-8 h-8" />,
      title: "Formule 3 Séances",
      price: "159€",
      description: "Forfait de 3 séances pour un suivi optimal",
      features: [
        "3 séances individuelles",
        "Économie de 21€",
        "Suivi personnalisé",
        "Progression optimisée"
      ],
      popular: true
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Formation au Choix",
      price: "259€",
      description: "Formation complète dans la discipline de votre choix",
      features: [
        "Shiatsu",
        "Kinésiologie", 
        "Massage par Ventouse",
        "Nutrition",
        "Certificat inclus"
      ],
      popular: false
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Séances Collectives",
      price: "599€",
      description: "Ateliers en groupe jusqu'à 12 personnes",
      features: [
        "Durée : 1h30",
        "Jusqu'à 12 participants",
        "Animation professionnelle",
        "Matériel fourni"
      ],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen">
      <Hero 
        title="Tarifs"
        subtitle="Nos tarifs attractifs sont adaptés en fonction de vos besoins"
      />

      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pricingOptions.map((option, index) => (
              <Card 
                key={index} 
                className={`relative h-full transition-all duration-300 hover:shadow-glow hover:-translate-y-1 ${
                  option.popular 
                    ? 'ring-2 ring-wellness-sage bg-gradient-card' 
                    : 'bg-gradient-card'
                }`}
              >
                {option.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-wellness-sage text-white px-4 py-1 rounded-full text-sm font-medium">
                      Populaire
                    </span>
                  </div>
                )}
                
                <CardHeader className="text-center pb-4">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 rounded-full bg-wellness-sage-light text-wellness-sage">
                      {option.icon}
                    </div>
                  </div>
                  <CardTitle className="text-wellness-sage text-xl">{option.title}</CardTitle>
                  <div className="text-3xl font-bold text-wellness-sage mt-2">
                    {option.price}
                  </div>
                  <CardDescription className="text-base">
                    {option.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="pt-4">
                  <ul className="space-y-3">
                    {option.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start text-sm">
                        <Check className="w-4 h-4 text-wellness-sage mr-2 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Card className="max-w-2xl mx-auto bg-gradient-card shadow-soft">
              <CardHeader>
                <CardTitle className="text-wellness-sage text-2xl">
                  Devis Personnalisés
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg mb-6">
                  Nous proposons également des devis adaptés sur demande pour des besoins spécifiques 
                  ou des formations personnalisées.
                </p>
                <Link to="/contact">
                  <Button 
                    size="lg" 
                    className="bg-wellness-sage hover:bg-wellness-sage/90 text-white"
                  >
                    Demander un Devis
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <h3 className="text-2xl font-bold text-wellness-sage mb-4">
              Pourquoi Choisir Nos Services ?
            </h3>
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-wellness-sage-light flex items-center justify-center">
                  <Check className="w-8 h-8 text-wellness-sage" />
                </div>
                <h4 className="font-semibold text-wellness-sage mb-2">Professionnels Diplômés</h4>
                <p className="text-sm text-muted-foreground">
                  Nos formateurs sont certifiés et reconnus dans leur domaine d'expertise.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-wellness-sage-light flex items-center justify-center">
                  <Users className="w-8 h-8 text-wellness-sage" />
                </div>
                <h4 className="font-semibold text-wellness-sage mb-2">Approche Personnalisée</h4>
                <p className="text-sm text-muted-foreground">
                  Chaque séance et formation est adaptée à vos besoins individuels.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-wellness-sage-light flex items-center justify-center">
                  <BookOpen className="w-8 h-8 text-wellness-sage" />
                </div>
                <h4 className="font-semibold text-wellness-sage mb-2">Méthodes Naturelles</h4>
                <p className="text-sm text-muted-foreground">
                  Nous privilégions les approches naturelles pour votre bien-être.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Tarifs;