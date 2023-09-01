import { FilterForm } from './filter-form';
import { ProductFormButton } from './product-form-button';

export default function SidebarNav() {
  return (
    <nav className="flex justify-between gap-4 lg:flex-col lg:space-x-0 lg:space-y-1">
      <ProductFormButton type="new" />
      <FilterForm />
    </nav>
  );
}
