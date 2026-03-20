'use client';
import { Button } from '@/components/ui/button';
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from '@/components/ui/input-group';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { BellDotIcon, MoonIcon, SearchIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';

export const DashboardTopbar = () => {
	const { theme, setTheme } = useTheme();
	return (
		<div className="bg-background border-b px-2 h-14 items-center flex">
			<div className="flex items-center justify-between w-full">
				<div className="flex items-center gap-5">
					<SidebarTrigger />

					<InputGroup className="rounded w-xs font-sans">
						<InputGroupInput
							placeholder="Search product, orders...."
							className="rounded"
						/>
						<InputGroupAddon>
							<SearchIcon />
						</InputGroupAddon>
					</InputGroup>
				</div>
				<div className="flex gap-3">
					<Button
						variant="ghost"
						onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
						className="rounded"
					>
						{theme === 'dark' ? <SunIcon /> : <MoonIcon />}
					</Button>

					<Button variant="ghost" className="rounded">
						<BellDotIcon />
					</Button>
				</div>
			</div>
		</div>
	);
};
