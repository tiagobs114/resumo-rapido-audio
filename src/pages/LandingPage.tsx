import React, { useState } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import TemplateCard, { TemplateProps } from '@/components/TemplateCard';
import AudioRecorder from '@/components/AudioRecorder';
import TranscriptionViewer from '@/components/TranscriptionViewer';
import ReportEditor from '@/components/ReportEditor';
import CreateCustomTemplate from '@/components/CreateCustomTemplate';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from '@/components/ui/card';
import { ChevronRight, FileAudio, FileText, Wand2 } from 'lucide-react';
import { transcribeAudio, generateReport } from '@/utils/audioUtils';
import { downloadPDF } from '@/utils/pdfUtils';
import { toast } from 'sonner';

const LandingPage = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [customTemplate, setCustomTemplate] = useState<{ name: string; prompt: string } | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [transcription, setTranscription] = useState<string>('');
  const [report, setReport] = useState<{ title: string; content: string } | null>(null);
  const [activeTab, setActiveTab] = useState('templates');

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
      onClick: () => setActiveTab('customTemplate')
    }
  ];

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    setActiveTab('audio');
  };

  const handleCustomTemplateCreated = (template: { name: string; prompt: string }) => {
    setCustomTemplate(template);
    setSelectedTemplate('custom');
    setActiveTab('audio');
  };

  const handleAudioReady = async (audio: Blob) => {
    setAudioBlob(audio);
    toast.promise(
      transcribeAudio(audio),
      {
        loading: 'Transcrevendo o áudio...',
        success: (data) => {
          setTranscription(data);
          setActiveTab('transcription');
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
          setActiveTab('report');
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

  const handleReset = () => {
    setSelectedTemplate(null);
    setCustomTemplate(null);
    setAudioBlob(null);
    setTranscription('');
    setReport(null);
    setActiveTab('templates');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <HeroSection />
        
        <div className="py-16 container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <Card className="mb-6" id="templates">
              <CardContent className="p-0">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="templates">Template</TabsTrigger>
                    <TabsTrigger value="audio" disabled={!selectedTemplate && activeTab !== 'audio'}>Áudio</TabsTrigger>
                    <TabsTrigger value="transcription" disabled={!transcription && activeTab !== 'transcription'}>Transcrição</TabsTrigger>
                    <TabsTrigger value="report" disabled={!report && activeTab !== 'report'}>Relatório</TabsTrigger>
                  </TabsList>
                  
                  <div className="p-6">
                    <TabsContent value="templates" className="mt-0">
                      <h2 className="text-2xl font-bold mb-6">Escolha um Template</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {templates.map((template) => (
                          <TemplateCard 
                            key={template.id}
                            id={template.id}
                            title={template.title}
                            description={template.description}
                            icon={template.icon}
                            popular={template.popular}
                            onClick={template.onClick}
                          />
                        ))}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="customTemplate" className="mt-0">
                      <CreateCustomTemplate onTemplateCreated={handleCustomTemplateCreated} />
                    </TabsContent>
                    
                    <TabsContent value="audio" className="mt-0">
                      <AudioRecorder onAudioReady={handleAudioReady} />
                    </TabsContent>
                    
                    <TabsContent value="transcription" className="mt-0">
                      <div className="flex flex-col gap-6">
                        <TranscriptionViewer 
                          transcription={transcription} 
                          onEditComplete={handleTranscriptionEdit} 
                        />
                        
                        <div className="flex justify-center">
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
                    </TabsContent>
                    
                    <TabsContent value="report" className="mt-0">
                      {report && (
                        <ReportEditor
                          reportTitle={report.title}
                          initialContent={report.content}
                          templateType={selectedTemplate || 'default'}
                          onDownloadPDF={handleDownloadPDF}
                        />
                      )}
                    </TabsContent>
                  </div>
                </Tabs>
              </CardContent>
            </Card>
            
            <div className="flex justify-between">
              {activeTab !== 'templates' && (
                <Button variant="outline" onClick={() => {
                  switch(activeTab) {
                    case 'customTemplate': 
                      setActiveTab('templates');
                      break;
                    case 'audio': 
                      setActiveTab('templates');
                      setSelectedTemplate(null);
                      break;
                    case 'transcription': 
                      setActiveTab('audio');
                      break;
                    case 'report': 
                      setActiveTab('transcription');
                      break;
                  }
                }}>
                  Voltar
                </Button>
              )}
              
              {(activeTab === 'report' || activeTab === 'transcription') && (
                <Button variant="secondary" onClick={handleReset}>
                  Começar Novo
                </Button>
              )}
            </div>
          </div>
        </div>
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

export default LandingPage;
