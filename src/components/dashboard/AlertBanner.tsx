import React from 'react'
import { GoAlertFill } from "react-icons/go";

const AlertBanner = () => {
  return (
    <div role='alert' className='
        flex
        px-4 py-4
        bg-orange-200 dark:bg-orange-900
        border border-orange-500 dark:border-orange-700
        text-red-500 dark:text-orange-200
        rounded-lg
        mb-4
    '>
    <GoAlertFill className="w-5 h-5 flex-shrink-0 mr-2 dark:text-orange-200"/>
    <div className='flex flex-col gap-3'>
      <p className='text-sm text-red-600 font-bold dark:text-orange-100'>경고 알림</p>
      <p className='text-sm text-orange-700 dark:text-orange-300'>
        <strong>1</strong>개의 센서 임계값 초과 경고가 발생했습니다!
      </p>
    </div>

    </div>
  )
}

export default AlertBanner
