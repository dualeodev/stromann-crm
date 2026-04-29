"use client";

import {
  useEditor,
  EditorContent,
  BubbleMenu,
  NodeViewWrapper,
  ReactNodeViewRenderer,
  type NodeViewProps,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import LinkExt from "@tiptap/extension-link";
import ImageExt from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import Typography from "@tiptap/extension-typography";
import CharacterCount from "@tiptap/extension-character-count";
import { useCallback, useRef, useState } from "react";
import {
  Bold, Italic, Underline as UnderlineIcon, Strikethrough,
  Heading2, Heading3, Heading4,
  List, ListOrdered, Quote, Code, Code2,
  Link2, Link2Off, Image as ImageIcon, Trash2,
  AlignLeft, AlignCenter, AlignRight, AlignJustify,
  Highlighter, Minus, Undo, Redo, Eraser,
} from "lucide-react";
import { uploadNewsInlineImage } from "../actions";

interface Props {
  name: string;
  initialHtml: string;
  maxChars?: number;
}

const ALLOWED_MIME = /^image\/(png|jpe?g|gif|webp|avif|svg\+xml)$/;

function ImageNodeView({ node, selected, deleteNode }: NodeViewProps) {
  const src = node.attrs.src as string;
  const alt = (node.attrs.alt as string) ?? "";
  return (
    <NodeViewWrapper
      as="figure"
      className="news-img-wrap"
      data-selected={selected ? "true" : "false"}
      contentEditable={false}
    >
      <img src={src} alt={alt} draggable={false} />
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          deleteNode();
        }}
        title="Xóa ảnh"
        aria-label="Xóa ảnh"
        className="news-img-del"
      >
        <span aria-hidden>×</span>
      </button>
    </NodeViewWrapper>
  );
}

const ImageWithRemove = ImageExt.extend({
  addNodeView() {
    return ReactNodeViewRenderer(ImageNodeView);
  },
});

