import React, { useState, useEffect } from 'react';
import arrow_svg from '@/assets/arrow-down.svg';
import cross_svg from '@/assets/cross.svg';


function SelectInput ({onAction, value, data, activeItem, setActiveItem}) {
	const [listOpen, setListOpen] = useState(false);

	const closeList = () => setListOpen(false);
	const toggle = (e) => e.stopPropagation() | setListOpen(prev => !prev);

	useEffect(()=>{
		if(typeof onAction === 'function') onAction(activeItem);
	}, [activeItem])

	function setSelect(itemData){
		setActiveItem(itemData);
	}

	useEffect(()=>{
		document.addEventListener('click', closeList)
		return () => document.removeEventListener('click', closeList)
	}, [])
	
	return (<>
		<div className='select-inp' onClick={toggle}>
			<input type="text" readOnly value={value}/>
			<div className='select-inp__preview'>
				<img src={activeItem?.image}  data-img='logo'/>
				<p>{activeItem?.ticker}</p>
				<img src={listOpen ? cross_svg : arrow_svg} data-img='arrow' />
			</div>
			<ul data-open={listOpen}>
				{data.map((el, i) => 
					<li key={i} onClick={() => setSelect(el)}>
						<img src={el.image} data-img='logo' />
						<h4>{el.ticker}</h4>
						<p>{el.name}</p>
					</li>
				)}
			</ul>
		</div>
	</>);
}

export default SelectInput;