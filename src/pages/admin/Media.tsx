import { useEffect, useRef, useState } from 'react';
import {
  Upload,
  Image as ImageIcon,
  Trash2,
  Copy,
  Check,
  Search,
  X,
} from 'lucide-react';

interface MediaItem {
  id: string;
  name: string;
  url: string;
  size: number;
  type: string;
  createdAt: string;
}

const STORAGE_KEY = 'zahira-family-media-library';

export default function AdminMedia() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<MediaItem | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);

      if (saved) {
        setMedia(JSON.parse(saved));
      }
    } catch {
      setMedia([]);
    }
  }, []);

  const saveMedia = (items: MediaItem[]) => {
    setMedia(items);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  };

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);

    if (!files.length) return;

    const imageFiles = files.filter((file) =>
      file.type.startsWith('image/'),
    );

    if (!imageFiles.length) {
      alert('Silakan pilih file gambar.');
      return;
    }

    const readers = imageFiles.map(
      (file) =>
        new Promise<MediaItem>((resolve, reject) => {
          const reader = new FileReader();

          reader.onload = () => {
            resolve({
              id: `media-${Date.now()}-${Math.random()
                .toString(36)
                .slice(2, 8)}`,
              name: file.name,
              url: String(reader.result),
              size: file.size,
              type: file.type,
              createdAt: new Date().toISOString(),
            });
          };

          reader.onerror = reject;
          reader.readAsDataURL(file);
        }),
    );

    Promise.all(readers)
      .then((newItems) => {
        saveMedia([...newItems, ...media]);
      })
      .catch(() => {
        alert('Gagal membaca foto.');
      });

    event.target.value = '';
  };

  const handleDelete = (item: MediaItem) => {
    const confirmed = window.confirm(
      `Hapus foto "${item.name}" dari Media Library?`,
    );

    if (!confirmed) return;

    const next = media.filter((mediaItem) => mediaItem.id !== item.id);
    saveMedia(next);

    if (selected?.id === item.id) {
      setSelected(null);
    }
  };

  const handleCopy = async (item: MediaItem) => {
    try {
      await navigator.clipboard.writeText(item.url);
      setCopiedId(item.id);

      window.setTimeout(() => {
        setCopiedId(null);
      }, 1800);
    } catch {
      alert('URL foto tidak dapat disalin otomatis.');
    }
  };

  const filteredMedia = media.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()),
  );

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }

    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <>
      <div className="admin-media-page">
        <div className="admin-page-heading">
          <div>
            <h1>Media Library</h1>
            <p>Kelola foto dan media keluarga</p>
          </div>

          <button
            type="button"
            className="admin-primary-button"
            onClick={() => inputRef.current?.click()}
          >
            <Upload size={17} />
            Upload Media
          </button>

          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            hidden
            onChange={handleUpload}
          />
        </div>

        <div className="admin-media-toolbar">
          <div className="admin-members-search">
            <Search size={17} />
            <input
              type="text"
              placeholder="Cari nama file..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          <span className="admin-media-count">
            {media.length} media
          </span>
        </div>

        {filteredMedia.length > 0 ? (
          <div className="admin-media-grid">
            {filteredMedia.map((item) => (
              <div className="admin-media-card" key={item.id}>
                <button
                  type="button"
                  className="admin-media-preview"
                  onClick={() => setSelected(item)}
                  title="Lihat foto"
                >
                  <img src={item.url} alt={item.name} />
                </button>

                <div className="admin-media-info">
                  <p title={item.name}>{item.name}</p>
                  <span>{formatSize(item.size)}</span>
                </div>

                <div className="admin-media-actions">
                  <button
                    type="button"
                    onClick={() => handleCopy(item)}
                    title="Salin URL"
                  >
                    {copiedId === item.id ? (
                      <Check size={15} />
                    ) : (
                      <Copy size={15} />
                    )}
                  </button>

                  <button
                    type="button"
                    className="delete"
                    onClick={() => handleDelete(item)}
                    title="Hapus media"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="admin-media-empty">
            <div className="admin-media-empty-icon">
              <ImageIcon size={30} />
            </div>

            <h2>Belum ada media</h2>
            <p>
              Upload foto keluarga untuk mulai mengisi Media Library.
            </p>

            <button
              type="button"
              className="admin-primary-button"
              onClick={() => inputRef.current?.click()}
            >
              <Upload size={16} />
              Upload Foto Pertama
            </button>
          </div>
        )}
      </div>

      {selected && (
        <div
          className="admin-modal-backdrop"
          onClick={() => setSelected(null)}
        >
          <div
            className="admin-media-lightbox"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="admin-modal-close"
              onClick={() => setSelected(null)}
              aria-label="Tutup preview"
            >
              <X size={19} />
            </button>

            <img src={selected.url} alt={selected.name} />

            <div className="admin-media-lightbox-info">
              <strong>{selected.name}</strong>
              <span>{formatSize(selected.size)}</span>
            </div>

            <button
              type="button"
              className="admin-primary-button"
              onClick={() => handleCopy(selected)}
            >
              {copiedId === selected.id ? (
                <Check size={16} />
              ) : (
                <Copy size={16} />
              )}
              {copiedId === selected.id ? 'URL Disalin' : 'Salin URL Foto'}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
