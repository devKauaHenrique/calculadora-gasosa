import { useState, FormEvent } from 'react'
import './App.css';

import logoImg from './assets/logo.png';

interface ResultadoProps{
  title: string;
  gasolina: string | number;
  alcool: string | number;
}

function App() {

  const [gasolinaInput, setGasolinaInput] = useState(0);
  const [alcoolInput, setAlcoolInput] = useState(0);
  const [resultado, setResultado] = useState<ResultadoProps>();

  function calcular(event: FormEvent){
    event.preventDefault();
    
    let calculo = (alcoolInput / gasolinaInput);

    if(calculo <= 0.7){
      setResultado({
        title: "Compensa usar Álcool",
        alcool: formatarMoeda(alcoolInput),
        gasolina: formatarMoeda(gasolinaInput)
      })
    }
    else{
      setResultado({
        title: "Compensa usar Gasolina",
        alcool: formatarMoeda(alcoolInput),
        gasolina: formatarMoeda(gasolinaInput)
      })
    }
  }

  function formatarMoeda(valor: number){
    let valorFormatado = valor.toLocaleString("pt-br",{
      style: "currency",
      currency: "BRL"
    })

    return valorFormatado;
  }

  return (
    <div>
      <main className='container'>
        <img 
        className='logo'
        src={logoImg} 
        alt="Logo da calculadora de gasolina e álcool"
        />

        <h1 className='title'>Qual a melhor opção?</h1>

        <form className='form' onSubmit={calcular}>
          <label>Álcool (preço por litro):</label>
          <input
          className='input'
          type='number'
          placeholder='4,90'
          min="1"
          step="0.01"
          required
          value={alcoolInput}
          onChange={(event) => setAlcoolInput(Number(event.target.value))}
          />

          <label>Gasolina (preço por litro):</label>
          <input
          className='input'
          type='number'
          placeholder='4,90'
          min="1"
          step="0.01"
          required
          value={gasolinaInput}
          onChange={(event) => setGasolinaInput(Number(event.target.value))}
          />

          <input
          className='button'
          type='submit'
          value="Calcular"
          />
        </form>

        {resultado && Object.keys(resultado).length > 0 &&(
          <section className='result'>
            <h2 className='result-title'>{resultado.title}</h2>
            <span>Álcool: {resultado.alcool}</span>
            <span>Gasolina: {resultado.gasolina}</span>
        </section>
        )}

      </main>
    </div>  
  )
}

export default App
