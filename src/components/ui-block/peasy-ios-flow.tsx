'use client'

import { iosFlowSections, type FlowCard, type FlowRow } from '@/components/ui-block/peasy-ios-flow-data'
import { ArrowRight, GitBranch, Maximize2, Minus, Plus, X } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'

const sectionWidth = 980
const diagramWidth = sectionWidth * iosFlowSections.length
const diagramHeight = 2240
const sectionCenters = iosFlowSections.map((_, index) => sectionWidth * index + sectionWidth / 2)

function ScreenCard({ card }: { card: FlowCard }) {
  return (
    <article className="flex h-[270px] min-w-0 gap-3 rounded-[22px] border border-white/20 bg-[#184636] p-3 text-white shadow-lg">
      <div className="h-[220px] w-[100px] shrink-0 self-center overflow-hidden rounded-[15px] border-4 border-black bg-black shadow-md">
        <Image src={card.image} alt={`${card.title}, ${card.state}`} width={276} height={600} sizes="250px" className="h-full w-full object-cover" />
      </div>
      <div className="flex min-w-0 flex-col justify-center">
        <span className="mb-2 w-fit rounded-full bg-emerald-300/15 px-2 py-1 text-[12px] font-semibold text-emerald-200">{card.state}</span>
        <h4 className="text-[20px] font-semibold leading-tight">{card.title}</h4>
        <p className="mt-3 text-[15px] leading-snug text-emerald-100/80">{card.detail}</p>
      </div>
    </article>
  )
}

function FlowRowView({ row }: { row: FlowRow }) {
  const RowIcon = row.mode === 'sequence' ? ArrowRight : GitBranch

  return (
    <div className="relative h-[320px]">
      <div className="mb-3 flex h-6 items-center gap-2 text-[15px] font-semibold uppercase tracking-[0.12em] text-emerald-300">
        <RowIcon className="h-4 w-4" aria-hidden="true" /> {row.label}
      </div>
      <div className="grid grid-cols-3 gap-[18px]">
        {row.cards.map((card) => <ScreenCard key={`${card.title}-${card.state}`} card={card} />)}
      </div>
      {row.mode === 'sequence' && row.cards.slice(0, -1).map((card, index) => (
        <span key={`${card.title}-${index}`} className="absolute top-[157px] z-10 flex h-8 w-8 items-center justify-center rounded-full border border-emerald-300/50 bg-emerald-950 text-emerald-300" style={{ left: 289 + index * 314 }} aria-hidden="true">
          <ArrowRight className="h-4 w-4" />
        </span>
      ))}
    </div>
  )
}

function FlowDiagram() {
  return (
    <div className="relative overflow-hidden bg-emerald-950 text-white" style={{ width: diagramWidth, height: diagramHeight }}>
      <div className="relative h-[190px] border-b border-white/15 px-10 pt-8">
        <p className="text-[18px] font-semibold uppercase tracking-[0.18em] text-emerald-300">Peasy iOS · complete page map</p>
        <p className="mt-2 text-[32px] font-semibold">Account setup opens into four navigation branches</p>
        <svg className="absolute bottom-0 left-0" width={diagramWidth} height="45" viewBox={`0 0 ${diagramWidth} 45`} fill="none" aria-hidden="true">
          <path d={`M ${sectionCenters[0]} 25 H ${sectionCenters[sectionCenters.length - 1]}`} stroke="#6ee7b7" strokeWidth="3" strokeLinecap="round" />
          {sectionCenters.map((center) => <path key={center} d={`M ${center} 25 V 43`} stroke="#6ee7b7" strokeWidth="3" strokeLinecap="round" />)}
        </svg>
      </div>
      <div className="flex">
        {iosFlowSections.map((section, index) => (
          <section key={section.title} className="h-[2050px] shrink-0 border-r border-white/15 px-7" style={{ width: sectionWidth }}>
            <div className="flex h-[115px] flex-col justify-center">
              <p className="text-[16px] font-semibold uppercase tracking-[0.18em] text-emerald-300">0{index + 1} / 05</p>
              <h3 className="mt-1 text-[30px] font-semibold">{section.title}</h3>
              <p className="mt-1 text-[16px] text-emerald-100/75">{section.description}</p>
            </div>
            {section.rows.map((row) => <FlowRowView key={row.label} row={row} />)}
          </section>
        ))}
      </div>
    </div>
  )
}

