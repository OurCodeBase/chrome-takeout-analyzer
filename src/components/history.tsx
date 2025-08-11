import { ChevronRight } from "lucide-preact"

interface HistoryProps {
  data: Array<any>,
  title: string,
  description: string
}

function getTimestamp(n: number) {
  const time = new Date(n/1000)
  const date = time.getDay()
  const month = time.getMonth() + 1
  const year = time.getFullYear().toString().slice(2)
  const subTime = time.toLocaleString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  })
  return `${subTime} ${date}:${month}:${year}`.toUpperCase()
}

export default function(props: HistoryProps) {
  const { data, title, description } = props
  return <>
    {/* Main Content */}
    <div className="border border-cyan-400/30 bg-cyan-400/5 backdrop-blur-sm">
      {/* List Header */}
      <div className="border-b border-cyan-400/30 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">{title}</h2>
            <p className="text-cyan-300 text-sm">{description}</p>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-400">VIRTUAL LISTING</span>
          </div>
        </div>
      </div>
      {/* History List */}
      <div className="p-6">
        <div className="space-y-3">
          {data.map((option, index) => {
            // const url = new URL(option.url)
            // const { hostname } = url
            return <div key={index} className="flex items-center justify-between p-4 border border-cyan-400/20 bg-cyan-400/5 hover:bg-cyan-400/10 hover:border-cyan-400/40 transition-all duration-300 group">
              {/* Left Side */}
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 border border-cyan-400/30 bg-cyan-400/10 flex items-center justify-center text-lg group-hover:border-cyan-400/50 transition-colors">
                  <img className="w-8" src={option.favicon_url} onError={(e) => {e.currentTarget.outerHTML = option.title.charAt(0).toUpperCase()}}/>
                </div>
                <div className="max-w-3xs md:max-w-sm lg:max-w-2xl xl:max-w-3xl 2xl:max-w-6xl">
                  <h3 className="text-white font-semibold text-md group-hover:text-cyan-100 transition-colors">
                    {option.title}
                  </h3>
                  <p className="text-cyan-400 text-xs truncate">
                    {option.url}
                  </p>
                </div>
              </div>
              {/* Right Side */}
              <div className="hidden sm:flex items-center space-x-6 text-right">
                <div>
                  <div className="text-white font-mono text-sm">
                    {getTimestamp(option.time_usec)}
                  </div>
                  <div className="text-yellow-400 text-xs">
                    {option.time_usec}
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-cyan-400/50 group-hover:text-cyan-400 transition-colors" />
              </div>
            </div>
          })}
        </div>
        {/* Footer Stats */}
        <div className="mt-6 pt-6 border-t border-cyan-400/20 flex justify-between items-center text-sm">
          <div className="text-cyan-300">
            Total Visits: <span className="text-white font-bold">{data.length}</span>
          </div>
        </div>
      </div>
    </div>
  </>
}
