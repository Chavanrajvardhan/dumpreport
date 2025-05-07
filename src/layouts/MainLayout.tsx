import Sidebar from '@/components/Sidebar';
import TopNavbar from '@/components/TopNavbar';
import './MainLayout.css'; // optional layout-level styles

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="page-wrapper">
      <Sidebar sidebarOpen={sidebarOpen} />
      <div className="main-content">
        <TopNavbar sidebarOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="main-area">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
