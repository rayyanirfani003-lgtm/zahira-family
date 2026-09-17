import { useState } from 'react';
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  MapPin,
  X,
  UserPlus,
  Save,
} from 'lucide-react';
import { familyMembers } from '../../data';
import type { FamilyMember } from '../../data';

const emptyForm: Omit<FamilyMember, 'id'> = {
  name: '',
  nickname: '',
  photo: '',
  relationship: '',
  generation: 1,
  branch: '',
  city: '',
  province: '',
  country: 'Indonesia',
  birthDate: '',
  bio: '',
};

export default function AdminMembers() {
  const [members, setMembers] = useState<FamilyMember[]>(familyMembers);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<FamilyMember, 'id'>>(emptyForm);

  const filtered = members.filter(
    (member) =>
      member.name.toLowerCase().includes(search.toLowerCase()) ||
      member.relationship.toLowerCase().includes(search.toLowerCase()) ||
      member.city.toLowerCase().includes(search.toLowerCase()),
  );

  const openAddModal = () => {
    setEditingId(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEditModal = (member: FamilyMember) => {
    setEditingId(member.id);
    setForm({
      name: member.name,
      nickname: member.nickname || '',
      photo: member.photo,
      relationship: member.relationship,
      generation: member.generation,
      branch: member.branch,
      city: member.city,
      province: member.province || '',
      country: member.country || 'Indonesia',
      birthDate: member.birthDate || '',
      bio: member.bio || '',
    });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingId(null);
    setForm(emptyForm);
  };

  const updateForm = (
    field: keyof Omit<FamilyMember, 'id'>,
    value: string | number,
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    if (!form.name.trim() || !form.relationship.trim() || !form.city.trim()) {
      alert('Nama, hubungan, dan kota wajib diisi.');
      return;
    }

    if (editingId) {
      setMembers((current) =>
        current.map((member) =>
          member.id === editingId
            ? {
                ...member,
                ...form,
                name: form.name.trim(),
                relationship: form.relationship.trim(),
                city: form.city.trim(),
              }
            : member,
        ),
      );
    } else {
      const newMember: FamilyMember = {
        ...form,
        id: `member-${Date.now()}`,
        name: form.name.trim(),
        relationship: form.relationship.trim(),
        city: form.city.trim(),
        photo:
          form.photo.trim() ||
          'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face',
      };

      setMembers((current) => [...current, newMember]);
    }

    closeModal();
  };

  const handleDelete = (member: FamilyMember) => {
    const confirmed = window.confirm(
      `Hapus anggota "${member.name}" dari daftar?`,
    );

    if (!confirmed) return;

    setMembers((current) =>
      current.filter((item) => item.id !== member.id),
    );
  };

  return (
    <>
      <div className="wp-admin-members-page">
        <div className="wp-admin-page-heading">
          <div>
            <h1>Family Members</h1>
            <p>{members.length} anggota terdaftar</p>
          </div>

          <button
            type="button"
            className="wp-admin-primary-button"
            onClick={openAddModal}
          >
            <Plus size={17} />
            Tambah Anggota
          </button>
        </div>

        <div className="wp-admin-members-search">
          <Search size={17} />
          <input
            type="text"
            placeholder="Cari anggota..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        <div className="wp-admin-members-table-card">
          <div className="wp-admin-members-table-wrap">
            <table className="wp-admin-members-table">
              <thead>
                <tr>
                  <th>Anggota</th>
                  <th>Hubungan</th>
                  <th>Generasi</th>
                  <th>Kota</th>
                  <th className="wp-admin-action-column">Aksi</th>
                </tr>
              </thead>

              <tbody>
                {filtered.length > 0 ? (
                  filtered.map((member) => (
                    <tr key={member.id}>
                      <td>
                        <div className="wp-admin-member-identity">
                          <img
                            src={member.photo}
                            alt={member.name}
                          />
                          <div>
                            <p>{member.name}</p>
                            {member.nickname && (
                              <span>{member.nickname}</span>
                            )}
                          </div>
                        </div>
                      </td>

                      <td>{member.relationship}</td>

                      <td>
                        <span className="wp-admin-generation-badge">
                          Gen {member.generation}
                        </span>
                      </td>

                      <td>
                        <span className="wp-admin-member-city">
                          <MapPin size={13} />
                          {member.city}
                        </span>
                      </td>

                      <td className="wp-admin-action-column">
                        <div className="wp-admin-row-actions">
                          <button
                            type="button"
                            className="wp-admin-icon-button"
                            title="Edit anggota"
                            aria-label={`Edit ${member.name}`}
                            onClick={() => openEditModal(member)}
                          >
                            <Edit2 size={16} />
                          </button>

                          <button
                            type="button"
                            className="wp-admin-icon-button wp-admin-delete-button"
                            title="Hapus anggota"
                            aria-label={`Hapus ${member.name}`}
                            onClick={() => handleDelete(member)}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5}>
                      <div className="wp-admin-empty-members">
                        Tidak ada anggota yang ditemukan.
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {modalOpen && (
        <div className="wp-admin-modal-backdrop" onClick={closeModal}>
          <div
            className="wp-admin-member-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="wp-admin-modal-header">
              <div>
                <span className="wp-admin-modal-eyebrow">
                  {editingId ? 'Perbarui Data' : 'Data Baru'}
                </span>
                <h2>
                  {editingId ? 'Edit Anggota' : 'Tambah Anggota'}
                </h2>
              </div>

              <button
                type="button"
                className="wp-admin-modal-close"
                onClick={closeModal}
                aria-label="Tutup modal"
              >
                <X size={19} />
              </button>
            </div>

            <div className="wp-admin-member-form">
              <div className="wp-admin-form-grid">
                <label>
                  Nama lengkap *
                  <input
                    value={form.name}
                    onChange={(event) =>
                      updateForm('name', event.target.value)
                    }
                    placeholder="Contoh: H. Ahmad Zahir"
                  />
                </label>

                <label>
                  Nama panggilan
                  <input
                    value={form.nickname || ''}
                    onChange={(event) =>
                      updateForm('nickname', event.target.value)
                    }
                    placeholder="Contoh: Kakek Ahmad"
                  />
                </label>

                <label>
                  Hubungan *
                  <input
                    value={form.relationship}
                    onChange={(event) =>
                      updateForm('relationship', event.target.value)
                    }
                    placeholder="Contoh: Kakek"
                  />
                </label>

                <label>
                  Generasi *
                  <select
                    value={form.generation}
                    onChange={(event) =>
                      updateForm('generation', Number(event.target.value))
                    }
                  >
                    <option value={1}>Gen 1</option>
                    <option value={2}>Gen 2</option>
                    <option value={3}>Gen 3</option>
                    <option value={4}>Gen 4</option>
                  </select>
                </label>

                <label>
                  Kota *
                  <input
                    value={form.city}
                    onChange={(event) =>
                      updateForm('city', event.target.value)
                    }
                    placeholder="Contoh: Bandung"
                  />
                </label>

                <label>
                  Cabang keluarga
                  <input
                    value={form.branch}
                    onChange={(event) =>
                      updateForm('branch', event.target.value)
                    }
                    placeholder="Contoh: Zahir"
                  />
                </label>

                <label>
                  Provinsi
                  <input
                    value={form.province || ''}
                    onChange={(event) =>
                      updateForm('province', event.target.value)
                    }
                    placeholder="Contoh: Jawa Barat"
                  />
                </label>

                <label>
                  Tanggal lahir
                  <input
                    type="date"
                    value={form.birthDate || ''}
                    onChange={(event) =>
                      updateForm('birthDate', event.target.value)
                    }
                  />
                </label>
              </div>

              <label>
                URL foto
                <input
                  value={form.photo}
                  onChange={(event) =>
                    updateForm('photo', event.target.value)
                  }
                  placeholder="https://..."
                />
              </label>

              <label>
                Bio singkat
                <textarea
                  value={form.bio || ''}
                  onChange={(event) =>
                    updateForm('bio', event.target.value)
                  }
                  placeholder="Ceritakan sedikit tentang anggota ini..."
                  rows={4}
                />
              </label>
            </div>

            <div className="wp-admin-modal-footer">
              <button
                type="button"
                className="wp-admin-secondary-button"
                onClick={closeModal}
              >
                Batal
              </button>

              <button
                type="button"
                className="wp-admin-primary-button"
                onClick={handleSubmit}
              >
                {editingId ? <Save size={16} /> : <UserPlus size={16} />}
                {editingId ? 'Simpan Perubahan' : 'Tambah Anggota'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
