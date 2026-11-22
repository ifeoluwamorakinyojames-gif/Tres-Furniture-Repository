export type AdminRole = 'owner' | 'staff';
export type Permission = 'products.read' | 'products.create' | 'products.edit' | 'products.publish' | 'products.delete' | 'staff.manage' | 'settings.manage' | 'audit.read';
const grants: Record<AdminRole, readonly Permission[]> = {
  owner: ['products.read','products.create','products.edit','products.publish','products.delete','staff.manage','settings.manage','audit.read'],
  staff: ['products.read','products.create','products.edit'],
};
export function can(role: AdminRole | null | undefined, permission: Permission): boolean {
  return !!role && grants[role].includes(permission);
}
// UI permissions are only hints. Supabase RLS + triggers enforce server-side access.
