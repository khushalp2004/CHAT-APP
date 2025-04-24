import React from 'react'

const AuthImagePattern = ({title,subTitle}) => {
    const num=Math.floor(Math.random() * 3) + 3;
    console.log(`Random number for animation: ${num}`);
  return (
    <div className='hidden lg:flex flex justify-center items-center bg-base-200 p-12'>
      <div className='w-70 h-70 max-w-lg text-center'>
        <div className="grid grid-cols-3 gap-2 mb-8">
            {[...Array(9)].map((_, i) => (
                <div 
                key={i}
                className={`aspect-square rounded-2xl bg-primary/30 ${i%num===0 ? "animate-spin": ""
                    }`}
                />
            ))}
        </div>
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="text-base-content/60">{subTitle}</p>
      </div>
    </div>
  )
}

export default AuthImagePattern
