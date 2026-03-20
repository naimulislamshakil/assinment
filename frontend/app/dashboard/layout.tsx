import { DashboardSidebar } from '@/components/common/dashboard-sidebar';
import { DashboardTopbar } from '@/components/common/dashboard-topbar';
import { SidebarProvider } from '@/components/ui/sidebar';

interface Props {
	children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
	return (
		<div className="container-fluid">
			<SidebarProvider>
				<DashboardSidebar />
				<main className="flex-1 w-full">
					<DashboardTopbar />
					{children}
				</main>
			</SidebarProvider>
		</div>
	);
};

export default Layout;
