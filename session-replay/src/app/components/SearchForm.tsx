import type React from 'react'

interface SearchFormProps {
  userId: string
  startDate: string
  endDate: string
  setUserId: (value: string) => void
  setStartDate: (value: string) => void
  setEndDate: (value: string) => void
  handleSearch: (e: React.FormEvent) => void
}

const SearchForm: React.FC<SearchFormProps> = ({
  userId,
  startDate,
  endDate,
  setUserId,
  setStartDate,
  setEndDate,
  handleSearch,
}) => {
  return (
    <form onSubmit={handleSearch} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="mb-4">
        <label htmlFor="userId" className="block text-gray-700 text-sm font-bold mb-2">User ID</label>
        <input
          type="text"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="userId"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="startDate" className="block text-gray-700 text-sm font-bold mb-2">Start time</label>
        <input
          type="datetime-local"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="startDate"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="endDate" className="block text-gray-700 text-sm font-bold mb-2">End time</label>
        <input
          type="datetime-local"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="endDate"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Search</button>
    </form>
  )
}

export default SearchForm