# Tutorial: Membuat Sidebar Interaktif, Collapsible, dan Scrollable dengan React & Tailwind CSS

Tutorial ini akan memandu Anda langkah demi langkah untuk mengubah sidebar yang awalnya kaku (daftar panjang yang flat) menjadi sidebar modern yang interaktif, memiliki menu yang dapat dilipat (*collapsible*), dan ramah terhadap layar kecil (*scrollable*). 

Target audiens tutorial ini adalah **programmer pemula (junior developer)** yang sudah memahami dasar-dasar React dan Tailwind CSS.

---

## Daftar Isi
1. [Langkah 1: Mengimpor Dependency Baru](#langkah-1-mengimpor-dependency-baru)
2. [Langkah 2: Menentukan Struktur Data Menu (TypeScript Types)](#langkah-2-menentukan-struktur-data-menu-typescript-types)
3. [Langkah 3: Membuat Komponen Lipat `CollapsibleNavigationGroup`](#langkah-3-membuat-komponen-lipat-collapsiblenavigationgroup)
4. [Langkah 4: Membuat Menu Navigasi Terpusat `NavigationMenu`](#langkah-4-membuat-menu-navigasi-terpusat-navigationmenu)
5. [Langkah 5: Memperbarui Sidebar Versi Desktop](#langkah-5-memperbarui-sidebar-versi-desktop)
6. [Langkah 6: Memperbarui Sidebar Versi Mobile (Drawer)](#langkah-6-memperbarui-sidebar-versi-mobile-drawer)
7. [Langkah 7: Melakukan Uji Coba (Verifikasi)](#langkah-7-melakukan-uji-coba-verifikasi)

---

## Langkah 1: Mengimpor Dependency Baru

Buka file [dashboard-layout.tsx](file:///Users/amier/bootcamp/fe/src/components/layouts/dashboard-layout.tsx). Kita membutuhkan beberapa modul tambahan dari React Router dan ikon baru dari Lucide React.

Ubah bagian paling atas file Anda untuk mengimpor `useLocation` dan ikon `ChevronRight`:

```typescript
import {
  // ... ikon lainnya
  ChevronRight,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { NavLink, useNavigate, useNavigation, useLocation } from 'react-router';
```
*   **`useLocation`**: React Hook untuk mendeteksi URL aktif guna menentukan sub-menu mana yang harus otomatis terbuka.
*   **`ChevronRight`**: Ikon panah yang akan diputar sebagai indikator menu terbuka atau tertutup.

---

## Langkah 2: Menentukan Struktur Data Menu (TypeScript Types)

Kita perlu mendefinisikan bentuk data dari menu navigasi kita. Tambahkan tipe data berikut di bawah bagian impor:

```typescript
type NavigationLink = {
  name: string;
  to: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

type NavigationGroup = {
  type: 'group';
  name: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  items: NavigationLink[]; // Berisi daftar sub-menu
};

type NavigationItem =
  | {
      type: 'link';
      name: string;
      to: string;
      icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    }
  | NavigationGroup;
```
*   **`NavigationLink`**: Mewakili menu biasa tingkat teratas atau sub-menu.
*   **`NavigationGroup`**: Mewakili grup menu yang dapat dilipat (seperti Master Data) yang menyimpan daftar `items` di dalamnya.

---

## Langkah 3: Membuat Komponen Lipat `CollapsibleNavigationGroup`

Sekarang kita akan membuat sebuah komponen React mandiri di dalam file yang sama untuk mengontrol buka-tutup sub-menu.

Tambahkan kode berikut sebelum fungsi `DashboardLayout`:

```tsx
function CollapsibleNavigationGroup({
  group,
  pathname,
}: {
  group: NavigationGroup;
  pathname: string;
}) {
  // 1. Cek apakah ada sub-menu di dalamnya yang aktif saat ini
  const isChildActive = group.items.some(
    (item) => pathname === item.to || pathname.startsWith(item.to + '/'),
  );
  
  // 2. State untuk menyimpan apakah menu terbuka (open) atau tertutup (closed)
  const [isOpen, setIsOpen] = useState(isChildActive);

  // 3. Auto-expand: Jika sub-menu aktif, otomatis buka grup ini
  useEffect(() => {
    if (isChildActive) {
      setIsOpen(true);
    }
  }, [isChildActive]);

  const Icon = group.icon;

  return (
    <div className="w-full flex flex-col">
      {/* Tombol Header Grup */}
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
          <Icon className="text-gray-400 group-hover:text-gray-300 mr-4 size-6 shrink-0" aria-hidden="true" />
          <span>{group.name}</span>
        </div>
        
        {/* Ikon Chevron yang Berputar */}
        <ChevronRight
          className={cn(
            'size-4 text-gray-400 transition-transform duration-200',
            isOpen && 'rotate-90 text-white',
          )}
        />
      </button>

      {/* Bagian Sub-menu dengan Efek Transisi Tinggi Grid (0fr -> 1fr) */}
      <div
        className={cn(
          'grid transition-all duration-200 ease-in-out',
          isOpen
            ? 'grid-rows-[1fr] opacity-100 mt-1'
            : 'grid-rows-[0fr] opacity-0 overflow-hidden',
        )}
      >
        <div className="overflow-hidden min-h-0 ml-6 pl-4 border-l border-gray-800 flex flex-col gap-1">
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
              <item.icon className="text-gray-500 group-hover:text-gray-300 mr-3 size-4 shrink-0" aria-hidden="true" />
              {item.name}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
}
```

> [!TIP]
> Trik menggunakan `grid-rows-[0fr]` dan `grid-rows-[1fr]` di atas dikombinasikan dengan `transition-all` adalah cara CSS modern yang sangat mulus untuk melakukan transisi ketinggian (*height transition*) dari nol ke ukuran dinamis tanpa memerlukan Javascript tambahan.

---

## Langkah 4: Membuat Menu Navigasi Terpusat `NavigationMenu`

Agar menu tidak ditulis berulang-ulang di versi desktop dan mobile, buat satu komponen penampung menu bernama `NavigationMenu` di atas fungsi `DashboardLayout`:

```tsx
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
      type: 'group',
      name: 'Master Data',
      icon: BrickWall,
      items: [
        { name: 'Material', to: paths.app.masterMaterial.getHref(), icon: BrickWall },
        { name: 'Car Model', to: paths.app.masterCarModel.getHref(), icon: Car },
        { name: 'Customer', to: paths.app.masterCustomer.getHref(), icon: UserCheck },
        { name: 'Supplier', to: paths.app.masterSupplier.getHref(), icon: Truck },
        { name: 'Logistic', to: paths.app.masterLogistic.getHref(), icon: Truck },
        { name: 'BOM', to: paths.app.masterBom.getHref(), icon: ClipboardList },
      ],
    },
    {
      type: 'group',
      name: 'Administration',
      icon: Shield,
      items: [
        { name: 'Role', to: paths.app.masterRole.getHref(), icon: Shield },
        { name: 'Role Permissions', to: paths.app.masterRolePermissions.getHref(), icon: Key },
        { name: 'User', to: paths.app.masterUser.getHref(), icon: User },
        // Menu bersyarat: Hanya muncul jika user adalah ADMIN
        checkAccess({ allowedRoles: [ROLES.ADMIN] }) && {
          name: 'Users',
          to: paths.app.users.getHref(),
          icon: Users,
        },
      ].filter(Boolean) as NavigationLink[],
    },
  ];

  return (
    <div className="flex flex-col gap-2 w-full">
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
              <item.icon className="text-gray-400 group-hover:text-gray-300 mr-4 size-6 shrink-0" aria-hidden="true" />
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
```

---

## Langkah 5: Memperbarui Sidebar Versi Desktop

Masuk ke dalam fungsi utama `DashboardLayout`. Kita akan membagi sidebar menjadi area logo tetap dan area navigasi yang bisa di-scroll.

Ubah kode `<aside>` Anda menjadi seperti ini:

```tsx
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-60 flex-col border-r bg-black sm:flex">
        {/* Header Logo Tetap */}
        <div className="flex h-16 shrink-0 items-center px-6 border-b border-gray-900 bg-black">
          <Logo />
        </div>
        {/* Area Navigasi Scrollable */}
        <nav className="flex-1 overflow-y-auto px-4 py-6">
          <NavigationMenu checkAccess={checkAccess} />
        </nav>
      </aside>
```
*   **`flex-1`**: Mengambil sisa ruang tinggi yang tersisa.
*   **`overflow-y-auto`**: Menambahkan scrollbar vertikal otomatis ketika sub-menu dibuka dan melebihi tinggi layar.

---

## Langkah 6: Memperbarui Sidebar Versi Mobile (Drawer)

Kita harus menerapkan struktur yang sama di dalam menu Drawer (tampilan layar HP/Tablet) agar kedua tampilan tetap sinkron.

Cari komponen `<DrawerContent>` dan perbarui menjadi:

```tsx
            <DrawerContent
              side="left"
              className="bg-black text-white sm:max-w-60 h-full flex flex-col p-0 border-r border-gray-900"
            >
              {/* Header Logo Tetap */}
              <div className="flex h-16 shrink-0 items-center px-6 border-b border-gray-900">
                <Logo />
              </div>
              {/* Area Navigasi Scrollable */}
              <nav className="flex-1 overflow-y-auto px-4 py-6">
                <NavigationMenu checkAccess={checkAccess} />
              </nav>
            </DrawerContent>
```

---

## Langkah 7: Melakukan Uji Coba (Verifikasi)

Setelah menyimpan semua perubahan, pastikan tidak ada kesalahan ketik atau kompilasi:

1. **Jalankan Pengecekan Type TypeScript:**
   ```bash
   npm run check-types
   ```
2. **Jalankan Linter (untuk kerapian kode):**
   ```bash
   npm run lint
   ```
3. **Uji di Browser Anda:**
   * Coba klik menu "Master Data", pastikan menu terbuka dengan efek transisi mulus dan panah chevron berputar.
   * Coba perkecil tinggi jendela browser Anda, pastikan sidebar memunculkan scrollbar dan Anda bisa mengakses menu terbawah.
   * Masuk ke halaman "Material" dan segarkan (refresh) browser Anda, pastikan grup "Master Data" otomatis langsung terbuka setelah halaman dimuat kembali.
