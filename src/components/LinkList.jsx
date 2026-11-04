import LinkItem from './LinkItem'

function LinkList({ links, onUpdate, onDelete, onMove }) {
  if (links.length === 0) {
    return <p className="text-sm text-gray-500">No links yet. Add one above.</p>
  }

  return (
    <ul className="space-y-2">
      {links.map((link, index) => (
        <LinkItem
          key={link.id}
          link={link}
          isFirst={index === 0}
          isLast={index === links.length - 1}
          onUpdate={onUpdate}
          onDelete={onDelete}
          onMoveUp={() => onMove(index, -1)}
          onMoveDown={() => onMove(index, 1)}
        />
      ))}
    </ul>
  )
}

export default LinkList
