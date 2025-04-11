// A placeholder for future audio transcription API integration
export const transcribeAudio = async (audioBlob: Blob): Promise<string> => {
  // In a production app, this would call an actual transcription service like:
  // - Google Speech-to-Text
  // - Amazon Transcribe
  // - Microsoft Azure Speech Services
  // - OpenAI Whisper API
  
  // For now, return a simulated medical consultation transcription
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        "Médico: Bom dia, como está se sentindo hoje?\n\n" +
        "Paciente: Doutor, estou com dor de cabeça forte há três dias. A dor começa na parte de trás e vai para a frente.\n\n" +
        "Médico: Entendo. Essa dor é contínua ou vem em crises?\n\n" +
        "Paciente: Ela é mais forte pela manhã, e melhora um pouco quando tomo um analgésico comum. Mas logo volta.\n\n" +
        "Médico: Associa essa dor com algum outro sintoma? Náusea, vômito, sensibilidade à luz?\n\n" +
        "Paciente: Sim, quando a dor está muito forte sinto náusea e a luz me incomoda bastante. Inclusive precisei faltar ao trabalho ontem.\n\n" +
        "Médico: Já teve episódios semelhantes antes?\n\n" +
        "Paciente: Sim, mas geralmente eram mais leves e passavam com um analgésico. Nunca durou tantos dias seguidos.\n\n" +
        "Médico: Tem algum histórico de enxaqueca na família?\n\n" +
        "Paciente: Sim, minha mãe sofre com enxaqueca crônica.\n\n" +
        "Médico: Entendi. Vamos examinar e depois conversamos sobre as opções de tratamento."
      );
    }, 2000);
  });
};