export function NewsEditor({ name, initialHtml, maxChars = 50000 }: Props) {
  const [html, setHtml] = useState<string>(initialHtml || "");
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);

  const uploadFile = useCallback(async (file: File): Promise<string | null> => {
    if (!ALLOWED_MIME.test(file.type)) {
      alert("Định dạng ảnh không hỗ trợ.");
      return null;
    }
    const fd = new FormData();
    fd.append("file", file);
    setUploading(true);
    try {
      const { url } = await uploadNewsInlineImage(fd);
      return url;
    } catch (err) {
      alert(`Tải ảnh thất bại: ${(err as Error).message}`);
      return null;
    } finally {
      setUploading(false);
    }
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3, 4] },
        codeBlock: { HTMLAttributes: { class: "code-block" } },
      }),
      Underline,
      LinkExt.configure({
        openOnClick: false,
        autolink: true,
        protocols: ["http", "https", "mailto", "tel"],
        HTMLAttributes: { rel: "noopener noreferrer", target: "_blank" },
      }),
      ImageWithRemove.configure({ inline: false, allowBase64: false }),
      Placeholder.configure({ placeholder: "Viết nội dung bài viết ở đây…" }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Highlight.configure({ multicolor: false }),
      Typography,
      CharacterCount.configure({ limit: maxChars }),
    ],
    content: initialHtml || "",
    immediatelyRender: false,
    onUpdate: ({ editor }) => setHtml(editor.getHTML()),
    editorProps: {
      attributes: {
        class:
          "news-prose news-prose--editor min-h-[420px] px-4 py-3 focus:outline-none rounded-b-lg bg-white",
      },
      handlePaste: (view, event) => {
        const files = Array.from(event.clipboardData?.files ?? []);
        const images = files.filter((f) => f.type.startsWith("image/"));
        if (images.length === 0) return false;
        event.preventDefault();
        (async () => {
          for (const file of images) {
            const url = await uploadFile(file);
            if (url) editor?.chain().focus().setImage({ src: url, alt: file.name }).run();
          }
        })();
        return true;
      },
      handleDrop: (view, event) => {
        const files = Array.from(event.dataTransfer?.files ?? []);
        const images = files.filter((f) => f.type.startsWith("image/"));
        if (images.length === 0) return false;
        event.preventDefault();
        (async () => {
          for (const file of images) {
            const url = await uploadFile(file);
            if (url) editor?.chain().focus().setImage({ src: url, alt: file.name }).run();
          }
        })();
        return true;
      },
    },
  });

  if (!editor) return null;

  const setLink = () => {
    const prev = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("URL liên kết", prev ?? "https://");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  const triggerImageUpload = () => fileRef.current?.click();

  const onImagePicked = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = await uploadFile(file);
    if (url) editor.chain().focus().setImage({ src: url, alt: file.name }).run();
    if (fileRef.current) fileRef.current.value = "";
  };

  const removeImage = () => editor.chain().focus().deleteSelection().run();
  const clearFormatting = () =>
    editor.chain().focus().clearNodes().unsetAllMarks().run();

  const imageSelected = editor.isActive("image");

  const Btn = ({
    onClick, active, title, children, disabled,
  }: {
    onClick: () => void;
    active?: boolean;
    title: string;
    children: React.ReactNode;
    disabled?: boolean;
  }) => (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      aria-label={title}
      aria-pressed={active}
      style={{
        background: active ? "var(--n-900)" : "transparent",
        color: active ? "#fff" : "var(--n-700)",
        borderRadius: 6,
      }}
      className="inline-flex items-center justify-center w-8 h-8 transition disabled:opacity-40 disabled:cursor-not-allowed hover:!bg-n-100"
    >
      {children}
    </button>
  );

  const Divider = () => <span className="w-px h-5 bg-n-200 mx-1 self-center" />;

  const charCount = editor.storage.characterCount?.characters?.() ?? 0;
  const wordCount = editor.storage.characterCount?.words?.() ?? 0;

  return (
    <div className="field">
      <label>Nội dung</label>
      <div className="border border-n-200 rounded-lg overflow-hidden bg-white">
        <div
          className="flex flex-wrap items-center gap-1 px-2 py-1.5 border-b border-n-200 bg-n-50 sticky top-0 z-10"
        >
          <Btn
            title="Đậm (Ctrl+B)"
            active={editor.isActive("bold")}
            onClick={() => editor.chain().focus().toggleBold().run()}
          >
            <Bold size={15} />
          </Btn>
          <Btn
            title="Nghiêng (Ctrl+I)"
            active={editor.isActive("italic")}
            onClick={() => editor.chain().focus().toggleItalic().run()}
          >
            <Italic size={15} />
          </Btn>
          <Btn
            title="Gạch chân (Ctrl+U)"
            active={editor.isActive("underline")}
            onClick={() => editor.chain().focus().toggleUnderline().run()}
          >
            <UnderlineIcon size={15} />
          </Btn>
          <Btn
            title="Gạch ngang"
            active={editor.isActive("strike")}
            onClick={() => editor.chain().focus().toggleStrike().run()}
          >
            <Strikethrough size={15} />
          </Btn>
          <Btn
            title="Đánh dấu (highlight)"
            active={editor.isActive("highlight")}
            onClick={() => editor.chain().focus().toggleHighlight().run()}
          >
            <Highlighter size={15} />
          </Btn>
          <Btn
            title="Inline code"
            active={editor.isActive("code")}
            onClick={() => editor.chain().focus().toggleCode().run()}
          >
            <Code size={15} />
          </Btn>

          <Divider />

          <Btn
            title="Heading 2"
            active={editor.isActive("heading", { level: 2 })}
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          >
            <Heading2 size={15} />
          </Btn>
          <Btn
            title="Heading 3"
            active={editor.isActive("heading", { level: 3 })}
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          >
            <Heading3 size={15} />
          </Btn>
          <Btn
            title="Heading 4"
            active={editor.isActive("heading", { level: 4 })}
            onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
          >
            <Heading4 size={15} />
          </Btn>

          <Divider />

          <Btn
            title="Danh sách"
            active={editor.isActive("bulletList")}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
          >
            <List size={15} />
          </Btn>
          <Btn
            title="Đánh số"
            active={editor.isActive("orderedList")}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
          >
            <ListOrdered size={15} />
          </Btn>
          <Btn
            title="Trích dẫn"
            active={editor.isActive("blockquote")}
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
          >
            <Quote size={15} />
          </Btn>
          <Btn
            title="Khối code"
            active={editor.isActive("codeBlock")}
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          >
            <Code2 size={15} />
          </Btn>
          <Btn
            title="Đường kẻ ngang"
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
          >
            <Minus size={15} />
          </Btn>

          <Divider />

          <Btn
            title="Căn trái"
            active={editor.isActive({ textAlign: "left" })}
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
          >
            <AlignLeft size={15} />
          </Btn>
          <Btn
            title="Căn giữa"
            active={editor.isActive({ textAlign: "center" })}
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
          >
            <AlignCenter size={15} />
          </Btn>
          <Btn
            title="Căn phải"
            active={editor.isActive({ textAlign: "right" })}
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
          >
            <AlignRight size={15} />
          </Btn>
          <Btn
            title="Căn đều"
            active={editor.isActive({ textAlign: "justify" })}
            onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          >
            <AlignJustify size={15} />
          </Btn>

          <Divider />

          <Btn
            title={editor.isActive("link") ? "Sửa liên kết" : "Thêm liên kết"}
            active={editor.isActive("link")}
            onClick={setLink}
          >
            <Link2 size={15} />
          </Btn>
          <Btn
            title="Bỏ liên kết"
            disabled={!editor.isActive("link")}
            onClick={() => editor.chain().focus().unsetLink().run()}
          >
            <Link2Off size={15} />
          </Btn>
          <Btn title="Chèn ảnh" onClick={triggerImageUpload} disabled={uploading}>
            <ImageIcon size={15} />
          </Btn>
          <Btn
            title="Xóa ảnh đang chọn"
            onClick={removeImage}
            disabled={!imageSelected}
          >
            <Trash2 size={15} />
          </Btn>
          <Btn title="Xóa định dạng" onClick={clearFormatting}>
            <Eraser size={15} />
          </Btn>

          <span className="ml-auto" />

          <Btn
            title="Hoàn tác (Ctrl+Z)"
            disabled={!editor.can().undo()}
            onClick={() => editor.chain().focus().undo().run()}
          >
            <Undo size={15} />
          </Btn>
          <Btn
            title="Làm lại (Ctrl+Shift+Z)"
            disabled={!editor.can().redo()}
            onClick={() => editor.chain().focus().redo().run()}
          >
            <Redo size={15} />
          </Btn>
        </div>

        <BubbleMenu
          editor={editor}
          tippyOptions={{ duration: 120 }}
          shouldShow={({ editor, from, to }) =>
            from !== to && !editor.isActive("image")
          }
          className="flex items-center gap-1 px-1 py-1 bg-n-900 rounded-md shadow-lg"
        >
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className="text-white px-2 py-1 text-xs font-semibold hover:!bg-n-700 rounded"
          >B</button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className="text-white px-2 py-1 text-xs italic hover:!bg-n-700 rounded"
          >I</button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className="text-white px-2 py-1 text-xs underline hover:!bg-n-700 rounded"
          >U</button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHighlight().run()}
            className="text-white px-1.5 py-1 hover:!bg-n-700 rounded inline-flex items-center"
          ><Highlighter size={13} /></button>
          <button
            type="button"
            onClick={setLink}
            className="text-white px-1.5 py-1 hover:!bg-n-700 rounded inline-flex items-center"
          ><Link2 size={13} /></button>
        </BubbleMenu>

        <EditorContent editor={editor} />

        <div className="flex justify-between items-center text-[11px] text-n-500 px-4 py-2 border-t border-n-200 bg-n-50">
          <span>
            {uploading && (
              <span className="text-brand-500 mr-2">Đang tải ảnh…</span>
            )}
            Kéo-thả hoặc dán ảnh trực tiếp vào đây.
          </span>
          <span>
            {wordCount.toLocaleString("vi-VN")} từ · {charCount.toLocaleString("vi-VN")}/{maxChars.toLocaleString("vi-VN")} ký tự
          </span>
        </div>
      </div>
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        onChange={onImagePicked}
        className="hidden"
      />
      <input type="hidden" name={name} value={html} />
    </div>
  );
}
