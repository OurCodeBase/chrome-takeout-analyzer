import unzip from 'jszip'
import { useFile } from '../hooks'
import { Header, History } from '../components'
import { useEffect, useState } from 'preact/hooks'
import type { DataContextType } from '../contexts/context'

async function fileRead(file?: File) {
  if (!file?.name.endsWith('.zip')) throw new Error('The chrome diagnostic tools are made to handle takeout file, which is by default in *.zip format. And the file contain some structured files and folders. So the tool can only handle zip format files which is taken from google takeout.')
  const zip = await unzip.loadAsync(file)
  var data:DataContextType = {}
  for (var filename of Object.keys(zip.files)) {
    if (!filename.endsWith('.json')) continue
    const zipEntry = zip.files[filename]
    const content = await zipEntry.async('string')
    filename = filename.split('/')[2].slice(0, -5)
    data = {...data, [filename]: JSON.parse(content)}
  }
  return data
}

export default function() {
  const { file } = useFile()
  const [data, setData] = useState<DataContextType>({})
  useEffect(() => {
    fileRead(file).then(data => setData(data))
  }, [])
  return <>
    <div className="min-h-screen bg-black text-cyan-400 font-mono relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-15">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/30 via-transparent to-blue-900/30"></div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_24px,rgba(6,182,212,0.1)_25px,rgba(6,182,212,0.1)_26px,transparent_27px,transparent_74px,rgba(6,182,212,0.1)_75px,rgba(6,182,212,0.1)_76px,transparent_77px),linear-gradient(rgba(6,182,212,0.1)_24px,transparent_25px,transparent_26px,rgba(6,182,212,0.1)_27px,rgba(6,182,212,0.1)_74px,transparent_75px,transparent_76px,rgba(6,182,212,0.1)_77px)] bg-[length:50px_50px]" style={{ animation: 'drift 30s linear infinite' }}></div>
      </div>
      {/* Glowing elements */}
      <div className="absolute top-10 right-1/4 w-48 h-48 bg-cyan-500/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 left-1/3 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      {/* Actual page */}
      <div className="relative z-10 container mx-auto px-6 py-8">
        {/* Header */}<Header/>{/* Header */}
        <History data={data.History?.["Browser History"] || []} title="CHROME'S HISTORY" description="Analytics of what and how much user have visited websites."/>
        {/* Main Content */}
        {/* Bottom Status */}
        <div className="mt-8 flex justify-center">
          <div className="flex items-center space-x-4 text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400">QUANTUM CORE ACTIVE</span>
            </div>
            <div className="w-px h-4 bg-cyan-400/30"></div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
              <span className="text-cyan-400">NEURAL NET SYNCHRONIZED</span>
            </div>
            <div className="w-px h-4 bg-cyan-400/30"></div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <span className="text-blue-400">DATA STREAM OPTIMAL</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
}
