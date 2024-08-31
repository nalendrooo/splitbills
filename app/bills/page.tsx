'use client'

import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import ActionSubmit from '@/components/kanban/action-submit';
import AlertHowToUse from '@/components/kanban/alert-how-to-use';
import { KanbanBoard } from '@/components/kanban/kanban-board';
import { NewSectionDialog } from '@/components/kanban/new-section-dialog';
import { NewTaskDrawer } from '@/components/kanban/new-task-drawer';
import ResetActionDialog from '@/components/kanban/reset-action-dialog';
import PageContainer from '@/components/layouts/page-container';
import { Badge } from '@/components/ui/badge';
import { Heading } from '@/components/ui/heading';
import { formatRupiah } from '@/lib/format';
import { useTaskStore } from '@/lib/store';
import { Fragment } from 'react';

const breadcrumbItems = [
  { title: 'Home', link: '/' },
  { title: 'Create bills', link: '/bills' }
];

export default function page() {
  const columns = useTaskStore((state) => state.columns);
  const tasks = useTaskStore((state) => state.tasks);
  const total = tasks.map((task) => task.price).reduce((a, b) => a + b, 0);

  return (
    <PageContainer>
      <div className="space-y-4">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <Heading title='Splitbills' description="This project was created by Nalendro" />
        </div>

        <NewSectionDialog />
        <AlertHowToUse />

        {columns.length !== 0 && <NewTaskDrawer />}

        <KanbanBoard />

        {columns.length !== 0 &&
          <Fragment>
            <div className='w-full flex justify-center'>
              <Badge >Total: {formatRupiah(total)}</Badge>
            </div>
            <ActionSubmit />
            <ResetActionDialog />
          </Fragment>
        }

      </div>
    </PageContainer>
  );
}
