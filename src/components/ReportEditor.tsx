
import React, { useState } from 'react';
import { Check, Download, Edit, FileText, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

interface ReportEditorProps {
  reportTitle: string;
  initialContent: string;
  templateType: string;
  onDownloadPDF: (title: string, content: string) => void;
}

const ReportEditor: React.FC<ReportEditorProps> = ({ 
  reportTitle, 
  initialContent, 
  templateType,
  onDownloadPDF
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(reportTitle);
  const [content, setContent] = useState(initialContent);
  
  const handleSave = () => {
    setIsEditing(false);
    toast.success('Relatório salvo com sucesso!');
  };
  
  const handleDownload = () => {
    onDownloadPDF(title, content);
  };

  const getTemplateIcon = () => {
    switch (templateType) {
      case 'meeting':
        return 'bg-app-blue-100 text-app-blue-500';
      case 'medical':
        return 'bg-app-purple-100 text-app-purple-500';
      case 'class':
        return 'bg-app-blue-100 text-app-blue-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-card rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className={`h-10 w-10 rounded-full flex items-center justify-center ${getTemplateIcon()}`}>
            <FileText className="h-5 w-5" />
          </div>
          {isEditing ? (
            <Input 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              className="text-xl font-bold w-64"
            />
          ) : (
            <h2 className="text-2xl font-bold">{title}</h2>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          {isEditing ? (
            <Button variant="outline" onClick={handleSave} className="flex items-center gap-1">
              <Save className="h-4 w-4" />
              <span>Salvar</span>
            </Button>
          ) : (
            <>
              <Button variant="outline" onClick={() => setIsEditing(true)} className="flex items-center gap-1">
                <Edit className="h-4 w-4" />
                <span>Editar</span>
              </Button>
              <Button onClick={handleDownload} className="flex items-center gap-1">
                <Download className="h-4 w-4" />
                <span>Baixar PDF</span>
              </Button>
            </>
          )}
        </div>
      </div>
      
      <div className="bg-white border rounded-lg shadow-sm p-6">
        {isEditing ? (
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[400px]"
          />
        ) : (
          <div className="prose prose-sm max-w-none">
            <div dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br/>') }} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportEditor;
