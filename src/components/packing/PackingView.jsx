import useTripStore from '../../store/useTripStore'

export default function PackingView() {
  const { packingItems, togglePacking } = useTripStore()

  const total = packingItems.length
  const checked = packingItems.filter(i => i.checked).length
  const pct = Math.round((checked / total) * 100)

  const byCategory = packingItems.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = []
    acc[item.category].push(item)
    return acc
  }, {})

  return (
    <div className="max-w-3xl space-y-5">
      {/* Progress */}
      <div className="bg-stone-900 rounded-xl p-5 border border-stone-800">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-white">Packing Progress</h3>
          <span className="text-sm text-stone-400">{checked} / {total} packed</span>
        </div>
        <div className="w-full bg-stone-800 rounded-full h-2.5">
          <div
            className="h-2.5 rounded-full transition-all"
            style={{ width: `${pct}%`, background: pct === 100 ? '#22c55e' : '#f43f5e' }}
          />
        </div>
        {pct === 100 && (
          <div className="text-center text-emerald-400 font-semibold text-sm mt-3">You're all packed! 🎉</div>
        )}
      </div>

      {/* Categories */}
      {Object.entries(byCategory).map(([category, items]) => {
        const catChecked = items.filter(i => i.checked).length
        return (
          <div key={category} className="bg-stone-900 rounded-xl p-5 border border-stone-800">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-white">{category}</h3>
              <span className="text-xs text-stone-500">{catChecked}/{items.length}</span>
            </div>
            <div className="space-y-2">
              {items.map(item => (
                <label
                  key={item.id}
                  className="flex items-start gap-3 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => togglePacking(item.id)}
                    className="mt-0.5 accent-rose-500 shrink-0"
                  />
                  <div className="flex-1 flex items-start gap-2">
                    <span className={`text-sm transition-colors ${item.checked ? 'line-through text-stone-600' : 'text-stone-300'}`}>
                      {item.item}
                    </span>
                    {item.essential && !item.checked && (
                      <span className="text-xs bg-rose-500/20 text-rose-400 border border-rose-500/30 px-1.5 py-0.5 rounded shrink-0">
                        essential
                      </span>
                    )}
                  </div>
                </label>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