// Generate a report from transcription using a template
export const generateReport = async (transcription: string, templateType: string, customPrompt?: string): Promise<{title: string, content: string}> => {
  // In a production app, this would call a large language model API like:
  // - OpenAI
  // - Anthropic Claude
  // - Google Gemini
  // - Other LLM API
  
  let title = "Anamnese Médica";
  let content = "";
  
  // Simulate different report types
  return new Promise((resolve) => {
    setTimeout(() => {
      switch (templateType) {
        case 'general':
          title = "Anamnese Clínica Geral";
          content = `# Anamnese Médica\n\n## Identificação do Paciente\nNome: [Nome do Paciente]\nIdade: [Idade] anos\nSexo: [Sexo]\nData: ${new Date().toLocaleDateString()}\n\n## Queixa Principal\nPaciente relata cefaleia intensa com duração de 3 dias, localizada inicialmente na região occipital e irradiando para região frontal.\n\n## História da Doença Atual\nDor de cabeça com início há 3 dias, de caráter progressivo, com maior intensidade matinal, apresentando alívio parcial e temporário com analgésicos comuns. Paciente refere associação com fotofobia e náusea nos momentos de maior intensidade da dor, chegando a comprometer suas atividades laborais, tendo faltado ao trabalho no dia anterior à consulta.\n\n## Antecedentes Patológicos\nNegou outras patologias prévias relevantes.\n\n## Histórico Familiar\nMãe com diagnóstico de enxaqueca crônica.\n\n## Medicamentos em Uso\nAnalgésicos comuns (não especificados) para alívio sintomático.\n\n## Exame Físico\nPA: XXX/XX mmHg\nFC: XX bpm\nFR: XX irpm\nTemp: XX.X°C\n\nEstado geral: bom, lúcido e orientado\nAcuidade visual preservada\nSem alterações significativas ao exame neurológico\n\n## Hipótese Diagnóstica\n1. Enxaqueca sem aura\n2. Cefaleia tensional (diagnóstico diferencial)\n\n## Conduta\n- Solicitado diário de cefaleia\n- Prescrito sumatriptano 50mg para crises\n- Orientação para evitar gatilhos (privação de sono, jejum prolongado)\n- Recomendado retorno em 30 dias para reavaliação\n- Encaminhado para avaliação neurológica`;
          break;
        
        case 'cardio':
          title = "Anamnese Cardiológica";
          content = `# Anamnese Cardiológica\n\n## Identificação do Paciente\nNome: [Nome do Paciente]\nIdade: [Idade] anos\nSexo: [Sexo]\nData: ${new Date().toLocaleDateString()}\n\n## Queixa Principal\nDor torácica ao esforço há 2 semanas.\n\n## História da Doença Atual\nPaciente relata dor retroesternal em aperto, que surge aos esforços moderados como subir escadas, com duração aproximada de 5 minutos e alívio ao repouso. Nega irradiação, sudorese ou náuseas associadas. Refere piora gradual nas últimas 2 semanas.\n\n## Antecedentes Patológicos\nHipertensão arterial há 10 anos\nDislipidemia diagnosticada há 5 anos\nNega diabetes mellitus\n\n## Histórico Familiar\nPai falecido por infarto agudo do miocárdio aos 62 anos\nMãe com hipertensão arterial\n\n## Medicamentos em Uso\nLosartana 50mg, 1x/dia\nAtorvastativa 20mg, 1x/dia\n\n## Hábitos de Vida\nTabagista (20 cigarros/dia há 30 anos)\nEtilista social\nSedentário\n\n## Exame Físico\nPA: 150/90 mmHg\nFC: 78 bpm\nFR: 18 irpm\n\nRitmo cardíaco regular, em 2 tempos, sem sopros\nPulmões limpos\nExtremidades sem edema\n\n## Exames Complementares Prévios\nColesterol total: 240 mg/dL\nLDL: 160 mg/dL\nHDL: 35 mg/dL\nTriglicérides: 180 mg/dL\nGlicemia de jejum: 105 mg/dL\n\n## Hipótese Diagnóstica\n1. Angina estável\n2. Hipertensão arterial não controlada\n3. Dislipidemia\n\n## Conduta\n- Ajuste de anti-hipertensivos (aumento da dose de losartana para 100mg/dia)\n- Solicitado eletrocardiograma de repouso\n- Solicitado teste ergométrico\n- Introduzido AAS 100mg/dia\n- Orientações sobre cessação do tabagismo\n- Retorno em 15 dias com exames`;
          break;
          
        case 'neuro':
          title = "Anamnese Neurológica";
          content = `# Anamnese Neurológica\n\n## Identificação do Paciente\nNome: [Nome do Paciente]\nIdade: [Idade] anos\nSexo: [Sexo]\nData: ${new Date().toLocaleDateString()}\n\n## Queixa Principal\nDor de cabeça intensa há 3 dias.\n\n## História da Doença Atual\nPaciente relata cefaleia de forte intensidade, iniciada há 3 dias, com localização occipital e irradiação para região frontal. A dor apresenta caráter pulsátil, com intensidade maior pela manhã, acompanhada de fotofobia e náusea. Há alívio parcial e temporário com uso de analgésicos comuns. Relata que a intensidade atual da dor está interferindo em suas atividades diárias, tendo inclusive faltado ao trabalho no dia anterior à consulta. Nega febre, trauma recente ou sintomas neurológicos focais.\n\n## Caracterização da Dor\n- Localização: Occipital com irradiação frontal\n- Intensidade: Forte (8/10)\n- Tipo: Pulsátil\n- Duração: Contínua com flutuação de intensidade\n- Fatores de piora: Luz intensa, movimentação\n- Fatores de alívio: Repouso em ambiente escuro, analgésicos parcialmente\n\n## Antecedentes Patológicos\nNega comorbidades neurológicas prévias\nNega traumatismo cranioencefálico\nNega cirurgias prévias\n\n## Histórico Familiar\nMãe com diagnóstico de enxaqueca crônica\n\n## Exame Neurológico\nPaciente consciente, orientado em tempo e espaço\nPupilas isocóricas e fotorreagentes\nFundoscopia normal\nSem alterações de pares cranianos\nForça e sensibilidade preservadas nos 4 membros\nReflexos tendinosos profundos simétricos e normorreativos\nSem alterações cerebelares\nSem sinais meníngeos\n\n## Hipótese Diagnóstica\n1. Enxaqueca sem aura\n2. Cefaleia tensional (diagnóstico diferencial)\n\n## Conduta\n- Prescrição de sumatriptano 50mg para crises\n- Solicitação de diário de cefaleia\n- Orientações sobre identificação e evitação de fatores desencadeantes\n- Encaminhamento para avaliação de profilaxia se crises frequentes\n- Solicitar ressonância magnética de crânio para investigação complementar\n- Retorno em 30 dias com exames`;
          break;
          
        case 'ortho':
          title = "Anamnese Ortopédica";
          content = `# Anamnese Ortopédica\n\n## Identificação do Paciente\nNome: [Nome do Paciente]\nIdade: [Idade] anos\nSexo: [Sexo]\nData: ${new Date().toLocaleDateString()}\n\n## Queixa Principal\nDor no joelho direito há 2 meses.\n\n## História da Doença Atual\nPaciente relata dor no joelho direito de início gradual há aproximadamente 2 meses, sem trauma associado. Descreve a dor como moderada (6/10), localizada principalmente na região medial do joelho, que piora ao subir e descer escadas e após longos períodos em pé. Refere melhora com repouso e uso de anti-inflamatórios. Notou discreto aumento de volume articular no final do dia. Nega travamentos ou sensação de instabilidade. Relata piora progressiva nas últimas semanas.\n\n## Antecedentes Patológicos\nHipertensão arterial controlada\nSobrepeso (IMC 28)\n\n## Antecedentes Traumáticos/Cirúrgicos\nNega cirurgias prévias nos joelhos\nLesão antiga de menisco no joelho esquerdo (não operada) há 10 anos\n\n## Atividade Física\nCaminhada 3x por semana\n\n## Exame Físico\nInspection: Discreto aumento de volume no joelho direito\nPalpação: Dor à palpação da interlinha articular medial\nAmplitude de movimento: Flexão 0-130° com dor no final do movimento\nTestes especiais:\n- Teste de McMurray: Positivo para menisco medial\n- Teste de Lachman: Negativo\n- Gavetas anterior e posterior: Negativas\n- Estresse em varo e valgo: Sem instabilidade\n\n## Exames Complementares\nRadiografia de joelho: Discreto estreitamento do compartimento medial, osteófitos iniciais\n\n## Hipótese Diagnóstica\n1. Lesão meniscal medial do joelho direito\n2. Osteoartrose inicial de joelho direito\n\n## Conduta\n- Prescrição de anti-inflamatório não-esteroidal por 7 dias\n- Solicitar ressonância magnética do joelho direito\n- Encaminhamento para fisioterapia\n- Orientações sobre perda de peso\n- Indicação de uso de joelheira elástica durante atividades\n- Retorno em 3 semanas com exames`;
          break;
          
        case 'pediatric':
          title = "Anamnese Pediátrica";
          content = `# Anamnese Pediátrica\n\n## Identificação do Paciente\nNome: [Nome da Criança]\nIdade: [Idade] anos\nSexo: [Sexo]\nData: ${new Date().toLocaleDateString()}\nAcompanhante: [Nome e relação familiar]\n\n## Queixa Principal\nFebre e dor de garganta há 2 dias.\n\n## História da Doença Atual\nCriança apresenta quadro de febre (máxima aferida de 38,5°C) há 2 dias, acompanhada de dor de garganta, hiporexia e irritabilidade. Mãe refere que a criança está aceitando mal a alimentação devido à dor para engolir. Nega vômitos, mas relata uma evacuação amolecida hoje pela manhã. Criança frequenta creche e mãe relata que outras crianças da turma apresentaram sintomas semelhantes na última semana.\n\n## Antecedentes Patológicos\nNascido a termo, parto cesáreo\nPeso ao nascer: 3.250g\nDiagnóstico prévio de asma leve intermitente\nInternou 1 vez por pneumonia aos 2 anos\n\n## Histórico Vacinal\nVacinas em dia conforme calendário nacional de imunização\n\n## Desenvolvimento Neuropsicomotor\nAdequado para a idade\n\n## Antecedentes Familiares\nMãe com rinite alérgica\nPai com hipertensão arterial\n\n## Exame Físico\nPeso: XX kg (percentil XX)\nAltura: XX cm (percentil XX)\nTemperatura axilar: 38,2°C\nFC: XX bpm\nFR: XX irpm\n\nEstado geral: criança ativa, irritada, febril\nOrofaringe: hiperemia e hipertrofia de amígdalas com placas purulentas bilaterais\nOtoscopia: membranas timpânicas normais bilateralmente\nAusculta pulmonar: murmúrio vesicular presente bilateralmente sem ruídos adventícios\nAusculta cardíaca: ritmo regular, bulhas normofonéticas, sem sopros\nAbdome: flácido, indolor à palpação, sem visceromegalias\n\n## Hipótese Diagnóstica\n1. Amigdalite bacteriana aguda\n2. Rinofaringite viral (diagnóstico diferencial)\n\n## Conduta\n- Prescrição de amoxicilina 50mg/kg/dia, de 8/8h, por 10 dias\n- Antipirético se temperatura ≥ 37,8°C\n- Analgésico para alívio da dor de garganta\n- Orientações sobre hidratação e alimentação fracionada\n- Afastamento da creche por 48h após início da antibioticoterapia\n- Orientação para retorno imediato se piora clínica\n- Retorno para reavaliação em 48-72h`;
          break;
          
        case 'oncology':
          title = "Anamnese Oncológica";
          content = `# Anamnese Oncológica\n\n## Identificação do Paciente\nNome: [Nome do Paciente]\nIdade: [Idade] anos\nSexo: [Sexo]\nData: ${new Date().toLocaleDateString()}\n\n## Queixa Principal\nPaciente em acompanhamento oncológico por adenocarcinoma de pulmão diagnosticado há 6 meses, comparece para avaliação de novos sintomas (cefaleia).\n\n## História da Doença Atual\nPaciente relata cefaleia de forte intensidade, iniciada há 3 dias, com localização occipital e irradiação para região frontal. A dor apresenta caráter pulsátil, com intensidade maior pela manhã, acompanhada de fotofobia e náusea. Refere alívio parcial com analgésicos comuns. Sintomas estão interferindo nas atividades diárias. Nega febre, alterações visuais ou déficits neurológicos focais.\n\n## História Oncológica\nAdenocarcinoma de pulmão, estágio IIIB\nDiagnóstico: Há 6 meses através de biópsia pulmonar guiada por tomografia\nTratamento:\n- Quimioterapia: Cisplatina + Pemetrexede (4 ciclos completados)\n- Radioterapia: 30 sessões (concluídas há 1 mês)\nÚltimos exames (há 1 mês):\n- TC tórax: Resposta parcial, redução da lesão primária em 60%\n- TC abdome: Sem evidência de metástases\n- TC crânio: Não realizada nas últimas avaliações\n\n## Medicações em Uso\n- Ondansetrona 8mg (se náusea/vômito)\n- Dipirona 1g (se dor/febre)\n- Dexametasona 4mg (em desmame após radioterapia)\n- Omeprazol 40mg 1x/dia\n\n## Antecedentes Patológicos\nHipertensão arterial (diagnosticada há 10 anos)\nTabagismo (40 maços-ano, cessou há 6 meses)\n\n## Antecedentes Familiares\nPai: Câncer de pulmão (falecido aos 65 anos)\nMãe: Hipertensão arterial\n\n## Exame Físico\nEstado geral: Bom, porém com fácies de dor\nPA: 130/80 mmHg\nFC: 88 bpm\nFR: 18 irpm\nTemp: 36.5°C\nSatO2: 95% em ar ambiente\nPeso: 68kg (perda de 3kg nos últimos 2 meses)\n\nExame Neurológico:\n- Consciente, orientado em tempo e espaço\n- Pupilas isocóricas e fotorreagentes\n- Sem déficit motor ou sensitivo\n- Reflexos tendinosos profundos preservados e simétricos\n- Sem sinais meníngeos\n- Sem alterações cerebelares\n\nExame Pulmonar:\n- Murmúrio vesicular presente, diminuído em base pulmonar direita\n- Sem ruídos adventícios\n\n## Hipótese Diagnóstica\n1. Cefaleia: possível relação com metástase cerebral a ser investigada\n2. Enxaqueca sem aura (diagnóstico diferencial)\n3. Adenocarcinoma pulmonar em tratamento\n\n## Conduta\n- Solicitar ressonância magnética de crânio com contraste (urgente)\n- Prescrever tramadol 50mg a cada 8 horas para controle da dor\n- Manter antieméticos se náuseas\n- Discutir caso com equipe de neurologia\n- Orientar retorno imediato se aparecerem sintomas neurológicos focais\n- Agendar retorno em 7 dias com resultados dos exames ou antes se houver piora clínica`;
          break;
          
        default:
          if (customPrompt) {
            title = "Anamnese Personalizada";
            content = `# Anamnese Personalizada\n\n## Identificação do Paciente\nNome: [Nome do Paciente]\nIdade: [Idade] anos\nSexo: [Sexo]\nData: ${new Date().toLocaleDateString()}\n\n## Queixa Principal\nDor de cabeça intensa há 3 dias.\n\n## História da Doença Atual\nPaciente relata cefaleia de forte intensidade, iniciada há 3 dias, com localização occipital e irradiação para região frontal. A dor apresenta caráter pulsátil, com intensidade maior pela manhã, acompanhada de fotofobia e náusea. Há alívio parcial e temporário com uso de analgésicos comuns.\n\n## Antecedentes Patológicos\nNega comorbidades relevantes\n\n## Histórico Familiar\nMãe com diagnóstico de enxaqueca crônica\n\n## Exame Físico\nSinais vitais estáveis\nSem alterações neurológicas focais\n\n## Hipótese Diagnóstica\n1. Enxaqueca sem aura\n2. Cefaleia tensional (diagnóstico diferencial)\n\n## Conduta\n- Prescrição medicamentosa para alívio sintomático\n- Orientações sobre identificação de fatores desencadeantes\n- Solicitação de exames complementares conforme necessidade clínica\n- Agendamento de retorno para reavaliação`;
          } else {
            title = "Anamnese Médica Geral";
            content = `# Anamnese Médica\n\n## Identificação do Paciente\nNome: [Nome do Paciente]\nIdade: [Idade] anos\nSexo: [Sexo]\nData: ${new Date().toLocaleDateString()}\n\n## Queixa Principal\nDor de cabeça intensa há 3 dias.\n\n## História da Doença Atual\nPaciente relata cefaleia de forte intensidade, iniciada há 3 dias, com localização occipital e irradiação para região frontal. A dor apresenta caráter pulsátil, com intensidade maior pela manhã, acompanhada de fotofobia e náusea. Há alívio parcial e temporário com uso de analgésicos comuns.\n\n## Antecedentes Patológicos\nNega comorbidades relevantes\n\n## Histórico Familiar\nMãe com diagnóstico de enxaqueca crônica\n\n## Exame Físico\nSinais vitais estáveis\nSem alterações neurológicas focais\n\n## Hipótese Diagnóstica\n1. Enxaqueca sem aura\n2. Cefaleia tensional (diagnóstico diferencial)\n\n## Conduta\n- Prescrição medicamentosa para alívio sintomático\n- Orientações sobre identificação de fatores desencadeantes\n- Solicitação de exames complementares conforme necessidade clínica\n- Agendamento de retorno para reavaliação`;
          }
          break;
      }
      
      resolve({title, content});
    }, 2000);
  });
};
