import { Clock, Play, Save, CheckCircle2 } from 'lucide-react';
import { useState, useEffect } from 'react';

import { Button } from '@/components/ui/button';
import { useNotifications } from '@/components/ui/notifications';
import { Spinner } from '@/components/ui/spinner';

import { useAutoOrderConfig } from '../api/get-auto-order-config';
import { useTriggerAutoOrder } from '../api/trigger-auto-order';
import { useUpdateAutoOrderConfig } from '../api/update-auto-order-config';

export const AutoOrderDashboard = () => {
  const configQuery = useAutoOrderConfig();
  const updateConfigMutation = useUpdateAutoOrderConfig();
  const triggerJobMutation = useTriggerAutoOrder();

  const { addNotification } = useNotifications.getState();

  const [scheduleTime, setScheduleTime] = useState('15:55');

  // Sync schedule time when DB configuration loads
  useEffect(() => {
    if (configQuery.data?.data?.scheduleTime) {
      setScheduleTime(configQuery.data.data.scheduleTime);
    }
  }, [configQuery.data]);

  if (configQuery.isLoading) {
    return (
      <div className="flex h-64 w-full items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  const config = configQuery.data?.data;

  const handleSaveSchedule = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateConfigMutation.mutateAsync({
        data: { scheduleTime },
      });
      addNotification({
        type: 'success',
        title: 'Schedule Saved',
        message: `Auto-order job scheduled to run daily at ${scheduleTime}.`,
      });
    } catch (err: any) {
      console.error(err);
    }
  };

  const handleTriggerJob = async () => {
    try {
      const response: any = await triggerJobMutation.mutateAsync(undefined);
      const orderedCount = response?.data?.orderedCount ?? 0;

      addNotification({
        type: 'success',
        title: 'Job Executed',
        message: `Auto Order Job completed. Placed orders for ${orderedCount} low-stock material(s).`,
      });
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <div className="mx-auto mt-6 max-w-2xl">
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        {/* Card Header */}
        <div className="border-b border-gray-200 bg-gray-50/70 px-6 py-5">
          <h3 className="text-lg font-bold text-gray-900">
            Auto Order Inventory Job
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Set the daily execution time for automatic material ordering or
            trigger the check manually.
          </p>
        </div>

        {/* Card Body */}
        <div className="space-y-6 p-6">
          {/* Section 1: Edit Schedule */}
          <form onSubmit={handleSaveSchedule} className="space-y-4">
            <div>
              <label
                htmlFor="time-picker"
                className="block text-sm font-semibold text-gray-700"
              >
                Daily Execution Time
              </label>
              <p className="mb-2.5 mt-0.5 text-xs text-gray-500">
                The system automatically checks inventory and triggers orders
                for materials with stock under 200 daily at this time.
              </p>

              <div className="flex items-center gap-3">
                <div className="relative max-w-[200px] flex-1 rounded-md shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Clock className="size-4 text-gray-400" />
                  </div>
                  <input
                    type="time"
                    id="time-picker"
                    value={scheduleTime}
                    onChange={(e) => setScheduleTime(e.target.value)}
                    required
                    className="block h-10 w-full rounded-md border border-gray-300 pl-10 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>

                <Button
                  type="submit"
                  isLoading={updateConfigMutation.isPending}
                  icon={<Save className="size-4" />}
                >
                  Save Schedule
                </Button>
              </div>
            </div>
          </form>

          <hr className="border-gray-200" />

          {/* Section 2: Manual Trigger */}
          <div className="space-y-3">
            <div>
              <h4 className="text-sm font-semibold text-gray-700">
                Force Run Job
              </h4>
              <p className="mt-0.5 text-xs text-gray-500">
                Run the auto-order check immediately to verify stock levels and
                place draft orders for any materials that have low stock.
              </p>
            </div>

            <div>
              <Button
                type="button"
                onClick={handleTriggerJob}
                isLoading={triggerJobMutation.isPending}
                icon={<Play className="size-4" />}
              >
                Run Job Now
              </Button>
            </div>
          </div>

          {/* Footer Info */}
          {config?.changedDt && (
            <div className="flex items-center gap-2 border-t border-gray-100 pt-4 text-xs text-gray-400">
              <CheckCircle2 className="size-4 shrink-0 text-emerald-500" />
              <span>
                Job active. Scheduled daily at{' '}
                <span className="font-semibold text-gray-700">
                  {config.scheduleTime}
                </span>
                . Last saved by{' '}
                <span className="font-semibold text-gray-700">
                  {config.changedBy}
                </span>
                .
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
