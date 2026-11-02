import { Link } from 'react-router-dom'
import PhonePreview from '../components/PhonePreview'
import { defaultProfile, defaultLinks } from '../utils/defaultData'

function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-10 pt-6 lg:flex-row lg:justify-between lg:pt-16">
        <div className="max-w-md text-center lg:text-left">
          <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-700">
            Demo profile
          </span>
          <h1 className="mt-4 text-4xl font-bold text-gray-900">
            One link for everything you share
          </h1>
          <p className="mt-3 text-gray-600">
            This is a sample page. Register to replace it with your own name, bio and links, and
            see how many people click them.
          </p>
          <Link
            to="/auth"
            className="mt-6 inline-block rounded-lg bg-indigo-600 px-6 py-3 font-medium text-white hover:bg-indigo-700"
          >
            Register or sign in
          </Link>
        </div>

        <PhonePreview profile={defaultProfile} links={defaultLinks} />
      </div>
    </div>
  )
}

export default LandingPage
