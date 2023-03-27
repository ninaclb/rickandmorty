import './css/App.css';
import { useEffect, useState } from 'react';

function App() {
  const [conteudo, setConteudo] = useState(<></>)

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


  async function carregarTodosOsPersonagens(){
    const retorno = await fetch(
      'https://rickandmortyapi.com/api/character',
      {method: 'GET'}
    )
    .then(resposta => resposta.json())
    return retorno.results
  }
  async function listaPersonagem(){
    const todosPersonagens = await carregarTodosOsPersonagens()

    return todosPersonagens.map(personagem =>
      <div className='card char'>
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
          {personagem.episode.map(ep => (
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

  useEffect(() => {
    async function carregar(){
    setConteudo(await listaPersonagem())
    }
    carregar()
  }, [])

  return (
    <div className="App">
      <header className="cabecalho">
        <h1>Rick and Morty API</h1>
      </header>
      <div className='filtros'>
        <span className='filtros-titulo'>Filtros</span>
        <div className='filtro'>
          <b>Status:</b>
          <span>Vivo</span>
          <span>Morto</span>
          <span>Desconhecido</span>
        </div>
        <div className='filtro'>
          <b>Genero:</b>
          <span>Masculino</span>
          <span>Feminino</span>
          <span>Sem Gênero</span>
          <span>Desconhecido</span>
        </div>
        <div className='filtro'>
          <b>Espécie:</b>
          <span>Humano</span>
          <span>Alien</span>
          <span>Humanoide</span>
          <span>Poopybutthole</span>
          <span>Criatura Mítica</span>
          <span>Animal</span>
          <span>Robô</span>
          <span>Doença</span>
          <span>Cronenberg</span>
          <span>Desconhecido</span>
          <span>Planeta</span>
        </div>
      </div>
      <div className='lista-principal'>
        {conteudo}
      </div>
    </div>
  );
}

export default App;
