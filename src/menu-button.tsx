import { IconButton } from '@mui/material';
import type { ChainedCommands, Editor } from '@tiptap/react';
import type * as React from 'react';

export default function MenuButton(props: {
  editor: Editor | null;
  name: string;
  children: React.ReactNode;
  onClick: (commands: ChainedCommands) => ChainedCommands;
}) {
  return (
    <IconButton
      size="small"
      color={
        props.name && props.editor?.isActive(props.name) ? 'primary' : 'default'
      }
      onClick={() => {
        if (props.editor) {
          props.onClick(props.editor.chain().focus()).run();
        }
      }}
    >
      {props.children}
    </IconButton>
  );
}
