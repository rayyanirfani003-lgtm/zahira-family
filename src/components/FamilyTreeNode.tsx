import { useState, useCallback } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import type { FamilyMember } from '../data';
import type { TreeNode } from '../utils/familyTree';

export default function FamilyTreeNode({
  node,
  onSelectMember,
  selectedId,
}: {
  node: TreeNode;
  onSelectMember: (member: FamilyMember) => void;
  selectedId?: string;
}) {
  const [expanded, setExpanded] = useState(true);
  const hasChildren = node.children.length > 0;
  const isSelected = selectedId === node.member.id;

  const handleToggle = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setExpanded((prev) => !prev);
  }, []);

  const handleSelect = useCallback(() => {
    onSelectMember(node.member);
  }, [node.member, onSelectMember]);

  return (
    <div className={`tree-node ${isSelected ? 'tree-node-selected' : ''}`}>
      {/* Card */}
      <div
        className="tree-card"
        onClick={handleSelect}
        role="button"
        aria-label={`View profile of ${node.member.name}`}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleSelect();
          }
        }}
      >
        <div className="tree-card-photo">
          <img src={node.member.photo} alt={node.member.name} />
        </div>
        <div className="tree-card-info">
          <span className="tree-card-name">{node.member.name}</span>
          <span className="tree-card-role">{node.member.relationship}</span>
          <span className="tree-card-gen">Gen {node.member.generation}</span>
        </div>
        {node.spouse && (
          <div className="tree-card-spouse" title={`Pasangan: ${node.spouse.name}`}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#B5965A" stroke="none">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
        )}
      </div>

      {/* Expand button */}
      {hasChildren && (
        <button
          className="tree-expand-btn"
          onClick={handleToggle}
          aria-label={expanded ? 'Collapse children' : 'Expand children'}
          type="button"
        >
          {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
        </button>
      )}

      {/* Children */}
      {hasChildren && expanded && (
        <div className="tree-children">
          <div className="tree-connector-vertical" />
          <div className="tree-children-inner">
            {node.children.map((child) => (
              <div key={child.id} className="tree-child-wrapper">
                <div className="tree-connector-horizontal" />
                <FamilyTreeNode
                  node={child}
                  onSelectMember={onSelectMember}
                  selectedId={selectedId}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
