import { Database as DB } from '@/types/database.type';

declare global {
  type Database = DB;
}
