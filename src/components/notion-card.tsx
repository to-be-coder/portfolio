type Props = {
  title: string
  logo?: string
  description: string
  roundIcon?: boolean
  link?: string
  target?: string
}

export default function NotionCard({ title, logo, description, roundIcon, link, target }: Props) {
  return (
    <>
      <div className="flex flex-col gap-4">
        <div>
          <div>
            <div>
              <div>
                <p>{title}</p>
              </div>
              <p>{description}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
