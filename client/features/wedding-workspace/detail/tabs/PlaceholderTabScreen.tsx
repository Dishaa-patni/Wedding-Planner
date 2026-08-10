type PlaceholderTabScreenProps = {
  title: string
  description: string
  items: string[]
}

export function PlaceholderTabScreen({
  title,
  description,
  items,
}: PlaceholderTabScreenProps) {
  return (
    <div className="mt-7 rounded-[24px] border border-[#F0DDD8] bg-white/86 p-6 shadow-[0_14px_38px_rgba(183,110,121,0.06)]">
      <div className="max-w-2xl">
        <h2 className="text-xl font-bold text-[#3B2928]">{title}</h2>
        <p className="mt-2 text-sm leading-6 text-[#756967]">{description}</p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <div
            key={item}
            className="rounded-[18px] border border-[#F0DDD8] bg-[#FFF9F6]/70 px-5 py-4 text-sm font-semibold text-[#3B2928]"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}

