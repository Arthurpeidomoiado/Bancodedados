
import { useState } from 'react';

function App(){
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [imc, setImc] = useState(0);
  const IMCresultado = (weight, height) => {
    const valor = weight / (height * height);
    setImc(valor);
  }
  function Avaliar(imc){
    if (imc <= 0) {
      return '[Calculando....]';
    }
    else if (imc < 18.5) {
      return 'Abaixo do peso';
    } else if (imc >= 18.5 && imc < 25) {
      return 'Peso normal';
    } else if (imc >= 25 && imc < 30) {
      return 'Sobrepeso';
    } else if (imc >= 30 && imc < 35) {
      return 'Obesidade grau I';
    } else if (imc >= 35 && imc < 40) {
      return 'Obesidade grau II';
    } else {
      return 'Obesidade grau III';
    }
  }
  const [counsumo, setCounsumo] = useState(0);
  const [tarifa, settarifa] = useState(0);
  const [resultado, setResultado] = useState(0);
  function calcular(consumo, tarifa){
    const valor = consumo * tarifa;
    setResultado(valor);
  }
  const [numeros, setNumeros] = useState([]);
  const [numero, setNumero] = useState('');
  function adicionarNumero() {
    if (numero.trim() === '') return;
    setNumeros((listaAnterior) => [...listaAnterior, +(numero)]);
    setNumero('');
  }
  const quantidadePares = numeros.filter((num) => num % 2 === 0).length;
//criamos a função Aluno para iniciar novas instâncias de aluno.
  function Aluno(nome, curso, notas) {
    this.nome = nome;
    this.curso = curso;
    this.notas = notas;
  }
//Fazemos dois exemplos de alunos para mostrar como funciona a função calcularMedia
  const aluno1 = new Aluno('João', 'Engenharia', [7, 8, 9]);
  const aluno2 = new Aluno('Maria', 'Medicina', [9, 10, 8]);
//criamos uma função para calcular a média, fazendo uma contagem por FOR e retornando a média
  function calcularMedia(aluno) {
    let soma = 0;
    for (const nota of aluno.notas) {
      soma += nota;
    }
    let media = soma / aluno.notas.length;
    return media ;
  }
//criamos as variáveis mutáveis para armazenar as informações de aluno
//O vetor que vai guardas os alunos
  const [alunos, setAlunos] = useState([]);
  const [nomeAluno, setNomeAluno] = useState('');
  const [cursoAluno, setCursoAluno] = useState('');
  //A nota individual do aluno, dentro de uma sequência de notas
  const [notaAluno, setNotaAluno] = useState(0);
  //O array que vai guardas todas as notas de um determinado aluno
  const [notasAluno, setNotasAluno] = useState([]);
  //função que adiciona um novo aluno, preservando uma lista anterior
  function adicionarAluno(){
   setAlunos((listaAnterior) => [...listaAnterior, new Aluno(nomeAluno, cursoAluno, notasAluno)]);  
   setNomeAluno('');
   setCursoAluno('');
   setNotaAluno(0);
   setNotasAluno([]);
  }
  function PrintarAlunos(alunos){
    let resultado = '';
    for(const aluno of alunos){
      resultado += `${aluno.nome} - ${aluno.curso} - Notas: ${aluno.notas.join(', ')}\n`;
    }
    return resultado;
  }
    return (
        <>
            <h1>Calcular IMC</h1>
            <input type="number" placeholder="Digite seu peso (kg)" onChange={(e) => setWeight(parseFloat(e.target.value))} />
            <input type="number" placeholder="Digite sua altura (m)" onChange={(e) => setHeight(parseFloat(e.target.value))} />
            <input type='button' value='Calcular' onClick={() => IMCresultado(weight, height)} />
            <p>Seu IMC é: {imc.toFixed(2)}</p>
            <p> Você está: {Avaliar(imc)}</p>
            <br></br>
            <h1>Calcular Conta</h1>
            <input type="number" placeholder="Digite o valor do consumo" onChange={(e) => (setCounsumo(parseFloat(e.target.value)))} />
            <input type="number" placeholder="Digite o valor da tarifa" onChange={(e) => (settarifa(parseFloat(e.target.value)))}/>
            <input type='button' value='Calcular' onClick={()=>(calcular(counsumo, tarifa))}/>
            <p>Valor a ser cobrado: R$ {resultado}</p>
            <h1>Contador de pares</h1>
            <input
              type="number"
              id="contagem"
              placeholder="Digite um número e aperte Enter"
              value={numero}
              onChange={(e) => setNumero(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') adicionarNumero();
              }}
            />
            <p>Números digitados: {numeros.join(', ')}</p>
            <p>Quantidade de números pares digitados: {quantidadePares}</p>
            <br></br>
            <h1>Calcular Média dos alunos</h1>
            <p>Exemplo:</p>
            //mostrando so dois primeiros exemplos criados.
            <p>Aluno 1: {calcularMedia(aluno1).nome} - Média: {parseFloat(calcularMedia(aluno1)).toFixed(2)}</p>
            <p>Aluno 2: {calcularMedia(aluno2).nome} - Média: {parseFloat(calcularMedia(aluno2)).toFixed(2)}</p>
            //forumulario para adicionar novos alunos, com inputs para nome, curso e notas, e um botão para adicionar o aluno à lista
            <form>
              <input type="text" placeholder="Digite o nome do aluno" value={nomeAluno} onChange={(e) => setNomeAluno(e.target.value)} />
              <input type="text" placeholder="Digite o curso do aluno" value={cursoAluno} onChange={(e) => setCursoAluno(e.target.value)} />
              <input type="text" placeholder="Digite as notas do aluno separadas por vírgula" value={notaAluno} onChange={(e) => setNotaAluno(e.target.value)} onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  notasAluno.push(parseFloat(notaAluno));
                  setNotaAluno('');
                }
              }} />
              <input type='button' value='Adicionar Aluno' onClick={() => adicionarAluno()} />
              <p>Alunos cadastrados:</p>
              <p>{PrintarAlunos(alunos)}</p>
            </form>
        </>
    );
}

export default App;