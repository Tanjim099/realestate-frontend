import React from 'react'
import loader from '../assets/loder.png';

function Spinner() {
    return (
        <div className='flex fixed items-center justify-center w-full min-h-screen'>
            <div className="custom-loader"></div>
            <img className='absolute' src={loader} alt='loader' />
        </div>
    )
}

export default Spinner