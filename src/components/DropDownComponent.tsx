import React, { useState } from 'react'
import '../styles/DropDownComponent.css'

type Props = {
	option: string
}

const DropDownComponent = ({option}: Props) => {
	const [ selectedOption, setSelectedOption ] = useState(option)
	const options = ['Monthly', 'Yearly']

	function handleOptionSelection(e: React.ChangeEvent<HTMLSelectElement>) {
		setSelectedOption(e.target.value)
	}

  return (
		<div className='drop-down-container'>
			<select className='drop-down-select' id="dropdown" value={selectedOption} onChange={handleOptionSelection}>
        <option value="">-- Select --</option>
				{options.map((value, index) => (
					<option key={index} value={value}>{value}</option>
				))}
      </select>
		</div>
  )
}

export default DropDownComponent;
