import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import tripData from '../data/trip.json'
import itineraryData from '../data/itinerary.json'
import bookingsData from '../data/bookings.json'
import budgetData from '../data/budget.json'
import animeData from '../data/anime.json'
import linksData from '../data/links.json'
import packingData from '../data/packing.json'

const useTripStore = create(
  persist(
    (set, get) => ({
      // Static data from JSON
      trip: tripData,
      days: itineraryData.days,
      bookings: bookingsData,
      budget: budgetData,
      animeShows: animeData.shows,
      links: linksData,

      // Persisted mutable state
      expenses: [],
      packingItems: packingData,
      displayCurrency: 'USD',
      nextActions: tripData.nextActions,
      selectedDayId: null,

      // Currency toggle
      toggleCurrency: () => set(s => ({
        displayCurrency: s.displayCurrency === 'USD' ? 'JPY' : 'USD'
      })),

      formatAmount: (amountJPY) => {
        const { displayCurrency, trip } = get()
        if (displayCurrency === 'JPY') return `¥${amountJPY.toLocaleString()}`
        const usd = amountJPY / trip.exchangeRate
        return `$${usd.toFixed(0)}`
      },

      // Expenses CRUD
      addExpense: (expense) => set(s => ({
        expenses: [...s.expenses, { ...expense, id: `exp-${Date.now()}`, createdAt: new Date().toISOString() }]
      })),
      removeExpense: (id) => set(s => ({
        expenses: s.expenses.filter(e => e.id !== id)
      })),

      // Packing list
      togglePacking: (id) => set(s => ({
        packingItems: s.packingItems.map(item =>
          item.id === id ? { ...item, checked: !item.checked } : item
        )
      })),

      // Next actions
      toggleNextAction: (id) => set(s => ({
        nextActions: s.nextActions.map(a =>
          a.id === id ? { ...a, done: !a.done } : a
        )
      })),

      // Map selection
      setSelectedDay: (dayId) => set({ selectedDayId: dayId }),

      // Computed: total spent in JPY
      getTotalSpentJPY: () => get().expenses.reduce((sum, e) => sum + (e.amountJPY || 0), 0),

      // Computed: spent by category
      getSpentByCategory: () => {
        const expenses = get().expenses
        return expenses.reduce((acc, e) => {
          acc[e.category] = (acc[e.category] || 0) + (e.amountJPY || 0)
          return acc
        }, {})
      },
    }),
    {
      name: 'japan-trip-store',
      partialize: (s) => ({
        expenses: s.expenses,
        packingItems: s.packingItems,
        displayCurrency: s.displayCurrency,
        nextActions: s.nextActions,
      }),
    }
  )
)

export default useTripStore
