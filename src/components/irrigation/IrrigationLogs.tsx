import React from 'react'
import { IoIosTimer } from "react-icons/io";
import type { IrrigationLog } from '../../screen/Irrigation';
import { CiCircleAlert } from "react-icons/ci";

interface IrrigationLogsProps {
  logs: IrrigationLog[]
}


const IrrigationLogs:React.FC<IrrigationLogsProps> = ({ logs }) => {

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm space-y-4">
      <div className="flex items-center text-lg font-semibold">
        <IoIosTimer className="mr-2 text-2xl text-red-500" />
        <span className='text-gray-700 dark:text-gray-200'>최근 관수 기록</span>
      </div>

      {logs.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400 space-y-2">
          <CiCircleAlert className="text-4xl" />
          <span className="text-lg">최근 관수 내역이 없습니다.</span>
        </div>
      ) : (<ul className="space-y-2">
        {logs.map((log) => (
          <li
            key={log.id}
            className="flex justify-between items-center bg-gray-100 dark:bg-gray-700 rounded-md p-4"
          >
            <div>
              <div className="font-medium text-gray-900 dark:text-gray-100">
                {log.plant.name}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {new Date(log.timestamp).toLocaleString('ko-KR')}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-gray-900 dark:text-gray-100">
                {log.amountMl}ml
              </span>
              <span
                className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                  log.method === 'auto'
                    ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100'
                    : 'bg-black text-white'
                }`}
              >
                {log.method === 'auto' ? '자동' : '수동'}
              </span>
            </div>
          </li>
        ))}
      </ul>)}
      
    </div>
  )
}

export default IrrigationLogs
