import {
  Home,
  PanelLeft,
  BrickWall,
  Users,
  User2,
  Car,
  UserCheck,
  Truck,
  Shield,
  Key,
  User,
  ClipboardList,
  ChevronRight,
  Settings,
  Layers,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { NavLink, useNavigate, useNavigation, useLocation } from 'react-router';

import logo from '@/assets/logo.svg';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { paths } from '@/config/paths';
import { useLogout } from '@/lib/auth';
import { ROLES, useAuthorization } from '@/lib/authorization';
import { cn } from '@/utils/cn';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown';
import { Link } from '../ui/link';

type NavigationLink = {
  name: string;
  to: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

type NavigationGroup = {
  type: 'group';
  name: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  items: NavigationLink[];
};

type NavigationItem =
  | {
      type: 'link';
      name: string;
      to: string;
      icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    }
  | NavigationGroup;

const Logo = () => {
  return (
    <Link className="flex items-center text-white" to={paths.home.getHref()}>
      <img className="h-8 w-auto" src={logo} alt="Workflow" />
      <span className="text-sm font-semibold text-white">
        Bulletproof React
      </span>
    </Link>
  );
};

const Progress = () => {
  const { state, location } = useNavigation();

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(0);
  }, [location?.pathname]);

  useEffect(() => {
    if (state === 'loading') {
      const timer = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress === 100) {
            clearInterval(timer);
            return 100;
          }
          const newProgress = oldProgress + 10;
          return newProgress > 100 ? 100 : newProgress;
        });
      }, 300);

      return () => {
        clearInterval(timer);
      };
    }
  }, [state]);

  if (state !== 'loading') {
    return null;
  }

  return (
    <div
      className="fixed left-0 top-0 h-1 bg-blue-500 transition-all duration-200 ease-in-out"
      style={{ width: `${progress}%` }}
    ></div>
  );
};

