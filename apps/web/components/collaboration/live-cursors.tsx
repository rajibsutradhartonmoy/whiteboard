"use client";

import { useEffect, useState } from "react";
import { useCollaborationStore } from "@/stores/collaboration-store";

interface CursorProps {
  userId: string;
  userName: string;
  color: string;
  position: { x: number; y: number };
}

function Cursor({ userName, color, position }: CursorProps) {
  return (
    <div
      className="absolute pointer-events-none z-50 transition-transform duration-100"
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
    >
      {/* Cursor arrow */}
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        className="drop-shadow-sm"
      >
        <path
          d="M5.65376 3.19502L21.4337 11.4635C22.4337 11.9787 22.4237 13.3937 21.4037 13.8935L14.0537 17.5435L10.4037 24.8935C9.90376 25.9135 8.48876 25.9235 7.97376 24.9235L3.81376 4.46502C3.43376 2.51502 5.10376 0.865023 7.04376 1.27502L7.04376 1.27502L5.65376 3.19502Z"
          fill={color}
          stroke="white"
          strokeWidth="1.5"
        />
      </svg>
      {/* User name label */}
      <div
        className="absolute left-4 top-5 px-2 py-1 rounded text-xs text-white whitespace-nowrap"
        style={{ backgroundColor: color }}
      >
        {userName}
      </div>
    </div>
  );
}

export function LiveCursors() {
  const { cursors } = useCollaborationStore();
  const [visibleCursors, setVisibleCursors] = useState<
    Array<{ id: string; userName: string; color: string; position: { x: number; y: number } }>
  >([]);

  useEffect(() => {
    const cursorArray = Array.from(cursors.values())
      .filter((cursor) => {
        // Hide cursors older than 10 seconds
        const age = Date.now() - cursor.timestamp;
        return age < 10000;
      })
      .map((cursor) => ({
        id: cursor.userId,
        userName: cursor.userName,
        color: cursor.userColor,
        position: cursor.position,
      }));

    setVisibleCursors(cursorArray);
  }, [cursors]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {visibleCursors.map((cursor) => (
        <Cursor
          key={cursor.id}
          userId={cursor.id}
          userName={cursor.userName}
          color={cursor.color}
          position={cursor.position}
        />
      ))}
    </div>
  );
}
