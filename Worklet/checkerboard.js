class CheckerboardPainter {
    paint(ctx, geom, properties) {
        const colors = ['#ff7d00', '#7dff00', '#007dff'];
        const size = 32;
        const h = Math.ceil(geom.height / size);
        const w = Math.ceil(geom.width / size);
        for(let y = 0; y < h; y++) {
            for(let x = 0; x < w; x++) {
                const color = colors[(x + y) % colors.length];
                ctx.beginPath();
                ctx.fillStyle = color;
                ctx.rect(x * size, y * size, size, size);
                ctx.fill();
            }
        }
    }
}
registerPaint('checkerboard', CheckerboardPainter);  