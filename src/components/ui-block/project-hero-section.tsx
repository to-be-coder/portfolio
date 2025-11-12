import Image from 'next/image'

interface ProjectHeroSectionProps {
  title: string
  subtitle: string
  imageSrc: string
  imageAlt: string
  imagePosition?: string
}

export default function ProjectHeroSection({ title, subtitle, imageSrc, imageAlt, imagePosition = 'center' }: ProjectHeroSectionProps) {
  return (
    <div className="">
      <div className="w-full h-auto flex flex-col relative  mx-auto">
        {/* Content */}
        <div className="relative z-10 flex-1 flex flex-col w-full space-between justify-end mt-5 mb-10 border-b border-gray-200">
          <h1 className="flex-1 text-4xl md:text-5xl font-bold tracking-tight leading-tight text-black">{title}</h1>
          <p className="items-end text-lg md:text-2xl mb-1 text-black">{subtitle}</p>
        </div>
      </div>
      <div className="w-full h-auto flex flex-col items-center rounded-lg overflow-hidden">
        <Image src={imageSrc} alt={imageAlt} width={1000} height={100} className={`w-full flex-1 object-cover max-h-[450px] object-${imagePosition} rounded-xl`} />
      </div>
    </div>
  )
}
