import { useState } from 'react';
import styles from './App.module.css';
import poweredImage from './assets/powered.png';
import leftArrowImage from './assets/leftarrow.png'
import { GridItem } from './components/GridItem';
import { levels, calculateImc, Level } from  './helpers/imc'

const App = () => {
  const [heightField, setHeightField] = useState("");
  const [weightField, setWeightField] = useState("");
  const [toShow, setToShow] = useState<Level | null>(null);

  const handleCalculateButton = () => {
    if(heightField && weightField){
      setToShow(calculateImc(parseFloat(heightField), parseFloat(weightField)));
    } else {
      alert('Preencha os campos adequadamente.');
    }
  }
  const handleBackButton = () => {
    setToShow(null);
    setHeightField("");
    setWeightField("");
  }

  return (
    <div className={styles.main}>
      <header>
        <div className={styles.headerContainer}>
          <img src={poweredImage} alt="" width={150}/>
        </div>
      </header>
      <div className={styles.container}>
        <div className={styles.leftSide}>
          <h1>Calcule o seu IMC.</h1>
          <p>IMC é a sigla para Índice de Massa Corpórea, parâmetro para calcular o peso ideal de cada pessoa.</p>
          <input 
            type="number"
            placeholder='Digite a sua altura. Ex: 1.5 (em metros)'
            step={.01}
            value={heightField}
            disabled={toShow ? true : false}
            onChange={e => {
              e.target.value !== "" 
              ? setHeightField(parseFloat(e.target.value) > 0 ? e.target.value : "")
              : setHeightField("");
            }}
            onBlur={() => heightField !== "" 
              && setHeightField(parseFloat(heightField).toFixed(2))
            } 
          />
          <input 
            type="number"
            placeholder='Digite a sua altura. Ex: 75.3 (em kg)'
            step={.01}
            value={weightField}
            disabled={toShow ? true : false}
            onChange={e => {
              e.target.value !== "" 
              ? setWeightField(parseFloat(e.target.value) > 0 ? e.target.value : "")
              : setWeightField("");
            }}
            onBlur={() => weightField !== "" 
              && setWeightField(parseFloat(weightField).toFixed(2))
            } 
          />
          <button onClick={handleCalculateButton} disabled={toShow ? true : false}>Calcular</button>
        </div>
        <div className={styles.rightSide}>
          {
            (!toShow)
            &&
            <div className={styles.grid}>
            {levels.map((item, index) => 
              <GridItem key={index} item={item}/>
            )}
          </div>
          }
          {
            (toShow)
            &&
            <div className={styles.rightBig}>
              <div className={styles.rightArrow} onClick={handleBackButton}>
                <img src={leftArrowImage} alt="" width={25}/>
              </div>
              <GridItem item={toShow}/>
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default App;
