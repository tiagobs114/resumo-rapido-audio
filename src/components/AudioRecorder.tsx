
import React, { useState, useRef } from 'react';
import { Mic, MicOff, Paperclip, StopCircle, Trash2, Upload, FileAudio } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';

interface AudioRecorderProps {
  onAudioReady: (audioBlob: Blob) => void;
}

const AudioRecorder: React.FC<AudioRecorderProps> = ({ onAudioReady }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];
      
      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };
      
      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        setAudioFile(new File([audioBlob], "recording.wav", { type: 'audio/wav' }));
        stream.getTracks().forEach(track => track.stop());
      };
      
      mediaRecorderRef.current.start();
      setIsRecording(true);
      
      setRecordingTime(0);
      timerRef.current = window.setInterval(() => {
        setRecordingTime(time => time + 1);
      }, 1000);
      
    } catch (error) {
      console.error('Error accessing microphone:', error);
      toast.error('Não foi possível acessar o microfone. Verifique as permissões.');
    }
  };
  
  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  };
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('audio/') || file.type === 'application/octet-stream') {
        setAudioFile(file);
      } else {
        toast.error('Por favor, selecione um arquivo de áudio válido');
      }
    }
  };
  
  const handleDeleteFile = () => {
    setAudioFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  const handleSubmitAudio = () => {
    if (!audioFile) {
      toast.error('Nenhum áudio selecionado');
      return;
    }
    
    setIsProcessing(true);
    
    // In a real app, this would send the audio for processing
    // For now, we'll just simulate a delay and pass the blob
    setTimeout(() => {
      onAudioReady(audioFile);
      setIsProcessing(false);
    }, 1500);
  };
  
  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-card rounded-xl shadow-sm">
      <h2 className="text-2xl font-bold mb-6 text-center">Gravação ou Upload de Áudio</h2>
      
      {!audioFile ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col items-center gap-4 p-6 border rounded-lg bg-muted/30">
            <div className="h-16 w-16 rounded-full flex items-center justify-center bg-app-purple-100">
              <Mic className="h-8 w-8 text-app-purple-600" />
            </div>
            <h3 className="text-lg font-medium">Gravar áudio</h3>
            
            {isRecording ? (
              <div className="w-full flex flex-col items-center gap-4">
                <div className="audio-wave">
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={i}
                      className="audio-wave-bar"
                      style={{
                        height: `${Math.max(15, Math.random() * 40)}px`,
                        animationDuration: `${(i % 3) + 0.5}s`,
                        animationDelay: `${i * 0.1}s`,
                      }}
                    />
                  ))}
                </div>
                <div className="text-xl font-mono">{formatTime(recordingTime)}</div>
                <Button 
                  variant="destructive" 
                  onClick={stopRecording} 
                  className="flex items-center gap-2"
                >
                  <StopCircle className="h-4 w-4" />
                  Parar Gravação
                </Button>
              </div>
            ) : (
              <Button onClick={startRecording} className="flex items-center gap-2">
                <Mic className="h-4 w-4" />
                Iniciar Gravação
              </Button>
            )}
          </div>
          
          <div className="flex flex-col items-center gap-4 p-6 border rounded-lg bg-muted/30">
            <div className="h-16 w-16 rounded-full flex items-center justify-center bg-app-blue-100">
              <Upload className="h-8 w-8 text-app-blue-600" />
            </div>
            <h3 className="text-lg font-medium">Enviar arquivo</h3>
            <input
              ref={fileInputRef}
              type="file"
              accept="audio/*"
              onChange={handleFileChange}
              className="hidden"
              id="audioFileInput"
            />
            <Button 
              variant="outline" 
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2"
            >
              <Paperclip className="h-4 w-4" />
              Escolher arquivo
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between p-4 border rounded-lg bg-secondary">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full flex items-center justify-center bg-app-purple-100">
                <FileAudio className="h-5 w-5 text-app-purple-600" />
              </div>
              <div>
                <p className="font-medium">{audioFile.name}</p>
                <p className="text-sm text-muted-foreground">
                  {(audioFile.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={handleDeleteFile}>
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>
          
          <Button 
            onClick={handleSubmitAudio} 
            disabled={isProcessing}
            className="w-full"
          >
            {isProcessing ? (
              <>
                <span className="mr-2">Processando</span>
                <Progress value={45} className="w-20" />
              </>
            ) : (
              'Continuar para Transcrição'
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

export default AudioRecorder;
