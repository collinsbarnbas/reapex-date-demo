import { useState } from 'react'
import { CalendarRoot, DatePickerInput, TimePicker, DateTimePicker } from 'reapex-date'
import { en, hi, ar, ja, fr } from 'reapex-date'
import type { UseSingleCalendarConfig, UseRangeCalendarConfig, UseMultipleCalendarConfig, TimeValue, ReapexLocale } from 'reapex-date'
import './index.css'

const LOCALES: Record<string, ReapexLocale> = { English: en, Hindi: hi, Arabic: ar, Japanese: ja, French: fr }

function SingleInputPanel() {
  const [value, setValue] = useState<Date | null>(null)
  const [localeName, setLocaleName] = useState('English')
  const locale = LOCALES[localeName] ?? en
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const config: UseSingleCalendarConfig = { mode: 'single', value, onChange: setValue, minDate: today }
  const getBtn = (active: boolean) => 'px-3 py-1 text-xs rounded-full transition-all cursor-pointer border-0 ' + (active ? 'bg-blue-600 text-white font-bold' : 'bg-gray-100 text-gray-600 hover:bg-gray-200')

  return (
    <div className="flex flex-col items-center gap-4 bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
      <h2 className="text-lg font-bold text-gray-800">Localized DatePicker</h2>
      <div className="flex gap-1 flex-wrap justify-center">
        {Object.keys(LOCALES).map(name => (
          <button key={name} onClick={() => setLocaleName(name)} className={getBtn(name === localeName)}>{name}</button>
        ))}
      </div>
      <DatePickerInput config={config} locale={locale} placeholder="Pick a date..." allowClear />
      <div className="text-xs text-gray-500 bg-gray-50 rounded-lg px-3 py-2 w-72 text-center">
        <span className="font-medium">Locale: </span>{locale.code} ({locale.dir.toUpperCase()})
        <br /><span className="font-medium">Value: </span>{value ? value.toISOString().split('T')[0] : 'null'}
      </div>
    </div>
  )
}

function RangeInputPanel() {
  const [value, setValue] = useState<[Date | null, Date | null]>([null, null])
  const config: UseRangeCalendarConfig = { mode: 'range', value, onChange: setValue }
  return (
    <div className="flex flex-col items-center gap-4 bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
      <h2 className="text-lg font-bold text-gray-800">Range Picker</h2>
      <p className="text-xs text-gray-500">Select start and end dates</p>
      <DatePickerInput config={config} format="DD/MM/YYYY" placeholder="Start to End" allowClear />
      <div className="text-xs text-gray-500 bg-gray-50 rounded-lg px-3 py-2 w-72 text-center">
        <span className="font-medium">Start: </span>{value[0]?.toLocaleDateString() ?? 'null'}
        <span className="mx-1"> to </span>
        <span className="font-medium">End: </span>{value[1]?.toLocaleDateString() ?? 'null'}
      </div>
    </div>
  )
}

function DateTimePanel() {
  const [value, setValue] = useState<Date | null>(null)
  return (
    <div className="flex flex-col items-center gap-4 bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
      <h2 className="text-lg font-bold text-gray-800">DateTime Picker</h2>
      <p className="text-xs text-gray-500">Date + Time together in one component</p>
      <DateTimePicker value={value} onChange={setValue} minuteStep={5} />
      <div className="text-xs text-gray-500 bg-gray-50 rounded-lg px-3 py-2 w-72 text-center">
        <span className="font-medium">Value: </span>
        {value ? value.toLocaleString() : 'null'}
      </div>
    </div>
  )
}

function MultipleInlinePanel() {
  const [value, setValue] = useState<Date[]>([])
  const config: UseMultipleCalendarConfig = { mode: 'multiple', value, onChange: setValue }
  return (
    <div className="flex flex-col items-center gap-4 bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
      <h2 className="text-lg font-bold text-gray-800">Multi-Select + Footer</h2>
      <p className="text-xs text-gray-500">Custom renderFooter with Today button</p>
      <CalendarRoot
        config={config}
        renderFooter={() => (
          <div className="flex justify-between items-center pt-2 border-t border-gray-100 mt-2">
            <span className="text-xs text-gray-400">{value.length} selected</span>
            <button
              onClick={() => {
                const today = new Date(); today.setHours(0,0,0,0)
                if (!value.some(d => d.toDateString() === today.toDateString())) setValue([...value, today])
              }}
              className="text-xs px-3 py-1 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer border-0"
            >+ Today</button>
          </div>
        )}
      />
    </div>
  )
}

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-extrabold text-center text-gray-900 mb-2">
          ReApexDate Playground <span className="text-blue-600">v0.2</span>
        </h1>
        <p className="text-center text-gray-500 mb-2 text-sm">
          Full Feature Test: Locale, DateTime, Range, Multi-Select
        </p>
        <p className="text-center text-gray-400 mb-10 text-xs">
          Click month/year title to switch views. Arabic activates RTL.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <SingleInputPanel />
          <RangeInputPanel />
          <DateTimePanel />
          <MultipleInlinePanel />
        </div>
      </div>
    </div>
  )
}