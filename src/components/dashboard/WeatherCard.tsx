import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'

type WeatherInfo = {
  temp: number
  condition: string
  iconUrl: string
  high: number
  low: number
  locationName: string
}

const WeatherCard = () => {
  const mapRef = useRef<HTMLDivElement>(null)
  const [weather, setWeather] = useState<WeatherInfo | null>(null)
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null)


  useEffect(() => {
    if (!navigator.geolocation) return
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        })
        console.log(pos.coords);
      },
      (err) => {
        console.error('위치 권한 또는 오류:', err)
      },
    )
  }, []);


  // 2) 날씨 API 호출 (예: OpenWeatherMap)
  useEffect(() => {
    if (!coords) return

    const fetchWeather = async () => {
      try {
        const apiKey = import.meta.env.VITE_OPEN_WEATHER_API_KEY
        const { data } = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
          params: {
            lat: coords.lat,
            lon: coords.lng,
            units: 'metric',
            appid: apiKey,
            lang: 'kr'
          },
        })

        const weatherMain = data.weather[0]
        setWeather({
          temp: Math.round(data.main.temp),
          condition: weatherMain.main.toLowerCase(),
          iconUrl: `https://openweathermap.org/img/wn/${weatherMain.icon}@2x.png`,
          high: Math.round(data.main.temp_max),
          low: Math.round(data.main.temp_min),
          locationName: data.name,
        })
      } catch (error) {
        console.error('날씨 정보 로드 실패:', error)
      }
    }

    fetchWeather()
  }, [coords])

  useEffect(() => {
    if (!coords || !mapRef.current) return

    // 이미 로드됐으면 바로 init
    if ((window as any).kakao && (window as any).kakao.maps) {
      const { kakao } = window as any
      const map = new kakao.maps.Map(mapRef.current, {
        center: new kakao.maps.LatLng(coords.lat, coords.lng),
        level: 4,
      })
      new kakao.maps.Marker({
        position: map.getCenter(),
        map,
      })
      return
    }

    // 스크립트 동적 로드
    const script = document.createElement('script')
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_API_KEY}&autoload=false`
    script.async = true
    document.head.appendChild(script)
    script.onload = () => {
      const { kakao } = window as any
      kakao.maps.load(() => {
        const map = new kakao.maps.Map(mapRef.current, {
          center: new kakao.maps.LatLng(coords.lat, coords.lng),
          level: 4,
        })
        new kakao.maps.Marker({
          position: map.getCenter(),
          map,
        })
      })
    }
    return () => {
      document.head.removeChild(script)
    }
  }, [coords])


  return (
    <div className='flex flex-col md:flex-row bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-6 md:space-y-0 md:space-x-6'>
      {/* — 좌측: 날씨 정보 */}
      <div className='flex-1 flex flex-col justify-between'>
        {weather ? (
          <>
            <div>
              <div className='flex items-center'>
                <img src={weather.iconUrl} alt={weather.condition} className='w-16 h-16 mr-4' />
                <div>
                  <div className='text-4xl font-bold text-gray-900 dark:text-gray-100'>
                    {weather.temp}°C
                  </div>
                  <div className='capitalize text-lg text-gray-600 dark:text-gray-300'>
                    {weather.condition}
                  </div>
                  <div className='mt-2 text-sm text-gray-500 dark:text-gray-400'>
                    {weather.locationName}
                  </div>
                </div>
              </div>
            </div>
            <div className='mt-4 text-sm text-gray-700 dark:text-gray-300'>
              H: <span className="font-medium">{weather.high}°C</span> &nbsp; L:{' '}
              <span className="font-medium">{weather.low}°C</span>
            </div>
          </>
        ) : (
          <div className="text-gray-500 dark:text-gray-400">날씨 정보를 불러오는 중...</div>
        )}
      </div>
      <div className='flex-1 h-128 md:h-auto rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700'  ref={mapRef} >
        {!coords && (
          <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
            위치 정보를 가져오는 중...
          </div>
        )}
      </div>
    </div>
  )
}

export default WeatherCard
