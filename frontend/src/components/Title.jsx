function Title({text1, text2}) {
  return (
    <div className='inline-flex gap-2 items-center mb-3'>
      <p className='text-gray-500 font-medium'>{text1} <span className='text-gray-900 font-bold'>{text2}</span></p>
      <p className='w-10 sm:w-14 h-0.5 bg-linear-to-r from-orange-500 to-orange-600 rounded-full'></p>
    </div>
  )
}

export default Title