import React, { useEffect, useRef, useState } from 'react';
import { Wrapper, Status } from '@googlemaps/react-wrapper';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { MapPin } from 'lucide-react';

declare global {
  interface Window {
    google: typeof google;
  }
}

interface MapProps {
  center: google.maps.LatLngLiteral;
  zoom: number;
  apiKey: string;
}

const Map: React.FC<MapProps> = ({ center, zoom, apiKey }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current && window.google) {
      const map = new google.maps.Map(ref.current, {
        center,
        zoom,
        styles: [
          {
            featureType: 'all',
            elementType: 'geometry.fill',
            stylers: [{ color: '#f3f4f6' }]
          },
          {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [{ color: '#e0f2fe' }]
          },
          {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [{ color: '#ffffff' }]
          }
        ]
      });

      // Add marker for Lille
      const marker = new google.maps.Marker({
        position: center,
        map: map,
        title: 'Fondation Bien Ensemble - Région de Lille',
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 10,
          fillColor: '#059669',
          fillOpacity: 1,
          strokeColor: '#ffffff',
          strokeWeight: 2,
        }
      });

      // Add info window
      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div style="padding: 8px; font-family: system-ui;">
            <h3 style="margin: 0 0 8px 0; color: #059669; font-size: 16px;">Fondation Bien Ensemble</h3>
            <p style="margin: 0; color: #666; font-size: 14px;">Région de Lille, France</p>
            <p style="margin: 4px 0 0 0; color: #666; font-size: 12px;">Formations et Séances Bien-Être</p>
          </div>
        `
      });

      // Show info window on marker click
      marker.addListener('click', () => {
        infoWindow.open(map, marker);
      });
    }
  }, [center, zoom, apiKey]);

  return <div ref={ref} className="w-full h-full rounded-lg" />;
};

const render = (status: Status) => {
  switch (status) {
    case Status.LOADING:
      return (
        <div className="flex items-center justify-center h-64 bg-muted rounded-lg">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-wellness-sage mx-auto mb-2"></div>
            <p className="text-sm text-muted-foreground">Chargement de la carte...</p>
          </div>
        </div>
      );
    case Status.FAILURE:
      return (
        <Alert className="h-64 flex items-center justify-center">
          <AlertDescription>Erreur lors du chargement de Google Maps</AlertDescription>
        </Alert>
      );
    default:
      return null;
  }
};

interface GoogleMapProps {
  apiKey?: string;
}

const GoogleMap: React.FC<GoogleMapProps> = ({ apiKey: providedApiKey }) => {
  const [apiKey, setApiKey] = useState(providedApiKey || '');
  const [inputKey, setInputKey] = useState('');
  const [showMap, setShowMap] = useState(!!providedApiKey);

  // Lille, France coordinates
  const center = { lat: 50.6292, lng: 3.0573 };
  const zoom = 11;

  const handleSubmitKey = () => {
    if (inputKey.trim()) {
      setApiKey(inputKey.trim());
      setShowMap(true);
      localStorage.setItem('google_maps_api_key', inputKey.trim());
    }
  };

  useEffect(() => {
    if (!providedApiKey) {
      const storedKey = localStorage.getItem('google_maps_api_key');
      if (storedKey) {
        setApiKey(storedKey);
        setShowMap(true);
      }
    }
  }, [providedApiKey]);

  if (!showMap || !apiKey) {
    return (
      <Card className="bg-gradient-card shadow-soft">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <MapPin className="w-6 h-6 text-wellness-sage" />
            <CardTitle className="text-wellness-sage">Notre Localisation</CardTitle>
          </div>
          <CardDescription>
            Pour afficher la carte interactive, veuillez entrer votre clé API Google Maps
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Input
                type="password"
                placeholder="Clé API Google Maps"
                value={inputKey}
                onChange={(e) => setInputKey(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSubmitKey()}
              />
              <p className="text-xs text-muted-foreground mt-2">
                Obtenez votre clé API sur{' '}
                <a 
                  href="https://console.cloud.google.com/google/maps-apis" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-wellness-sage hover:underline"
                >
                  Google Cloud Console
                </a>
              </p>
            </div>
            <Button 
              onClick={handleSubmitKey}
              disabled={!inputKey.trim()}
              className="bg-wellness-sage hover:bg-wellness-sage/90 text-white"
            >
              Afficher la Carte
            </Button>
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-semibold text-wellness-sage mb-2">Notre Localisation</h4>
              <p className="text-sm text-muted-foreground">
                <strong>Région de Lille, France</strong><br/>
                Nous intervenons dans toute la métropole lilloise et ses environs.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-card shadow-soft">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <MapPin className="w-6 h-6 text-wellness-sage" />
          <CardTitle className="text-wellness-sage">Notre Localisation</CardTitle>
        </div>
        <CardDescription>
          Région de Lille, France - Nous intervenons dans toute la métropole lilloise
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-64 rounded-lg overflow-hidden">
          <Wrapper apiKey={apiKey} render={render}>
            <Map center={center} zoom={zoom} apiKey={apiKey} />
          </Wrapper>
        </div>
        <div className="mt-4 p-4 bg-muted rounded-lg">
          <h4 className="font-semibold text-wellness-sage mb-2">Zone d'Intervention</h4>
          <p className="text-sm text-muted-foreground">
            Nous intervenons dans toute la métropole lilloise et les communes environnantes. 
            N'hésitez pas à nous contacter pour vérifier la possibilité d'intervention dans votre secteur.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default GoogleMap;