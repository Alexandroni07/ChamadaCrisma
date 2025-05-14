import { turmaData } from './Shared/data';
import { 
  Box, 
  Button, 
  Card, 
  Divider, 
  MenuItem, 
  Stack, 
  Typography, 
  Collapse, 
  CardContent,
  FormControlLabel,
  Checkbox,
  Radio,
  RadioGroup,
  FormLabel,
  FormControl
} from '@mui/material';
import { useState } from 'react';

const Chamada = () => {
  // Estados para controle da chamada
  const [chamadaIniciada, setChamadaIniciada] = useState(false);
  const [crismandoAtual, setCrismandoAtual] = useState(0);
  const [presencas, setPresencas] = useState({});
  const [frequenciaMissa, setFrequenciaMissa] = useState({});
  const [expandedId, setExpandedId] = useState(null);

  // Inicia a chamada, expandindo o primeiro crismando
  const iniciarChamada = () => {
    setChamadaIniciada(true);
    setCrismandoAtual(0);
    setExpandedId(turmaData.membros[0].id);
  };

  // Finaliza a chamada (limpa estados)
  const finalizarChamada = () => {
    setChamadaIniciada(false);
    setExpandedId(null);
  };

  // Salva os dados (fictício - será substituído por chamada API)
  const salvarChamada = () => {
    console.log('Dados a serem salvos:', {
      presencas,
      frequenciaMissa
    });
    alert('Chamada salva com sucesso! (implementação fictícia)');
    finalizarChamada();
  };

  // Avança para o próximo crismando na lista
  const proximoCrismando = () => {
    if (crismandoAtual < turmaData.membros.length - 1) {
      const nextId = turmaData.membros[crismandoAtual + 1].id;
      setCrismandoAtual(crismandoAtual + 1);
      setExpandedId(nextId);
    }
  };

  // Volta para o crismando anterior
  const crismandoAnterior = () => {
    if (crismandoAtual > 0) {
      const prevId = turmaData.membros[crismandoAtual - 1].id;
      setCrismandoAtual(crismandoAtual - 1);
      setExpandedId(prevId);
    }
  };

  // Manipuladores de eventos
  const handleClick = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handlePresencaChange = (id, presente) => {
    setPresencas({
      ...presencas,
      [id]: presente
    });
    
    // Se marcou falta, remove a informação de missa
    if (!presente) {
      const newFrequencia = {...frequenciaMissa};
      delete newFrequencia[id];
      setFrequenciaMissa(newFrequencia);
    }
  };

  const handleMissaChange = (id, foiAMissa) => {
    setFrequenciaMissa({
      ...frequenciaMissa,
      [id]: foiAMissa
    });
  };

  return (
    <Box>
      <Card style={{ padding: 8, margin: '10px 32px' }}>
        <Typography style={{ fontSize: 28, textAlign: 'center', marginBottom: 16 }}>
          Chamada
        </Typography>
      </Card>
      
      <Box style={{ margin: '0px 32px' }}>
        {/* Cabeçalho com informações da turma */}
        <Stack spacing={1} mb={3}>
          <Typography>Turma: {turmaData.turma}</Typography>
          <Typography>Catequista: {turmaData.catequista}</Typography>
          <Typography>Encontros: {turmaData.encontros}</Typography>
        </Stack>

        {/* Controles da chamada */}
        {!chamadaIniciada ? (
          <Button 
            variant="contained" 
            color="primary" 
            onClick={iniciarChamada}
            fullWidth
            sx={{ mb: 3 }}
          >
            Iniciar Chamada
          </Button>
        ) : (
          <Stack direction="row" spacing={2} mb={3}>
            <Button 
              variant="outlined" 
              onClick={crismandoAnterior}
              disabled={crismandoAtual === 0}
            >
              Anterior
            </Button>
            <Button 
              variant="outlined" 
              onClick={proximoCrismando}
              disabled={crismandoAtual === turmaData.membros.length - 1}
            >
              Próximo
            </Button>
            <Button 
              variant="contained" 
              color="success" 
              onClick={salvarChamada}
              sx={{ ml: 'auto' }}
            >
              Salvar Chamada
            </Button>
          </Stack>
        )}

        {/* Lista de crismandos */}
        <Card style={{ padding: 10 }}>
          <Typography style={{ fontWeight: 700, marginBottom: 2 }}>Membros:</Typography>
          
          {turmaData.membros.map((membro) => (
            <Box key={membro.id}>
              <MenuItem 
                onClick={() => handleClick(membro.id)}
                style={{ 
                  cursor: 'pointer', 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  backgroundColor: expandedId === membro.id ? '#f0f0f0' : 'inherit'
                }}
              >
                <Typography>{membro.nome}</Typography>
                <Typography>{expandedId === membro.id ? '▲' : '▼'}</Typography>
              </MenuItem>
              
              <Collapse in={expandedId === membro.id} timeout="auto" unmountOnExit>
                <Card style={{ margin: '8px 0', padding: '16px' }}>
                  {/* Informações básicas */}
                  <Typography><strong>Nome:</strong> {membro.nome}</Typography>
                  <Typography><strong>Telefone:</strong> {membro.telefone}</Typography>
                  
                  {/* Controles de presença */}
                  <FormControl component="fieldset" sx={{ mt: 2 }}>
                    <FormLabel component="legend">Presença:</FormLabel>
                    <RadioGroup
                      value={presencas[membro.id] !== undefined ? presencas[membro.id] : ''}
                      onChange={(e) => handlePresencaChange(membro.id, e.target.value === 'true')}
                    >
                      <FormControlLabel 
                        value="true" 
                        control={<Radio />} 
                        label="Presente" 
                      />
                      <FormControlLabel 
                        value="false" 
                        control={<Radio />} 
                        label="Falta" 
                      />
                    </RadioGroup>
                  </FormControl>

                  {/* Controle de frequência na missa (só aparece se presente) */}
                  {presencas[membro.id] === true && (
                    <FormControl component="fieldset" sx={{ mt: 2 }}>
                      <FormLabel component="legend">Frequentou a missa?</FormLabel>
                      <RadioGroup
                        value={frequenciaMissa[membro.id] !== undefined ? frequenciaMissa[membro.id] : ''}
                        onChange={(e) => handleMissaChange(membro.id, e.target.value === 'true')}
                      >
                        <FormControlLabel 
                          value="true" 
                          control={<Radio />} 
                          label="Sim" 
                        />
                        <FormControlLabel 
                          value="false" 
                          control={<Radio />} 
                          label="Não" 
                        />
                      </RadioGroup>
                    </FormControl>
                  )}
                </Card>
              </Collapse>
              
              <Divider />
            </Box>
          ))}
        </Card>
      </Box>
    </Box>
  );
};

export default Chamada;