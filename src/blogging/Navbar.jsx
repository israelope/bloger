import React from 'react'

const Navbar = () => {
  return (
    <main className='p-10'>
        <div className='flex justify-between'>
            <div className='flex gap-3'>
                <h1 className='font-black'>Amanda</h1>
                <p>a freelance blog writer</p>
            </div>
            <div className='gap-10 flex'>
                <a href="/">Home</a>
                <a href="/">About</a>
                <a href="/">Blog</a>
                <a href="/">Contact</a>
            </div>
        </div>
    </main>
  )
}

export default Navbar