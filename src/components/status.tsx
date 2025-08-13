import { Chrome, LayoutTemplate, MonitorSmartphone, TabletSmartphone } from "lucide-preact"

interface statusBoxType {
  icon: any,
  title: string,
  color: string,
  subtitle: string
}

interface StatusBarProps {
  device: any
}

function statusBoxes(device: any): Array<statusBoxType> {
  if (!device) return []
  const data = [
    { icon: Chrome, color: 'green', title: "Chrome", subtitle: String(device.chrome_version) },
    { icon: MonitorSmartphone, color: "yellow", title: "Device", subtitle: device.manufacturer },
    { icon: TabletSmartphone, color: "violet", title: "Model", subtitle: device.model },
    { icon: LayoutTemplate, color: "blue", title: "Platform", subtitle: String(device.os_type).slice(8) }
  ]
  return data
}

export default function(props: StatusBarProps) {
  const { device } = props
  return <div className="grid grid-cols-4 gap-4 mb-8">
    {statusBoxes(device).map((option, index) => <div key={index} className="border border-cyan-400/30 bg-cyan-400/5 backdrop-blur-sm p-4 text-center">
    <option.icon className={`w-6 h-6 mx-auto mb-2 text-${option.color}-400`} />
    <div className="text-xs text-cyan-300">{option.title.toUpperCase()}</div>
    <div className="text-lg font-bold text-white">{option.subtitle.toUpperCase()}</div>
    </div>)}
  </div>
}
