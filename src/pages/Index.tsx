
import React, { useState } from 'react';
import Header from '@/components/Header';
import AudioRecorder from '@/components/AudioRecorder';
import ReportEditor from '@/components/ReportEditor';
import { Button } from '@/components/ui/button';
import { FileAudio, FileText } from 'lucide-react';
import { transcribeAudio, generateReport } from '@/utils/audioUtils';
import { downloadPDF } from '@/utils/pdfUtils';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

enum AppStage {
  AUDIO_INPUT,
  REPORT
}

const Index = () => {
  const [stage, setStage] = useState<AppStage>(AppStage.AUDIO_INPUT);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [transcription, setTranscription] = useState<string>('');
  const [reports, setReports] = useState<{
    doctor: { title: string; content: string } | null;
    secretary: { title: string; content: string } | null;
    patient: { title: string; content: string } | null;
  }>({
    doctor: null,
    secretary: null,
    patient: null
  });
  const [activeReportTab, setActiveReportTab] = useState<'doctor' | 'secretary' | 'patient'>('doctor');

  const handleAudioReady = async (audio: Blob) => {
    setAudioBlob(audio);
    toast.promise(
      transcribeAudio(audio),
      {
        loading: 'Transcrevendo o áudio...',
        success: (data) => {
          setTranscription(data);
          generateAllReports(data);
          return 'Transcrição concluída!';
        },
        error: 'Erro na transcrição. Tente novamente.'
      }
    );
  };

  const generateAllReports = async (transcriptionText: string) => {
    toast.promise(
      Promise.all([
        generateReport(transcriptionText, 'doctor', undefined),
        generateReport(transcriptionText, 'secretary', undefined),
        generateReport(transcriptionText, 'patient', undefined)
      ]),
      {
        loading: 'Gerando anamneses...',
        success: (data) => {
          setReports({
            doctor: data[0],
            secretary: data[1],
            patient: data[2]
          });
          setStage(AppStage.REPORT);
          return 'Anamneses geradas com sucesso!';
        },
        error: 'Erro ao gerar anamneses. Tente novamente.'
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
      case AppStage.AUDIO_INPUT:
        return <AudioRecorder onAudioReady={handleAudioReady} />;
      case AppStage.REPORT:
        return (
          <div className="container mx-auto px-4">
            <Tabs
              value={activeReportTab}
              onValueChange={(value) => setActiveReportTab(value as 'doctor' | 'secretary' | 'patient')}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="doctor">Médico</TabsTrigger>
                <TabsTrigger value="secretary">Secretária</TabsTrigger>
                <TabsTrigger value="patient">Paciente</TabsTrigger>
              </TabsList>
              
              <TabsContent value="doctor">
                {reports.doctor && (
                  <ReportEditor
                    reportTitle={reports.doctor.title}
                    initialContent={reports.doctor.content}
                    templateType="general"
                    onDownloadPDF={handleDownloadPDF}
                  />
                )}
              </TabsContent>
              
              <TabsContent value="secretary">
                {reports.secretary && (
                  <ReportEditor
                    reportTitle={reports.secretary.title}
                    initialContent={reports.secretary.content}
                    templateType="general"
                    onDownloadPDF={handleDownloadPDF}
                  />
                )}
              </TabsContent>
              
              <TabsContent value="patient">
                {reports.patient && (
                  <ReportEditor
                    reportTitle={reports.patient.title}
                    initialContent={reports.patient.content}
                    templateType="general"
                    onDownloadPDF={handleDownloadPDF}
                  />
                )}
              </TabsContent>
            </Tabs>
          </div>
        );
      default:
        return <div>Algo deu errado. Por favor, recarregue a página.</div>;
    }
  };

  const renderStageIndicator = () => {
    const stages = [
      { name: 'Áudio', icon: FileAudio, stage: AppStage.AUDIO_INPUT },
      { name: 'Anamnese', icon: FileText, stage: AppStage.REPORT }
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

  const canGoBack = stage > AppStage.AUDIO_INPUT;
  
  const handleGoBack = () => {
    if (stage === AppStage.REPORT) {
      setStage(AppStage.AUDIO_INPUT);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-8">
        {renderStageIndicator()}
        
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
