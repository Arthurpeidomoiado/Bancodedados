
import { useState } from 'react';

function App(){
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [imc, setImc] = useState(0);
  const IMCresultado = (weight, height) => {
    const valor = weight / (height * height);
    setImc(valor);
  }
  const Avaliar = (imc) => {
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
  const calcular = (consumo, tarifa) => {
    const valor = consumo * tarifa;
    setResultado(valor);
  }
  const [numeros, setNumeros] = useState([]);
  const [numero, setNumero] = useState('');
  const adicionarNumero = () => {
    if (numero.trim() === '') return;
    setNumeros((listaAnterior) => [...listaAnterior, +(numero)]);
    setNumero('');
  };
  const quantidadePares = numeros.filter((num) => num % 2 === 0).length;
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
            
        </>
    );
}
export default App