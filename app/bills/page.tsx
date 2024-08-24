'use client'
import { Breadcrumbs } from '@/components/breadcrumbs';
import AlertHowToUse from '@/components/kanban/alert-how-to-use';
import { KanbanBoard } from '@/components/kanban/kanban-board';
import NewSectionDialog from '@/components/kanban/new-section-dialog';
import NewTaskDialog from '@/components/kanban/new-task-dialog';
import NewTaskDrawer from '@/components/kanban/new-task-drawer';
import ResetActionDialog from '@/components/kanban/reset-action-dialog';
import PageContainer from '@/components/layouts/page-container';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { useTaskStore } from '@/lib/store';
import { GripVertical, Terminal } from 'lucide-react';
import { RxDragHandleDots2 } from "react-icons/rx";
const breadcrumbItems = [
  { title: 'Dashboard', link: '/' },
  { title: 'Create bills', link: '/bills' }
];

export default function page() {
  const columns = useTaskStore((state) => state.columns);
  const tasks = useTaskStore((state) => state.tasks);
  return (
    <PageContainer>
      <div className="space-y-4">
        <Breadcrumbs items={breadcrumbItems} />
        <div className="flex items-start justify-between">
          <Heading title='Splitbills' description="This project was created by Nalendro" />
          {/* <NewTaskDialog /> */}
        </div>
        <NewSectionDialog />
        <AlertHowToUse />
        {columns.length !== 0 && <NewTaskDrawer />}

        <KanbanBoard />

        {columns.length !== 0 &&
          <>
            <div className='w-full flex justify-center'>

              <Badge >Total: Rp. 0</Badge>
            </div>
            <div className='w-full'>
              <Button
                className='w-full'
                disabled={tasks.length === 0}
              >
                Lanjutkan
              </Button>
            </div>
            <ResetActionDialog />
          </>
        }

      </div>
    </PageContainer>
  );
}
