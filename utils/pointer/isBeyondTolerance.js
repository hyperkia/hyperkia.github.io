export function Index(startX, startY, currentX, currentY, tolerance = 7) {
	const dx = currentX - startX; // ← movement in X
	const dy = currentY - startY; // ← movement in Y
	return (dx * dx + dy * dy) >= (tolerance * tolerance);
}

export default Index;