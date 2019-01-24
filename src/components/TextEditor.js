import { Editor } from "slate-react";
import { Value } from "slate";
import React from "react";
import { isKeyHotkey } from "is-hotkey";
import styled from 'styled-components'
import { 
  MdFormatBold, 
  MdFormatItalic, 
  MdFormatUnderlined, 
  MdImage, 
  MdFormatListBulleted, 
  MdFormatListNumbered, 
  MdCode, 
  MdFormatQuote } from "react-icons/md";
import FormatToolbar from './FormatToolbar';
import initialValue from "./value.json";
import InputField from './InputField'


const Image = styled.img`
  display: block;
  max-width: 100%;
  max-height: 20em;
  margin-top: 10px;
  margin-bottom: 10px`;

const Button = styled.button`
  background: ${props => props.primary ? "#74e2d3" : "white"};
  color: ${props => props.primary ? "white" : "#74e2d3"};
  border:none;
  box-shadow:none;
  border-radius: 6px;
  cursor: pointer;
  display: inline-block;
  padding: 9px;
  margin: 0 5px;
  pointer-events: ${props => props.disabled ? 'none' : 'inherit'};
  opacity: ${props => props.disabled ? 0.4 : 1};

  :hover {
    opacity: 0.7;
  }
`;

const schema = {
  blocks: {
    image: {
      isVoid: true
    }
  }
};

const DEFAULT_NODE = "paragraph";


const isBoldHotkey = isKeyHotkey("alt+b");
const isItalicHotkey = isKeyHotkey("alt+i");
const isUnderlinedHotkey = isKeyHotkey("alt+u");
const isCodeHotkey = isKeyHotkey("alt+`");

const existingValue = JSON.parse(localStorage.getItem('content'));

class TextEditor extends React.Component {
  

  state = {
    value: Value.fromJSON(existingValue || initialValue)
  };

  blockCount = 0;

  handleChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState({ 
      [name]: parseInt(value,10)
     })
  }

  handleSaveContent = (type) => {
    if (type === 'save') {
      const content = JSON.stringify(this.editor.value.toJSON())
      localStorage.setItem('content', content);
    } else {
      this.setState({
        value: Value.fromJSON(existingValue || initialValue)
      })
    }
  }
  

  hasMark = type => {
    const { value } = this.state;
    return value.activeMarks.some(mark => mark.type === type);
  };


  hasBlock = type => {
    const { value } = this.state;
    return value.blocks.some(node => node.type === type);
  };


  ref = editor => {
    this.editor = editor;
  };

  

  render() {
    return (
      <div>
        <FormatToolbar>
          {this.renderMarkButton("bold", <MdFormatBold/>)}
          {this.renderMarkButton("italic", <MdFormatItalic/>)}
          {this.renderMarkButton("underlined", <MdFormatUnderlined/>)}
          {this.renderMarkButton("code", <MdCode/>)}
          {this.renderBlockButton("heading-one", "H1")}
          {this.renderBlockButton("heading-two", "H2")}
          {this.renderBlockButton("block-quote", <MdFormatQuote/>)}
          {this.renderBlockButton("numbered-list", <MdFormatListNumbered/>)}
          {this.renderBlockButton("bulleted-list", <MdFormatListBulleted/>)}
          {this.renderImageButton("image", <MdImage/>)}
          <InputField 
            type="number" 
            placeholder="Set Block limit" 
            name="blockLimit" 
            onChange={this.handleChange}
          />
          <div className="">
            <Button primary onClick={() => this.handleSaveContent('save')} disabled={this.blockCount > this.state.blockLimit}>Save</Button>
            <Button onClick={() => this.handleSaveContent('cancel')}>Cancel</Button>
          </div>
        </FormatToolbar>
       
       <div className="editor-field">
        <Editor
            spellCheck
            autoFocus
            placeholder="Enter some rich text..."
            schema={schema}
            ref={this.ref}
            value={this.state.value}
            onChange={this.onChange}
            onKeyDown={this.onKeyDown}
            renderNode={this.renderNode}
            renderEditor={this.renderEditor}
            renderMark={this.renderMark}
          />
       </div>
      </div>
    );
  }



  renderMarkButton = (type, icon) => {
    const isActive = this.hasMark(type);

    return (
      <button
        className="tooltip-icon-button"
        active={isActive.toString()}
        onMouseDown={event => this.onClickMark(event, type)}
      >
        <i>{icon}</i>
      </button>
    );
  };

  

  renderBlockButton = (type, icon) => {
    let isActive = this.hasBlock(type);

    if (["numbered-list", "bulleted-list"].includes(type)) {
      const {
        value: { document, blocks }
      } = this.state;

      if (blocks.size > 0) {
        const parent = document.getParent(blocks.first().key);
        isActive = this.hasBlock("list-item") && parent && parent.type === type;
      }
    }

    return (
      <button
        className="tooltip-icon-button"
        active={isActive.toString()}
        onMouseDown={event => this.onClickBlock(event, type)}
      >
        <i>{icon}</i>
      </button>
    );
  };

  renderImageButton = (type, icon) => {
    let isActive = this.hasBlock(type);

    return (
      <button
        className="tooltip-icon-button imgBtn"
        active={isActive.toString()}
      >
        <input type="file" ref="file" onChange={event => this.handleUploadImage(event)}/>
        <b>{icon}</b>
      </button>
    );
  };


  renderEditor = (props, editor, next) => {
    const { blockLimit } =  this.state;
    const children = next()
    const blockCount = props.value.document.getBlocks().size;

    return (
      <div>
        <div>{children}</div>
        <div className="editor-tools">
          <h3>Block Count: {blockCount}</h3>
          <h3>Max block limit: {blockLimit ? blockLimit : "None"}</h3>
        </div>
      </div>
    )
  }

  renderNode = (props, editor, next) => {
    const { attributes, parent, children, node, isFocused } = props;

      this.blockCount = parent.getBlocks().size;


      switch (node.type) {
        case "block-quote":
          return <blockquote {...attributes}>{children}</blockquote>;
        case "bulleted-list":
          return <ul {...attributes}>{children}</ul>;
        case "heading-one":
          return <h1 {...attributes}>{children}</h1>;
        case "heading-two":
          return <h2 {...attributes}>{children}</h2>;
        case "list-item":
          return <li {...attributes}>{children}</li>;
        case "numbered-list":
          return <ol {...attributes}>{children}</ol>;
        case "image": {
          const src = node.data.get('src')
          return <Image src={src} selected={isFocused} {...attributes} />;
        }
        default:
          return next();
      }
  };

  renderMark = (props, editor, next) => {
    const { children, mark, attributes } = props;

    switch (mark.type) {
      case "bold":
        return <strong {...attributes}>{children}</strong>;
      case "code":
        return <code {...attributes}>{children}</code>;
      case "italic":
        return <em {...attributes}>{children}</em>;
      case "underlined":
        return <u {...attributes}>{children}</u>;
      default:
        return next();
    }
  };

  handleUploadImage(e) {
    const reader = new FileReader();
    const file = e.target.files[0];
    if (this.blockCount > this.state.blockLimit) {
      alert('Block limit exceeded');
      return;
    };
    reader.addEventListener('load', () => 
      this.setState({ src: reader.result }, () => {
        this.editor.command(this.insertImage, this.state.src);
      })
    )
    reader.readAsDataURL(file)
  }

  insertImage = (editor, src, target) => {
    if (target) {
      editor.select(target);
    }
    editor.insertBlock({
      type: "image",
      data: { src }
    });
  };

  onChange = ({ value }) => {
    this.setState({ value });
  };

  handleTabList = (event, editor, next) => {
    const { value } = editor;
    const { document } = value;
    const block = value.blocks.first();
    const parent = block ? document.getParent(block.key) : null;
    const type = !parent.type ? 'bulleted-list' : parent.type;
    const depth = document.getDepth(block.key);
    const isList = this.hasBlock('list-item');

    // console.log(block.text, 'depth', editor.nodes, 'parent', parent.getBlocks(block.key).isEmpty())

    if (!event.shiftKey && event.key === 'Tab' && isList) {
      event.preventDefault();

      if (depth > 3){
        return next();
      } 
      if (parent) {
        editor.setBlocks('list-item').wrapBlock(type);
      }
    }

    if (event.shiftKey && event.key === 'Tab' && isList) {
      if (depth < 3 ) {
        return next();
      }
      event.preventDefault();
      editor.setBlocks('list-item').unwrapBlock(type)
    }

    if (event.key === 'Enter' &&  !block.text.length) {
      editor
      .unwrapBlock('bulleted-list')
      .unwrapBlock('numbered-list')
      .setBlocks(DEFAULT_NODE)
    }
  }

  onKeyDown = (event, editor, next) => {
    
    this.handleTabList(event, editor, next);

    if(this.blockCount > this.state.blockLimit && event.key !== 'Backspace') {
      event.preventDefault();
      return ;
    }
     
    let mark;

    if (isBoldHotkey(event)) {
      mark = "bold";
    } else if (isItalicHotkey(event)) {
      mark = "italic";
    } else if (isUnderlinedHotkey(event)) {
      mark = "underlined";
    } else if (isCodeHotkey(event)) {
      mark = "code";
    } else {
      return next();
    }

    event.preventDefault();
    editor.toggleMark(mark);
  };


  onClickMark = (event, type) => {
    event.preventDefault();
    this.editor.toggleMark(type);
  };


  onClickBlock = (event, type) => {
    event.preventDefault();

    const { editor } = this;
    const { value } = editor;
    const { document } = value;

    // Handle everything but list buttons.
    if (type !== "bulleted-list" && type !== "numbered-list") {
      const isActive = this.hasBlock(type);
      const isList = this.hasBlock("list-item");


      if (isList) {
        editor
          .setBlocks(isActive ? DEFAULT_NODE : type)
          .unwrapBlock("bulleted-list")
          .unwrapBlock("numbered-list");
      } else {
        editor.setBlocks(isActive ? DEFAULT_NODE : type);
      }
    } else {
      // Handle the extra wrapping required for list buttons.
      const isList = this.hasBlock("list-item");
      const isType = value.blocks.some(block => {
        return !!document.getClosest(block.key, parent => parent.type === type);
      });

      if (isList && isType) {
        editor
          .setBlocks(DEFAULT_NODE)
          .unwrapBlock("bulleted-list")
          .unwrapBlock("numbered-list");
      } else if (isList) {
        editor
          .unwrapBlock(
            type === "bulleted-list" ? "numbered-list" : "bulleted-list"
          )
          .wrapBlock(type);
      } else {
        editor.setBlocks("list-item").wrapBlock(type);
      }
    }
  };
}

/**
 * Export.
 */

export default TextEditor;
