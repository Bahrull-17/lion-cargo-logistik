"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

interface ContentEditorProps {
  id: string;
  label: string;
  value: string;
  onChange: (html: string) => void;
}

// Fitur editor dibatasi pada yang didukung sanitizer di server (lihat article-content.ts).
const extensions = [
  StarterKit.configure({
    heading: { levels: [2, 3] },
    code: false,
    codeBlock: false,
    horizontalRule: false,
    strike: false,
    underline: false,
    trailingNode: false,
    link: {
      openOnClick: false,
      autolink: true,
      defaultProtocol: "https",
      HTMLAttributes: { rel: "noopener noreferrer", target: "_blank" },
    },
  }),
];

interface ToolbarButtonProps {
  label: string;
  title: string;
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
}

function ToolbarButton({ label, title, active = false, disabled = false, onClick }: ToolbarButtonProps) {
  return (
    <button
      type="button"
      title={title}
      aria-label={title}
      aria-pressed={active}
      disabled={disabled}
      // Mencegah editor kehilangan fokus/seleksi saat tombol diklik.
      onMouseDown={(event) => event.preventDefault()}
      onClick={onClick}
      className={`h-8 min-w-8 rounded-md px-2 text-xs font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${active ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
    >
      {label}
    </button>
  );
}

export function ContentEditor({ id, label, value, onChange }: ContentEditorProps) {
  const editor = useEditor({
    extensions,
    content: value,
    // Wajib false di Next.js (SSR) agar tidak terjadi hydration mismatch.
    immediatelyRender: false,
    // Agar tombol toolbar ikut menyala/mati mengikuti posisi kursor.
    shouldRerenderOnTransaction: true,
    editorProps: {
      attributes: {
        id,
        "aria-label": label,
        class: "prose prose-slate max-w-none min-h-72 px-4 py-3 focus:outline-none prose-headings:font-black prose-headings:text-slate-900 prose-a:text-red-600",
      },
    },
    onUpdate: ({ editor: current }) => {
      onChange(current.isEmpty ? "" : current.getHTML());
    },
  });

  const setLink = () => {
    if (!editor) return;

    const previous = editor.getAttributes("link").href as string | undefined;
    const input = window.prompt("Alamat tautan (contoh: https://lioncargologistik.com)\nKosongkan untuk menghapus tautan.", previous ?? "https://");
    if (input === null) return;

    const url = input.trim();
    if (url === "" || url === "https://") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    const href = /^(https?:|mailto:|tel:)/i.test(url) ? url : `https://${url}`;
    editor.chain().focus().extendMarkRange("link").setLink({ href }).run();
  };

  // Untuk melanjutkan nomor setelah daftar terputus paragraf/poin (mis. mulai dari 2, 3, dst).
  const setListStart = () => {
    if (!editor) return;

    const current = editor.getAttributes("orderedList").start as number | undefined;
    const input = window.prompt("Daftar bernomor ini dimulai dari nomor berapa?", String(current ?? 1));
    if (input === null) return;

    const start = Number.parseInt(input.trim(), 10);
    if (!Number.isInteger(start) || start < 1 || start > 999) {
      window.alert("Masukkan angka antara 1 sampai 999.");
      return;
    }

    editor.chain().focus().updateAttributes("orderedList", { start }).run();
  };

  return (
    <div className="overflow-hidden rounded-md border border-input bg-background focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50">
      {/* Toolbar berada di luar area gulir, jadi selalu terlihat di atas kotak editor. */}
      <div className="flex flex-wrap items-center gap-1 border-b bg-muted p-1.5" role="toolbar" aria-label="Format teks">
        <ToolbarButton label="B" title="Tebal" active={editor?.isActive("bold")} disabled={!editor} onClick={() => editor?.chain().focus().toggleBold().run()} />
        <ToolbarButton label="I" title="Miring" active={editor?.isActive("italic")} disabled={!editor} onClick={() => editor?.chain().focus().toggleItalic().run()} />
        <span className="mx-1 h-5 w-px bg-border" aria-hidden="true" />
        <ToolbarButton label="H2" title="Judul bagian" active={editor?.isActive("heading", { level: 2 })} disabled={!editor} onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()} />
        <ToolbarButton label="H3" title="Sub-judul" active={editor?.isActive("heading", { level: 3 })} disabled={!editor} onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()} />
        <span className="mx-1 h-5 w-px bg-border" aria-hidden="true" />
        <ToolbarButton label="• Daftar" title="Daftar berpoin" active={editor?.isActive("bulletList")} disabled={!editor} onClick={() => editor?.chain().focus().toggleBulletList().run()} />
        <ToolbarButton label="1. Daftar" title="Daftar bernomor" active={editor?.isActive("orderedList")} disabled={!editor} onClick={() => editor?.chain().focus().toggleOrderedList().run()} />
        {editor?.isActive("orderedList") ? <ToolbarButton label="Nomor awal" title="Atur nomor awal daftar bernomor" onClick={setListStart} /> : null}
        <ToolbarButton label="Kutipan" title="Kutipan" active={editor?.isActive("blockquote")} disabled={!editor} onClick={() => editor?.chain().focus().toggleBlockquote().run()} />
        <ToolbarButton label="Tautan" title="Sisipkan atau ubah tautan" active={editor?.isActive("link")} disabled={!editor} onClick={setLink} />
        <span className="mx-1 h-5 w-px bg-border" aria-hidden="true" />
        <ToolbarButton label="Urungkan" title="Urungkan" disabled={!editor?.can().undo()} onClick={() => editor?.chain().focus().undo().run()} />
        <ToolbarButton label="Ulangi" title="Ulangi" disabled={!editor?.can().redo()} onClick={() => editor?.chain().focus().redo().run()} />
      </div>

      {/* Area tulis dengan tinggi terbatas: artikel panjang menggulir di sini, bukan memanjangkan halaman. */}
      <div className="max-h-[65dvh] overflow-y-auto">{editor ? <EditorContent editor={editor} /> : <div className="min-h-72 px-4 py-3 text-sm text-muted-foreground">Memuat editor…</div>}</div>
    </div>
  );
}
