import { useRef, useEffect, useCallback, forwardRef, useImperativeHandle } from 'react';

export interface CanvasColoringHandle {
  clear: () => void;
}

interface Props {
  imageSrc: string;
  activeColor: string;
  brushSize: number;
}

const CanvasColoring = forwardRef<CanvasColoringHandle, Props>(function CanvasColoring(
  { imageSrc, activeColor, brushSize },
  ref,
) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const lastPos = useRef<{ x: number; y: number } | null>(null);

  const clearCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  useImperativeHandle(ref, () => ({ clear: clearCanvas }), [clearCanvas]);

  useEffect(() => {
    clearCanvas();
  }, [imageSrc, clearCanvas]);

  function getPos(
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>,
    canvas: HTMLCanvasElement,
  ): { x: number; y: number } {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    if ('touches' in e) {
      const touch = e.touches[0];
      return {
        x: (touch.clientX - rect.left) * scaleX,
        y: (touch.clientY - rect.top) * scaleY,
      };
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  }

  function paint(pos: { x: number; y: number }, ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = activeColor;
    ctx.strokeStyle = activeColor;
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (lastPos.current) {
      ctx.beginPath();
      ctx.moveTo(lastPos.current.x, lastPos.current.y);
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
    }
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, brushSize / 2, 0, Math.PI * 2);
    ctx.fill();

    lastPos.current = pos;
  }

  function onStart(e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>): void {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    drawing.current = true;
    const pos = getPos(e, canvas);
    lastPos.current = null;
    paint(pos, ctx);
  }

  function onMove(e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>): void {
    e.preventDefault();
    if (!drawing.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    paint(getPos(e, canvas), ctx);
  }

  function onEnd(): void {
    drawing.current = false;
    lastPos.current = null;
  }

  return (
    <div className="relative w-full h-full select-none">
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        className="absolute inset-0 w-full h-full rounded-2xl"
        style={{ cursor: 'crosshair', touchAction: 'none' }}
        onMouseDown={onStart}
        onMouseMove={onMove}
        onMouseUp={onEnd}
        onMouseLeave={onEnd}
        onTouchStart={onStart}
        onTouchMove={onMove}
        onTouchEnd={onEnd}
      />
      <img
        src={imageSrc}
        alt="صورة التلوين"
        draggable={false}
        className="absolute inset-0 w-full h-full object-contain rounded-2xl pointer-events-none"
        style={{ mixBlendMode: 'multiply' }}
      />
    </div>
  );
});

export default CanvasColoring;
