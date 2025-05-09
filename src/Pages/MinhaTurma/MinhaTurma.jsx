import './MinhaTurma.css'
import { turmaData } from './Shared/data'

const MinhaTurma = () => {
  return (
    <div className="minha-turma-page">
      <h2>Minha Turma</h2>
      <div className="turma-info">
        <h3>{turmaData.nome}</h3>
        <p><strong>Catequista:</strong> {turmaData.catequista}</p>
        <p><strong>Encontros:</strong> {turmaData.encontros}</p>
        
        <h4>Membros:</h4>
        <ul>
          {turmaData.membros.map((membro, index) => (
            <li key={index}>{membro}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default MinhaTurma;