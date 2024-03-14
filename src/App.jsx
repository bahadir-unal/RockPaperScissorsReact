// CSS dosyasını içe aktar
import './App.css';

// FontAwesome'dan gerekli ikonları içe aktar
import { faHandPaper, faHandRock, faHandScissors } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// React hooks'i içe aktar
import { useState } from 'react';

// Ana uygulama bileşeni
const App = () => {
  // Oyuncu ve bilgisayar skorları için state'ler oluştur
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);

  // Oyun sonucunu, bilgisayarın seçimini ve oyunun bitip bitmediğini saklamak için state'ler oluştur
  const [result, setResult] = useState('Seçim Yap');
  const [computerChoice, setComputerChoice] = useState('');
  const [gameOver, setGameOver] = useState(false);

  // Oyunun kullanacağı seçenekleri bir dizi olarak tanımla
  const weapons = ['rock', 'paper', 'scissors'];

  // Bilgisayarın rastgele seçim yapmasını sağlayan fonksiyon. Bu rastgele sayıyı, silah dizisinin indeksi olarak kullanarak rastgele bir silah seçer
  const computerPlay = () => {
    const randomIndex = Math.floor(Math.random() * weapons.length);
    const randomWeapon = weapons[randomIndex];
    return randomWeapon;
  };

  // Oyun sonucunu güncelleyen fonksiyon
  const updateScore = (playerWeapon, computerWeapon) => {
    if (playerWeapon && !gameOver) {
      setComputerChoice(`Bilgisayarın seçimi: ${computerWeapon}`);
      if (
        (playerWeapon === 'rock' && computerWeapon === 'scissors') ||
        (playerWeapon === 'paper' && computerWeapon === 'rock') ||
        (playerWeapon === 'scissors' && computerWeapon === 'paper')
      ) {
        setResult('Kazandın!');
        setPlayerScore(prevScore => {
          const newScore = prevScore + 1;
          if (newScore === 5) {
            setResult('Kazandın! Oyunu sıfırlamak için tekrar oyna butonuna tıklayın.');
            setGameOver(true);
          }
          return newScore;
        });
      } else if (playerWeapon !== computerWeapon) {
        setResult('Bilgisayar kazandı!');
        setComputerScore(prevScore => {
          const newScore = prevScore + 1;
          if (newScore === 5) {
            setResult('Bilgisayar kazandı! Oyunu sıfırlamak için tekrar oyna butonuna tıklayın.');
            setGameOver(true);
          }
          return newScore;
        });
      } else {
        setResult('Berabere!');
      }
    } else {
      setComputerChoice('Oyun sona erdi');
      setResult('Seçim yapmadığın için oyunu kaybettin. Oyunu sıfırlamak için tekrar oyna butonuna tıklayın.');
    }
  };

  // Kullanıcının seçimini işleyen fonksiyon
  const selectWeapon = (weapon) => {
    if (!gameOver) {
      const playerWeapon = weapon;
      const computerWeapon = computerPlay();
      updateScore(playerWeapon, computerWeapon);
    }
  };

  // Oyunu sıfırlayan fonksiyon
  const resetGame = () => {
    setPlayerScore(0);
    setComputerScore(0);
    setResult('Seçim Yap');
    setComputerChoice('');
    setGameOver(false);
  };

  // JSX dönüş
  return (
    <div className="container">
      <h1>Taş Kağıt Makas</h1>
      <div className="scoreboard">
        <div className="player-score">Sen: {playerScore}</div>
        <div className="computer-score">Bilgisayar: {computerScore}</div>
      </div>
      <div className="choices">
        {/* Her seçenek için bir FontAwesome ikonu */}
        <div className={`choice ${gameOver ? 'disabled' : ''}`} onClick={() => selectWeapon('rock')}>
          <FontAwesomeIcon icon={faHandRock} />
        </div>
        <div className={`choice ${gameOver ? 'disabled' : ''}`} onClick={() => selectWeapon('paper')}>
          <FontAwesomeIcon icon={faHandPaper} />
        </div>
        <div className={`choice ${gameOver ? 'disabled' : ''}`} onClick={() => selectWeapon('scissors')}>
          <FontAwesomeIcon icon={faHandScissors} />
        </div>
      </div>
      <div className="result">{result}</div>
      <div className="computer-choice">{computerChoice}</div>
      <button className="play-again" onClick={resetGame}>Tekrar Oyna</button>
    </div>
  );
};


export default App;
