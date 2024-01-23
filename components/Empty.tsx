import Image from "next/image"

interface EmptyProps{
    lable: string,

}

export const Empty = ({lable}: EmptyProps) => {
  return (
    <div className=" h-full p-20 flex flex-col justify-center items-center">
       <div className="relative h-72 w-72">
        <Image alt="Empty" src="/empty.png" fill sizes="none"/>
       </div>
       <p className="text-muted-foreground text-sm text-center">
        {lable}
       </p>
    </div>
  )
}
