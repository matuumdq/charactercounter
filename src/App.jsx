import { useEffect, useState } from 'react'

const WORDS = [
	'abacus',
	'abamps',
	'abased',
	'babies',
	'eagles',
	'fabric',
	'hacker',
	'labial',
	'pacers',
	'warriors',
	'cavaliers',
	'celtics',
	'rockets',
	'grizzlies'
]

function App() {
	const [word, setWord ] = useState( () => WORDS[Math.trunc(Math.random()*WORDS.length) || 0])
	const [typed, setTyped] = useState(0)
	const [buffer, setBuffer] = useState('')
	const [time, setTime] = useState(0)

	const handleSubmit = (e) => {
		e.preventDefault()

		if(buffer === word ) {
			setWord(WORDS[Math.trunc(Math.random()*WORDS.length) || 0])
			setTyped((typed) => typed + word.length)
		}
		setBuffer('')
	}
	
	useEffect(()=> {
		if (time !== 0) {
			const timeout = setTimeout(() => setTime(time-1), 1000);
			return () => clearTimeout(timeout)
		}
	}, [time])

  return (
    <div className=' bg-[#222831] w-screen h-screen flex flex-col gap-10 text-center text-[#95E1D3] justify-center'>
		
		{Boolean(!time) ? (
			<h1 className='text-3xl mb-3'>Welcome to <span className='font-bold'>Character Counter</span></h1>
		) : (
			<h2 className='text-4xl'> {word}</h2>
		)}
       	<h3 className='text-lg font-bold '>Characters Typed: {typed}</h3> 
       	
		{time ? (
			<form 
				className='flex flex-col mx-auto gap-5'
				onSubmit={handleSubmit}
			>
				<h2>Remaining Time: {time}</h2> 
				<div className='flex flex-col justify-center'>
					<input 
						className='bg-[#00ADB5] rounded-md m-4 text-lg p-2 text-[#242323]'
						type="text"
						autoFocus
						value={buffer}
						onChange={(e) => setBuffer(e.target.value)}
					/>
					<button 
						type='submit'
						className='font-bold uppercase bg-[#00ADB5] rounded-lg m-3 py-2 text-[#393E46] hover:scale-110 duration-100'
						>
							Submit
					</button>
				</div>
				
		</form> 
		) : (
			<button 
				className='bg-[#00ADB5] uppercase font-bold ml-auto mr-auto px-10 py-2 rounded-lg text-[20px] text-[#393E46] hover:scale-110 hover:ease-in duration-200'
				onClick={() => {
					setTime(20)
					setTyped(0)
					setWord(WORDS[Math.round(Math.random()*WORDS.length) || 0])
					setBuffer('')
				}}
			>
				Play
			</button>
		)
		}
    </div>
  )
}

export default App