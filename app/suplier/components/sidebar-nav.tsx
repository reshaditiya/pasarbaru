import { FilterForm } from './filter-form';
import { SuplierFormButton } from './suplier-form-button';

export default function SidebarNav() {
  return (
    <nav className="flex justify-between gap-4 lg:flex-col lg:space-x-0 lg:space-y-1">
      <SuplierFormButton type="new" />
      <FilterForm />
    </nav>
  );
}
