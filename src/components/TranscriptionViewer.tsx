
import React, { useState } from 'react';
import { Clock, Copy, Edit, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

interface TranscriptionViewerProps {
  transcription: string;
  onEditComplete: (editedText: string) => void;
}

const TranscriptionViewer: React.FC<TranscriptionViewerProps> = ({ transcription, onEditComplete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(transcription);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(transcription);
    toast.success('Texto copiado para a área de transferência!');
  };
  
  const handleEdit = () => {
    setIsEditing(true);
  };
  
  const handleSave = () => {
    setIsEditing(false);
    onEditComplete(editedText);
    toast.success('Transcrição salva com sucesso!');
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-card rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-bold">Transcrição do Áudio</h2>
          <Badge variant="outline" className="text-xs bg-secondary">
            <Clock className="h-3 w-3 mr-1" />
            {Math.ceil(transcription.length / 1000)} min de leitura
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          {isEditing ? (
            <Button variant="outline" size="sm" onClick={handleSave} className="flex items-center gap-1">
              <Save className="h-4 w-4" />
              <span>Salvar</span>
            </Button>
          ) : (
            <>
              <Button variant="ghost" size="sm" onClick={handleCopy} className="flex items-center gap-1">
                <Copy className="h-4 w-4" />
                <span>Copiar</span>
              </Button>
              <Button variant="ghost" size="sm" onClick={handleEdit} className="flex items-center gap-1">
                <Edit className="h-4 w-4" />
                <span>Editar</span>
              </Button>
            </>
          )}
        </div>
      </div>
      
      <div className="bg-secondary/50 rounded-lg p-4 mt-4">
        {isEditing ? (
          <Textarea
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            className="min-h-[300px] bg-background"
          />
        ) : (
          <div className="whitespace-pre-wrap">{transcription}</div>
        )}
      </div>
    </div>
  );
};

export default TranscriptionViewer;
