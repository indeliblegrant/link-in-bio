import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-gray-100 p-6 text-center">
      <h1 className="text-3xl font-bold text-gray-900">Page not found</h1>
      <p className="text-gray-600">That page doesn't exist.</p>
      <Link to="/admin" className="font-medium text-indigo-600 hover:underline">
        Go to the editor
      </Link>
    </div>
  )
}

export default NotFoundPage