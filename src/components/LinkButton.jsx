function LinkButton({ title, url }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="block w-full rounded-full border border-gray-300 bg-white px-4 py-3 text-center font-medium text-gray-900 transition hover:bg-gray-900 hover:text-white"
    >
      {title}
    </a>
  )
}

export default LinkButton