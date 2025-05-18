"use client";

import { useEditorStore } from "@/app/core/global/useEditorStore";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Heading from '@tiptap/extension-heading';
import Blockquote from "@tiptap/extension-blockquote";
import './styles.css';
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Image from "@tiptap/extension-image";
import TableRow from "@tiptap/extension-table-row";
import TableHeader from "@tiptap/extension-table-header";
import TableCell from "@tiptap/extension-table-cell";
import Table from "@tiptap/extension-table";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";

interface LineEditorProps {
    content: string;
    onUpdate: (newContent: string) => void;
}

const LineEditor = ({ content, onUpdate }: LineEditorProps) => {
    const { setCurrentEditor } = useEditorStore();
    const editor = useEditor({
        immediatelyRender: false,
        extensions: [ Blockquote, TextStyle, TaskList, Color, Table.configure({ resizable: true }), TableRow, TableHeader, TableCell, Image, TaskItem.configure({ HTMLAttributes: { class: 'task-list' } }), StarterKit.configure({ heading: false, blockquote: false }), Underline, TextAlign.configure({
            types: ['heading', 'paragraph'],
        }), Heading.configure({
            levels: [1, 2, 3, 4, 5, 6],
        }),],
        content,
        editorProps: {
            attributes: {
                class: "outline-none p-2 text-xl resize-none border-l-2 border-gray-700 focus:outline-none w-full",
            },
        },
        onUpdate: ({ editor }) => {
            onUpdate(editor.getHTML());
        },
        onFocus: ({ editor }) => {
            setCurrentEditor(editor);
        }
    });

    useEffect(() => {
        if (editor && editor.getHTML() !== content) {
            editor.commands.setContent(content, false);
        }
    }, [content, editor]);


    return (
        <div>
            <EditorContent editor={editor} className="tiptap" />
        </div>
    );
};

export default LineEditor;