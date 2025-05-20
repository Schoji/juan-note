"use client";
import { useEditorStore } from '@/app/core/global/useEditorStore';
import { Icons } from '@/app/core/icons/icons';
import React from 'react';
import ColorSelection from './components/colorSelection';

const Toolbar = () => {
  const { currentEditor } = useEditorStore();
  return (
    <div className='flex gap-2 items-center p-2 pl-5 border-b-1 border-neutral-800'>
      <div className="divider divider-horizontal -m-2 p-3"></div>
      <div className="dropdown dropdown-start">
        <div tabIndex={0} role="button" className="btn m-1 btn-ghost">Paragraph</div>
        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
          <li><a onClick={() => currentEditor!.chain().focus().toggleHeading({ level: 1 }).run()} className='text-3xl'>Heading 1</a></li>
          <li><a onClick={() => currentEditor!.chain().focus().toggleHeading({ level: 2 }).run()} className='text-2xl'>Heading 2</a></li>
          <li><a onClick={() => currentEditor!.chain().focus().toggleHeading({ level: 3 }).run()} className='text-xl'>Heading 3</a></li>
          <li><a onClick={() => currentEditor!.chain().focus().toggleHeading({ level: 4 }).run()} className='text-lg'>Heading 4</a></li>
          <li><a onClick={() => currentEditor!.chain().focus().toggleHeading({ level: 5 }).run()} className='text-base'>Heading 5</a></li>
          <li><a onClick={() => currentEditor!.chain().focus().toggleHeading({ level: 6 }).run()} className='text-sm'>Heading 6</a></li>
        </ul>
      </div>
      <div className="tooltip" data-tip="Blockquote">
        <button className='btn btn-square btn-sm btn-ghost'
          onClick={() => currentEditor!.chain().focus().toggleBlockquote().run()}
        >
          <Icons.QuoteIcon />
        </button>
      </div>
      <div className="tooltip" data-tip="Bold">
        <button className='btn btn-square btn-sm btn-ghost'
          onClick={() => currentEditor!.chain().focus().toggleBold().run()}
        >
          <Icons.BoldIcon />
        </button>
      </div>
      <div className="tooltip" data-tip="Italic">
        <button className='btn btn-square btn-sm btn-ghost'
          onClick={() => currentEditor!.chain().focus().toggleItalic().run()}
        >
          <Icons.ItalicIcon />
        </button>
      </div>
      <div className="tooltip" data-tip="Underline">
        <button className='btn btn-square btn-sm btn-ghost'
          onClick={() => currentEditor!.chain().focus().toggleUnderline().run()}
        >
          <Icons.UnderlineIcon />
        </button>
      </div>
      <div className="tooltip" data-tip="Strike">
        <button className='btn btn-square btn-sm btn-ghost'
          onClick={() => currentEditor!.chain().focus().toggleStrike().run()}
        >
          <Icons.StrikeIcon />
        </button>
      </div>
      <div className="divider divider-horizontal -m-2 p-3"></div>
      <div className="tooltip" data-tip="Align Left">
        <button className='btn btn-square btn-sm btn-ghost'
          onClick={() => currentEditor!.chain().focus().setTextAlign('left').run()}
        >
          <Icons.AlignLeftIcon />
        </button>
      </div>
      <div className="tooltip" data-tip="Align Center">
        <button className='btn btn-square btn-sm btn-ghost' onClick={() => currentEditor!.chain().focus().setTextAlign('center').run()}>
          <Icons.AlignCenterIcon />
        </button>
      </div>
      <div className="tooltip" data-tip="Align Right">
        <button className='btn btn-square btn-sm btn-ghost' onClick={() => currentEditor!.chain().focus().setTextAlign('right').run()}>
          <Icons.AlignRightIcon />
        </button>
      </div>
      <div className="tooltip" data-tip="Align Justify">
        <button className='btn btn-square btn-sm btn-ghost' onClick={() => currentEditor!.chain().focus().setTextAlign('justify').run()}>
          <Icons.AlignJustifyIcon />
        </button>
      </div>
      <div className="divider divider-horizontal -m-2 p-3"></div>
      <div className="tooltip" data-tip="Bullet List">
        <button className='btn btn-square btn-sm btn-ghost' onClick={() => currentEditor!.chain().focus().toggleBulletList().run()}>
          <Icons.BulletListIcon />
        </button>
      </div>
      <div className="tooltip" data-tip="Ordered List">
        <button className='btn btn-square btn-sm btn-ghost' onClick={() => currentEditor!.chain().focus().toggleOrderedList().run()}>
          <Icons.OrderedListIcon />
        </button>
      </div>
      <div className="tooltip" data-tip="Task List">
        <button className='btn btn-square btn-sm btn-ghost' onClick={() => currentEditor!.chain().focus().toggleTaskList().run()}>
          <Icons.ClipboardIcon />
        </button>
      </div>
      <div className="tooltip" data-tip="Table">
        <button className='btn btn-square btn-sm btn-ghost' onClick={() => {
          if (!currentEditor!.isActive('table')) {
            currentEditor!.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
          }
          else {
            currentEditor!.chain().focus().deleteTable().run();
          }
        }}>
          <Icons.TableIcon />
        </button>
      </div>
      <div className="tooltip" data-tip="Color">
        <ColorSelection />
      </div>
    </div>
  );
};

export default Toolbar;