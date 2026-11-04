import { useState } from 'react'
import LinkForm from './LinkForm'

const smallButton =
  'rounded-md border border-gray-300 px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent'

function LinkItem({ link, isFirst, isLast, onUpdate, onDelete, onMoveUp, onMoveDown }) {
  const [isEditing, setIsEditing] = useState(false)

  if (isEditing) {
    return (
      <li className="rounded-lg border border-indigo-200 bg-indigo-50 p-3">
        <LinkForm
          initialTitle={link.title}
          initialUrl={link.url}
          submitLabel="Save"
          onSubmit={async (changes) => {
            // If the server says no, this throws and the form stays open with the error
            await onUpdate(link.id, changes)
            setIsEditing(false)
          }}
          onCancel={() => setIsEditing(false)}
        />
      </li>
    )
  }

  return (
    <li className="flex items-center gap-2 rounded-lg border border-gray-200 p-3">
      <div className="min-w-0 flex-1">
        <p className="truncate font-medium text-gray-900">{link.title}</p>
        <p className="truncate text-sm text-gray-500">{link.url}</p>
      </div>

      <div className="flex shrink-0 flex-wrap justify-end gap-1">
        <button type="button" aria-label="Move up" disabled={isFirst} onClick={onMoveUp} className={smallButton}>
          ↑
        </button>
        <button type="button" aria-label="Move down" disabled={isLast} onClick={onMoveDown} className={smallButton}>
          ↓
        </button>
        <button type="button" onClick={() => setIsEditing(true)} className={smallButton}>
          Edit
        </button>
        <button
          type="button"
          onClick={() => onDelete(link.id)}
          className={`${smallButton} text-red-600`}
        >
          Delete
        </button>
      </div>
    </li>
  )
}

export default LinkItem
