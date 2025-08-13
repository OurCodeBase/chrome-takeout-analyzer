import { memo } from 'preact/compat'
import { useState } from 'preact/hooks'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface GraphProps {
  data: Array<any>,
  title: string,
  description: string
}

const Colors = [
  "#FF6EC7", "#FF77FF", "#FF4D4D", "#FF9933", "#FFEA00", "#CCFF00", "#66FF00", "#00FF66",
  "#00FFB3", "#00FFFF", "#33CCFF", "#3366FF", "#6B00FF", "#B300FF", "#FF00CC", "#FF3399",
  "#FF5050", "#FF6600", "#FFCC00", "#C6FF00", "#99FF00", "#00FF33", "#00FF99", "#00FFE6",
  "#00CCFF", "#3399FF", "#6600FF", "#9900FF", "#CC00FF", "#FF0099", "#FF1A66", "#FF471A",
  "#FFB31A", "#E6FF1A", "#B3FF1A", "#66FF1A", "#1AFF66", "#1AFFB3", "#1AFFFF", "#1AB3FF",
  "#1A66FF", "#471AFF", "#801AFF", "#B31AFF", "#FF1AB3", "#FF3385", "#FF6633", "#FF8533",
  "#FFD633", "#D9FF33", "#ADFF33", "#70FF33", "#33FF70", "#33FFAD", "#33FFD9", "#33D9FF",
  "#3385FF", "#3333FF", "#7033FF", "#9933FF", "#CC33FF", "#FF33CC", "#FF4DA6", "#FF704D",
  "#FF944D", "#FFEB4D", "#D4FF4D", "#B8FF4D", "#7DFF4D", "#4DFF88", "#4DFFB8", "#4DFFE1",
  "#4DDCFF", "#4D94FF", "#4D4DFF", "#7D4DFF", "#A64DFF", "#D14DFF", "#FF4DEB", "#FF66CC",
  "#FF8566", "#FFAA66", "#FFF066", "#DDFF66", "#BBFF66", "#88FF66", "#66FF99", "#66FFBB",
  "#66FFE5", "#66DDFF", "#6699FF", "#6666FF", "#9966FF", "#B366FF", "#D966FF", "#FF66E0",
  "#FF80BF", "#FFA680", "#FFCC80", "#FFF780", "#E6FF80", "#C2FF80", "#99FF80", "#80FFB2"
]

function getReduceddata(history: Array<any>, hostnames: Array<string>) {
  return history.filter(option => {
    return hostnames.includes(new URL(option.url).hostname)
  })
}

function getHostnames(history: Array<any>): string[] {
  const set: Set<string> = new Set
  history.forEach(option => {
    const { hostname } = new URL(option.url)
    set.add(hostname)
  })
  return Array.from(set)
}

function createGraphData(history: Array<any>) {
  const map = new Map
  const set: any = {}
  const data: Array<any> = []
  history.forEach(option => {
    const date = new Date(option.time_usec/1000).toLocaleDateString()
    const { hostname } = new URL(option.url)
    const lastHosts = map.get(date) ?? {}
    const count = lastHosts?.[hostname] ? lastHosts[hostname] + 1 : 1
    const hosts = {...lastHosts, [hostname]: count}
    set[hostname] = 0
    map.set(date, hosts)
  })
  map.forEach((option, key) => {
    const element = { name: key, ...set, ...option }
    data.push(element)
  })
  return data.reverse()
}

function createGraphColor(set: Array<string>) {
  const map: Array<any> = [] 
  set.forEach((option, index) => {
    const color = Colors[index]
    const data = { name: option, color: color }
    map.push(data)
  })
  return map
}

const ThemedGraphbox = ({ payload, label }: any) => {
  return <>
    <div className="relative bg-black/90 border border-cyan-400 p-4 backdrop-blur-sm">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-blue-400/10"></div>
      <div className="relative z-10">
        <div className="text-cyan-400 font-mono text-sm mb-2 flex items-center">
          <div className="w-2 h-2 bg-cyan-400 mr-2"></div>
          <span className="uppercase font-bold">TIME: {label}</span>
        </div>
        <hr className="text-cyan-400/30 mb-2"/>
        {payload.map((entry: any, index: number) => <div key={index} className="flex items-center justify-between mb-1 font-mono text-xs">
          <div className="flex items-center">
            <div className="w-3 h-3 mr-2" style={{ backgroundColor: entry.color }}></div>
            <span style={{ color: entry.color }}>{entry.dataKey}</span>
          </div>
          <span className="text-white ml-4">
            {entry.value}
          </span>
        </div>)}
      </div>
    </div>
  </>
}

export default memo((props: GraphProps) => {
  const { data: history, title, description } = props
  const [choosen, setChoosen] = useState<Array<string>>([])
  const subdata = getReduceddata(history, choosen)
  const hostnames = getHostnames(history)
  const data = createGraphData(subdata)
  const dataIds = createGraphColor(choosen)
  const onChoose = (host: string) => {
    setChoosen(
      choosen.includes(host) ?
      choosen.filter(option => option != host) :
      [...choosen, host]
    )
  }
  return <>
    <div className="border border-cyan-400/30 bg-cyan-400/5 backdrop-blur-sm mt-8">
      {/* Header */}
      <div className="border-b border-cyan-400/30 p-6 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">{title}</h2>
            <p className="text-cyan-300 text-sm">{description}</p>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-400">RECHARTS</span>
          </div>
        </div>
      </div>
      <ResponsiveContainer width={"100%"} height={500} className="mb-8">
        <AreaChart width={500} height={400} data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            {dataIds.map(option => <linearGradient key={option.name} id={`gradient${option.name}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={option.color} stopOpacity={0.3}/>
              <stop offset="95%" stopColor={option.color} stopOpacity={0.05}/>
            </linearGradient>)}
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#00ffff20" vertical={false}/>
          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#00ffff', fontSize: 12 }} interval="preserveStartEnd"/>
          <YAxis axisLine={false} tickLine={false} tick={{ fill: '#00ffff', fontSize: 12 }}/>
          <Tooltip content={<ThemedGraphbox/>}/>
          {dataIds.map(option => <>
            <Area
              type="monotone"
              key={option.name}
              dataKey={option.name}
              stackId="1"
              stroke={option.color}
              strokeWidth={2}
              fill={`url(#gradient${option.name})`}
              fillOpacity={1}
              style={{
                filter: `drop-shadow(0 0 6px ${option.color})`
              }}
            />
          </>)}
        </AreaChart>
      </ResponsiveContainer>
      <div className="relative z-10 p-4 border-t border-cyan-400/30">
        <h3 className="text-white text-lg mb-1 text-bold">
          [ SELECT HOSTNAMES ]
        </h3>
        <p className="text-cyan-300 text-sm mb-5">Make sure not to select more than 100 hostnames, you may face performance issues or exceptions.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {hostnames.map(host => {
            const checked = choosen.includes(host)
            return <div key={host} className={`border p-3 transition-all duration-200 cursor-pointer ${checked ? "bg-cyan-400/10 border-cyan-400" : "bg-gray-900/30 border-gray-600"}`} onClick={() => {onChoose(host)}}>
              <div className="inline-flex items-center mb-2">
                <span className={`font-mono text-sm font-bold ${checked ? "text-cyan-400" : "text-gray-500"}`}>
                  {host}
                </span>
              </div>
              {checked ? <>
                <div className="text-green-400 font-mono text-xs mt-1">
                  ● ACTIVE
                </div>
              </> : ''}
            </div>
          })}
        </div>
      </div>
    </div>
  </>
})
