'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import {
	BellIcon,
	Grid,
	HeartIcon,
	LogOutIcon,
	Menu,
	Moon,
	ShoppingCartIcon,
	Sun,
	UserCircleIcon,
	UserRoundIcon,
	X,
} from 'lucide-react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
	DropdownMenuItem,
} from '../ui/dropdown-menu';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export const Topbar = () => {
	const router = useRouter();
	const { theme, setTheme } = useTheme();
	const [open, setOpen] = useState(false);
	const [dropdown, setDropdown] = useState(false);

	const withoutUsers = [
		{
			icon: UserCircleIcon,
			text: 'Login',
			route: '/login',
		},
		{
			icon: UserCircleIcon,
			text: 'Register',
			route: '/register',
		},
	];

	const withUsers = [
		{
			icon: Grid,
			text: 'Dashboard',
			route: '/dashboard',
		},
	];

	const handleLogout = async () => {
		console.log('object');
	};

	return (
		<div>
			<nav className="w-full bg-background border-b">
				<div className="container mx-auto flex items-center px-3 md:px-0 justify-between py-3">
					{/* Logo */}
					<button className="md:hidden" onClick={() => setOpen(!open)}>
						{open ? <X size={26} /> : <Menu size={26} />}
					</button>

					<Link href="/" className="text-2xl font-bold font-manrope">
						Logo
					</Link>

					{/* Desktop Menu */}
					<div className="hidden md:flex items-center gap-6 font-manrope">
						<Link href="/" className="hover:text-primary">
							Home
						</Link>
						<Link href="/shop" className="hover:text-primary">
							Shop
						</Link>
						<Link href="/career" className="hover:text-primary">
							Career
						</Link>
						<Link href="/blog" className="hover:text-primary">
							Our Blog
						</Link>
						<Link href="/about" className="hover:text-primary">
							About
						</Link>
						<Link href="/contact" className="hover:text-primary">
							Contact
						</Link>
					</div>

					<div className="flex items-center gap-1">
						<Button
							onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
							className="hidden md:flex"
							variant="ghost"
						>
							{theme === 'light' ? (
								<Moon className="w-5 h-5" />
							) : (
								<Sun className="w-5 h-5" />
							)}
						</Button>

						<DropdownMenu onOpenChange={setDropdown}>
							<DropdownMenuTrigger asChild>
								<div
									onMouseEnter={() => setDropdown(true)}
									onMouseLeave={() => setDropdown(false)}
								>
									<Button variant="ghost" className="relative">
										<UserRoundIcon className="w-5 h-5" />
									</Button>
								</div>
							</DropdownMenuTrigger>

							<DropdownMenuContent
								align="end"
								className="w-44 rounded"
								onMouseEnter={() => setOpen(true)}
								onMouseLeave={() => setOpen(false)}
							>
								] // User is logged in
								<>
									{withUsers.map((item, i) => (
										<Link
											key={i}
											href={item.route}
											className="font-manrope text-md hover:text-[#f47527]"
										>
											<DropdownMenuItem>
												<item.icon />
												<span>{item.text}</span>
											</DropdownMenuItem>
										</Link>
									))}

									{/* Logout button */}
									<DropdownMenuItem
										onClick={handleLogout}
										className="text-red-500 font-manrope text-md"
									>
										<LogOutIcon className="text-red-500" />
										Logout
									</DropdownMenuItem>
								</>
								{/* // User not logged in or data is undefined
									withoutUsers.map((item, i) => (
										<Link
											key={i}
											href={item.route}
											className="font-manrope text-md hover:text-[#f47527]"
										>
											<DropdownMenuItem>
												<item.icon />
												<span>{item.text}</span>
											</DropdownMenuItem>
										</Link>
									))
								)} */}
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>

				{/* Mobile Dropdown Menu */}
				{open && (
					<div className="md:hidden flex flex-col gap-4 px-6 pb-5 animate-in slide-in-from-top duration-300 z-50">
						<Link href="/" onClick={() => setOpen(false)}>
							Home
						</Link>
						<Link href="/shop" onClick={() => setOpen(false)}>
							Shop
						</Link>
						<Link href="/about" onClick={() => setOpen(false)}>
							About
						</Link>
						<Link href="/contact" onClick={() => setOpen(false)}>
							Contact
						</Link>
					</div>
				)}
			</nav>
		</div>
	);
};
