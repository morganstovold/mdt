import { EditorContent, useEditor } from '@tiptap/react';
import Highlight from '@tiptap/extension-highlight';
import Document from '@tiptap/extension-document';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import Heading from '@tiptap/extension-heading';
import Text from '@tiptap/extension-text';
import Paragraph from '@tiptap/extension-paragraph';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Strike from '@tiptap/extension-strike';
import History from '@tiptap/extension-history';
import React from 'react';
import { Toolbar } from './control';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

type EditorProps = {
  content: string;
  editable?: boolean;
  onChange: (content: string) => void;
};

const Editor: React.FC<EditorProps> = ({ content, editable = true, onChange }) => {
  const _content = React.useMemo(() => content, [content]);
  const editor = useEditor({
    extensions: [
      Document,
      History,
      Heading.configure({ levels: [1, 2, 3, 4] }),
      Underline,
      Highlight.configure({}),
      TextStyle,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Text,
      Paragraph,
      Bold,
      Italic,
      Strike,
    ],
    editable,
    content: _content,
    onUpdate: ({ editor }) => {
      if (!editable) return;
      onChange(editor.getHTML());
    },
  });

  React.useEffect(() => {
    // editor?.commands.setContent(content);
    // only update the content if it's different
    if (editor?.getHTML() !== content) {
      editor?.commands.setContent(content);
    }
    editor?.setEditable(editable);
  }, [content, editable]);

  return (
    <div className={cn('flex flex-col h-full w-full overflow-hidden border')}>
      <Toolbar editor={editor} />
      <Separator />
      <EditorContent
        spellCheck={false}
        className='p-2 w-full h-full overflow-scroll'
        editor={editor}
        readOnly={!editable}
      />
    </div>
  );
};
Editor.displayName = 'Editor';

export default Editor;
