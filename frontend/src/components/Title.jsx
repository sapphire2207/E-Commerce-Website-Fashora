function Title({text1, text2}) {
  return (
    <div className="inline-flex gap-3 items-center mb-3">
      <p className="text-stone-500 text-xs sm:text-2xl font-semibold tracking-[0.2em] uppercase">
        {text1} <span className="text-stone-900 font-bold">{text2}</span>
      </p>
      <p className="w-12 sm:w-16 h-0.5 bg-linear-to-r from-orange-500 to-orange-600 rounded-full shadow-[0_0_0_1px_rgba(251,146,60,0.15)]"></p>
    </div>
  )
}

export default Title