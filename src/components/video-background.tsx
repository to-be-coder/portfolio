export default function VideoBackground() {
  return (
    <div className="relative w-full h-[60vh] mx-auto">
      {/* Background Video */}
      <video className="absolute top-0 left-1/2 -translate-x-1/2 w-auto h-full object-cover -z-10" src="/videos/background.mp4" autoPlay muted loop playsInline />

      {/* Optional Overlay */}
      {/* <div className="absolute top-0 left-0 w-full h-full bg-black/40 -z-10" /> */}

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold tracking-tight leading-tight text-center text-black/70">
          Hi, I&apos;m Jessica Cheng,
          <br />a <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">product designer </span>
          who <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">codes</span>
        </h1>
      </div>
    </div>
  )
}