export default function PeasyIOSFlow() {
  const previewRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const previousZoomRef = useRef(1)
  const [previewScale, setPreviewScale] = useState(1)
  const [zoom, setZoom] = useState(1)

  useEffect(() => {
    const preview = previewRef.current
    if (!preview) return
    const observer = new ResizeObserver(([entry]) => setPreviewScale(entry.contentRect.width / diagramWidth))
    observer.observe(preview)
    return () => observer.disconnect()
  }, [])

  useLayoutEffect(() => {
    const scroller = scrollRef.current
    const previousZoom = previousZoomRef.current
    if (scroller && previousZoom !== zoom) {
      const centerX = (scroller.scrollLeft + scroller.clientWidth / 2) / previousZoom
      const centerY = (scroller.scrollTop + scroller.clientHeight / 2) / previousZoom
      scroller.scrollLeft = centerX * zoom - scroller.clientWidth / 2
      scroller.scrollTop = centerY * zoom - scroller.clientHeight / 2
    }
    previousZoomRef.current = zoom
  }, [zoom])

  return (
    <>
      <button
        ref={previewRef}
        type="button"
        onClick={() => { previousZoomRef.current = 1; setZoom(1); dialogRef.current?.showModal(); scrollRef.current?.scrollTo(0, 0) }}
        aria-label="Zoom in to explore every Peasy iOS page and key state"
        className="group relative block w-full cursor-zoom-in overflow-hidden rounded-3xl bg-emerald-950 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2"
        style={{ aspectRatio: `${diagramWidth} / ${diagramHeight}` }}
      >
        <div className="pointer-events-none absolute left-0 top-0 origin-top-left" style={{ transform: `scale(${previewScale})` }} aria-hidden="true"><FlowDiagram /></div>
        <span className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-emerald-950 shadow-lg transition-transform group-hover:scale-105">
          <Maximize2 className="h-4 w-4" /> Click to zoom the full map
        </span>
      </button>

      <dialog
        ref={dialogRef}
        aria-label="Peasy iOS complete page and state map"
        aria-describedby="peasy-flow-description"
        onClick={(event) => { if (event.target === event.currentTarget) dialogRef.current?.close() }}
        className="m-auto h-[calc(100dvh-2rem)] w-[calc(100vw-2rem)] max-h-none max-w-none overflow-hidden rounded-2xl bg-emerald-950 p-0 text-white backdrop:bg-black/80"
      >
        <div className="flex h-full flex-col">
          <div className="z-10 flex min-h-16 items-center justify-between gap-4 border-b border-white/15 bg-emerald-950 px-4 py-2 sm:px-6">
            <div className="min-w-0">
              <h3 className="font-semibold">Product flow on iOS</h3>
              <p id="peasy-flow-description" className="text-sm text-emerald-200">Explore access, Plan, Recipes, Shop, and Settings. Scroll to view each page and state.</p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <button type="button" onClick={() => setZoom((value) => Math.max(0.75, value - 0.5))} disabled={zoom <= 0.75} aria-label="Zoom out" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 disabled:opacity-40"><Minus className="h-5 w-5" /></button>
              <span className="hidden w-12 text-center text-sm sm:block">{Math.round(zoom * 100)}%</span>
              <button type="button" onClick={() => setZoom((value) => Math.min(4, value + 0.5))} disabled={zoom >= 4} aria-label="Zoom in" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 disabled:opacity-40"><Plus className="h-5 w-5" /></button>
              <button type="button" onClick={() => dialogRef.current?.close()} aria-label="Close product flow" autoFocus className="ml-1 flex h-10 w-10 items-center justify-center rounded-full bg-white text-emerald-950"><X className="h-5 w-5" /></button>
            </div>
          </div>
          <nav aria-label="Jump to iOS flow branch" className="flex shrink-0 gap-2 overflow-x-auto border-b border-white/15 bg-emerald-950 px-4 py-2 sm:px-6">
            {iosFlowSections.map((section, index) => (
              <button key={section.title} type="button" onClick={() => scrollRef.current?.scrollTo({ left: index * sectionWidth * zoom, top: 0, behavior: 'smooth' })} className="shrink-0 rounded-full border border-white/20 px-3 py-1.5 text-sm text-emerald-100 hover:border-emerald-300 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300">
                {section.title}
              </button>
            ))}
          </nav>
          <div ref={scrollRef} className="min-h-0 flex-1 overflow-auto overscroll-contain">
            <div className="origin-top-left" style={{ width: diagramWidth * zoom, height: diagramHeight * zoom }}>
              <div className="origin-top-left" style={{ transform: `scale(${zoom})` }}><FlowDiagram /></div>
            </div>
          </div>
        </div>
      </dialog>
    </>
  )
}
