import { useFile } from '../hooks'
import { Header } from '../components'
import { useState, useRef } from 'preact/hooks'
import type { ChangeEvent } from 'preact/compat'
import { Upload, Zap, Shield, ChevronRight, ToolCase, GitGraph } from 'lucide-preact'
import { useLocation } from 'preact-iso'

interface FeatureInstance {
  icon: any,
  name: string,
  about: string,
}

const features: Array<FeatureInstance> = [
  {
    icon: Shield,
    name: "On-Device Privacy",
    about: "Every process and computations are fully in client side or serverless. your private data is 100% safe on your device."
  },
  {
    icon: ToolCase,
    name: "Advance Tools",
    about: "You will get powerful tools to analyze the data including url categorize capabilites."
  },
  {
    icon: GitGraph,
    name: "Graph Visulization",
    about: "You can research through graphs which indecates history usage by time, most visited websites, etc."
  }
]

export default function() {
  const { route } = useLocation()
  const { file, setFile } = useFile()
  const [isDragging, setIsDragging] = useState(false)
  const fileInputTaker = useRef<HTMLInputElement>(null)
  const handleDrag = {
    Over: (e: DragEvent) => {
      e.preventDefault()
      setIsDragging(true)
    },
    Leave: (e: DragEvent) => {
      e.preventDefault()
      setIsDragging(true)
    }
  }
  const handleDrop = (e: DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer?.files[0]
    initialiseTransfer(file)
  }
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0]
    e.currentTarget.value = ""
    initialiseTransfer(file)
  }
  const handleInitiate = (e: ChangeEvent<HTMLButtonElement>) => {
    e.currentTarget.disabled = true
    route('/dashboard')
  }
  const initialiseTransfer = async (file?: File) => {
    if (file?.name.endsWith('.zip')) return setFile(file)
    alert('The chrome diagnostic tool is made to handle takeout file, which is by default in *.zip format. And the file contain some structured files and folders. So the tool can only handle zip format files which is taken from google takeout.')
  }
  return <>
    <div className="min-h-screen bg-black text-cyan-400 font-mono relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-transparent to-blue-900/20"></div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_24px,rgba(6,182,212,0.1)_25px,rgba(6,182,212,0.1)_26px,transparent_27px,transparent_74px,rgba(6,182,212,0.1)_75px,rgba(6,182,212,0.1)_76px,transparent_77px),linear-gradient(rgba(6,182,212,0.1)_24px,transparent_25px,transparent_26px,rgba(6,182,212,0.1)_27px,rgba(6,182,212,0.1)_74px,transparent_75px,transparent_76px,rgba(6,182,212,0.1)_77px)] bg-[length:100px_100px]" style={{ animation: 'drift 20s linear infinite' }}></div>
      </div>
      {/* Glowing effects */}
      <div className="absolute top-20 left-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      {/* Actual page */}
      <div className="relative z-10 container mx-auto px-6 py-8">
        {/* Header */}<Header/>{/* Header */}
        {/* Hero elements */}
        <div className="text-center mb-20">
          <div className="inline-block border border-cyan-400/30 bg-cyan-400/5 px-4 py-2 mb-6 text-xs">
            <span className="text-cyan-400">STATUS:</span> <span className="text-white animate-pulse">OPERATIONAL</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-bold mb-6 text-white">
            CHROME'S <span className="block text-cyan-400 glow">TAKEOUT</span> ANALYZE
          </h1>
          <p className="text-lg md:text-xl text-cyan-300 max-w-2xl mx-auto mb-8 leading-relaxed">
            Take a research and analysis on google provided chrome's <span className="text-white font-bold">takeout data</span> and explore data usage like history, bookmarks and last opened tabs with advance tools and graphs.
          </p>
          <div className="flex justify-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>READY FOR PROCESS</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
              <span>SYSTEM ONLINE</span>
            </div>
          </div>
        </div>
        {/* Upload elements */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="border border-cyan-400/30 bg-cyan-400/5 backdrop-blur-sm p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">UPLOAD PROTOCOL</h2>
              <p className="text-cyan-300">Initialize data stream by uploading compressed archive</p>
            </div>
            <div className={`border-2 border-dashed ${isDragging ? 'border-cyan-400 bg-cyan-400/10' : 'border-cyan-400/50'} p-12 text-center transition-all duration-300 ${file ? 'bg-green-400/10 border-green-400' : ''}`} onDragOver={handleDrag.Over} onDragLeave={handleDrag.Leave} onDrop={handleDrop}>
              <input ref={fileInputTaker} type="file" accept=".zip" onChange={handleChange} className="hidden"/>
              {!file ? <div className="space-y-4">
                <Upload className="w-16 h-16 mx-auto text-cyan-400" />
                <div>
                  <p className="text-xl text-white mb-2">DRAG AND DROP</p>
                  <p className="text-cyan-300 mb-4">or click to select from your system</p>
                  <button onClick={() => fileInputTaker.current?.click()} className="px-6 py-3 border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all duration-300 text-sm font-bold">
                    SELECT FILE
                  </button>
                </div>
                <div className="text-xs text-cyan-500">
                  Supported: .ZIP archives | Max size: 100MB
                </div>
              </div> : <div className="space-y-4">
                <Shield className="w-16 h-16 mx-auto text-green-400" />
                <div>
                  <p className="text-xl text-white mb-2">Archive Loaded</p>
                  <p className="text-green-300 mb-4">{file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)</p>
                  <div className="flex justify-center space-x-4">
                    <button onClick={handleInitiate} className="px-8 py-3 bg-cyan-400 text-black hover:bg-cyan-300 transition-all duration-300 text-sm font-bold disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2">
                      <Zap className="w-4 h-4" />
                      <span>INITIATE ANALYSIS</span>
                    </button>
                    <button onClick={() => setFile(null)} className="px-6 py-3 border border-red-400 text-red-400 hover:bg-red-400 hover:text-black transition-all duration-300 text-sm font-bold">
                      CLEAR
                    </button>
                  </div>
                </div>
              </div>}
            </div>
          </div>
        </div>
        {/* Features elements */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {features.map(option => <>
            <div className="border border-cyan-400/30 p-6 bg-cyan-400/5 backdrop-blur-sm group hover:bg-cyan-400/10 transition-all duration-300">
              <option.icon className="w-8 h-8 text-cyan-400 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-bold text-white mb-2">{option.name.toUpperCase()}</h3>
              <p className="text-cyan-300 text-sm leading-relaxed">{option.about}</p>
            </div>
          </>)}
        </div>
        {/* CTA elements */}
        <div className="text-center border border-cyan-400/30 bg-gradient-to-r from-cyan-400/10 to-blue-400/10 p-12">
          <h2 className="text-3xl font-bold text-white mb-4">CONNECT ON GITHUB</h2>
          <p className="text-cyan-300 mb-8 max-w-2xl mx-auto">
            Let's connect on github. Follow and hit a star on github to encourage me to build these types of useful apps.
          </p>
          <button className="px-8 py-4 bg-gradient-to-r from-cyan-400 to-blue-400 text-black font-bold hover:from-cyan-300 hover:to-blue-300 transition-all duration-300 flex items-center space-x-2 mx-auto">
            <span>VISIT GITHUB</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  </>
}