function CollapsibleNavigationGroup({
  group,
  pathname,
}: {
  group: NavigationGroup;
  pathname: string;
}) {
  const isChildActive = group.items.some(
    (item) => pathname === item.to || pathname.startsWith(item.to + '/'),
  );
  const [isOpen, setIsOpen] = useState(isChildActive);

  useEffect(() => {
    if (isChildActive) {
      setIsOpen(true);
    }
  }, [isChildActive]);

  const Icon = group.icon;

  return (
    <div className="flex w-full flex-col">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'text-gray-300 hover:bg-gray-700 hover:text-white',
          'group flex w-full items-center justify-between rounded-md p-2 text-base font-medium transition-all duration-200 ease-in-out',
          isChildActive && 'bg-gray-900/40 text-white',
        )}
      >
        <div className="flex items-center">
          <Icon
            className="mr-4 size-6 shrink-0 text-gray-400 group-hover:text-gray-300"
            aria-hidden="true"
          />
          <span>{group.name}</span>
        </div>
        <ChevronRight
          className={cn(
            'size-4 text-gray-400 transition-transform duration-200',
            isOpen && 'rotate-90 text-white',
          )}
        />
      </button>

      <div
        className={cn(
          'grid transition-all duration-200 ease-in-out',
          isOpen
            ? 'grid-rows-[1fr] opacity-100 mt-1'
            : 'grid-rows-[0fr] opacity-0 overflow-hidden',
        )}
      >
        <div className="ml-6 flex min-h-0 flex-col gap-1 overflow-hidden border-l border-gray-800 pl-4">
          {group.items.map((item) => (
            <NavLink
              key={item.name}
              to={item.to}
              end
              className={({ isActive }) =>
                cn(
                  'text-gray-400 hover:bg-gray-700/50 hover:text-white',
                  'group flex w-full items-center rounded-md p-2 text-sm font-medium transition-colors duration-150',
                  isActive && 'bg-gray-900 text-white font-semibold',
                )
              }
            >
              <item.icon
                className="mr-3 size-4 shrink-0 text-gray-500 group-hover:text-gray-300"
                aria-hidden="true"
              />
              {item.name}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
}

const NavigationMenu = ({ checkAccess }: { checkAccess: any }) => {
  const location = useLocation();
  const { pathname } = location;

  const navigationItems: NavigationItem[] = [
    {
      type: 'link',
      name: 'Dashboard',
      to: paths.app.dashboard.getHref(),
      icon: Home,
    },
    {
      type: 'link',
      name: 'Production',
      to: paths.app.production.getHref(),
      icon: Home,
    },
    {
      type: 'group',
      name: 'Master Data',
      icon: BrickWall,
      items: [
        {
          name: 'Material',
          to: paths.app.masterMaterial.getHref(),
          icon: BrickWall,
        },
        {
          name: 'Car Model',
          to: paths.app.masterCarModel.getHref(),
          icon: Car,
        },
        {
          name: 'Customer',
          to: paths.app.masterCustomer.getHref(),
          icon: UserCheck,
        },
        {
          name: 'Supplier',
          to: paths.app.masterSupplier.getHref(),
          icon: Truck,
        },
        {
          name: 'Logistic',
          to: paths.app.masterLogistic.getHref(),
          icon: Truck,
        },
        {
          name: 'BOM',
          to: paths.app.masterBom.getHref(),
          icon: ClipboardList,
        },
      ],
    },
    {
      type: 'group',
      name: 'Inventory',
      icon: Layers,
      items: [
        {
          name: 'Stock List',
          to: paths.app.inventory.getHref(),
          icon: ClipboardList,
        },
        {
          name: 'Auto Order Settings',
          to: paths.app.autoOrder.getHref(),
          icon: Settings,
        },
      ],
    },
    {
      type: 'group',
      name: 'Administration',
      icon: Shield,
      items: [
        { name: 'Role', to: paths.app.masterRole.getHref(), icon: Shield },
        {
          name: 'Role Permissions',
          to: paths.app.masterRolePermissions.getHref(),
          icon: Key,
        },
        { name: 'User', to: paths.app.masterUser.getHref(), icon: User },
        checkAccess({ allowedRoles: [ROLES.ADMIN] }) && {
          name: 'Users',
          to: paths.app.users.getHref(),
          icon: Users,
        },
      ].filter(Boolean) as NavigationLink[],
    },
  ];

  return (
    <div className="flex w-full flex-col gap-2">
      {navigationItems.map((item) => {
        if (item.type === 'link') {
          return (
            <NavLink
              key={item.name}
              to={item.to}
              end
              className={({ isActive }) =>
                cn(
                  'text-gray-300 hover:bg-gray-700 hover:text-white',
                  'group flex w-full items-center rounded-md p-2 text-base font-medium transition-colors duration-150',
                  isActive && 'bg-gray-900 text-white',
                )
              }
            >
              <item.icon
                className="mr-4 size-6 shrink-0 text-gray-400 group-hover:text-gray-300"
                aria-hidden="true"
              />
              {item.name}
            </NavLink>
          );
        } else {
          return (
            <CollapsibleNavigationGroup
              key={item.name}
              group={item}
              pathname={pathname}
            />
          );
        }
      })}
    </div>
  );
};

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const logout = useLogout({
    onSuccess: () => navigate(paths.auth.login.getHref(location.pathname)),
  });
  const { checkAccess } = useAuthorization();

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-60 flex-col border-r bg-black sm:flex">
        <div className="flex h-16 shrink-0 items-center border-b border-gray-900 bg-black px-6">
          <Logo />
        </div>
        <nav className="flex-1 overflow-y-auto px-4 py-6">
          <NavigationMenu checkAccess={checkAccess} />
        </nav>
      </aside>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-60">
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:justify-end sm:border-0 sm:bg-transparent sm:px-6">
          <Progress />
          <Drawer>
            <DrawerTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <PanelLeft className="size-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </DrawerTrigger>
            <DrawerContent
              side="left"
              className="flex h-full flex-col border-r border-gray-900 bg-black p-0 text-white sm:max-w-60"
            >
              <div className="flex h-16 shrink-0 items-center border-b border-gray-900 px-6">
                <Logo />
              </div>
              <nav className="flex-1 overflow-y-auto px-4 py-6">
                <NavigationMenu checkAccess={checkAccess} />
              </nav>
            </DrawerContent>
          </Drawer>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="overflow-hidden rounded-full"
              >
                <span className="sr-only">Open user menu</span>
                <User2 className="size-6 rounded-full" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => navigate(paths.app.profile.getHref())}
                className={cn('block px-4 py-2 text-sm text-gray-700')}
              >
                Your Profile
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className={cn('block px-4 py-2 text-sm text-gray-700 w-full')}
                onClick={() => logout.mutate({})}
              >
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          {children}
        </main>
      </div>
    </div>
  );
}
