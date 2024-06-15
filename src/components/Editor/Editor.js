import React, { useState, useEffect } from "react";
import {
  Editor,
  EditorState,
  RichUtils,
  convertFromRaw,
  Modifier,
} from "draft-js";
import "./Editor.css";
import customStyleMap from "./CustomStyles";

const MyEditor = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  useEffect(() => {
    const savedData = localStorage.getItem("editorContent");
    console.log({savedData})
    if (savedData) {
      setEditorState(
        EditorState.createWithContent(convertFromRaw(JSON.parse(savedData)))
      );
    }
  }, []);

  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return "handled";
    }
    return "not-handled";
  };

  const handleBeforeInput = (chars, editorState) => {
    const contentState = editorState.getCurrentContent();
    const selectionState = editorState.getSelection();
    const blockKey = selectionState.getStartKey();
    const block = contentState.getBlockForKey(blockKey);
    const blockText = block.getText();

    if (blockText.startsWith("#") && chars === " ") {
      const newContentState = Modifier.removeRange(
        contentState,
        selectionState.merge({
          anchorOffset: 0,
          focusOffset: 1,
        }),
        "backward"
      );
      const newState = EditorState.push(
        editorState,
        newContentState,
        "remove-range"
      );
      setEditorState(RichUtils.toggleBlockType(newState, "header-one"));
      return "handled";
    }

    if (blockText.startsWith("***") && chars === " ") {
      const newContentState = Modifier.removeRange(
        contentState,
        selectionState.merge({
          anchorOffset: 0,
          focusOffset: 3,
        }),
        "backward"
      );
      const newState = EditorState.push(
        editorState,
        newContentState,
        "remove-range"
      );
      setEditorState(RichUtils.toggleInlineStyle(newState, "UNDERLINE"));
      return "handled";
    }

    if (blockText.startsWith("**") && chars === " ") {
      const newContentState = Modifier.removeRange(
        contentState,
        selectionState.merge({
          anchorOffset: 0,
          focusOffset: 2,
        }),
        "backward"
      );
      const newState = EditorState.push(
        editorState,
        newContentState,
        "remove-range"
      );
      setEditorState(RichUtils.toggleInlineStyle(newState, "RED"));
      return "handled";
    }

    if (blockText.startsWith("*") && chars === " ") {
      const newContentState = Modifier.removeRange(
        contentState,
        selectionState.merge({
          anchorOffset: 0,
          focusOffset: 1,
        }),
        "backward"
      );
      const newState = EditorState.push(
        editorState,
        newContentState,
        "remove-range"
      );
      setEditorState(RichUtils.toggleInlineStyle(newState, "BOLD"));
      return "handled";
    }

    if (blockText.endsWith("```") && chars === " ") {
      const newContentState = Modifier.removeRange(
        contentState,
        selectionState.merge({
            anchorOffset: 0,
            focusOffset: 3,
          }),
        "backward"
      );
      const newState = EditorState.push(
        editorState,
        newContentState,
        "remove-range"
      );
      setEditorState(RichUtils.toggleBlockType(newState, "code-block"));
      return "handled";
    }

    return "not-handled";
  };

  return (
    <div className="editor">
      <Editor
        editorState={editorState}
        handleKeyCommand={handleKeyCommand}
        handleBeforeInput={handleBeforeInput}
        onChange={setEditorState}
        customStyleMap={customStyleMap}
        placeholder="Start typing here..."
      />
    </div>
  );
};

export default MyEditor;
