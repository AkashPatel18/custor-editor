import React, {useState} from "react";
import "./App.css";
import CustomEditor from "./components/Editor/Editor";
import Button from "./components/Button/Button";
import { EditorState, convertToRaw } from 'draft-js';

function App() {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

  const onSave = () => {
    const contentState = editorState.getCurrentContent();
    const raw = JSON.stringify(convertToRaw(contentState));
    localStorage.setItem('editorContent', raw);
    alert('Content saved!');
};
  return (
    <div className="App">
    <header className="App-header">
      <div className="header-content">
        <div className="header-title">Demo editor by Akash Patel</div>
        <Button onSave={onSave}/>
      </div>
    </header>
    <div className="container">
      <CustomEditor setEditorState={setEditorState} editorState={editorState}/>
    </div>
  </div>
  );
}

export default App;
