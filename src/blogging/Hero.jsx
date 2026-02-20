import React from 'react'

const Hero = () => {
  return (
    // Reduced padding on mobile (p-6) vs desktop (md:p-20)
    <main className='p-6 md:p-20 h-fit'>
        <div className='flex flex-col items-center justify-center text-center max-w-7xl mx-auto'>
            {/* Mobile: text-4xl 
              Tablet: text-7xl (md:)
              Desktop: text-9xl (lg:)
            */}
            <h1 className='text-4xl md:text-7xl lg:text-9xl font-bold leading-tight'>
                About self love & Relationships
            </h1>
            
            {/* Mobile: text-xl 
              Tablet: text-3xl (md:)
              Desktop: text-5xl (lg:)
            */}
            <p className='text-xl md:text-3xl lg:text-5xl leading-tight mt-6 md:mt-10 text-gray-700'>
                Hi, I’m a Fitness enthusiast eager to share everything that I learned through my 5-year transformation 
            </p>
        </div>
    </main>
  )
}

export default Hero