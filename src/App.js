import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const Tietohaku = (props) => {
  const champ = props.data
  if(!champ.name) return <p >champpia ei löytynyt. </p>
  console.log(champ)
  return (
    <div>
      <h1 className="paddingRemoval">{ champ.name }</h1>
      <h2>{ champ.title }</h2>
      <div className="abilityInfo">
      Q: {champ.spells[0].name} <img className="abilityKuva" alt="Q icon" src={`http://ddragon.leagueoflegends.com/cdn/11.24.1/img/spell/${champ.spells[0].image.full}`} />
      <br />
      W: {champ.spells[1].name} <img className="abilityKuva" alt="W icon" src={`http://ddragon.leagueoflegends.com/cdn/11.24.1/img/spell/${champ.spells[1].image.full}`} />
      <br />
      E: {champ.spells[2].name} <img className="abilityKuva" alt="E icon" src={`http://ddragon.leagueoflegends.com/cdn/11.24.1/img/spell/${champ.spells[2].image.full}`} />
      <br />
      R: {champ.spells[3].name} <img className="abilityKuva" alt="R icon" src={`http://ddragon.leagueoflegends.com/cdn/11.24.1/img/spell/${champ.spells[3].image.full}`} />
      <br />
      P: {champ.passive.name} <img className="abilityKuva" alt="Passive icon" src={`http://ddragon.leagueoflegends.com/cdn/11.24.1/img/passive/${champ.passive.image.full}`} />
      <br /><br />
      Role: {champ.tags[0]}
      </div>
      <div>
        <img className="splash" alt="Splash art" src={`http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champ.name}_0.jpg`} />
      </div>
    </div>
  )
};

const App = () => {
  const [champ, setChamp] = useState("");
  const [data, setData] = useState({});
  const [champData, setChampData] = useState({});

  const handleChampChange = (event) => {
    setChamp(event.target.value);
    console.log(event.target.value);
  };

  useEffect(() => {
    axios
      .get(
        `http://ddragon.leagueoflegends.com/cdn/11.24.1/data/en_US/champion.json`
      )
      .then((response) => {
        setData(response);
        console.log(response);
      });
  }, []);
  useEffect(() => {
    if (!data.data) return;
    if (champ in data.data.data) {
      axios
        .get(
          `http://ddragon.leagueoflegends.com/cdn/11.24.1/data/en_US/champion/${champ}.json`
        )
        .then((response) => {
          setChampData(response.data.data[Object.keys(response.data.data)[0]]);
        });
    }
  }, [champ]);

  return (
    <div>
      <h1> Loli tiedot</h1>
      Champin nimi: <input onChange={handleChampChange} value={champ}></input>
      <Tietohaku data={champData} />
    </div>
  );
};

export default App;
