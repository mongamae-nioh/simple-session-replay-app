"use client"

import type React from 'react'
import { useState } from 'react'
import rrwebPlayer from 'rrweb-player'
import SearchForm from './components/SearchForm'
import SearchResults from './components/SearchResults'

export default function Home() {
  const [userId, setUserId] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [message, setMessage] = useState('')

  interface Event {
    eventId: string
    userId: string
    date: string
    timestamp: { _seconds: number; _nanoseconds: number }
  }

  const [events, setEvents] = useState<Event[]>([])

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage('Searching...')
    setEvents([])

    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, startDate, endDate }),
      })

      const result = await response.json()
      if (result.length === 0) {
        setMessage('Not found')
      } else {
        setMessage('')
        setEvents(result)
      }
    } catch (error) {
      setMessage('Error!')
      console.error('Error:', error)
    }
  }

  const handleReplay = async (eventId: string, userId: string, date: string) => {
    try {
      const response = await fetch(`/api/replay?eventId=${eventId}&userId=${userId}&date=${date}`)
      const data = await response.json()

      new rrwebPlayer({
        target: document.getElementById('player') as HTMLElement,
        props: {
          events: data,
          width: 1280,
          height: 768,
          autoPlay: true,
        },
      })
    } catch (error) {
      console.error('Error fetching replay data:', error)
    }
  }

  return (
    <div className="container mx-auto py-5 font-sans">
      <h1 className="text-3xl font-bold mb-4 text-center">Session Replay Search</h1>
      <SearchForm
        userId={userId}
        startDate={startDate}
        endDate={endDate}
        setUserId={setUserId}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        handleSearch={handleSearch}
      />
      {message && <p className="text-blue-500">{message}</p>}
      <SearchResults events={events} handleReplay={handleReplay} />
      <div className="flex justify-center mt-4">
        {/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
        <div id="player" className="mx-auto"></div>
      </div>
    </div>
  )
}