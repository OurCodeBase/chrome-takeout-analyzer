import { Chrome } from "lucide-preact";

interface LinkInstance {
  name: string,
  href: string
}

const navigations: Array<LinkInstance> = [
  { name: "HOME", href: "/" }
]

export default function() {
  return <>
    {/* Header */}
    <header className="flex justify-between items-center mb-16">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 border border-cyan-400 bg-cyan-400/10 flex items-center justify-center">
          <Chrome className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">CHROME DIAGNOSTIC TOOLS</h1>
          <p className="text-xs text-cyan-500">ANALYZE CHROME'S TAKEOUT DATA</p>
        </div>
      </div>
      <nav className="hidden md:flex space-x-8 text-sm">
        {navigations.map(option => <a href={option.href} className="hover:text-white transition-colors border-b border-transparent hover:border-cyan-400 pb-1">{option.name}</a>)}
      </nav>
    </header>
  </>
}
