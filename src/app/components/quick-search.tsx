import LabelElement from "@/components/label-element"
import Link from "next/link"
import { IconBaseProps } from "react-icons"
import { GiFarmTractor } from 'react-icons/gi'
import { HiOutlineHome } from 'react-icons/hi'
import { LiaBedSolid } from 'react-icons/lia'
import { MdOutlineBedroomParent } from 'react-icons/md'

const QUICK_SEARCH_TABS: Array<{
  icon: React.ElementType<IconBaseProps>,
  alt: string,
  title: string
}> = [
    {
      icon: MdOutlineBedroomParent,
      alt: 'hotel',
      title: 'Hotel',
    },
    {
      icon: GiFarmTractor,
      alt: 'fazendas',
      title: 'Fazendas',
    },
    {
      icon: HiOutlineHome,
      alt: 'chale',
      title: 'Chalé',
    },
    {
      icon: LiaBedSolid,
      alt: 'pousada',
      title: 'Pousada',
    }
  ]

const QuickSearch = () => {
  return (
    <div className="container mx-auto p-5">

      <LabelElement text="Busque por" />

      <div className="flex w-full justify-around mt-5 lg:justify-center lg:mt-10 lg:gap-40">
        {QUICK_SEARCH_TABS.map((tab) => {
          const { icon: Icon, alt, title } = tab

          return (
            <div key={alt} className="flex flex-col items-center gap-1 cursor-pointer">
              <Link
                href={`/travels/search?text=${title}`}
                className="flex flex-col items-center hover:text-primaryDarker transition-all text-primaryDarker"
              >
                <Icon size={35} />
                <p className="text-xs font-semibold lg:text-base text-primaryGray">{title}</p>
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default QuickSearch