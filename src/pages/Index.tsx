
import React, { useState } from 'react';
import Header from '@/components/Header';
import TemplateCard, { TemplateProps } from '@/components/TemplateCard';
import AudioRecorder from '@/components/AudioRecorder';
import TranscriptionViewer from '@/components/TranscriptionViewer';
import ReportEditor from '@/components/ReportEditor';
import CreateCustomTemplate from '@/components/CreateCustomTemplate';
import { Button } from '@/components/ui/button';
import { ChevronRight, FileAudio, FileText, Wand2 } from 'lucide-react';
import { transcribeAudio, generateReport } from '@/utils/audioUtils';
import { downloadPDF } from '@/utils/pdfUtils';
import { toast } from 'sonner';

enum AppStage {
  TEMPLATE_SELECTION,
  CUSTOM_TEMPLATE,
  AUDIO_INPUT,
  TRANSCRIPTION,
  REPORT
}

const Index = () => {
  const [stage, setStage] = useState<AppStage>(AppStage.TEMPLATE_SELECTION);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [customTemplate, setCustomTemplate] = useState<{ name: string; prompt: string } | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [transcription, setTranscription] = useState<string>('');
  const [report, setReport] = useState<{ title: string; content: string } | null>(null);

  // Available templates
  const templates: TemplateProps[] = [
    {
      id: 'meeting',
      title: 'Ata de Reunião',
      description: 'Transforma gravações de reuniões em atas estruturadas com pontos de ação e decisões.',
      icon: 'meeting',
      popular: true,
      onClick: () => handleTemplateSelect('meeting')
    },
    {
      id: 'medical',
      title: 'Anamnese Médica',
      description: 'Organiza informações médicas em formato de anamnese com sintomas e histórico.',
      icon: 'medical',
      onClick: () => handleTemplateSelect('medical')
    },
    {
      id: 'class',
      title: 'Resumo de Aula',
      description: 'Cria resumos organizados de aulas com conceitos-chave e pontos importantes.',
      icon: 'class',
      onClick: () => handleTemplateSelect('class')
    },
    {
      id: 'custom',
      title: 'Template Personalizado',
      description: 'Crie seu próprio modelo de relatório com instruções personalizadas.',
      icon: 'create',
      onClick: () => handleCustomTemplate()
    }
  ];

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    setStage(AppStage.AUDIO_INPUT);
  };

  const handleCustomTemplate = () => {
    setStage(AppStage.CUSTOM_TEMPLATE);
  };

  const handleCustomTemplateCreated = (template: { name: string; prompt: string }) => {
    setCustomTemplate(template);
    setSelectedTemplate('custom');
    setStage(AppStage.AUDIO_INPUT);
  };

  const handleAudioReady = async (audio: Blob) => {
    setAudioBlob(audio);
    toast.promise(
      transcribeAudio(audio),
      {
        loading: 'Transcrevendo o áudio...',
        success: (data) => {
          setTranscription(data);
          setStage(AppStage.TRANSCRIPTION);
          return 'Transcrição concluída!';
        },
        error: 'Erro na transcrição. Tente novamente.'
      }
    );
  };

  const handleTranscriptionEdit = (editedText: string) => {
    setTranscription(editedText);
  };

  const handleGenerateReport = async () => {
    const templateType = selectedTemplate || 'default';
    const customPrompt = customTemplate?.prompt;
    
    toast.promise(
      generateReport(transcription, templateType, customPrompt),
      {
        loading: 'Gerando relatório...',
        success: (data) => {
          setReport(data);
          setStage(AppStage.REPORT);
          return 'Relatório gerado com sucesso!';
        },
        error: 'Erro ao gerar relatório. Tente novamente.'
      }
    );
  };

  const handleDownloadPDF = (title: string, content: string) => {
    toast.promise(
      downloadPDF(title, content),
      {
        loading: 'Preparando PDF para download...',
        success: 'PDF gerado com sucesso!',
        error: 'Erro ao gerar PDF. Tente novamente.'
      }
    );
  };

  const renderStageContent = () => {
    switch (stage) {
      case AppStage.TEMPLATE_SELECTION:
        return (
          <div className="container max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-8">Escolha um Template</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {templates.map((template) => (
                <TemplateCard 
                  key={template.id}
                  id={template.id}
                  title={template.title}
                  description={template.description}
                  icon={template.icon}
                  popular={template.popular}
                  onClick={() => template.onClick(template.id)}
                />
              ))}
            </div>
          </div>
        );
        
      case AppStage.CUSTOM_TEMPLATE:
        return <CreateCustomTemplate onTemplateCreated={handleCustomTemplateCreated} />;
        
      case AppStage.AUDIO_INPUT:
        return <AudioRecorder onAudioReady={handleAudioReady} />;
        
      case AppStage.TRANSCRIPTION:
        return (
          <div className="container mx-auto px-4">
            <TranscriptionViewer 
              transcription={transcription} 
              onEditComplete={handleTranscriptionEdit} 
            />
            
            <div className="flex justify-center mt-8">
              <Button 
                size="lg" 
                onClick={handleGenerateReport}
                className="px-6 gap-2"
              >
                Gerar Relatório
                <Wand2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        );
        
      case AppStage.REPORT:
        return report && (
          <ReportEditor
            reportTitle={report.title}
            initialContent={report.content}
            templateType={selectedTemplate || 'default'}
            onDownloadPDF={handleDownloadPDF}
          />
        );
        
      default:
        return <div>Algo deu errado. Por favor, recarregue a página.</div>;
    }
  };

  const renderStageIndicator = () => {
    const stages = [
      { name: 'Template', icon: FileText, stage: AppStage.TEMPLATE_SELECTION },
      { name: 'Áudio', icon: FileAudio, stage: AppStage.AUDIO_INPUT },
      { name: 'Transcrição', icon: FileText, stage: AppStage.TRANSCRIPTION },
      { name: 'Relatório', icon: Wand2, stage: AppStage.REPORT }
    ];
    
    return (
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center my-6 max-w-md mx-auto">
          {stages.map((s, index) => (
            <React.Fragment key={s.name}>
              <div 
                className={`flex flex-col items-center ${
                  stage >= s.stage ? 'text-app-purple-600' : 'text-muted-foreground'
                }`}
              >
                <div 
                  className={`h-10 w-10 rounded-full flex items-center justify-center ${
                    stage >= s.stage 
                      ? 'bg-app-purple-100 text-app-purple-600' 
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  <s.icon className="h-5 w-5" />
                </div>
                <span className="text-xs mt-1">{s.name}</span>
              </div>
              
              {index < stages.length - 1 && (
                <div className={`flex-1 h-0.5 mx-2 ${
                  stage > s.stage ? 'bg-app-purple-500' : 'bg-muted'
                }`} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  };

  const canGoBack = stage > AppStage.TEMPLATE_SELECTION;
  
  const handleGoBack = () => {
    if (stage === AppStage.CUSTOM_TEMPLATE) {
      setStage(AppStage.TEMPLATE_SELECTION);
    } else if (stage === AppStage.AUDIO_INPUT) {
      setStage(AppStage.TEMPLATE_SELECTION);
      setSelectedTemplate(null);
    } else if (stage === AppStage.TRANSCRIPTION) {
      setStage(AppStage.AUDIO_INPUT);
    } else if (stage === AppStage.REPORT) {
      setStage(AppStage.TRANSCRIPTION);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        {stage !== AppStage.TEMPLATE_SELECTION && renderStageIndicator()}
        
        {canGoBack && (
          <div className="container mx-auto px-4 mb-6">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleGoBack}
              className="text-muted-foreground hover:text-foreground"
            >
              ← Voltar
            </Button>
          </div>
        )}
        
        {renderStageContent()}
      </main>
      
      <footer className="py-6 border-t">
        <div className="container mx-auto px-4">
          <p className="text-center text-muted-foreground text-sm">
            Resumo Rápido © {new Date().getFullYear()} | Transcrição de áudio e geração de relatórios inteligentes
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
