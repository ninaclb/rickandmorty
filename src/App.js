import './css/App.css';
import { useEffect, useState } from 'react';

function App() {
  const [conteudo, setConteudo] = useState(<></>)
  const [busca, setBusca] = useState('') // sempre duas variaveis uma é a variavel e outra é a variavel que pode mexer nela 

  function traduzirStatus(status){
    switch(status){
      case 'Alive':
        return 'Vivo'
      case 'Dead':
        return 'Morto'
      case 'unknown':
        return 'Desconhecido'
      default:
        return status
    }
  }
  function traduzirEspecie(especie){
    switch(especie){
      case 'Human':
        return 'Humano'
      case 'Alien':
        return 'Alien'
      case 'Humanoid':
        return 'Humanoide'
      case 'Poopybutthole':
        return 'Poopybutthole'
      case 'Mythological Creature':
        return 'Criatura Mítica'
      case 'Animal':
        return 'Animal'
      case 'Robot':
        return 'Robô'
      case 'Disease':
        return 'Doença'
      case 'Cronenberg':
        return 'Cronenberg'
      case 'unknown':
        return 'Desconhecido'
      case 'Planet':
        return 'Planeta'
      default:
        return especie
    }
  }
  function traduzirGenero(genero){
    switch(genero){
      case 'Male':
        return 'Masculino'
      case 'Female':
        return 'Feminino'
      case 'Genderless':
        return 'Sem Gênero'
      case 'unknown':
        return 'Desconhecido'
      default:
        return genero
    }}


  async function carregarTodosOsPersonagens(){ // async é um metodo que espera o fetch terminar de carregar
    const retorno = await fetch( // fetch é um metodo que pega uma url e retorna um json     await é um metodo que espera o fetch terminar de carregar
      'https://rickandmortyapi.com/api/character'+busca,
      {method: 'GET'}
    )
    .then(resposta => resposta.json())
    .catch(erro => console.log(erro));
    return retorno.results
  }
  async function listaPersonagem(){
    const todosPersonagens = await carregarTodosOsPersonagens()

    return todosPersonagens.map(personagem =>
      <div className='card char' key={personagem.id}>
        <img src={personagem.image} alt={personagem.name} />
        <h2>{personagem.name}</h2>
        <div className='char-info'>
          <span>
          <b>Espécie: </b>
          {traduzirEspecie(personagem.species)}
          </span>
          <span>
          <b>Gênero: </b>
            {traduzirGenero(personagem.gender)}
          </span>
        </div>
        <div>
        <div className='lista-secundaria '>
          <b>Participações: </b>
          {personagem.episode.map(ep => ( // map é um  e o split é um metodo que corta a url o quanto vc quiser 

            <span key={personagem.name+(ep.split('episode/')[1])}>
              Ep-{ep.split('episode/')[1]}
            </span>
          ))}
        </div>
        </div>

        <h5>
        <b>Status: </b>{traduzirStatus(personagem.status)}
        </h5>
        </div>
      )
  }

  function montarFiltro(tipo, valor){
    const filtros = new URLSearchParams(busca);// URLSearchParams é um metodo que pega a url e transforma em um objeto nativo de javascript

    const retorno = filtros.get(valor) // get é um metodo que pega o valor do objeto nativo de javascript
    if(retorno === valor){
      filtros.delete(tipo)
    } else {
      filtros.set(tipo, valor)
    }
    filtros.set(tipo, valor) // set é um metodo que seta o valorou pega o objeto nativo de javascript
    setBusca('?'+filtros.toString()) // toString é um metodo que transforma o objeto nativo de javascript em uma string
  }

  useEffect(() => {
    async function getConteudo(){
    setConteudo(await listaPersonagem())
    }
    getConteudo()
  }, [busca])

  return (
    <div className="App">
      <header className="cabecalho">
        <h1>Rick and Morty API</h1>
      </header>
      <div className='filtros'>
        <span className='filtros-titulo'>Filtros</span>
        <div className='filtro'>
          <b>Status:</b>
          <span className='filtro-ativo' onClick={() => montarFiltro('status','alive')}>Vivo</span>
          <span className='filtro-ativo' onClick={() => montarFiltro('status','dead')}>Morto</span>
          <span className='filtro-ativo' onClick={() => montarFiltro('status','unknown')}>Desconhecido</span>
        </div>
        <div className='filtro'>
          <b>Genero:</b>
          <span className='filtro-ativo' onClick={() => montarFiltro('gender','male')}>Masculino</span>
          <span className='filtro-ativo' onClick={() => montarFiltro('gender','female')}>Feminino</span>
          <span className='filtro-ativo' onClick={() => montarFiltro('gender','genderless')}>Sem Gênero</span>
          <span className='filtro-ativo' onClick={() => montarFiltro('gender','unknown')}>Desconhecido</span>
        </div>
        <div className='filtro'>
          <b>Espécie:</b>
          <span className='filtro-ativo' onClick={() => montarFiltro('species','human')}>Humano</span>
          <span className='filtro-ativo' onClick={() => montarFiltro('species','alien')}>Alien</span>
          <span className='filtro-ativo' onClick={() => montarFiltro('species','humanoid')}>Humanoide</span>
          <span className='filtro-ativo' onClick={() => montarFiltro('species','poopybutthole')}>Poopybutthole</span>
          <span className='filtro-ativo' onClick={() => montarFiltro('species','Mythological Creature')}>Criatura Mítica</span>
          <span className='filtro-ativo' onClick={() => montarFiltro('species','animal')}>Animal</span>
          <span className='filtro-ativo' onClick={() => montarFiltro('species','robot')}>Robô</span>
          <span className='filtro-ativo' onClick={() => montarFiltro('species','disease')}>Doença</span>
          <span className='filtro-ativo' onClick={() => montarFiltro('species','cronenberg')}>Cronenberg</span>
          <span className='filtro-ativo' onClick={() => montarFiltro('species','unknown')}>Desconhecido</span>
          <span className='filtro-ativo' onClick={() => montarFiltro('species','planet')}>Planeta</span>
        </div>
      </div>
      <div className='lista-principal'>
        {conteudo}
      </div>
    </div>
  );
}

export default App;
