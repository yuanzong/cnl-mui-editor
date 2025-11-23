import { Box, Card, type CardProps, Divider } from '@mui/material';
import Image from '@tiptap/extension-image';
import {
  type Content,
  EditorContent,
  type UseEditorOptions,
  useEditor,
} from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

import type { ImageProps } from './menu-button-image';
import Toolbar from './toolbar';

interface Props
  extends Pick<CardProps, 'className' | 'style' | 'variant'>,
    Pick<UseEditorOptions, 'onCreate' | 'onUpdate'> {
  initialContent?: Content;
  image?: ImageProps;
}

export type { ImageProps };

export type { Editor, EditorOptions } from '@tiptap/core';

export function MUIEditor(props: Props) {
  const editor = useEditor({
    immediatelyRender: false,
    content: props.initialContent,
    extensions: [StarterKit, Image],
    onCreate: props.onCreate,
    onUpdate: props.onUpdate,
    editorProps: {
      handlePaste(_, event) {
        // Get the data of clipboard
        const clipboardItems = event.clipboardData?.files;
        if (!clipboardItems) return false;

        const image = Array.from(clipboardItems).find((item) =>
          item.type.includes('image'),
        );
        if (!image) {
          return false;
        }

        // disable paste image
        event.preventDefault();
        return true;
      },
    },
  });

  return (
    <Card
      variant={props.variant}
      className={props.className}
      style={props.style}
    >
      <Toolbar editor={editor} image={props.image} />
      <Divider style={{ height: 2 }} />
      <Box
        sx={{
          py: 1,
          px: 2,
          position: 'relative',
          typography: 'body1',
        }}
      >
        <EditorContent editor={editor} style={{ minHeight: 80 }} />
      </Box>
    </Card>
  );
}
