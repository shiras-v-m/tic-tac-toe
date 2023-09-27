import { useState } from 'react';
import './App.css';
import Board from './Components/Board/Board';

function App() {
  // Creating a reset state, which indicates whether
  // the game should be reset or not
  const [reset, setReset] = useState(false);

  // Creating a winner state, which indicates
  // the current winner
  const [winner, setWinner] = useState('');

  // Sets the reset property to true
  // which starts the chain
  // reaction of resetting the board
  const resetBoard = () => {
    setReset(true);
  }
  return (
    <div className='AppContainer'>

      {/* <div className={`result ${winner !== '' ? '' : 'shrink'}`}>
        <div className='winnerText'>{winner}</div> */}
        {/* Button used to reset the board */}
        {/* <button onClick={() => resetBoard()}>
          Reset Board
        </button>
      </div> */}


      <Board reset={reset} setReset={setReset} winner={winner}
        setWinner={setWinner} />
    </div>
  );
}

export default App;
