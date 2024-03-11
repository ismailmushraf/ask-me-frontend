import { useState } from "react";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";

const MyRichTextEditor = () => {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

  const handleChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  return (
    <Editor editorState={editorState} onChange={handleChange} />
  );
};

export default MyRichTextEditor;

