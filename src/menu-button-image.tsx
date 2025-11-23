import { Photo } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import type { Editor } from '@tiptap/react';

export interface ImageProps {
  loading: boolean;
  onSelected: (file: File) => Promise<string>;
  onError: (message: string) => void;
}

interface Props extends ImageProps {
  editor: Editor;
}

export default function MenuButtonImage(props: Props) {
  return (
    <label>
      <input
        type="file"
        multiple={false}
        accept="image/webp,image/gif,image/png,image/jpeg"
        style={{ display: 'none' }}
        onChange={async (evt) => {
          if (!evt.target.files || evt.target.files.length !== 1) {
            return;
          }

          const file = evt.target.files[0];
          try {
            const url = await props.onSelected(file);
            props.editor
              .chain()
              .focus()
              .setImage({ src: url, alt: file.name })
              .run();
          } catch (err) {
            props.onError(
              typeof err === 'string' ? err : `Fail to upload ${file.name}`,
            );
            // @ts-expect-error
            evt.target.value = null;
          }
        }}
      />

      <IconButton loading={props.loading} size="small" component="span">
        <Photo />
      </IconButton>
    </label>
  );
}
