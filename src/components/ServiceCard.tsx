import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ServiceCardProps {
  title: string;
  description: string;
  benefits?: string[];
  image?: string;
}

const ServiceCard = ({ title, description, benefits, image }: ServiceCardProps) => {
  return (
    <Card className="h-full transition-all duration-300 hover:shadow-glow hover:-translate-y-1 bg-gradient-card border-wellness-sage-light/20">
      {image && (
        <div className="aspect-video overflow-hidden rounded-t-lg">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      )}
      <CardHeader>
        <CardTitle className="text-wellness-sage">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base leading-relaxed mb-4">
          {description}
        </CardDescription>
        {benefits && benefits.length > 0 && (
          <div>
            <h4 className="font-semibold text-wellness-sage mb-2">Bienfaits :</h4>
            <ul className="space-y-1">
              {benefits.map((benefit, index) => (
                <li key={index} className="text-sm text-muted-foreground flex items-start">
                  <span className="text-wellness-warm mr-2">•</span>
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ServiceCard;