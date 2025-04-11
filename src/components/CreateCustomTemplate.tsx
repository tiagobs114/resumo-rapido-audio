
import React, { useState } from 'react';
import { Check, ChevronRight, Sparkles, Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

interface CreateCustomTemplateProps {
  onTemplateCreated: (template: { name: string; prompt: string }) => void;
}

const CreateCustomTemplate: React.FC<CreateCustomTemplateProps> = ({ onTemplateCreated }) => {
  const [name, setName] = useState('');
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleCreateTemplate = () => {
    if (!name.trim() || !prompt.trim()) {
      toast.error('Por favor, preencha todos os campos');
      return;
    }
    
    setIsLoading(true);
    
    // In a real app, this would save the template to a database
    // For now, we'll just simulate a delay
    setTimeout(() => {
      onTemplateCreated({ name, prompt });
      setIsLoading(false);
      toast.success('Template personalizado criado com sucesso!');
    }, 1000);
  };
  
  const samplePrompts = [
    "Crie um resumo detalhado desta reunião, destacando as principais decisões, pontos de ação e responsáveis.",
    "Analise esta discussão técnica e extraia os principais conceitos, problemas identificados e soluções propostas.",
    "Organize este depoimento em formato de anamnese médica, destacando sintomas, histórico e condições relevantes."
  ];
  
  const usePromptExample = (example: string) => {
    setPrompt(example);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-card rounded-xl shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-10 w-10 rounded-full flex items-center justify-center bg-amber-100">
          <Sparkles className="h-5 w-5 text-amber-600" />
        </div>
        <h2 className="text-2xl font-bold">Criar Template Personalizado</h2>
      </div>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="template-name">Nome do Template</Label>
          <Input
            id="template-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ex: Entrevista de emprego"
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="template-prompt">Instruções de Formatação</Label>
            <Button variant="ghost" size="sm" className="text-xs">
              <Wand2 className="h-3 w-3 mr-1" /> Sugerir instruções
            </Button>
          </div>
          <Textarea
            id="template-prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ex: Extraia os principais pontos da discussão e organize em tópicos com títulos em negrito..."
            className="min-h-[150px]"
          />
        </div>
        
        <div className="space-y-2">
          <Label className="text-sm text-muted-foreground">Exemplos de instruções</Label>
          <div className="flex flex-col gap-2">
            {samplePrompts.map((example, index) => (
              <div 
                key={index}
                className="text-sm p-3 bg-muted rounded-md cursor-pointer hover:bg-secondary transition-colors flex items-center justify-between"
                onClick={() => usePromptExample(example)}
              >
                <span className="line-clamp-1">{example}</span>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
            ))}
          </div>
        </div>
        
        <Button 
          onClick={handleCreateTemplate} 
          disabled={isLoading || !name.trim() || !prompt.trim()} 
          className="w-full mt-4"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <span className="h-4 w-4 border-2 border-t-transparent border-white rounded-full animate-spin" />
              Criando...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Check className="h-4 w-4" />
              Criar Template
            </span>
          )}
        </Button>
      </div>
    </div>
  );
};

export default CreateCustomTemplate;
