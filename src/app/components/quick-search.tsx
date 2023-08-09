import LabelElement from "@/components/label-element"
import Image from "next/image"
import Link from "next/link"

const QUICK_SEARCH_TABS: Array<{
  src: string,
  alt: string,
  title: string
}> = [
    {
      src: '/hotel-icon.png',
      alt: 'hotel',
      title: 'Hotel',
    },
    {
      src: '/farm-icon.png',
      alt: 'fazendas',
      title: 'Fazendas',
    },
    {
      src: '/cottage-icon.png',
      alt: 'chale',
      title: 'Chalé',
    },
    {
      src: '/inn-icon.png',
      alt: 'pousada',
      title: 'Pousada',
    }
  ]

const QuickSearch = () => {
  return (
    <div className="container mx-auto p-5">

      <LabelElement text="Tente pesquisar por" />

      <div className="flex w-full justify-around mt-5 lg:justify-center lg:mt-10 gap-40">
        {QUICK_SEARCH_TABS.map((tab) => {
          return (
            <div key={tab.alt} className="flex flex-col items-center gap-1 cursor-pointer">
              <Link
                href={`/trips/search?text=${tab.title}`}
                className="flex flex-col items-center hover:text-primary transition-all"
              >
                <Image width={35} height={35} loading="eager" src={tab.src} alt={tab.alt} />
                <p className="text-sm lg:text-base text-primaryGray">{tab.title}</p>
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default QuickSearch