import React from 'react'

const DashboardHeader = () => {
  return (
    <div className='flex item-center justify-between'>
      <div>
        <h1 className='text-2xl font-bold text-gray-900 dark:text-gray-100'>대시보드</h1>
        <p className='mt-1 text-gray-500 dark:text-gray-400'>실시간 농장 상태를 모니터링하고 관리하세요</p>
      </div>
      <select
        id='plant-select'
        className='
              mt-1 block w-full sm:w-64
              pl-3 pr-10 py-2 text-base
              border border-gray-300 dark:border-gray-600
              bg-white dark:bg-gray-700
              placeholder-gray-400 dark:placeholder-gray-500
              rounded-lg shadow-sm
              focus:outline-none
              focus:ring-1 focus:ring-gray-500 dark:focus:ring-gray-400
              focus:border-gray-500 dark:focus:border-gray-400
             text-gray-900 dark:text-gray-100
             hover:bg-gray-50 dark:hover:bg-gray-600
              transition-colors
        '>
          <option>
            asas
          </option>

        </select>
      
    </div>
  )
}

export default DashboardHeader
