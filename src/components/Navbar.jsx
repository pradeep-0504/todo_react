import React from 'react';

export default function Navbar() {
  return (
    <nav className='flex justify-between bg-slate-700 text-white p-2 h-10'>
        <div className="logo">
            <span className='font-bold text-xl mx-8'>iTask</span>
        </div>
      <ul className='flex gap-8 mx-10'>
        <li className='cursor-pointer hover:font-bold transition-all '>Home</li>
        <li className='cursor-pointer hover:font-bold transition-all '>Your tasks</li>
      </ul>
    </nav>
  );
}
