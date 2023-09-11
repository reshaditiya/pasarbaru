import { FilterProduct } from './filter-product';
import { ProductFormButton } from './product-form-button';

export default function SidebarProduct() {
  return (
    <nav className="flex justify-between gap-4 lg:flex-col lg:space-x-0 lg:space-y-1">
      <ProductFormButton type="new" />
      <FilterProduct />
    </nav>
  );
}
