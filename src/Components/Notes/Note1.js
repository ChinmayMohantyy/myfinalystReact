import React, { useEffect,useRef, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import {Submit} from '../../Components/Button'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import SunEditor from 'suneditor-react';
// import 'suneditor/dist/css/suneditor.min.css';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default function Note1() {
  const editor = useRef();

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  useEffect(() => {
    console.log(editorState);
  }, [editorState]);


  function showController(name, controllers){
    console.log(name, controllers)
  }
  const getSunEditorInstance = (sunEditor) => {
    editor.current = sunEditor;
  };

  return (
    <div>
        <div style={{padding:'0 25px',display:'flex'}}>
          <div style={{width:'300px'}}>
            <input type='text' style={{border:'none',fontWeight:'600',backgroundColor:'transparent'}} placeholder='enter title here'></input>
          </div>
            {/* <p style={{fontWeight:'600'}}>Enter Title here</p> */}
            {/* <div style={{width:'120px',marginLeft:'auto',display:'flex',alignItems:'center'}}>
                <Submit value=' Save ' sm/>
            </div> */}

        </div>
      {/* <h1>React Editors</h1> */}
      <div style={{ padding: '0 20px', minHeight: '500px',zIndex:'0'}}>
        {/* <Editor
          editorState={editorState}
          onEditorStateChange={setEditorState}
        /> */}
              {/* <SunEditor  getSunEditorInstance={getSunEditorInstance}  showController={showController} defaultValue="<p>Enter your notes here</p>" /> */}
              <CKEditor
              style={{minHeight:'70vh',zIndex:'0'}}
                    editor={ ClassicEditor }
                    // data="<p>Hello from CKEditor 5!</p>"
                    onReady={ editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        console.log( { event, editor, data } );
                    } }
                    onBlur={ ( event, editor ) => {
                        console.log( 'Blur.', editor );
                    } }
                    onFocus={ ( event, editor ) => {
                        console.log( 'Focus.', editor );
                    } }
                />
      </div>
    </div>
  );
}