import { useEditorStore } from '@/app/core/global/useEditorStore';
import { Icons } from '@/app/core/icons/icons';
import React from 'react';

const ColorSelection = () => {
    const { currentEditor } = useEditorStore();
    const colors = [
        'bg-red-500', 'bg-red-700',
        'bg-orange-500', 'bg-orange-700',
        'bg-amber-500', 'bg-amber-700',
        'bg-yellow-500', 'bg-yellow-700',
        'bg-lime-500', 'bg-lime-700',
        'bg-green-500', 'bg-green-700',
        'bg-emerald-500', 'bg-emerald-700',
        'bg-teal-500', 'bg-teal-700',
        'bg-cyan-500', 'bg-cyan-700',
        'bg-sky-500', 'bg-sky-700',
        'bg-blue-500', 'bg-blue-700',
        'bg-indigo-500', 'bg-indigo-700',
        'bg-violet-500', 'bg-violet-700',
        'bg-purple-500', 'bg-purple-700',
        'bg-fuchsia-500', 'bg-fuchsia-700',
        'bg-pink-500', 'bg-pink-700',
        'bg-rose-500', 'bg-rose-700',
        'bg-neutral-500', 'bg-neutral-700',
        'bg-zinc-500', 'bg-zinc-700',
        'bg-gray-500', 'bg-gray-700',
        'bg-slate-500', 'bg-slate-700'
    ];
    const hexColors = [
        '#ef4444', '#b91c1c', // red
        '#f97316', '#c2410c', // orange
        '#f59e0b', '#b45309', // amber
        '#eab308', '#a16207', // yellow
        '#84cc16', '#4d7c0f', // lime
        '#22c55e', '#15803d', // green
        '#10b981', '#047857', // emerald
        '#14b8a6', '#0f766e', // teal
        '#06b6d4', '#0e7490', // cyan
        '#0ea5e9', '#0369a1', // sky
        '#3b82f6', '#1d4ed8', // blue
        '#6366f1', '#4338ca', // indigo
        '#8b5cf6', '#6d28d9', // violet
        '#a855f7', '#7e22ce', // purple
        '#d946ef', '#a21caf', // fuchsia
        '#ec4899', '#be185d', // pink
        '#f43f5e', '#be123c', // rose
        '#737373', '#404040', // neutral
        '#71717a', '#3f3f46', // zinc
        '#6b7280', '#374151', // gray
        '#64748b', '#334155', // slate
    ];
    return (
        <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-square btn-ghost"><Icons.ColorIcon /></div>
            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                <div className='grid grid-cols-7 gap-1'>
                    {colors.map((colorClass, index) => (
                        <button key={index} className={`btn btn-square btn-xs ${colorClass}`} onClick={() => currentEditor!.chain().focus().setColor(hexColors[index]).run()} />
                    ))}
                </div>
            </ul>
        </div>
    );
};

export default ColorSelection;