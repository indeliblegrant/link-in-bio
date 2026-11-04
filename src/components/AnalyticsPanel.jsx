function formatTime(value) {
  return value ? new Date(value).toLocaleString() : '—'
}

function AnalyticsPanel({ analytics, onReset, onRefresh }) {
  const handleReset = () => {
    if (window.confirm('Reset all click data? This cannot be undone.')) {
      onReset()
    }
  }

  return (
    <section className="space-y-3 rounded-2xl bg-white p-6 shadow">
      <h2 className="text-xl font-semibold text-gray-900">Analytics</h2>

      {analytics.links.length === 0 ? (
        <p className="text-sm text-gray-500">No links to track yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-gray-500">
                <th className="py-2 font-medium">Link</th>
                <th className="py-2 text-right font-medium">Clicks</th>
                <th className="py-2 pl-3 text-right font-medium">Last click</th>
              </tr>
            </thead>
            <tbody>
              {analytics.links.map((link) => (
                <tr key={link.id} className="border-b border-gray-100">
                  <td className="break-words py-2 pr-2 text-gray-900">{link.title}</td>
                  <td className="py-2 text-right text-gray-900">{link.clicks}</td>
                  <td className="py-2 pl-3 text-right text-gray-500">
                    {formatTime(link.lastClickedAt)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="font-semibold text-gray-900">
                <td className="py-2">Total</td>
                <td className="py-2 text-right">{analytics.total}</td>
                <td />
              </tr>
            </tfoot>
          </table>
        </div>
      )}

      <div className="flex gap-2">
        <button
          type="button"
          onClick={onRefresh}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
        >
          Refresh
        </button>
        <button
          type="button"
          onClick={handleReset}
          disabled={analytics.total === 0}
          className="rounded-lg border border-red-300 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
        >
          Reset
        </button>
      </div>
    </section>
  )
}

export default AnalyticsPanel
