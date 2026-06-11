import {
  AlertTriangle,
  CheckCircle2,
  PackageCheck,
  Layers,
  ClipboardList,
} from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { useNotifications } from '@/components/ui/notifications';
import { Spinner } from '@/components/ui/spinner';
import { Table } from '@/components/ui/table';
import { formatDate } from '@/utils/format';

import { useApproveReceipt } from '../api/approve-receipt';
import { useInventory, InventoryItem } from '../api/get-inventory';
import { useReceipts, ReceiptItem } from '../api/get-receipts';

export const InventoryList = () => {
  const [activeTab, setActiveTab] = useState<'stock' | 'orders'>('stock');

  const inventoryQuery = useInventory();
  const receiptsQuery = useReceipts();
  const approveMutation = useApproveReceipt();

  const { addNotification } = useNotifications.getState();

  const handleApprove = async (id: string) => {
    try {
      await approveMutation.mutateAsync(id);
      addNotification({
        type: 'success',
        title: 'Order Approved',
        message: `Material receipt order ${id} approved. Inventory stock levels updated.`,
      });
    } catch (err: any) {
      console.error(err);
    }
  };

  const isStockLoading = inventoryQuery.isLoading;
  const isOrdersLoading = receiptsQuery.isLoading;

  // Compile items safely
  const rawStock = inventoryQuery.data;
  const stockItems = Array.isArray(rawStock) ? rawStock : rawStock?.data || [];

  const rawOrders = receiptsQuery.data;
  const orderItems = Array.isArray(rawOrders)
    ? rawOrders
    : rawOrders?.data || [];

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      {/* Header and simple Tabs */}
      <div className="flex flex-col gap-4 border-b pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-xl font-bold text-gray-950">
            Inventory & Orders Management
          </h3>
          <p className="mt-1 text-xs text-gray-500">
            Check current stock balances and approve incoming material receipts
            to replenish inventory.
          </p>
        </div>

        {/* Simple Pill Tabs */}
        <div className="flex self-start rounded-lg border bg-gray-100 p-1 sm:self-center">
          <button
            onClick={() => setActiveTab('stock')}
            className={`flex items-center gap-2 rounded-md px-4 py-1.5 text-xs font-semibold transition-all ${
              activeTab === 'stock'
                ? 'bg-white text-gray-950 shadow-sm'
                : 'text-gray-500 hover:text-gray-950'
            }`}
          >
            <Layers className="size-3.5" />
            Stock List
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex items-center gap-2 rounded-md px-4 py-1.5 text-xs font-semibold transition-all ${
              activeTab === 'orders'
                ? 'bg-white text-gray-950 shadow-sm'
                : 'text-gray-500 hover:text-gray-950'
            }`}
          >
            <ClipboardList className="size-3.5" />
            Material Orders
            {orderItems.filter((o: ReceiptItem) => o.STATUS === 'Draft Order')
              .length > 0 && (
              <span className="rounded-full bg-amber-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
                {
                  orderItems.filter(
                    (o: ReceiptItem) => o.STATUS === 'Draft Order',
                  ).length
                }
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Main Tab Content */}
      {activeTab === 'stock' ? (
        <div className="space-y-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between border-b pb-2">
            <div>
              <h4 className="text-md font-bold text-gray-900">
                Current Stock Inventory
              </h4>
              <p className="text-xs text-gray-500">
                Live quantity of material stocks held in warehouses.
              </p>
            </div>
            <div className="text-xs text-gray-400">
              Total records: {stockItems.length}
            </div>
          </div>

          {isStockLoading ? (
            <div className="flex h-48 items-center justify-center">
              <Spinner size="lg" />
            </div>
          ) : (
            <Table
              data={stockItems}
              columns={[
                {
                  title: 'Inventory ID',
                  field: 'ID',
                },
                {
                  title: 'Material Name',
                  field: 'MATERIAL_NAME',
                },
                {
                  title: 'Part Number',
                  field: 'PART_NUMBER',
                },
                {
                  title: 'Category',
                  field: 'MATERIAL_CATEGORY',
                },
                {
                  title: 'Location',
                  field: 'WAREHOUSE_LOCATION',
                },
                {
                  title: 'Stock Quantity',
                  field: 'QUANTITY',
                  Cell({ entry }) {
                    const item = entry as InventoryItem;
                    const isLow = item.QUANTITY < 200;
                    return (
                      <span
                        className={`font-semibold ${isLow ? 'text-red-600' : 'text-gray-900'}`}
                      >
                        {item.QUANTITY} {item.MATERIAL_UNIT || ''}
                      </span>
                    );
                  },
                },
                {
                  title: 'Status',
                  field: 'QUANTITY',
                  Cell({ entry }) {
                    const item = entry as InventoryItem;
                    const isLow = item.QUANTITY < 200;
                    return isLow ? (
                      <span className="border-red-150 inline-flex items-center gap-1 rounded-full border bg-red-50 px-2 py-0.5 text-xs font-semibold text-red-700">
                        <AlertTriangle className="size-3" />
                        Low Stock (&lt; 200)
                      </span>
                    ) : (
                      <span className="border-emerald-150 inline-flex items-center gap-1 rounded-full border bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                        <CheckCircle2 className="size-3" />
                        Optimal
                      </span>
                    );
                  },
                },
                {
                  title: 'Created At',
                  field: 'CREATED_DT',
                  Cell({ entry: { CREATED_DT } }) {
                    return (
                      <span className="text-xs text-gray-500">
                        {formatDate(CREATED_DT)}
                      </span>
                    );
                  },
                },
              ]}
            />
          )}
        </div>
      ) : (
        <div className="space-y-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between border-b pb-2">
            <div>
              <h4 className="text-md font-bold text-gray-900">
                Material Receipt Orders
              </h4>
              <p className="text-xs text-gray-500">
                List of auto-generated or manual orders. Approve Drafts to
                replenishment inventory.
              </p>
            </div>
            <div className="text-xs text-gray-400">
              Total orders: {orderItems.length}
            </div>
          </div>

          {isOrdersLoading ? (
            <div className="flex h-48 items-center justify-center">
              <Spinner size="lg" />
            </div>
          ) : (
            <Table
              data={orderItems}
              columns={[
                {
                  title: 'Order ID',
                  field: 'ID',
                },
                {
                  title: 'Supplier',
                  field: 'SUPPLIER_NAME',
                  Cell({ entry }) {
                    const item = entry as ReceiptItem;
                    return (
                      <div className="flex flex-col">
                        <span className="font-semibold text-gray-900">
                          {item.SUPPLIER_NAME}
                        </span>
                        <span className="font-mono text-[10px] text-gray-500">
                          {item.SUPPLIER_CODE}
                        </span>
                      </div>
                    );
                  },
                },
                {
                  title: 'Material Details',
                  field: 'MATERIAL_NAME',
                  Cell({ entry }) {
                    const item = entry as ReceiptItem;
                    return (
                      <div className="flex flex-col">
                        <span className="font-semibold text-gray-900">
                          {item.MATERIAL_NAME}
                        </span>
                        <span className="font-mono text-[10px] text-gray-500">
                          {item.MATERIAL_PART_NUMBER}
                        </span>
                      </div>
                    );
                  },
                },
                {
                  title: 'Ordered Quantity',
                  field: 'QUANTITY_RECEIVED',
                  Cell({ entry }) {
                    const item = entry as ReceiptItem;
                    return (
                      <span className="font-semibold text-gray-900">
                        {item.QUANTITY_RECEIVED}
                      </span>
                    );
                  },
                },
                {
                  title: 'Status',
                  field: 'STATUS',
                  Cell({ entry }) {
                    const item = entry as ReceiptItem;
                    const isApproved = item.STATUS === 'Approved';
                    return isApproved ? (
                      <span className="border-emerald-150 inline-flex items-center gap-1 rounded-full border bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                        <CheckCircle2 className="size-3" />
                        Approved
                      </span>
                    ) : (
                      <span className="border-amber-150 inline-flex items-center gap-1 rounded-full border bg-amber-50 px-2 py-0.5 text-xs font-semibold text-amber-700">
                        <AlertTriangle className="size-3" />
                        Draft Order
                      </span>
                    );
                  },
                },
                {
                  title: 'Order Date',
                  field: 'CREATED_DT',
                  Cell({ entry: { CREATED_DT } }) {
                    return (
                      <span className="text-xs text-gray-500">
                        {formatDate(CREATED_DT)}
                      </span>
                    );
                  },
                },
                {
                  title: 'Action',
                  field: 'ID',
                  Cell({ entry }) {
                    const item = entry as ReceiptItem;
                    const isDraft = item.STATUS === 'Draft Order';
                    if (!isDraft)
                      return (
                        <span className="pl-2 text-xs font-medium text-gray-400">
                          Restocked
                        </span>
                      );
                    return (
                      <Button
                        onClick={() => handleApprove(item.ID)}
                        isLoading={
                          approveMutation.isPending &&
                          approveMutation.variables === item.ID
                        }
                        size="sm"
                        variant="default"
                        className="h-8 px-3 text-xs"
                      >
                        <PackageCheck className="mr-1 size-3" />
                        Approve
                      </Button>
                    );
                  },
                },
              ]}
            />
          )}
        </div>
      )}
    </div>
  );
};
