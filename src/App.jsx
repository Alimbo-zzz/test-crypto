import React, {useState, useEffect} from 'react';
import swap_svg from '@/assets/swap.svg';
import SelectInput from '@/components/SelectInput';

function App(props) {
	const [data, setData] = useState([]);
	const [minimal, setMinimal] = useState("");
	const [estimated, setEstimated] = useState("");
	const [activeItem1, setActiveItem1] = useState(null);
	const [activeItem2, setActiveItem2] = useState(null);


	useEffect(()=>{
		if(!activeItem1 || !activeItem2) return;
		fetchFunc();
	}, [activeItem1, activeItem2])


	async function fetchFunc() {
		let ops = {
			headers: {
				"x-changenow-api-key": "c9155859d90d239f909d2906233816b26cd8cf5ede44702d422667672b58b0cd"
			}
		}
		const res1 = await fetch(`https://api.changenow.io/v2/exchange/min-amount?fromCurrency=${activeItem1.ticker}&toCurrency=${activeItem2.ticker}&fromNetwork=${activeItem1.network}&toNetwork=${activeItem2.network}&flow=standard`, ops);
		const res1JSON = await res1.json();
		let min = res1JSON?.minAmount;
		if(!min) return setMinimal(res1JSON?.message || res1JSON.error);
		setMinimal(min);
		const res2 = await fetch(`https://api.changenow.io/v2/exchange/estimated-amount?fromCurrency=${activeItem1.ticker}&toCurrency=${activeItem2.ticker}&fromAmount=${min}&fromNetwork=${activeItem1.network}&toNetwork=${activeItem2.network}&flow=fixed-rate`, ops);
		const res2JSON = await res2.json();
		let amout = res2JSON?.toAmount;
		if(!amout) return setEstimated(res2JSON?.message || res2JSON.error);
		setEstimated(amout);
	}

	async function getData(){
		try {
			const res = await fetch("https://api.changenow.io/v2/exchange/currencies?active=&flow=standard&buy=&sell=");
			const resParse = await res.json();
			setData(resParse);
			setActiveItem1(resParse[0]);
			setActiveItem2(resParse[4]);
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(()=>{
		getData();
	}, [])



	return (<>
		<div className='page container'>
			<div className='page__head'>
				<h1 className='title'>Crypto Exchange</h1>
				<h4 className='subtitle'>Exchange fast and easy</h4>
			</div>

			<div className='page__body'>
				<SelectInput data={data} setActiveItem={setActiveItem1} activeItem={activeItem1} value={minimal} />
				<img src={swap_svg} data-img='swap' />
				<SelectInput data={data} setActiveItem={setActiveItem2} activeItem={activeItem2} value={estimated} />
			</div>

			<div className='page__foot'>
				<p className="placeholder">Your Ethereum address</p>
				<input autoComplete='new-password' type="text" className='inp' />
				<button className='btn'>Exchange</button>
			</div>
		</div>
	</>);
}

export default App;