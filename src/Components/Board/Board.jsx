import { useEffect, useState, useRef } from "react"
import './Board.css'
import clickSound from '../../assets/click.mp3'
import successSound from '../../assets/successSound.mp3'
import useSound from "use-sound";
function Board({ reset, setReset, winner, setWinner }) {

      const [play, { stop }] = useSound(
    clickSound,
    { volume: 0.5 }
     );

      const [successPlay, { successstop }] = useSound(
    successSound,
    { volume: 0.5 }
     );
    
    let time

    const [player1Count, setPlayer1Count] = useState(0)
    const [player2Count, setPlayer2Count] = useState(0)
    const [tieCount, setTieCount] = useState(0)
    const [tieFlag, setTieFlag] = useState(false)

    const [timeOut, setTimeOut] = useState(false)

    const [resultBoxTimeOut, setResultBoxTimeOut] = useState(false)

    const [WinDiagonalLeft, setWinDiagonalLeft] = useState(false)
    const [WinDiagonalRight, setWinDiagonalRight] = useState(false)


    // get data as props from the app.js 

    const [endGame, setEndGame] = useState(false)

    const [winRow, setWinRow] = useState('')

    const [winCol, setWinCol] = useState('')
    const [currentTurn, setCurrentTurn] = useState('')

    const [turn, setTurn] = useState(0)

    // current status of the board
    const [data, setData] = useState(['', '', '', '', '', '', '', '', ''])

    // creating reference for the board 
    const boardRef = useRef(null)

    // draw X or O when user click on a column
    const draw = (event, index) => {
        play()
        if (data[index] === '' && winner === '') {

            // current user letter
            const current = turn === 0 ? 'X' : 'O'
            setCurrentTurn(current)
            // value set to the array data[index]
            data[index] = current


            // set value to the board column X or O
            event.target.innerText = current

            setTurn(turn === 0 ? 1 : 0)

        }
    }

    // // reset the board when a user won


    // used to check wethear user win or not after each play
    useEffect(() => {
        const checkRow = () => {
            let ans = false
            for (let i = 0; i < 9; i += 3) { //each row is checked
                ans |= (data[i] === data[i + 1] && data[i] === data[i + 2] && data[i] != '')
                // | is bitwise OR operator 
                // ans=ans| valueReturnAfterCheck
                // this OR each ans with previous value. Initially ans=false
                if (ans) {
                    setWinRow(i)
                    console.log(winRow);
                    break
                }
            }
            return ans
        }

        const checkCol = () => {
            let ans = false
            for (let i = 0; i < 3; i++) {
                ans |= (data[i] === data[i + 3] && data[i] === data[i + 6] && data[i] != '')

                if (ans) {
                    setWinCol(i)
                    console.log(winCol);
                    break
                }
            }
            return ans
        }

        const checkDiagonal = () => {
            let ans = false
            if ((data[0] === data[4] && data[0] === data[8] && data[0] != '')) {
                setWinDiagonalLeft(true)
            }
            if ((data[2] === data[4] && data[2] === data[6] && data[2] != '')) {
                setWinDiagonalRight(true)
            }
            return ((data[0] === data[4] && data[0] === data[8] && data[0] != '') || (data[2] === data[4] && data[2] === data[6] && data[2] != ''))

        }

        const checkWin = () => {
            return (checkRow() || checkCol() || checkDiagonal())
        }

        const checkTie = () => {
            let count = 0
            data.forEach((cell) => {
                if (cell != '') {
                    count++
                }
            })
            count === 9 && setTieFlag(true)
            return count === 9
        }

        if (checkWin()) {
            setWinner(turn === 0 ? 'player2 wins!' : 'player1 wins!')

            setEndGame(true)

        }
        else {
            if (checkTie()) {
                setEndGame(true)
                setWinner("It's a Tie!")

            }
        }
    })
    useEffect(() => {
        setEndGame(false)
        // getting all the column of the board
        const cells = boardRef.current.children

        // clear each column in the board with empty
        for (let i = 0; i < 9; i++) {
            cells[i].innerText = ''
        }
        setWinRow('')
        setWinCol('')
        setTimeOut(false)
        setWinner('')
        setWinDiagonalLeft(false)
        setWinDiagonalRight(false)
        setData(['', '', '', '', '', '', '', '', ''])

        // // getting all the column of the board
        // const cells=boardRef.current.children

        // // clear each column in the board with empty
        // for(let i=0;i<9;i++){
        //     cells[i].innerText=''
        // }

        // Reset the turn
        setTurn(0)

        // reset winner
        setWinner('')

        setTimeOut(false)

        console.log("Board resetted");
        if (reset) {
            setReset(false)
        }

        setTieFlag(false)
    }, [reset])

    useEffect(() => {
        if (timeOut === true && endGame == true) {
            if (tieFlag) {
                setTieCount(tieCount + 1)
            }
            else if (turn === 0) {
                setPlayer2Count(player2Count + 1)
            }
            else if (turn === 1) {
                setPlayer1Count(player1Count + 1)
            }

        }
    }, [endGame])


    return (

        <div className="container">
            {/* <div className={` ${winRow===0 && "winRowTop"} `} ></div> */}
            <div ref={boardRef} className="board">
                {endGame && <div className={`line ${winRow === 0 && "lineTop"}`} ></div>}
                {endGame && <div className={`line ${winRow === 3 && "lineMiddle"}`} ></div>}
                {endGame && <div className={`line ${winRow === 6 && "lineBottom"}`} ></div>}
                {endGame && <div className={`line ${winCol === 0 && "lineColFirst"}`} ></div>}
                {endGame && <div className={`line ${winCol === 1 && "lineColSecond"}`} ></div>}
                {endGame && <div className={`line ${winCol === 2 && "lineColThird"}`} ></div>}
                {endGame && <div className={`line ${WinDiagonalLeft === true && "lineDiagonalLeft"}`} ></div>}
                {endGame && <div className={`line ${WinDiagonalRight === true && "lineDiagonalRight"}`} ></div>}
                <div  className={`input input-1 `} onClick={(e) => draw(e, 0)}></div>
                <div  className="input input-2" onClick={(e) => draw(e, 1)}></div>
                <div className="input input-3" onClick={(e) => draw(e, 2)}></div>
                <div className="input input-4" onClick={(e) => draw(e, 3)}></div>
                <div className="input input-5" onClick={(e) => draw(e, 4)}></div>
                <div className="input input-6" onClick={(e) => draw(e, 5)}></div>
                <div className="input input-7" onClick={(e) => draw(e, 6)}></div>
                <div className="input input-8" onClick={(e) => draw(e, 7)}></div>
                <div className="input input-9" onClick={(e) => draw(e, 8)}></div>


            </div>


            <div className="" style={{ width: '100%', display: "flex", marginTop: "20px", padding: '0 30px', justifyContent: 'space-between' }}>
                {/* <button onClick={setReset}>reply</button> */}
                <span style={{ color: 'white', fontSize: '16px', fontWeight: 'bold' }}> Player1 </span>
                <span style={{ color: 'white', fontSize: '16px', fontWeight: 'bold' }}> Player2 </span>
                <span style={{ color: 'white', fontSize: '16px', fontWeight: 'bold', marginRight: '25px' }}> Tie </span>
            </div>
            <div className="" style={{ width: '100%', display: "flex", marginTop: "20px", padding: '0 65px', justifyContent: 'space-between' }}>
                {/* <button onClick={setReset}>reply</button> */}
                <span style={{ color: 'white', fontWeight: 'bolder', fontSize: '18px' }}> {player1Count} </span>
                <span style={{ color: 'white', fontWeight: 'bolder', fontSize: '18px', paddingLeft: '10px' }}> {player2Count}</span>
                <span style={{ color: 'white', fontWeight: 'bolder', fontSize: '18px' }}> {tieCount} </span>
            </div>
            {
                endGame && (
                    time = setTimeout(() => {
                        setTimeOut(true)
                        console.log("timeout");
                        successPlay()
                        setEndGame(false)
                    }, 1000))
                  
            }

            {

            }

            {timeOut &&
                <div className=" result">
                    <div className='winnerText'>{winner}</div>
                    {/* Button used to reset the board */}
                    <button onMouseDown={ play()} style={{ marginLeft: '8px', padding: '8px 15px', fontSize: '16px' }} onClick={setReset}>
                        Reset Board
                    </button>
                    {clearTimeout(time)}
                </div>
            }

            <div className="copyright">
                <p className='copyrightTxt'>Made with ❤️<span className='myName'>Shiras VM</span> </p>
            </div>

        </div>


    )
}

export default Board;
