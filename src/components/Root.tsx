import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router';
import Navbar from './Navbar';
import { usePlantStore } from '../store/usePlantStore';
import { useAlertStore, type AlertLog } from '../store/useAlertStore';
import axios from 'axios';
import { useAuthStore } from '../store/useAuthStore';

const Root = () => {
  const {setPlants, selectedPlant} = usePlantStore();
  const {setAlerts} = useAlertStore();
  const {token} = useAuthStore();
  const { pathname } = useLocation()

  const fetchPlants = async () => {
      try {
        const res = await axios.get(
          `/api/plants`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            }
          }
        )

        setPlants(res.data);
      } catch (err) {
        console.error("작물 정보 조회 실패", err)
      }
  } 

  const fetchAlerts = async () => {
    if (selectedPlant === null) return;

    const url = `/api/alerts/plant/${selectedPlant.id}`

    try {
      const res = await axios.get<AlertLog[]>(
        url,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        }
      )   
      setAlerts(res.data)
    } catch (err) {
      console.error("센서 오류 조회 실패", err)
    }
  }

  useEffect(() => {
    fetchPlants()
    fetchAlerts()
  }, [pathname])

  return (
    <div className='flex min-h-screen bg-gray-50 dark:bg-gray-900'>
      <Navbar />
      <main className="flex-1 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Root;
