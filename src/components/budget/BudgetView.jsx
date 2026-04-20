import { useState } from 'react'
import useTripStore from '../../store/useTripStore'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import { Plus, Trash2 } from 'lucide-react'
import { formatDate } from '../../utils/formatters'

export default function BudgetView() {
  const { budget, expenses, addExpense, removeExpense, getTotalSpentJPY, getSpentByCategory, trip, displayCurrency } = useTripStore()
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ title: '', amountJPY: '', category: 'food', date: '', notes: '' })

  const totalSpentJPY = getTotalSpentJPY()
  const spentByCategory = getSpentByCategory()
  const totalBudgetJPY = budget.totalBudgetJPY
  const spentPct = Math.min(100, Math.round((totalSpentJPY / totalBudgetJPY) * 100))

  const fmt = (jpy) => displayCurrency === 'USD' ? `$${Math.round(jpy / trip.exchangeRate)}` : `¥${jpy.toLocaleString()}`

  const chartData = budget.categories.map(cat => ({
    name: cat.label,
    value: spentByCategory[cat.id] || 0,
    planned: cat.plannedJPY,
    color: cat.color,
  })).filter(d => d.value > 0)

  const handleAdd = (e) => {
    e.preventDefault()
    if (!form.title || !form.amountJPY) return
    addExpense({ ...form, amountJPY: Number(form.amountJPY), date: form.date || new Date().toISOString().slice(0, 10) })
    setForm({ title: '', amountJPY: '', category: 'food', date: '', notes: '' })
    setShowForm(false)
  }

  return (
    <div className="max-w-4xl space-y-5">
      {/* Budget summary bar */}
      <div className="bg-stone-900 rounded-xl p-5 border border-stone-800">
        <div className="flex items-end justify-between mb-3">
          <div>
            <div className="text-3xl font-bold text-white">{fmt(totalSpentJPY)}</div>
            <div className="text-sm text-stone-400">spent of {fmt(totalBudgetJPY)} total budget</div>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold text-emerald-400">{fmt(totalBudgetJPY - totalSpentJPY)}</div>
            <div className="text-sm text-stone-400">remaining ({100 - spentPct}%)</div>
          </div>
        </div>
        <div className="w-full bg-stone-800 rounded-full h-3">
          <div className="bg-gradient-to-r from-rose-500 to-rose-400 h-3 rounded-full transition-all" style={{ width: `${spentPct}%` }} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Category breakdown */}
        <div className="bg-stone-900 rounded-xl p-5 border border-stone-800">
          <h3 className="text-xs font-semibold text-stone-500 uppercase tracking-widest mb-4">By Category</h3>
          <div className="space-y-3">
            {budget.categories.map(cat => {
              const spent = spentByCategory[cat.id] || 0
              const pct = Math.min(100, Math.round((spent / cat.plannedJPY) * 100))
              return (
                <div key={cat.id}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-stone-300">{cat.label}</span>
                    <span className="text-stone-400">{fmt(spent)} / {fmt(cat.plannedJPY)}</span>
                  </div>
                  <div className="w-full bg-stone-800 rounded-full h-1.5">
                    <div className="h-1.5 rounded-full transition-all" style={{ width: `${pct}%`, background: cat.color }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Pie chart */}
        <div className="bg-stone-900 rounded-xl p-5 border border-stone-800 flex flex-col">
          <h3 className="text-xs font-semibold text-stone-500 uppercase tracking-widest mb-4">Planned Budget Split</h3>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={budget.categories}
                dataKey="plannedJPY"
                nameKey="label"
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
              >
                {budget.categories.map(cat => (
                  <Cell key={cat.id} fill={cat.color} />
                ))}
              </Pie>
              <Tooltip formatter={(v) => fmt(v)} contentStyle={{ background: '#1c1917', border: '1px solid #44403c', borderRadius: 8 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-1 mt-2">
            {budget.categories.map(cat => (
              <div key={cat.id} className="flex items-center gap-1.5 text-xs text-stone-400">
                <div className="w-2 h-2 rounded-full shrink-0" style={{ background: cat.color }} />
                {cat.label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Expense log */}
      <div className="bg-stone-900 rounded-xl p-5 border border-stone-800">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs font-semibold text-stone-500 uppercase tracking-widest">Expense Log</h3>
          <button
            onClick={() => setShowForm(s => !s)}
            className="flex items-center gap-1 text-xs bg-rose-600 hover:bg-rose-700 text-white px-3 py-1.5 rounded-lg transition-colors"
          >
            <Plus size={12} />
            Add Expense
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleAdd} className="bg-stone-800 rounded-lg p-4 mb-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input className="bg-stone-700 rounded px-3 py-2 text-sm text-white placeholder-stone-500 sm:col-span-2" placeholder="Expense title" value={form.title} onChange={e => setForm(s => ({ ...s, title: e.target.value }))} required />
            <input className="bg-stone-700 rounded px-3 py-2 text-sm text-white placeholder-stone-500" placeholder="Amount in ¥ JPY" type="number" value={form.amountJPY} onChange={e => setForm(s => ({ ...s, amountJPY: e.target.value }))} required />
            <select className="bg-stone-700 rounded px-3 py-2 text-sm text-white" value={form.category} onChange={e => setForm(s => ({ ...s, category: e.target.value }))}>
              {budget.categories.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
            </select>
            <input className="bg-stone-700 rounded px-3 py-2 text-sm text-white" type="date" value={form.date} onChange={e => setForm(s => ({ ...s, date: e.target.value }))} />
            <input className="bg-stone-700 rounded px-3 py-2 text-sm text-white placeholder-stone-500" placeholder="Notes (optional)" value={form.notes} onChange={e => setForm(s => ({ ...s, notes: e.target.value }))} />
            <div className="sm:col-span-2 flex gap-2">
              <button type="submit" className="bg-rose-600 hover:bg-rose-700 text-white text-sm px-4 py-2 rounded-lg transition-colors">Add</button>
              <button type="button" onClick={() => setShowForm(false)} className="text-stone-400 hover:text-white text-sm px-4 py-2 rounded-lg transition-colors">Cancel</button>
            </div>
          </form>
        )}

        {expenses.length === 0 ? (
          <div className="text-center py-8 text-stone-500 text-sm">No expenses logged yet. Add your first expense above.</div>
        ) : (
          <div className="space-y-2">
            {[...expenses].reverse().map(exp => {
              const cat = budget.categories.find(c => c.id === exp.category)
              return (
                <div key={exp.id} className="flex items-center justify-between py-2 border-b border-stone-800 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: cat?.color || '#6b7280' }} />
                    <div>
                      <div className="text-sm text-white">{exp.title}</div>
                      <div className="text-xs text-stone-500">{exp.date} • {cat?.label}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-white">{fmt(exp.amountJPY)}</span>
                    <button onClick={() => removeExpense(exp.id)} className="text-stone-600 hover:text-rose-400 transition-colors">
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
