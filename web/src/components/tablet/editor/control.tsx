import { cn } from '@/lib/utils';
import { useEditor } from '@tiptap/react';
import { Icons } from '@/components/icons';
import React from 'react';

type ToolbarButtonProps = React.PropsWithChildren & {
  editor: ReturnType<typeof useEditor>;
  isActive?: { name: string; attributes?: Record<string, any> | string };
  operation: { name: string; attributes?: Record<string, any> | string };
  className?: string;
};

const ToolbarButton: React.FC<ToolbarButtonProps> = ({
  editor,
  isActive,
  operation,
  className,
  children,
}) => {
  if (!editor) return null;

  const active = React.useMemo(
    () => (isActive?.name ? editor?.isActive(isActive?.name, isActive?.attributes) : false),
    [editor, isActive],
  );

  const onClick = React.useCallback(() => {
    if (operation?.name) {
      // @ts-ignore
      editor?.chain().focus()[operation.name](operation.attributes).run();

      // Get the current alignment of the selected text
      const currentAlignment = editor.getAttributes('textAlign').textAlign;

      // Set the alignment after changing the heading level
      editor
        .chain()
        .focus()
        .setTextAlign(currentAlignment as string)
        .run();
    }
  }, [editor, operation]);

  return (
    <button
      className={cn(
        'w-8 h-8 flex items-center justify-center border-r text-card-foreground/80 hover:bg-border/40 transition-colors duration-100',
        active ? 'bg-border/40' : '',
        className,
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
ToolbarButton.displayName = 'ToolbarButton';

type ToolbarProps = {
  editor: ReturnType<typeof useEditor>;
};

const Toolbar: React.FC<ToolbarProps> = ({ editor }) => {
  if (!editor) return null;

  return (
    <div
      className={cn(
        'flex justify-between',
        editor.isEditable ? 'pointer-events-auto' : 'pointer-events-none',
      )}
    >
      <div className='flex'>
        <ToolbarButton
          editor={editor}
          isActive={{ name: 'bold' }}
          operation={{ name: 'toggleBold' }}
        >
          <Icons.bold className='w-4 h-4' />
        </ToolbarButton>
        <ToolbarButton
          editor={editor}
          isActive={{ name: 'italic' }}
          operation={{ name: 'toggleItalic' }}
        >
          <Icons.italic className='w-4 h-4' />
        </ToolbarButton>

        <ToolbarButton
          editor={editor}
          isActive={{ name: 'underline' }}
          operation={{ name: 'toggleUnderline' }}
        >
          <Icons.underline className='w-4 h-4' />
        </ToolbarButton>
        <ToolbarButton
          editor={editor}
          isActive={{ name: 'strike' }}
          operation={{ name: 'toggleStrike' }}
        >
          <Icons.strike className='w-4 h-4' />
        </ToolbarButton>
      </div>
      <div className='flex'>
        {/* make buttons for h1-h4 */}
        <ToolbarButton
          className='border-l'
          editor={editor}
          isActive={{ name: 'heading', attributes: { level: 1 } }}
          operation={{ name: 'toggleHeading', attributes: { level: 1 } }}
        >
          <Icons.h1 className='w-4 h-4' />
        </ToolbarButton>
        <ToolbarButton
          editor={editor}
          isActive={{ name: 'heading', attributes: { level: 2 } }}
          operation={{ name: 'toggleHeading', attributes: { level: 2 } }}
        >
          <Icons.h2 className='w-4 h-4' />
        </ToolbarButton>
        <ToolbarButton
          editor={editor}
          isActive={{ name: 'heading', attributes: { level: 3 } }}
          operation={{ name: 'toggleHeading', attributes: { level: 3 } }}
        >
          <Icons.h3 className='w-4 h-4' />
        </ToolbarButton>
        <ToolbarButton
          editor={editor}
          isActive={{ name: 'heading', attributes: { level: 4 } }}
          operation={{ name: 'toggleHeading', attributes: { level: 4 } }}
        >
          <Icons.h4 className='w-4 h-4' />
        </ToolbarButton>
      </div>
      <div className='flex'>
        <ToolbarButton
          className='border-l'
          editor={editor}
          isActive={{ name: 'textAlign', attributes: 'left' }}
          operation={{ name: 'setTextAlign', attributes: 'left' }}
        >
          <Icons.alignLeft className='w-4 h-4' />
        </ToolbarButton>
        <ToolbarButton
          editor={editor}
          isActive={{ name: 'textAlign', attributes: 'center' }}
          operation={{ name: 'setTextAlign', attributes: 'center' }}
        >
          <Icons.alignCenter className='w-4 h-4' />
        </ToolbarButton>
        <ToolbarButton
          editor={editor}
          isActive={{ name: 'textAlign', attributes: 'right' }}
          operation={{ name: 'setTextAlign', attributes: 'right' }}
        >
          <Icons.alignRight className='w-4 h-4' />
        </ToolbarButton>
        <ToolbarButton
          editor={editor}
          isActive={{ name: 'textAlign', attributes: 'justify' }}
          operation={{ name: 'setTextAlign', attributes: 'justify' }}
        >
          <Icons.alignJustify className='w-4 h-4' />
        </ToolbarButton>
      </div>
      <ToolbarButton
        className='border-r-0 border-l'
        editor={editor}
        operation={{ name: 'unsetAllMarks' }}
      >
        <Icons.close className='w-4 h-4' />
      </ToolbarButton>
    </div>
  );
};
Toolbar.displayName = 'Toolbar';

export { Toolbar, ToolbarButton };
