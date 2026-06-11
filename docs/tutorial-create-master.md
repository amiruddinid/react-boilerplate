# Panduan Langkah Demi Langkah: Membuat Halaman Master CRUD Baru (BE & FE)

Panduan ini ditujukan untuk programmer baru yang masih bingung mengenai struktur folder, path file, dan cara mengintegrasikan halaman master CRUD baru di dalam aplikasi ini. 

Untuk mempermudah pemahaman, panduan ini menggunakan contoh **Customer** (Pelanggan) yang kodenya **sudah ada dan aktif** di dalam project Anda. Anda bisa membuka file customer asli sambil membaca panduan ini untuk melihat kecocokannya secara langsung baik untuk Backend maupun Frontend.

---

## Daftar Isi
1. [Struktur Folder & Penjelasan Singkat](#1-struktur-folder--penjelasan-singkat)
2. [Cara Cepat: Copy-Paste & Ganti Massal di VS Code (Sangat Direkomendasikan!)](#2-cara-cepat-copy-paste--ganti-massal-di-vs-code-sangat-direkomendasikan)
3. [Langkah 1: Membuat & Menyiapkan Backend (BE) dengan MSSQL](#3-langkah-1-membuat--menyiapkan-backend-be-dengan-mssql)
4. [Langkah 2: Registrasi URL Path di Frontend](#4-langkah-2-registrasi-url-path-di-frontend)
5. [Langkah 3: Membuat Hooks API (React Query) di Frontend](#5-langkah-3-membuat-hooks-api-react-query-di-frontend)
6. [Langkah 4: Membuat UI Components (Tabel & Form)](#6-langkah-4-membuat-ui-components-tabel--form)
7. [Langkah 5: Membuat File Halaman Route (Routes)](#7-langkah-5-membuat-file-halaman-route-routes)
8. [Langkah 6: Mendaftarkan Route ke Aplikasi (React Router)](#8-langkah-6-mendaftarkan-route-ke-aplikasi-react-router)
9. [Langkah 7: Menambahkan Menu ke Sidebar Navigasi](#9-langkah-7-menambahkan-menu-ke-sidebar-navigasi)
10. [Langkah 8: Verifikasi & Testing](#10-langkah-8-verifikasi--testing)

---

## 1. Struktur Folder & Penjelasan Singkat

Di dalam project ini, kita memisahkan logika berdasarkan fitur (**Feature-Based Architecture**) baik di Frontend maupun Backend.

### A. Struktur Folder Frontend (`bootcamp/fe/`)
Semua file frontend utama berada di bawah folder `src/`.

| Nama Folder / File | Fungsi / Deskripsi |
| :--- | :--- |
| `src/config/paths.ts` | Tempat mendaftarkan semua URL path agar tidak hardcoded. |
| `src/features/master/` | Folder utama untuk fitur-fitur halaman master (misal: customer, supplier). |
| `src/features/master/customer/api/` | Tempat menyimpan file *React Query hooks* untuk memanggil backend API. |
| `src/features/master/customer/components/` | Tempat menyimpan komponen UI seperti tabel, form edit, form create, dan dialog hapus. |
| `src/app/routes/app/master/customer/` | Tempat menyimpan file routing yang menghubungkan UI komponen dengan halaman yang bisa dibuka di browser. |
| `src/app/router.tsx` | File routing utama aplikasi tempat mendaftarkan semua route agar bisa diakses. |
| `src/components/layouts/dashboard-layout.tsx` | File layout utama untuk menampilkan sidebar menu di dashboard. |

### B. Struktur Folder Backend (`bootcamp/be/`)
Semua file backend berada di bawah folder `src/`.

| Nama Folder / File | Fungsi / Deskripsi |
| :--- | :--- |
| `src/router.js` | Router utama backend tempat mendaftarkan path modul (seperti `/customer`). |
| `src/api/master/` | Folder utama untuk modul-modul master. |
| `src/api/master/customer/` | Folder fitur master Customer. |
| `.../customer.controller.js` | Controller sekaligus router express lokal untuk modul customer. |
| `.../customer.model.js` | Schema validasi input request body & params menggunakan **Zod**. |
| `.../customer.service.js` | Service layer untuk proses bisnis, try-catch, dan formatting standard response. |
| `.../customer.repository.js` | Repository layer tempat kueri database **MSSQL** dijalankan. |

---

## 2. Cara Cepat: Copy-Paste & Ganti Massal di VS Code (Sangat Direkomendasikan!)

Jika Anda ingin membuat Master baru (misalnya **Product**), cara tercepat dan meminimalisir typo adalah dengan menyalin (copy) fitur master yang sudah ada (misalnya `customer`), lalu mengubah isinya secara otomatis menggunakan VS Code.

### Langkah-langkahnya:

#### A. Gandakan Folder Fitur Utama di Frontend
1. Klik kanan pada folder `fe/src/features/master/customer` di VS Code explorer.
2. Pilih **Copy** lalu **Paste** di dalam folder `fe/src/features/master/`.
3. Ubah nama folder baru tersebut dari `customer copy` menjadi nama fitur baru Anda, misal: **`product`**.

#### B. Gandakan Folder Route di Frontend
1. Klik kanan pada folder `fe/src/app/routes/app/master/customer`.
2. Pilih **Copy** dan **Paste** ke dalam folder `fe/src/app/routes/app/master/`.
3. Ubah nama folder baru tersebut dari `customer copy` menjadi nama fitur baru Anda, misal: **`product`**.
4. Di dalam folder `product/` baru tersebut, ubah nama file-file di dalamnya agar sesuai dengan nama fitur baru Anda:
   * `customer.tsx` $\rightarrow$ `product.tsx`
   * `customer-detail.tsx` $\rightarrow$ `product-detail.tsx`
   * `create-customer.tsx` $\rightarrow$ `create-product.tsx`
   * `edit-customer.tsx` $\rightarrow$ `edit-product.tsx`

#### C. Gandakan Folder Fitur di Backend
1. Klik kanan pada folder `be/src/api/master/customer`.
2. Pilih **Copy** lalu **Paste** di dalam folder `be/src/api/master/`.
3. Ubah nama folder baru tersebut dari `customer copy` menjadi nama fitur baru Anda, misal: **`product`**.
4. Di dalam folder `product/` baru tersebut, ubah nama file-file di dalamnya agar sesuai dengan nama fitur baru Anda:
   * `customer.controller.js` $\rightarrow$ `product.controller.js`
   * `customer.model.js` $\rightarrow$ `product.model.js`
   * `customer.service.js` $\rightarrow$ `product.service.js`
   * `customer.repository.js` $\rightarrow$ `product.repository.js`

#### D. Lakukan "Find & Replace" Massal di VS Code
VS Code memiliki fitur pencarian global yang sangat berguna untuk mengganti semua kata kunci secara otomatis.

1. Tekan tombol `Ctrl+Shift+F` (Windows/Linux) atau `Cmd+Shift+F` (Mac) untuk membuka tab **Search**.
2. Klik ikon panah kecil di sebelah kiri input pencarian untuk membuka input **Replace**.
3. Di kolom atas (**Search**), tulis kata kunci lama. Di kolom bawah (**Replace**), tulis kata kunci baru.
4. Lakukan penggantian kata kunci ini secara berurutan agar sesuai dengan case-sensitivity (huruf besar/kecil) agar tidak terjadi error:

| No. | Cari (Search) | Ganti dengan (Replace) | Mengapa ini penting? |
| :--- | :--- | :--- | :--- |
| 1 | `customer` | `product` | Mengubah nama path, nama file api, dan lower-case variables. |
| 2 | `Customer` | `Product` | Mengubah nama component React, hooks name, dan title halaman. |
| 3 | `CUSTOMER` | `PRODUCT` | Mengubah properti uppercase database schema & Zod keys. |

5. **Batasi pencarian hanya untuk folder baru Anda saja:** Klik tombol titik tiga (`...`) lalu pada kolom **files to include** isi dengan path folder baru Anda, misal:
   ```text
   src/features/master/product, src/app/routes/app/master/product, src/api/master/product
   ```
   *Hal ini bertujuan agar pencarian & penggantian massal hanya berdampak pada folder baru Anda dan TIDAK merusak file customer asli.*
6. Klik tombol **Replace All** (ikon kotak kecil bertumpuk di sebelah kanan kolom replace) lalu konfirmasi.

---

## 3. Langkah 1: Membuat & Menyiapkan Backend (BE) dengan MSSQL

Berikut adalah contoh kode backend asli dari Master Customer yang berjalan menggunakan arsitektur Controller-Service-Repository dengan database Microsoft SQL Server (MSSQL).

### A. Membuat Tabel Database (SQL Script - MSSQL)
Jalankan query SQL berikut di database MSSQL Anda untuk membuat tabel `TB_M_CUSTOMER` di schema `amir`:

```sql
CREATE TABLE amir.TB_M_CUSTOMER (
  ID VARCHAR(50) PRIMARY KEY,
  CUSTOMER_CODE VARCHAR(50) UNIQUE NOT NULL,
  NAME VARCHAR(255) NOT NULL,
  TYPE VARCHAR(100) NOT NULL,
  ADDRESS VARCHAR(255) NOT NULL,
  PHONE VARCHAR(50) NOT NULL,
  CREATED_BY VARCHAR(100),
  CREATED_DT DATETIME DEFAULT GETDATE(),
  CHANGED_BY VARCHAR(100),
  CHANGED_DT DATETIME
);
```

### B. Membuat Model Schema Validasi (`customer.model.js`)
File ini mendefinisikan validasi input di backend dengan library **Zod**.
```javascript
const z = require('zod');

const createCustomerSchema = z.object({
    CUSTOMER_CODE: z.string().min(1, 'Customer code is required'),
    NAME: z.string().min(1, 'Name is required'),
    TYPE: z.string().min(1, 'Type is required'),
    ADDRESS: z.string().min(1, 'Address is required'),
    PHONE: z.string().min(1, 'Phone is required')
});

const postCustomerSchema = z.object({
    body: createCustomerSchema
});

const putCustomerSchema = z.object({
    params: z.object({ 
        id: z.string().min(1, 'ID is required') 
    }),
    body: createCustomerSchema
});

const deleteCustomerSchema = z.object({
    params: z.object({ 
        id: z.string().min(1, 'ID is required') 
    })
});

module.exports = {
    postCustomerSchema,
    putCustomerSchema,
    deleteCustomerSchema
};
```

### C. Membuat Repository Layer (`customer.repository.js`)
Bagian ini bertugas mengeksekusi raw query SQL ke MSSQL menggunakan pool connection. Perhatikan cara memanggil Stored Procedure untuk men-generate business key (ID unik):
```javascript
const { poolPromise, sql } = require('../../../config/db');

const findAllCustomer = async () => {
    const pool = await poolPromise;
    const request = pool.request();
    const result = await request.query('SELECT ID, CUSTOMER_CODE, NAME, TYPE, ADDRESS, PHONE, CREATED_DT, CREATED_BY, CHANGED_DT, CHANGED_BY FROM amir.TB_M_CUSTOMER');
    
    return {
        data: result.recordset,
        rows: result.rowsAffected[0]
    };
};

const findCustomerById = async (id) => {
    const pool = await poolPromise;
    const request = pool.request();
    const result = await request.query`SELECT ID, CUSTOMER_CODE, NAME, TYPE, ADDRESS, PHONE, CREATED_DT, CREATED_BY, CHANGED_DT, CHANGED_BY FROM amir.TB_M_CUSTOMER WHERE ID = ${id}`;

    return {
        data: result.recordset[0],
        rows: result.rowsAffected[0]
    };
};

const findCustomerByCode = async (customerCode) => {
    const pool = await poolPromise;
    const request = pool.request();
    const result = await request.query`SELECT ID, CUSTOMER_CODE, NAME, TYPE, ADDRESS, PHONE, CREATED_DT, CREATED_BY, CHANGED_DT, CHANGED_BY FROM amir.TB_M_CUSTOMER WHERE CUSTOMER_CODE = ${customerCode}`;
    
    return {
        data: result.recordset[0],
        rows: result.rowsAffected[0]
    };
};

const insertCustomer = async (customerData) => {
    const pool = await poolPromise;
    const request = pool.request();
    const { CUSTOMER_CODE, NAME, TYPE, ADDRESS, PHONE, CREATED_BY } = customerData;

    // Memanggil Stored Procedure untuk menghasilkan ID baru secara otomatis (misal prefix: CUS)
    const businessKeyResult = await pool.request()
            .input('Input_Prefix', 'CUS')
            .output('Output_NewID', sql.VarChar(50), null)
            .execute('amir.usp_GenerateBusinessKey');

    const result = await request.query`
        INSERT INTO amir.TB_M_CUSTOMER (ID, CUSTOMER_CODE, NAME, TYPE, ADDRESS, PHONE, CREATED_BY, CREATED_DT) 
        OUTPUT INSERTED.ID, INSERTED.CUSTOMER_CODE, INSERTED.NAME, INSERTED.TYPE, INSERTED.ADDRESS, INSERTED.PHONE, INSERTED.CREATED_BY, INSERTED.CREATED_DT
        VALUES (${businessKeyResult.output.Output_NewID}, ${CUSTOMER_CODE}, ${NAME}, ${TYPE}, ${ADDRESS}, ${PHONE}, ${CREATED_BY}, GETDATE())`;
    
    return {
        data: result.recordset[0],
        rows: result.rowsAffected[0]
    };
};

const updateCustomerById = async (id, customerData) => {
    const pool = await poolPromise;
    const request = pool.request();
    const { CUSTOMER_CODE, NAME, TYPE, ADDRESS, PHONE, CHANGED_BY } = customerData;
    const result = await request.query`
        UPDATE amir.TB_M_CUSTOMER SET CUSTOMER_CODE = ${CUSTOMER_CODE}, NAME = ${NAME}, 
        TYPE = ${TYPE}, ADDRESS = ${ADDRESS}, PHONE = ${PHONE}, 
        CHANGED_BY = ${CHANGED_BY}, CHANGED_DT = GETDATE() WHERE ID = ${id};
        SELECT ID, CUSTOMER_CODE, NAME, TYPE, ADDRESS, PHONE, CREATED_BY, CREATED_DT, CHANGED_BY, CHANGED_DT 
        FROM amir.TB_M_CUSTOMER WHERE ID = ${id}`;
    
    return {
        data: result.recordset[0],
        rows: result.rowsAffected[0]
    };
};

const deleteCustomerById = async (id) => {
    const pool = await poolPromise;
    const request = pool.request();
    const result = await request.query`
        DELETE FROM amir.TB_M_CUSTOMER WHERE ID = ${id}`;
    
    return {
        data: null,
        rows: result.rowsAffected[0]
    };
};

module.exports = {
    findAllCustomer,
    findCustomerById,
    findCustomerByCode,
    insertCustomer,
    updateCustomerById,
    deleteCustomerById
};
```

### D. Membuat Service Layer (`customer.service.js`)
Service layer memproses data, menguji duplikasi kode, dan membungkus hasil respons dalam format status HTTP.
```javascript
const { findAllCustomer, findCustomerById, 
    findCustomerByCode, insertCustomer, 
    updateCustomerById, deleteCustomerById } = require('./customer.repository');

const getAllCustomer = async () => {
    try {
        const result = await findAllCustomer();
        return {
            status: 200,
            data: {
                status: 200,
                message: 'Customers retrieved successfully',
                data: result.data,
                metadata: { total: result.rows }
            },
        };
    } catch (error) {
        console.error('Error retrieving customers:', error);
        return {
            status: 500,
            data: { status: 500, data: null, message: 'Internal Server Error' },
        };
    }
};

const getCustomerById = async (id) => {
    try {
        const result = await findCustomerById(id);
        if (result.rows === 0) {
            return {
                status: 404,
                data: { status: 404, message: 'Customer not found', data: null },
            };
        }
        return {
            status: 200,
            data: { status: 200, data: result.data, message: 'Customer retrieved successfully' },
        };
    } catch (error) {
        console.error('Error retrieving customer:', error);
        return {
            status: 500,
            data: { status: 500, data: null, message: 'Internal Server Error' },
        };
    }
};

const createCustomer = async (customerData) => {
    try {
        const checkDuplicate = await findCustomerByCode(customerData.CUSTOMER_CODE);
        if (checkDuplicate.rows > 0) {
            return {
                status: 409,
                data: { status: 409, data: null, message: 'Customer with same customer code already exists' },
            };
        }
        const result = await insertCustomer(customerData);
        return {
            status: 201,
            data: { status: 201, data: result.data, message: 'Customer created successfully' },
        };
    } catch (error) {
        console.error('Error creating customer:', error);
        return {
            status: 500,
            data: { status: 500, data: null, message: 'Internal Server Error' },
        };
    }
};

const updateCustomer = async (id, customerData) => {
    try {
        const existing = await findCustomerById(id);
        if (existing.rows === 0) {
            return {
                status: 404,
                data: { status: 404, data: null, message: 'Customer not found' }
            };
        }
        if (existing.data.CUSTOMER_CODE !== customerData.CUSTOMER_CODE) {
            const checkDuplicate = await findCustomerByCode(customerData.CUSTOMER_CODE);
            if (checkDuplicate.rows > 0) {
                return {
                    status: 409,
                    data: { status: 409, data: null, message: 'Customer with same customer code already exists' }
                };
            }
        }
        const result = await updateCustomerById(id, customerData);
        return {
            status: 200,
            data: { status: 200, data: result.data, message: 'Customer updated successfully' }
        };
    } catch (error) {
        console.error('Error updating customer:', error);
        return {
            status: 500,
            data: { status: 500, data: null, message: 'Internal Server Error' },
        };
    }
};

const deleteCustomer = async (id) => {
    try {
        const existing = await findCustomerById(id);
        if (existing.rows === 0) {
            return {
                status: 404,
                data: { status: 404, data: null, message: 'Customer not found' }
            };
        }
        const result = await deleteCustomerById(id);
        return {
            status: 200,
            data: { status: 200, data: result.data, message: 'Customer deleted successfully' }
        };
    } catch (err) {
        console.error('Error deleting customer:', err);
        if (err.number === 547) { // Error code jika ada Foreign Key constraint di database
            return {
                status: 409,
                data: {
                    status: 409,
                    data: null,
                    message: 'Cannot delete customer because it is referenced by existing records.'
                },
            };
        }
        return {
            status: 500,
            data: { status: 500, data: null, message: 'Internal Server Error' },
        };
    }
};

module.exports = {
    getAllCustomer,
    getCustomerById,
    createCustomer,
    updateCustomer,
    deleteCustomer
};
```

### E. Membuat Controller Layer / Router (`customer.controller.js`)
File ini mendefinisikan URL router lokal Express dan menerapkan middleware validasi, otorisasi, dan guard.
```javascript
const express = require('express');
const router = express.Router();
const validateInput = require('../../../middlewares/validate');
const authorize = require('../../../middlewares/authorize');
const { featureGuard, functionGuard } = require('../../../middlewares/guard');
const { getAllCustomer, getCustomerById, createCustomer, updateCustomer, deleteCustomer } = require('./customer.service');
const { postCustomerSchema, putCustomerSchema, deleteCustomerSchema } = require('./customer.model');

// Proteksi global untuk modul customer
router.use(authorize, functionGuard('masterCustomer'));

// GET /api/master/customer
router.get('/', featureGuard("viewCustomer"), async (req, res, next) => { 
    const serviceResponse = await getAllCustomer();
    return res.status(serviceResponse.status).json(serviceResponse.data);
});

// GET /api/master/customer/:id
router.get('/:id', featureGuard('viewCustomerDetail'), async (req, res, next) => {
    const serviceResponse = await getCustomerById(req.params.id);
    return res.status(serviceResponse.status).json(serviceResponse.data);
});

// POST /api/master/customer
router.post('/', featureGuard("createCustomer"), validateInput(postCustomerSchema), async (req, res, next) => {
    const serviceResponse = await createCustomer({
        ...req.body,
        CREATED_BY: req.user.data.username
    });
    return res.status(serviceResponse.status).json(serviceResponse.data);
});

// PUT /api/master/customer/:id
router.put('/:id', featureGuard("updateCustomer"), validateInput(putCustomerSchema), async (req, res, next) => {
    const serviceResponse = await updateCustomer(req.params.id, {
        ...req.body,
        CHANGED_BY: req.user.data.username
    });
    return res.status(serviceResponse.status).json(serviceResponse.data);
});

// DELETE /api/master/customer/:id
router.delete('/:id', featureGuard("deleteCustomer"), validateInput(deleteCustomerSchema), async (req, res, next) => {
    const serviceResponse = await deleteCustomer(req.params.id);
    return res.status(serviceResponse.status).json(serviceResponse.data);
});

module.exports = router;
```

### F. Mendaftarkan Route ke Router Utama Backend
Daftarkan modul baru Anda di file router backend global:
* **Lokasi File:** `be/src/router.js`
* **Tambahkan impor dan middleware:**
  ```javascript
  const customerRouter = require('./api/master/customer/customer.controller');
  router.use('/customer', customerRouter);
  ```

---

## 4. Langkah 2: Registrasi URL Path di Frontend

Daftarkan URL path baru untuk halaman Customer di file `src/config/paths.ts` (sudah terdaftar di aplikasi Anda).

### Lokasi File:
[src/config/paths.ts](file:///Users/amier/bootcamp/fe/src/config/paths.ts)

### Kode di dalam objek `app`:
```typescript
    masterCustomer: {
      path: 'master/customer',
      getHref: () => '/app/master/customer',
    },
    masterCustomerDetail: {
      path: 'master/customer/:id',
      getHref: (id: string) => `/app/master/customer/${id}`,
    },
    masterCustomerCreate: {
      path: 'master/customer/create',
      getHref: () => '/app/master/customer/create',
    },
    masterCustomerEdit: {
      path: 'master/customer/:id/edit',
      getHref: (id: string) => `/app/master/customer/${id}/edit`,
    },
```

---

## 5. Langkah 3: Membuat Hooks API (React Query) di Frontend

Di dalam folder `src/features/master/customer/api/`, berikut adalah file-file hooks API asli yang terintegrasi dengan backend:

### A. `get-customer.ts` (Mengambil List Data)
[src/features/master/customer/api/get-customer.ts](file:///Users/amier/bootcamp/fe/src/features/master/customer/api/get-customer.ts)
```typescript
import { queryOptions, useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';

export const getCustomer = (): Promise<any> => {
  return api.get('/customer');
};

export const getCustomerQueryOptions = () => {
  return queryOptions({
    queryKey: ['customer'],
    queryFn: getCustomer,
  });
};

type UseCustomerOptions = {
  queryConfig?: QueryConfig<typeof getCustomerQueryOptions>;
};

export const useCustomer = ({ queryConfig }: UseCustomerOptions = {}) => {
  return useQuery({
    ...getCustomerQueryOptions(),
    ...queryConfig,
  });
};
```

### B. `get-customer-detail.ts` (Mengambil Detail Satu Data)
[src/features/master/customer/api/get-customer-detail.ts](file:///Users/amier/bootcamp/fe/src/features/master/customer/api/get-customer-detail.ts)
```typescript
import { queryOptions, useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';

export const getCustomerDetail = (id: string): Promise<any> => {
  return api.get(`/customer/${id}`);
};

export const getCustomerDetailQueryOptions = (id: string) => {
  return queryOptions({
    queryKey: ['customer-detail', id],
    queryFn: () => getCustomerDetail(id),
  });
};

type UseCustomerDetailOptions = {
  id: string;
  queryConfig?: QueryConfig<typeof getCustomerDetailQueryOptions>;
};

export const useCustomerDetail = ({ id, queryConfig }: UseCustomerDetailOptions) => {
  return useQuery({
    ...getCustomerDetailQueryOptions(id),
    ...queryConfig,
  });
};
```

### C. `create-customer.ts` (Membuat Data Baru)
[src/features/master/customer/api/create-customer.ts](file:///Users/amier/bootcamp/fe/src/features/master/customer/api/create-customer.ts)
```typescript
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';
import { getCustomerQueryOptions } from './get-customer';

export const createCustomerInputSchema = z.object({
  CUSTOMER_CODE: z.string().min(1, 'Customer code is required'),
  NAME: z.string().min(1, 'Name is required'),
  TYPE: z.string().min(1, 'Type is required'),
  ADDRESS: z.string().min(1, 'Address is required'),
  PHONE: z.string().min(1, 'Phone is required'),
});

export type CreateCustomerInput = z.infer<typeof createCustomerInputSchema>;

export const createCustomer = async (data: CreateCustomerInput) => {
  const response = await api.post('/customer', data);
  return response.data;
};

export type UseCreateCustomerOption = {
  mutationConfig?: MutationConfig<typeof createCustomer>;
};

export const useCreateCustomer = ({ mutationConfig }: UseCreateCustomerOption = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getCustomerQueryOptions().queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: createCustomer,
  });
};
```

### D. `edit-customer.ts` (Mengubah Data)
[src/features/master/customer/api/edit-customer.ts](file:///Users/amier/bootcamp/fe/src/features/master/customer/api/edit-customer.ts)
```typescript
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';
import { getCustomerQueryOptions } from './get-customer';
import { getCustomerDetailQueryOptions } from './get-customer-detail';

export const editCustomerInputSchema = z.object({
  CUSTOMER_CODE: z.string().min(1, 'Customer code is required'),
  NAME: z.string().min(1, 'Name is required'),
  TYPE: z.string().min(1, 'Type is required'),
  ADDRESS: z.string().min(1, 'Address is required'),
  PHONE: z.string().min(1, 'Phone is required'),
});

export type EditCustomerInput = z.infer<typeof editCustomerInputSchema>;

export const editCustomer = async ({ id, data }: { id: string; data: EditCustomerInput }) => {
  const response = await api.put(`/customer/${id}`, data);
  return response.data;
};

export type UseEditCustomerOption = {
  mutationConfig?: MutationConfig<typeof editCustomer>;
};

export const useEditCustomer = ({ mutationConfig }: UseEditCustomerOption = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (data, ...args) => {
      queryClient.invalidateQueries({
        queryKey: getCustomerQueryOptions().queryKey,
      });
      queryClient.invalidateQueries({
        queryKey: getCustomerDetailQueryOptions(data.ID).queryKey,
      });
      onSuccess?.(data, ...args);
    },
    ...restConfig,
    mutationFn: editCustomer,
  });
};
```

### E. `delete-customer.ts` (Menghapus Data)
[src/features/master/customer/api/delete-customer.ts](file:///Users/amier/bootcamp/fe/src/features/master/customer/api/delete-customer.ts)
```typescript
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';
import { getCustomerQueryOptions } from './get-customer';

export const deleteCustomer = async (id: string) => {
  const response = await api.delete(`/customer/${id}`);
  return response.data;
};

export type UseDeleteCustomerOption = {
  mutationConfig?: MutationConfig<typeof deleteCustomer>;
};

export const useDeleteCustomer = ({ mutationConfig }: UseDeleteCustomerOption = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getCustomerQueryOptions().queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: deleteCustomer,
  });
};
```

---

## 6. Langkah 4: Membuat UI Components (Tabel & Form)

Di dalam folder `src/features/master/customer/components/`, berikut adalah kode komponen UI aslinya:

### A. Komponen Tabel (`customer-table.tsx`)
[src/features/master/customer/components/customer-table.tsx](file:///Users/amier/bootcamp/fe/src/features/master/customer/components/customer-table.tsx)
```tsx
import { EyeIcon, Pencil } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { Button } from '@/components/ui/button';
import { Table } from '@/components/ui/table';
import { paths } from '@/config/paths';
import { useCustomer } from '../api/get-customer';
import CustomerDelete from './customer-delete';

const CustomerTable = () => {
  const { data, isLoading, error } = useCustomer();
  const navigate = useNavigate();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error occurred while fetching customer data.</div>;

  return (
    <div>
      <Button
        variant="default"
        className="mb-4"
        onClick={() => navigate(paths.app.masterCustomerCreate.getHref())}
      >
        Add New
      </Button>
      <Table
        data={data?.data}
        columns={[
          {
            title: '',
            Cell: (row) => (
              <div className="flex items-center">
                <Link to={`/app/master/customer/${row.entry.ID}`}>
                  <EyeIcon className="size-5 text-blue-500 hover:underline" />
                </Link>
                <Link to={`/app/master/customer/${row.entry.ID}/edit`}>
                  <Pencil className="ml-2 size-5 text-yellow-500 hover:underline" />
                </Link>
                <CustomerDelete id={row.entry.ID} />
              </div>
            ),
          },
          { title: 'ID', field: 'ID' },
          { title: 'Customer Code', field: 'CUSTOMER_CODE' },
          { title: 'Name', field: 'NAME' },
          { title: 'Type', field: 'TYPE' },
          { title: 'Phone', field: 'PHONE' },
          { title: 'Address', field: 'ADDRESS' },
          { title: 'Created By', field: 'CREATED_BY' },
          { title: 'Created Date', field: 'CREATED_DT' },
        ]}
      />
    </div>
  );
};

export default CustomerTable;
```

### B. Komponen Form Tambah (`customer-create.tsx`)
[src/features/master/customer/components/customer-create.tsx](file:///Users/amier/bootcamp/fe/src/features/master/customer/components/customer-create.tsx)
```tsx
import { useNavigate } from 'react-router';
import { Button } from '@/components/ui/button';
import { Form, Input } from '@/components/ui/form';
import { useNotifications } from '@/components/ui/notifications';
import { useCreateCustomer, createCustomerInputSchema } from '../api/create-customer';

const CreateCustomer = () => {
  const { addNotification } = useNotifications();
  const navigate = useNavigate();
  const createCustomer = useCreateCustomer({
    mutationConfig: {
      onSuccess: () => {
        navigate(-1);
        addNotification({
          type: 'success',
          title: 'Create Customer Succeeded!',
        });
      },
    },
  });

  return (
    <Form
      onSubmit={(values) => {
        createCustomer.mutate(values);
      }}
      schema={createCustomerInputSchema}
    >
      {({ register, formState }) => (
        <>
          <Input
            registration={register('CUSTOMER_CODE')}
            error={formState.errors['CUSTOMER_CODE']}
            type="text"
            label="Customer Code"
          />
          <Input
            registration={register('NAME')}
            error={formState.errors['NAME']}
            type="text"
            label="Customer Name"
          />
          <Input
            registration={register('TYPE')}
            error={formState.errors['TYPE']}
            type="text"
            label="Type"
          />
          <Input
            registration={register('ADDRESS')}
            error={formState.errors['ADDRESS']}
            type="text"
            label="Address"
          />
          <Input
            registration={register('PHONE')}
            error={formState.errors['PHONE']}
            type="text"
            label="Phone"
          />
          <Button disabled={createCustomer.isPending} type="submit">
            Add Customer
          </Button>
        </>
      )}
    </Form>
  );
};

export default CreateCustomer;
```

### C. Komponen Form Edit (`customer-edit.tsx`)
[src/features/master/customer/components/customer-edit.tsx](file:///Users/amier/bootcamp/fe/src/features/master/customer/components/customer-edit.tsx)
```tsx
import { useNavigate } from 'react-router';
import { Button } from '@/components/ui/button';
import { Form, Input } from '@/components/ui/form';
import { useNotifications } from '@/components/ui/notifications';
import { useEditCustomer, editCustomerInputSchema } from '../api/edit-customer';
import { useCustomerDetail } from '../api/get-customer-detail';

const EditCustomer = ({ id }: { id: string }) => {
  const { addNotification } = useNotifications();
  const navigate = useNavigate();
  const { data, isLoading, error } = useCustomerDetail({ id });
  const editCustomer = useEditCustomer({
    mutationConfig: {
      onSuccess: () => {
        navigate(-1);
        addNotification({
          type: 'success',
          title: 'Edit Customer Succeeded!',
        });
      },
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error occurred while fetching customer detail data.</div>;

  const customer = data?.data;

  return (
    <Form
      onSubmit={(values) => {
        editCustomer.mutate({ id, data: values });
      }}
      options={{
        defaultValues: {
          CUSTOMER_CODE: customer?.CUSTOMER_CODE ?? '',
          NAME: customer?.NAME ?? '',
          TYPE: customer?.TYPE ?? '',
          ADDRESS: customer?.ADDRESS ?? '',
          PHONE: customer?.PHONE ?? '',
        },
      }}
      schema={editCustomerInputSchema}
    >
      {({ register, formState }) => (
        <>
          <Input
            registration={register('CUSTOMER_CODE')}
            error={formState.errors['CUSTOMER_CODE']}
            type="text"
            label="Customer Code"
          />
          <Input
            registration={register('NAME')}
            error={formState.errors['NAME']}
            type="text"
            label="Customer Name"
          />
          <Input
            registration={register('TYPE')}
            error={formState.errors['TYPE']}
            type="text"
            label="Type"
          />
          <Input
            registration={register('ADDRESS')}
            error={formState.errors['ADDRESS']}
            type="text"
            label="Address"
          />
          <Input
            registration={register('PHONE')}
            error={formState.errors['PHONE']}
            type="text"
            label="Phone"
          />
          <Button disabled={editCustomer.isPending} type="submit">
            Update Customer
          </Button>
        </>
      )}
    </Form>
  );
};

export default EditCustomer;
```

### D. Komponen Hapus Data (`customer-delete.tsx`)
[src/features/master/customer/components/customer-delete.tsx](file:///Users/amier/bootcamp/fe/src/features/master/customer/components/customer-delete.tsx)
```tsx
import { Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ConfirmationDialog } from '@/components/ui/dialog';
import { useNotifications } from '@/components/ui/notifications';
import { useDeleteCustomer } from '../api/delete-customer';

const CustomerDelete = ({ id }: { id: string }) => {
  const { addNotification } = useNotifications();
  const deleteCustomer = useDeleteCustomer({
    mutationConfig: {
      onSuccess: () => {
        addNotification({
          type: 'success',
          title: 'Customer is deleted!',
        });
      },
    },
  });

  return (
    <ConfirmationDialog
      icon="danger"
      title="Delete Customer"
      body={`Are you sure you want to delete this customer with id ${id} ?`}
      triggerButton={
        <Button variant="link" className="p-0">
          <Trash className="size-5 text-red-500 hover:underline" />
        </Button>
      }
      confirmButton={
        <Button
          variant="destructive"
          type="button"
          isLoading={deleteCustomer.isPending}
          onClick={() => {
            deleteCustomer.mutate(id);
          }}
        >
          Delete Customer
        </Button>
      }
    />
  );
};

export default CustomerDelete;
```

### E. Komponen Detail View (`customer-detail.tsx`)
[src/features/master/customer/components/customer-detail.tsx](file:///Users/amier/bootcamp/fe/src/features/master/customer/components/customer-detail.tsx)
```tsx
import { useCustomerDetail } from '../api/get-customer-detail';

const CustomerDetail = ({ id }: { id: string }) => {
  const { data, isLoading, error } = useCustomerDetail({ id });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error occurred while fetching customer detail data.</div>;

  const customer = data?.data;

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Detail Customer</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="font-semibold">ID:</div>
        <div>{customer?.ID}</div>
        <div className="font-semibold">Customer Code:</div>
        <div>{customer?.CUSTOMER_CODE}</div>
        <div className="font-semibold">Name:</div>
        <div>{customer?.NAME}</div>
        <div className="font-semibold">Type:</div>
        <div>{customer?.TYPE}</div>
        <div className="font-semibold">Phone:</div>
        <div>{customer?.PHONE}</div>
        <div className="font-semibold">Address:</div>
        <div>{customer?.ADDRESS}</div>
      </div>
    </div>
  );
};

export default CustomerDetail;
```

---

## 7. Langkah 5: Membuat File Halaman Route (Routes)

File route di bawah folder `src/app/routes/` berfungsi untuk membungkus komponen UI yang sudah dibuat agar siap dirender oleh React Router.

Di dalam folder `src/app/routes/app/master/customer/`, terdapat file-file berikut:

### A. List Data Halaman Utama (`customer.tsx`)
[src/app/routes/app/master/customer/customer.tsx](file:///Users/amier/bootcamp/fe/src/app/routes/app/master/customer/customer.tsx)
```tsx
import CustomerTable from '@/features/master/customer/components/customer-table';

const MasterCustomerRoute = () => {
  return (
    <div>
      <h1>Master Customer</h1>
      <p>This is the Master Customer page.</p>
      <CustomerTable />
    </div>
  );
};

export default MasterCustomerRoute;
```

### B. Halaman Form Tambah (`create-customer.tsx`)
[src/app/routes/app/master/customer/create-customer.tsx](file:///Users/amier/bootcamp/fe/src/app/routes/app/master/customer/create-customer.tsx)
```tsx
import CreateCustomer from '@/features/master/customer/components/customer-create';

const CreateCustomerRoute = () => {
  return (
    <div>
      <h1>Create Customer</h1>
      <CreateCustomer />
    </div>
  );
};

export default CreateCustomerRoute;
```

### C. Halaman Form Edit (`edit-customer.tsx`)
[src/app/routes/app/master/customer/edit-customer.tsx](file:///Users/amier/bootcamp/fe/src/app/routes/app/master/customer/edit-customer.tsx)
```tsx
import { useParams } from 'react-router';
import EditCustomer from '@/features/master/customer/components/customer-edit';

const EditCustomerRoute = () => {
  const { id } = useParams();

  if (!id) return <div>No id provided</div>;

  return (
    <div>
      <h1>Edit Customer</h1>
      <EditCustomer id={id} />
    </div>
  );
};

export default EditCustomerRoute;
```

### D. Halaman Detail Data (`customer-detail.tsx`)
[src/app/routes/app/master/customer/customer-detail.tsx](file:///Users/amier/bootcamp/fe/src/app/routes/app/master/customer/customer-detail.tsx)
```tsx
import { useParams } from 'react-router';
import CustomerDetail from '@/features/master/customer/components/customer-detail';

const CustomerDetailRoute = () => {
  const { id } = useParams();

  if (!id) return <div>No id provided</div>;

  return <CustomerDetail id={id} />;
};

export default CustomerDetailRoute;
```

---

## 8. Langkah 6: Mendaftarkan Route ke Halaman Aplikasi (React Router)

Daftarkan route-route di atas ke dalam router utama aplikasi.

### File Router Utama:
[src/app/router.tsx](file:///Users/amier/bootcamp/fe/src/app/router.tsx)

### Kode di dalam array router `children`:
```typescript
        {
          path: paths.app.masterCustomer.path,
          lazy: () =>
            import('./routes/app/master/customer/customer').then(
              convert(queryClient),
            ),
        },
        {
          path: paths.app.masterCustomerDetail.path,
          lazy: () =>
            import('./routes/app/master/customer/customer-detail').then(
              convert(queryClient),
            ),
        },
        {
          path: paths.app.masterCustomerCreate.path,
          lazy: () =>
            import('./routes/app/master/customer/create-customer').then(
              convert(queryClient),
            ),
        },
        {
          path: paths.app.masterCustomerEdit.path,
          lazy: () =>
            import('./routes/app/master/customer/edit-customer').then(
              convert(queryClient),
            ),
        },
```

---

## 9. Langkah 7: Menambahkan Menu ke Sidebar Navigasi

Daftarkan menu ke sidebar dashboard agar user bisa mengakses halaman baru tersebut.

### File Layout Dashboard:
[src/components/layouts/dashboard-layout.tsx](file:///Users/amier/bootcamp/fe/src/components/layouts/dashboard-layout.tsx)

### 1. Import Icon yang Diinginkan
```typescript
import {
  // ... icon lainnya
  UserCheck,
} from 'lucide-react';
```

### 2. Sisipkan Item ke dalam array `const navigation = [`:
```typescript
    {
      name: 'Master Customer',
      to: paths.app.masterCustomer.getHref(),
      icon: UserCheck,
    },
```

---

## 10. Langkah 8: Verifikasi & Testing

Sebelum Anda men-submit atau melakukan commit code, jalankan perintah ini di terminal Anda untuk memastikan tidak ada error syntax, typescript type mismatch, atau kesalahan styling:

```bash
# 1. Menjalankan tipe check typescript
npm run check-types

# 2. Menjalankan check linter (gaya penulisan kode)
npm run lint
```

Jika kedua perintah di atas berjalan lancar tanpa error, maka pembuatan halaman Master CRUD baru Anda telah **berhasil sepenuhnya!** 🎉
