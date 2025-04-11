
import React from 'react';
import { 
  FileText, 
  Users, 
  Stethoscope, 
  GraduationCap,
  Plus,
  Sparkles
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface TemplateProps {
  id: string;
  title: string;
  description: string;
  icon: 'meeting' | 'medical' | 'class' | 'custom' | 'create';
  popular?: boolean;
  onClick: (id: string) => void;
}

const TemplateCard = ({ id, title, description, icon, popular, onClick }: TemplateProps) => {
  const renderIcon = () => {
    switch (icon) {
      case 'meeting':
        return <Users className="h-8 w-8 text-app-blue-500" />;
      case 'medical':
        return <Stethoscope className="h-8 w-8 text-app-purple-500" />;
      case 'class':
        return <GraduationCap className="h-8 w-8 text-app-blue-600" />;
      case 'custom':
        return <Sparkles className="h-8 w-8 text-amber-500" />;
      case 'create':
        return <Plus className="h-8 w-8 text-app-purple-600" />;
      default:
        return <FileText className="h-8 w-8 text-gray-500" />;
    }
  };

  return (
    <Card 
      className={`template-card cursor-pointer hover:bg-secondary/50 transition-all ${
        icon === 'create' ? 'border-dashed border-2' : ''
      }`}
      onClick={() => onClick(id)}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          {renderIcon()}
          {popular && (
            <Badge variant="secondary" className="bg-app-purple-100 text-app-purple-700">
              Popular
            </Badge>
          )}
        </div>
        <CardTitle className="mt-4">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
      <CardFooter>
        <Button 
          variant={icon === 'create' ? "outline" : "default"} 
          className={`w-full ${icon === 'create' ? 'border-app-purple-300 text-app-purple-700' : ''}`}
        >
          Selecionar
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TemplateCard;
