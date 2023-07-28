interface LabelElementProps {
  text: string
}

const LabelElement = ({ text }: LabelElementProps) => {
  return (
    <div className="flex items-center gap-3">
      <div className="w-full h-[1px] bg-primaryGrayLighter" />
      <h2 className="font-medium text-primaryGray whitespace-nowrap">{text}</h2>
      <div className="w-full h-[1px] bg-primaryGrayLighter" />
    </div>
  )
}

export default LabelElement