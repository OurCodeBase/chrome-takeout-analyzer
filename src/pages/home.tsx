import unzip from 'jszip'
import {
  Ticket,
  History,
  Bookmark,
  UploadCloud,
  DownloadCloud,
  TableOfContents
} from 'lucide-preact'
import type { ChangeEvent } from 'preact/compat'

const features = [
  {
    icon: <History/>,
    name: "History",
    description: "See the past browsing history in takeout file."
  },
  {
    icon: <Bookmark/>,
    name: "Bookmarks",
    description: "See all bookmarks available in takeout file."
  },
  {
    icon: <TableOfContents/>,
    name: "Tabs",
    description: "See recently opened tabs in takeout file."
  }
]
const workflow = [
  {
    icon: <DownloadCloud/>,
    name: "Download takeout file.",
    description: "Goto google > data & privacy > download your data, and make sure to tick chrome data. Save that takeout as zip file."
  },
  {
    icon: <UploadCloud/>,
    name: "Upload your takeout file.",
    description: "Take your takeout zip and upload it here. All stuff like extraction is handled by the tool."
  },
  {
    icon: <Ticket/>,
    name: "Choose what you want to see.",
    description: "Choose a tool you want, to analyze the takeout file."
  }
]
const footers = [
  { name: "Terms of Service", href: "#" },
  { name: "Privacy Policy", href: "#" },
  { name: "Contact Us", href: "#" },
]

export default function() {
  const onFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0]
    if (!file?.name.endsWith('.zip')) return alert('The chrome diagnostic tool is made to handle takeout file, which is by default in *.zip format. And the file contain some structured files and folders. So the tool can only handle zip format files which is taken from google takeout.')
    const zip = await unzip.loadAsync(file)
    Object.keys(zip.files).forEach(async filename => {
      if (!filename.endsWith('.json')) return
      const zipEntry = zip.files[filename]
      const content = await zipEntry.async('string')
      console.log(content)
    })
  }
  return <>
    <div className="relative flex size-full min-h-screen flex-col bg-[#101a23] dark group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#223649] px-10 py-3">
          <div className="flex items-center gap-4 text-white">
            <div className="size-4">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 6H42L36 24L42 42H6L12 24L6 6Z" fill="currentColor"></path></svg>
            </div>
            <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">Chrome Diagnostic Tools</h2>
          </div>
        </header>
        <div className="flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="@container">
              <div className="@[480px]:p-4">
                <div
                  className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 @[480px]:rounded-lg items-center justify-end p-4"
                  style='background-image: linear-gradient(rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 1) 100%), url("/backdrop.jpeg");'
                >
                  <div className="flex flex-col gap-2 text-center mb-10">
                    <h1
                      className="text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em]"
                    >
                      Analyze chrome's takeout data.
                    </h1>
                    <h2 className="text-white text-sm font-normal leading-normal @[480px]:text-base @[480px]:font-normal @[480px]:leading-normal">
                      Research, analyze or explore chrome's downloaded takeout data like history, bookmarks and tabs.
                    </h2>
                  </div>
                </div>
              </div>
            </div>
            <label for="filePicker" className="flex flex-col p-4 cursor-pointer">
              <div className="flex flex-col items-center gap-6 rounded-lg border-2 border-dashed border-[#314d68] px-6 py-14">
                <div className="flex max-w-[480px] flex-col items-center gap-2">
                  <p className="text-white text-lg font-bold leading-tight tracking-[-0.015em] max-w-[480px] text-center">Drag and drop files here</p>
                  <p className="text-white text-sm font-normal leading-normal max-w-[480px] text-center">Or click to select files from your computer</p>
                </div>
                <button
                  className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#223649] text-white text-sm font-bold leading-normal tracking-[0.015em]"
                >
                  <label for="filePicker" className="truncate">Select Files</label>
                </button>
              </div>
            </label>
            <input type="file" id="filePicker" accept=".zip" style="display: none;" onChange={onFile}/>
            <div className="flex flex-col gap-10 px-4 py-10 @container">
              <div className="flex flex-col gap-4">
                <h1
                  className="text-white tracking-light text-[32px] font-bold leading-tight @[480px]:text-4xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em] max-w-[720px]"
                >
                  Choose a feature
                </h1>
                <p className="text-white text-base font-normal leading-normal max-w-[720px]">
                  Experience the best chrome takeout zip analyzer with full privacy because of all processes are on-device.
                </p>
              </div>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-0">
                {features.map(feature => <div className="flex flex-1 gap-3 rounded-lg border border-[#314d68] bg-[#182634] p-4 flex-col">
                  <div className="text-white" data-icon="File" data-size="24px" data-weight="regular">
                    {feature.icon}
                  </div>
                  <div className="flex flex-col gap-1">
                    <h2 className="text-white text-base font-bold leading-tight">{feature.name}</h2>
                    <p className="text-[#90adcb] text-sm font-normal leading-normal">{feature.description}</p>
                  </div>
                </div>)}
              </div>
            </div>
            <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">How it works</h2>
            <div className="grid grid-cols-[40px_1fr] gap-x-2 px-4">
              {workflow.map((work, i) => <>
                <div className="flex flex-col items-center gap-1 pt-3"> 
                  <div className="text-white" data-icon="Upload" data-size="24px" data-weight="regular">
                    {work.icon}
                  </div>
                  {i + 1 != workflow.length && <div className="w-[1.5px] bg-[#314d68] h-2 grow"></div>}
                </div>
                <div className="flex flex-1 flex-col py-3">
                  <p className="text-white text-base font-medium leading-normal">{work.name}</p>
                  <p className="text-[#90adcb] text-base font-normal leading-normal">{work.description}</p>
                </div>
              </>)}
            </div>
            <footer className="flex flex-col gap-6 px-5 py-10 text-center @container">
              <div className="flex flex-wrap items-center justify-center gap-6 @[480px]:flex-row @[480px]:justify-around">
                {footers.map(option => <>
                  <a className="text-[#90adcb] text-base font-normal leading-normal min-w-40" href={option.href}>{option.name}</a>
                </>)}
              </div>
              <p className="text-[#90adcb] text-base font-normal leading-normal">© 2025 OurCodeBase. All rights reserved.</p>
            </footer>
          </div>
        </div>
      </div>
    </div>
  </>
}
