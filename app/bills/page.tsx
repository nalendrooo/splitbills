import { Breadcrumbs } from '@/components/breadcrumbs';
import { KanbanBoard } from '@/components/kanban/kanban-board';
import NewTaskDialog from '@/components/kanban/new-task-dialog';
import PageContainer from '@/components/layouts/page-container';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/' },
  { title: 'Create bills', link: '/bills' }
];

export default function page() {
  return (
    <PageContainer>
      <div className="space-y-4">
        <Breadcrumbs items={breadcrumbItems} />
        <div className="flex items-start justify-between">
          <Heading title={`Splitbills`} description="Author by Nalendro" />
          <NewTaskDialog />
        </div>
        <KanbanBoard />
        <div className='w-full'>

          <Button className='w-full'>Lanjutkan</Button>
        </div>
      </div>
    </PageContainer>
  );
}
