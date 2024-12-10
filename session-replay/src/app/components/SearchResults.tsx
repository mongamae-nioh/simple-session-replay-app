import type React from 'react'

interface Event {
  eventId: string
  userId: string
  date: string
  timestamp: { _seconds: number; _nanoseconds: number }
}

interface SearchResultsProps {
  events: Event[]
  handleReplay: (eventId: string, userId: string, date: string) => void
}

const SearchResults: React.FC<SearchResultsProps> = ({ events, handleReplay }) => {
  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      {events.map((event) => (
        <div key={event.eventId} className="flex justify-between items-center mb-4 p-4 border rounded">
          <div>
            <p className="text-gray-700"><strong>Event ID:</strong> {event.eventId}</p>
            <p className="text-gray-700"><strong>Timestamp:</strong> {new Date(event.timestamp._seconds * 1000).toLocaleString()}</p>
          </div>
          {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={() => handleReplay(event.eventId, event.userId, event.date)}>Replay</button>
        </div>
      ))}
    </div>
  )
}

export default SearchResults