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
      id: 'general',
      title: 'Anamnese Geral',
      description: 'Modelo completo de anamnese para consultas gerais com histórico, queixas e exame físico.',
      icon: 'general',
      popular: true,
      onClick: () => handleTemplateSelect('general')
    },
    {
      id: 'cardio',
      title: 'Cardiologia',
      description: 'Anamnese especializada para consultas cardiológicas com foco em sintomas cardiovasculares.',
      icon: 'cardio',
      onClick: () => handleTemplateSelect('cardio')
    },
    {
      id: 'neuro',
      title: 'Neurologia',
      description: 'Modelo para avaliação neurológica completa, incluindo exame neurológico detalhado.',
      icon: 'neuro',
      onClick: () => handleTemplateSelect('neuro')
    },
    {
      id: 'ortho',
      title: 'Ortopedia',
      description: 'Anamnese focada em problemas musculoesqueléticos, traumas e dores articulares.',
      icon: 'ortho',
      onClick: () => handleTemplateSelect('ortho')
    },
    {
      id: 'pediatric',
      title: 'Pediatria',
      description: 'Modelo adaptado para consultas pediátricas, incluindo desenvolvimento e histórico vacinal.',
      icon: 'pediatric',
      onClick: () => handleTemplateSelect('pediatric')
    },
    {
      id: 'custom',
      title: 'Modelo Personalizado',
      description: 'Crie seu próprio modelo de anamnese com campos e estrutura personalizados.',
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
        loading: 'Gerando anamnese...',
        success: (data) => {
          setReport(data);
          setActiveTab('report');
          return 'Anamnese gerada com sucesso!';
        },
        error: 'Erro ao gerar anamnese. Tente novamente.'
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
        
        <div className="py-16 container mx-auto px-4" id="templates">
          <div className="max-w-6xl mx-auto">
            <Card className="mb-6">
              <CardContent className="p-0">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="templates">Modelo</TabsTrigger>
                    <TabsTrigger value="audio" disabled={!selectedTemplate && activeTab !== 'audio'}>Áudio</TabsTrigger>
                    <TabsTrigger value="transcription" disabled={!transcription && activeTab !== 'transcription'}>Transcrição</TabsTrigger>
                    <TabsTrigger value="report" disabled={!report && activeTab !== 'report'}>Anamnese</TabsTrigger>
                  </TabsList>
                  
                  <div className="p-6">
                    <TabsContent value="templates" className="mt-0">
                      <h2 className="text-2xl font-bold mb-6">Escolha um Modelo de Anamnese</h2>
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
                      <div className="text-center mb-6">
                        <h2 className="text-2xl font-bold mb-2">Grave o Áudio da Consulta</h2>
                        <p className="text-muted-foreground">Grave a conversa com seu paciente para gerar a anamnese automaticamente</p>
                      </div>
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
                            Gerar Anamnese
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
                  Nova Anamnese
                </Button>
              )}
            </div>
          </div>
          
          <div className="mt-20" id="how-it-works">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold">Como funciona</h2>
              <p className="text-muted-foreground mt-2">Gere anamneses completas em quatro passos simples</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-app-purple-100 flex items-center justify-center mb-4">
                  <span className="text-app-purple-700 font-bold text-xl">1</span>
                </div>
                <h3 className="font-bold text-lg mb-2">Escolha o modelo</h3>
                <p className="text-muted-foreground">Selecione o tipo de anamnese especializada para sua consulta</p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-app-purple-100 flex items-center justify-center mb-4">
                  <span className="text-app-purple-700 font-bold text-xl">2</span>
                </div>
                <h3 className="font-bold text-lg mb-2">Grave a consulta</h3>
                <p className="text-muted-foreground">Capture o áudio da conversa com seu paciente</p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-app-purple-100 flex items-center justify-center mb-4">
                  <span className="text-app-purple-700 font-bold text-xl">3</span>
                </div>
                <h3 className="font-bold text-lg mb-2">Revise a transcrição</h3>
                <p className="text-muted-foreground">Verifique e edite o texto transcrito se necessário</p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-app-purple-100 flex items-center justify-center mb-4">
                  <span className="text-app-purple-700 font-bold text-xl">4</span>
                </div>
                <h3 className="font-bold text-lg mb-2">Receba a anamnese</h3>
                <p className="text-muted-foreground">Obtenha um documento profissional pronto para uso</p>
              </div>
            </div>
          </div>
          
          <div className="mt-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold">Benefícios</h2>
              <p className="text-muted-foreground mt-2">Por que médicos escolhem nossa plataforma</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="border-app-purple-200">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-app-purple-100 flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-app-purple-700">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </div>
                  <CardTitle>Economize tempo</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Reduza o tempo de documentação em até 80% e dedique mais atenção aos seus pacientes</p>
                </CardContent>
              </Card>
              
              <Card className="border-app-purple-200">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-app-purple-100 flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-app-purple-700">
                      <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                    </svg>
                  </div>
                  <CardTitle>Documentação de qualidade</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Gere documentos médicos padronizados, completos e profissionais para cada paciente</p>
                </CardContent>
              </Card>
              
              <Card className="border-app-purple-200">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-app-purple-100 flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-app-purple-700">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  </div>
                  <CardTitle>Privacidade garantida</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Seus dados são processados com segurança e em conformidade com normas de proteção de dados médicos</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="py-6 border-t">
        <div className="container mx-auto px-4">
          <p className="text-center text-muted-foreground text-sm">
            Anamnese Médica © {new Date().getFullYear()} | Assistente de anamnese para profissionais de saúde
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
