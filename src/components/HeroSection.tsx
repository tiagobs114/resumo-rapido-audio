
import React from 'react';
import { Button } from '@/components/ui/button';
import { FileText, ArrowRight, Stethoscope, ClipboardCheck } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-app-purple-900 via-app-purple-800 to-app-blue-900 py-20 md:py-32">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-10 left-10 w-48 h-48 rounded-full bg-app-purple-600/20 blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 rounded-full bg-app-blue-600/20 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-app-purple-500/10 blur-3xl"></div>
      </div>
      
      <div className="container relative z-10 mx-auto px-4">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white/90 text-sm font-medium mb-6">
            <Stethoscope className="h-4 w-4 text-app-purple-300" />
            <span>Anamnese médica inteligente baseada em áudio</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Transforme consultas em <span className="text-transparent bg-clip-text bg-gradient-to-r from-app-purple-300 to-app-blue-300">anamneses completas</span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/80 mb-8 max-w-3xl">
            Otimize seu tempo de consulta com nossa ferramenta especializada para médicos. 
            Grave suas conversas com pacientes e gere anamneses estruturadas automaticamente.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-app-purple-900 hover:bg-white/90 gap-2 text-base px-6 py-6"
              onClick={() => document.getElementById('templates')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Criar anamnese
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white/30 text-white hover:bg-white/10 gap-2 text-base px-6 py-6"
              onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Como funciona
              <ClipboardCheck className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="mt-12 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-app-purple-900 to-transparent z-10 rounded-xl"></div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10 shadow-2xl">
              <div className="flex items-center gap-2 mb-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
                <div className="text-xs text-white/60 bg-white/5 px-2 py-1 rounded flex-1 text-center">
                  anamnese-medica.app
                </div>
              </div>
              <div className="relative rounded-lg overflow-hidden aspect-video w-full max-w-2xl">
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-app-purple-600/20 to-app-blue-600/20">
                  <div className="flex flex-col items-center gap-6">
                    <div className="flex gap-4 items-center">
                      <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
                        <Stethoscope className="w-7 h-7 text-white" />
                      </div>
                      <div className="h-0.5 w-16 bg-white/30"></div>
                      <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
                        <FileText className="w-7 h-7 text-white" />
                      </div>
                    </div>
                    
                    <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg border border-white/20 max-w-md">
                      <div className="text-white text-sm text-left">
                        <p className="font-semibold">Anamnese do Paciente</p>
                        <ul className="text-white/80 mt-2 space-y-1 text-xs">
                          <li>• Queixa Principal: Dor abdominal há 3 dias</li>
                          <li>• Histórico: Sem cirurgias prévias</li>
                          <li>• Alergias: Penicilina</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
