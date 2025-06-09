import React from 'react'

const WeatherCard = () => {
  return (
    <div className='p-4 bg-white rounded-lg shadow'>
      <div className='flex items-center justify-between'>
        <div>
          <div className='text-4xl font-bold'>25.5°C</div>
          <div className='capitalize'>Rainy</div>
        </div>
        <img src="" alt="" className='w-16 h-16'/>
      </div>
      <div className='mt-2 text-sm text-gray-500'></div>
        H: 22°C  L: 25°C
    </div>
  )
}

export default WeatherCard
