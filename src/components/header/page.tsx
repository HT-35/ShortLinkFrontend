import { Button } from '@/components/ui/button';
import React from 'react';

const Header = () => {
	return (
		<div className='flex justify-between items-center'>
			<div className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-blue-500 text-transparent bg-clip-text select-none">
				Boostech
			</div>

			<div className="auth flex justify-between text-white items-center font-medium gap-10">
				<Button className="px-4 py-2 rounded-full  border-[1px] border-[#353C4A] bg-slate-2">Login</Button>
				<Button className="px-5 py-2 rounded-full bg-secondary ">Register Now</Button>
			</div>
		</div>
	);
};

export default Header;