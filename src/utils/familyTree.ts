export interface FamilyMember {
  id: string;
  name: string;
  nickname?: string;
  photo: string;
  relationship: string;
  generation: number;
  branch: string;
  city: string;
  province?: string;
  country?: string;
  birthDate?: string;
  bio?: string;
  spouseId?: string;
  parentIds?: string[];
  childrenIds?: string[];
  siblingIds?: string[];
}

export interface TreeNode {
  id: string;
  member: FamilyMember;
  spouse?: FamilyMember;
  children: TreeNode[];
  parents: TreeNode[];
}

/**
 * Build family tree from flat member list
 */
export function buildFamilyTree(members: FamilyMember[]): TreeNode[] {
  const memberMap = new Map<string, FamilyMember>();
  const nodeMap = new Map<string, TreeNode>();

  // Index members
  members.forEach((m) => {
    memberMap.set(m.id, m);
    nodeMap.set(m.id, {
      id: m.id,
      member: m,
      children: [],
      parents: [],
    });
  });

  // Build parent-child relationships
  members.forEach((m) => {
    const node = nodeMap.get(m.id)!;
    if (m.parentIds) {
      m.parentIds.forEach((pid) => {
        const parent = nodeMap.get(pid);
        if (parent) {
          node.parents.push(parent);
          if (!parent.children.find((c) => c.id === node.id)) {
            parent.children.push(node);
          }
        }
      });
    }
    // Attach spouse
    if (m.spouseId) {
      node.spouse = memberMap.get(m.spouseId);
    }
  });

  // Return root nodes (generation 1 or no parents)
  const roots = members
    .filter((m) => m.generation === 1 || !m.parentIds || m.parentIds.length === 0)
    .map((m) => nodeMap.get(m.id)!);

  return roots;
}

/**
 * Get siblings of a member
 */
export function getSiblings(member: FamilyMember, allMembers: FamilyMember[]): FamilyMember[] {
  if (!member.parentIds || member.parentIds.length === 0) return [];
  return allMembers.filter(
    (m) =>
      m.id !== member.id &&
      m.parentIds?.some((pid) => member.parentIds!.includes(pid))
  );
}

/**
 * Get children of a member
 */
export function getChildren(member: FamilyMember, allMembers: FamilyMember[]): FamilyMember[] {
  return allMembers.filter((m) => m.parentIds?.includes(member.id));
}

/**
 * Get spouse of a member
 */
export function getSpouse(member: FamilyMember, allMembers: FamilyMember[]): FamilyMember | undefined {
  if (!member.spouseId) return undefined;
  return allMembers.find((m) => m.id === member.spouseId);
}

/**
 * Get parents of a member
 */
export function getParents(member: FamilyMember, allMembers: FamilyMember[]): FamilyMember[] {
  if (!member.parentIds) return [];
  return allMembers.filter((m) => member.parentIds!.includes(m.id));
}

/**
 * Generate childrenIds from parentIds
 */
export function enrichMembers(members: FamilyMember[]): FamilyMember[] {
  const memberMap = new Map(members.map((m) => [m.id, { ...m, childrenIds: [] as string[] }]));

  members.forEach((m) => {
    if (m.parentIds) {
      m.parentIds.forEach((pid) => {
        const parent = memberMap.get(pid);
        if (parent && !parent.childrenIds!.includes(m.id)) {
          parent.childrenIds!.push(m.id);
        }
      });
    }
  });

  return Array.from(memberMap.values());
}

/**
 * Calculate birth year from birthDate
 */
export function getBirthYear(birthDate?: string): number | null {
  if (!birthDate) return null;
  const year = new Date(birthDate).getFullYear();
  return isNaN(year) ? null : year;
}

/**
 * Calculate age from birthDate
 */
export function getAge(birthDate?: string): number | null {
  if (!birthDate) return null;
  const birth = new Date(birthDate);
  const now = new Date();
  let age = now.getFullYear() - birth.getFullYear();
  const monthDiff = now.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birth.getDate())) {
    age--;
  }
  return isNaN(age) ? null : age;
}
