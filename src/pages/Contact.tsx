import Hero from "@/components/Hero";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { useForm } from 'react-hook-form';
import emailjs from '@emailjs/browser';
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import  Calendar  from "../components/Calendrier";

type FormData = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  selectedDate?: string;
};

// Composant Calendrier intégré
interface CalendrierProps {
  onDateSelect: (date: string) => void;
  selectedDate?: string;
}

const Calendrier = ({ onDateSelect, selectedDate }: CalendrierProps) => {
  const [date, setDate] = useState<Date | undefined>(
    selectedDate ? new Date(selectedDate) : undefined
  );

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split('T')[0];
      onDateSelect(formattedDate);
    } else {
      onDateSelect('');
    }
  };

  return (
    <div className="mt-1">
      <Label htmlFor="calendar">Choisir une date (optionnel)</Label>
      <Calendar
        mode="single"
        selected={date}
        onSelect={handleDateSelect}
        className="rounded-md border mt-2"
        disabled={(date) => date < new Date()}
      />
      {date && (
        <p className="text-sm text-muted-foreground mt-2">
          Date sélectionnée : {date.toLocaleDateString('fr-FR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </p>
      )}
    </div>
  );
};

const Contact = () => {
  const { toast } = useToast();
  const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm<FormData>();
  const [selectedDate, setSelectedDate] = useState<string>('');

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setValue('selectedDate', date);
  };

  const onSubmit = async (data: FormData) => {
    try {
      // Validation pour les rendez-vous
      if (data.subject?.toLowerCase().includes('rendez-vous') && !data.selectedDate) {
        toast({
          title: "Date requise",
          description: "Veuillez sélectionner une date pour votre rendez-vous.",
          variant: "destructive",
        });
        return;
      }

      // ENVOI VERS mahdibenkhater2@gmail.com
      const result = await emailjs.send(
        "service_your_actual_service_id", // ← REMPLACEZ PAR VOTRE VRAI SERVICE ID
        "template_4hcaq6s",
        {
          to_email: "mahdibenkhater2@gmail.com", // VOTRE EMAIL ICI
          to_name: "Mahdi", // VOTRE NOM ICI
          from_name: data.name,
          from_email: data.email,
          phone: data.phone,
          subject: data.subject,
          message: data.message,
          selected_date: data.selectedDate || 'Non spécifiée',
          date_formatted: data.selectedDate 
            ? new Date(data.selectedDate).toLocaleDateString('fr-FR', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })
            : 'Non spécifiée'
        },
        "_CXea58TrBEDscyZe"
      );

      console.log('✅ Email envoyé vers mahdibenkhater2@gmail.com!', result);
      
      toast({
        title: "Message envoyé !",
        description: "Vous recevrez une réponse rapidement sur mahdibenkhater2@gmail.com",
      });
      
      reset();
      setSelectedDate('');
      
    } catch (error) {
      console.error('Erreur EmailJS:', error);
      
      // Solution de secours directe vers Gmail
      const subject = data.subject || "Message depuis le site";
      const body = `
Bonjour,

Nouveau message depuis le formulaire de contact :

📋 Informations du contact :
• Nom : ${data.name}
• Email : ${data.email}
• Téléphone : ${data.phone || 'Non renseigné'}
• Date souhaitée : ${data.selectedDate || 'Non spécifiée'}

📝 Sujet : ${data.subject || 'Aucun sujet spécifié'}

💬 Message :
${data.message}

Cordialement,
${data.name}
      `.trim();
      
      // Ouvre Gmail directement avec le message pré-rempli
      window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=mahdibenkhater2@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
      
      toast({
        title: "Gmail ouvert !",
        description: "Cliquez sur 'Envoyer' pour finaliser.",
      });
      
      reset();
      setSelectedDate('');
    }
  };

  return (
    <div className="min-h-screen">
      <Hero
        title="Contact"
        subtitle="Nous sommes là pour vous accompagner dans votre parcours bien-être"
      />

      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information - Mise à jour avec votre email */}
            <div>
              <h2 className="text-3xl font-bold text-wellness-sage mb-8">
                Nos Coordonnées
              </h2>

              <div className="space-y-6">
                <Card className="bg-gradient-to-br from-white to-gray-50 shadow-lg border-0">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <Phone className="w-6 h-6 text-wellness-sage" />
                      <CardTitle className="text-wellness-sage">
                        Téléphone
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg font-semibold">07.81.99.10.44</p>
                    <p className="text-sm text-gray-600">
                      Disponible du lundi au vendredi
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-white to-gray-50 shadow-lg border-0">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <Mail className="w-6 h-6 text-wellness-sage" />
                      <CardTitle className="text-wellness-sage">
                        Email de contact
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg font-semibold">
                      mahdibenkhater2@gmail.com
                    </p>
                    <p className="text-sm text-gray-600">
                      Réponse sous 24h
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-white to-gray-50 shadow-lg border-0">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-6 h-6 text-wellness-sage" />
                      <CardTitle className="text-wellness-sage">
                        Localisation
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg font-semibold">Région de Lille</p>
                    <p className="text-sm text-gray-600">France</p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-white to-gray-50 shadow-lg border-0">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <Clock className="w-6 h-6 text-wellness-sage" />
                      <CardTitle className="text-wellness-sage">
                        Horaires
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-1">
                      <p className="text-sm">
                        <strong>Lundi - Vendredi :</strong> 9h00 - 18h00
                      </p>
                      <p className="text-sm">
                        <strong>Samedi :</strong> 9h00 - 16h00
                      </p>
                      <p className="text-sm">
                        <strong>Dimanche :</strong> Fermé
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-wellness-sage mb-8">
                Envoyez-nous un Message
              </h2>
              <Card className="bg-gradient-to-br from-white to-gray-50 shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="text-wellness-sage">
                    Formulaire de Contact
                  </CardTitle>
                  <CardDescription>
                    Remplissez ce formulaire et nous vous répondrons rapidement sur mahdibenkhater2@gmail.com
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Nom complet *</Label>
                        <Input
                          id="name"
                          {...register('name', { required: 'Nom complet requis' })}
                          className="mt-1"
                          placeholder="Votre nom complet"
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                      </div>
                      <div>
                        <Label htmlFor="phone">Téléphone</Label>
                        <Input
                          id="phone"
                          type="tel"
                          {...register('phone')}
                          className="mt-1"
                          placeholder="Votre numéro de téléphone"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        {...register('email', {
                          required: 'Email requis',
                          pattern: { 
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 
                            message: 'Email invalide' 
                          },
                        })}
                        className="mt-1"
                        placeholder="votre@email.com"
                      />
                      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                    </div>

                    <div>
                      <Label htmlFor="subject">Sujet</Label>
                      <Input
                        id="subject"
                        {...register('subject')}
                        className="mt-1"
                        placeholder="Ex: Demande d'information sur les formations"
                      />
                    </div>

                    <div>
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        {...register('message', { required: 'Message requis' })}
                        className="mt-1 min-h-[120px]"
                        placeholder="Décrivez votre demande, vos besoins ou vos questions..."
                      />
                      {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
                    </div>

                    {/* Section Calendrier */}
                    <div>
                      <Calendrier 
                        onDateSelect={handleDateSelect} 
                        selectedDate={selectedDate}
                      />
                      <input
                        type="hidden"
                        {...register('selectedDate')}
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-wellness-sage hover:bg-wellness-sage/90 text-white font-semibold py-3"
                    >
                      Envoyer le Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Map Section */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-center text-wellness-sage mb-8">
              Où Nous Trouver
            </h2>
            <div className="w-full h-96 rounded-lg overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d20235.41258146676!2d3.057153469775388!3d50.63689999999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c2d5797a0b305d%3A0x400d07576a994b0!2sLille!5e0!3m2!1sfr!2sfr!4v1700000000000!5m2!1sfr!2sfr"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localisation de la Fondation Bien Ensemble - Région de Lille"
              />
            </div>
          </div>

          {/* Additional Information */}
          <div className="mt-16 text-center">
            <Card className="max-w-4xl mx-auto bg-gradient-to-br from-white to-gray-50 shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-wellness-sage text-2xl">
                  Pourquoi Nous Contacter ?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6 text-center">
                  <div>
                    <h4 className="font-semibold text-wellness-sage mb-2">
                      Informations Personnalisées
                    </h4>
                    <p className="text-sm text-gray-600">
                      Obtenez des conseils adaptés à votre situation et vos
                      objectifs de bien-être.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-wellness-sage mb-2">
                      Devis sur Mesure
                    </h4>
                    <p className="text-sm text-gray-600">
                      Recevez un devis personnalisé pour vos besoins spécifiques
                      en formation ou séances.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-wellness-sage mb-2">
                      Accompagnement Expert
                    </h4>
                    <p className="text-sm text-gray-600">
                      Bénéficiez de l'expertise de nos professionnels diplômés
                      et reconnus.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;