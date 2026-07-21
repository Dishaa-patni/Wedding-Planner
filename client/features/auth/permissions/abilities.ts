export type UserRole = 'admin' | 'team'

export type Ability =
  | 'workspace:create'
  | 'workspace:update'
  | 'workspace:delete'
  | 'team:view'
  | 'team:invite'
  | 'team:remove'
  | 'wedding:view'
  | 'wedding:create'
  | 'wedding:update'
  | 'wedding:delete'
  | 'billing:view'
  | 'settings:update'

export const ROLE_ABILITIES: Record<UserRole, Ability[]> = {
  admin: [
    'workspace:create',
    'workspace:update',
    'workspace:delete',
    'team:view',
    'team:invite',
    'team:remove',
    'wedding:view',
    'wedding:create',
    'wedding:update',
    'wedding:delete',
    'billing:view',
    'settings:update',
  ],

  team: [
    'team:view',
    'wedding:view',
    'wedding:update',
  ],
}

export function hasAbility(role: UserRole, ability: Ability) {
  return ROLE_ABILITIES[role]?.includes(ability) ?? false
}