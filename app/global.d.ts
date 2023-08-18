import { Database as DB } from '@/lib/database.type';

declare global {
	type Database = DB;
}
