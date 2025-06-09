import React from 'react'
import DashboardHeader from '../components/dashboard/DashboardHeader'
import AlertBanner from '../components/dashboard/AlertBanner'
import WeatherCard from '../components/dashboard/WeatherCard'
import SensorCard from '../components/dashboard/SensorCard'
import SystemStatus from '../components/dashboard/SystemStatus'
import TodaySummary from '../components/dashboard/TodaySummary'

const Dashboard = () => {

  return (
    <div className='p-6 space-y-6'>
      <DashboardHeader />


      <hr className='h-0.25 border-0 bg-gray-200' />

      {true! && <AlertBanner /> }

      <div className='grid grid-cols-1 lg:grid-cols-1 gap-6'>
        <WeatherCard />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6' >
        <SensorCard />
        <SensorCard />
        <SensorCard />
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        <SystemStatus />
        <TodaySummary />
      </div>
    </div>
  )
}

export default Dashboard
