'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useMeQuery } from '@/Redux/slice/userSlice';
import {
	ArchiveIcon,
	BoxIcon,
	BubblesIcon,
	CodesandboxIcon,
	EllipsisVerticalIcon,
	GemIcon,
	Heart,
	HelpCircleIcon,
	LayoutGridIcon,
	LogOutIcon,
	Package,
	Pen,
	SettingsIcon,
	SparklesIcon,
	User2Icon,
	UserCheckIcon,
	Users2Icon,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export const DashboardSidebar = () => {
	const router = useRouter();
	const pathName = usePathname();
	const { data } = useMeQuery();
	const routers = [
		{
			route: '/dashboard',
			label: 'Dashboard',
			icon: LayoutGridIcon,
		},
		{
			route: '/dashboard/my-profile',
			label: 'My Profile',
			icon: User2Icon,
		},
		{
			route: '/dashboard/my-order',
			label: 'My Order',
			icon: Package,
		},
		{
			route: '/dashboard/wishlist',
			label: 'Wishlist',
			icon: Heart,
		},
		{
			route: '/dashboard/my-reviews',
			label: 'My Reviews',
			icon: Pen,
		},
	];

	const adminRoutes = [
		{
			route: '/dashboard',
			label: 'Dashboard',
			icon: LayoutGridIcon,
		},
		{
			route: '/dashboard/user',
			label: 'User Management',
			icon: UserCheckIcon,
		},
		{
			route: '/dashboard/brands-management',
			label: 'Brands Management',
			icon: CodesandboxIcon,
		},
		{
			route: '/dashboard/suppliers-management',
			label: 'Suppliers Management',
			icon: Users2Icon,
		},
		{
			route: '/dashboard/categories-management',
			label: 'Categories Management',
			icon: GemIcon,
		},
		{
			route: '/dashboard/products-management',
			label: 'Products Management',
			icon: BoxIcon,
		},
	];

	return (
		<Sidebar className="h-full  bg-background">
			<SidebarHeader className="p-4 flex">
				<div className="flex gap-2 items-center">
					<div className="bg-blue-500 w-fit p-2 rounded">
						<ArchiveIcon />
					</div>
					<div>
						<h2 className="font-sans font-semibold text-xl tracking-wide text-accent-foreground">
							ProInventory
						</h2>
						<p className="font-sans text-[12px] tracking-wide text-accent-foreground">
							V2.12 SMB Suite
						</p>
					</div>
				</div>
			</SidebarHeader>

			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupContent>
						<SidebarMenu className="space-y-1">
							{data?.data?.role === 'user'
								? routers.map((route, i) => (
										<SidebarMenuItem key={i}>
											<SidebarMenuButton
												asChild
												className={`font-manrope font-semibold flex items-center gap-2 ${
													route.route === '/dashboard'
														? pathName === route.route
														: pathName === route.route ||
														  pathName.startsWith(`${route.route}/`)
														? 'bg-blue-500 text-white'
														: 'text-gray-500 dark:text-gray-400'
												}`}
											>
												<Link href={route.route}>
													<route.icon />
													<span>{route.label}</span>
												</Link>
											</SidebarMenuButton>
										</SidebarMenuItem>
								  ))
								: adminRoutes.map((route, i) => (
										<SidebarMenuItem key={i}>
											<SidebarMenuButton
												asChild
												className={`font-manrope font-semibold flex items-center gap-2 ${
													route.route === '/dashboard'
														? pathName === route.route
														: pathName === route.route ||
														  pathName.startsWith(`${route.route}/`)
														? 'bg-blue-500 text-white'
														: 'text-gray-500 dark:text-gray-400'
												}`}
											>
												<Link href={route.route}>
													<route.icon />
													<span>{route.label}</span>
												</Link>
											</SidebarMenuButton>
										</SidebarMenuItem>
								  ))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				<Separator />
				<div className="flex items-center gap-3">
					<Avatar size="lg">
						<AvatarImage src={data?.data?.avatar || '/avatar.png'} />
						<AvatarFallback className="font-sans">U</AvatarFallback>
					</Avatar>

					<div className="flex items-center justify-between w-full">
						<div>
							<p className="font-semibold text-sm font-sans">
								{data?.data?.name}
							</p>
							<p className="text-xs text-gray-500 capitalize font-sans">
								{data?.data?.role}
							</p>
						</div>

						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<EllipsisVerticalIcon className="size-5" />
							</DropdownMenuTrigger>

							<DropdownMenuContent className="w-72 rounded" align="start">
								<DropdownMenuItem>
									<div className="flex items-center gap-3">
										<Avatar size="lg">
											<AvatarImage src={data?.data?.avatar || '/avatar.png'} />
											<AvatarFallback className="font-sans">U</AvatarFallback>
										</Avatar>

										<div>
											<p className="font-semibold text-sm font-sans">
												{data?.data?.name}
											</p>
											<p className="text-xs text-gray-500 font-sans">
												{data?.data?.email}
											</p>
										</div>
									</div>
								</DropdownMenuItem>
								<Separator className="my-2" />
								<DropdownMenuItem
									onClick={() => router.push('/upgrade-plan')}
									className="font-sans px-3"
								>
									<SparklesIcon className="size-4" />
									Upgrade Plan
								</DropdownMenuItem>
								<DropdownMenuItem className="font-sans px-3">
									<BubblesIcon className="size-4" />
									Personalization
								</DropdownMenuItem>
								<DropdownMenuItem className="font-sans px-3">
									<SettingsIcon className="size-4" />
									Settings
								</DropdownMenuItem>
								<Separator className="my-2" />
								<DropdownMenuItem className="font-sans px-3">
									<HelpCircleIcon className="size-4" />
									Help
								</DropdownMenuItem>
								<DropdownMenuItem className="font-sans px-3">
									<LogOutIcon className="size-4" />
									Log out
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>
			</SidebarFooter>
		</Sidebar>
	);
};
