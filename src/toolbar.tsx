import {
  FormatBold,
  FormatClear,
  FormatItalic,
  FormatListBulleted,
  FormatListNumbered,
  FormatQuote,
  FormatStrikethrough,
  FormatUnderlined,
  Photo,
  Redo,
  type SvgIconComponent,
  Undo,
} from '@mui/icons-material';
import { CardActions, Divider, IconButton } from '@mui/material';
import type { ChainedCommands, Editor } from '@tiptap/react';

import MenuButton from './menu-button';
import MenuButtonImage, { type ImageProps } from './menu-button-image';
import MenuButtonLink from './menu-button-link';
import MenuHeadings from './menu-headings';

interface MenuProps {
  name: string;
  Icon: SvgIconComponent;
  onClick: (commands: ChainedCommands) => ChainedCommands;
}

const formats: MenuProps[] = [
  {
    name: 'bold',
    Icon: FormatBold,
    onClick(cmd) {
      return cmd.toggleBold();
    },
  },
  {
    name: 'italic',
    Icon: FormatItalic,
    onClick(cmd) {
      return cmd.toggleItalic();
    },
  },
  {
    name: 'strike',
    Icon: FormatStrikethrough,
    onClick(cmd) {
      return cmd.toggleStrike();
    },
  },
  {
    name: 'underline',
    Icon: FormatUnderlined,
    onClick(cmd) {
      return cmd.toggleUnderline();
    },
  },
  {
    name: 'orderedList',
    Icon: FormatListNumbered,
    onClick(cmd) {
      return cmd.toggleOrderedList();
    },
  },
  {
    name: 'bulletList',
    Icon: FormatListBulleted,
    onClick(cmd) {
      return cmd.toggleBulletList();
    },
  },
  {
    name: 'blockquote',
    Icon: FormatQuote,
    onClick(cmd) {
      return cmd.toggleBlockquote();
    },
  },
];

export default function Toolbar(props: {
  editor: Editor | null;
  image?: ImageProps;
}) {
  return (
    <CardActions>
      <MenuHeadings editor={props.editor} levels={[1, 2, 3, 4]} />
      {formats.map((menu) => (
        <MenuButton
          key={menu.name}
          editor={props.editor}
          name={menu.name}
          onClick={menu.onClick}
        >
          <menu.Icon />
        </MenuButton>
      ))}
      <MenuButtonLink editor={props.editor} />
      {props.image &&
        (props.editor ? (
          <MenuButtonImage {...props.image} editor={props.editor} />
        ) : (
          <IconButton disabled size="small">
            <Photo />
          </IconButton>
        ))}
      <Divider orientation={'vertical'} style={{ height: 24 }} />
      <MenuButton
        editor={props.editor}
        name="reset"
        onClick={(cmd) => cmd.clearNodes().unsetAllMarks()}
      >
        <FormatClear />
      </MenuButton>
      <MenuButton
        editor={props.editor}
        name="redo"
        onClick={(cmd) => cmd.redo()}
      >
        <Redo />
      </MenuButton>
      <MenuButton
        editor={props.editor}
        name="undo"
        onClick={(cmd) => cmd.undo()}
      >
        <Undo />
      </MenuButton>
    </CardActions>
  );
}
