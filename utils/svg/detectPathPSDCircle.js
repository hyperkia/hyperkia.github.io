function Index(path, eps = 0.01) {
    // Count commands
    const commands = path.match(/[A-Za-z]/g) || [];

    const count = {};
    for (const c of commands) {
        count[c] = (count[c] || 0) + 1;
    }

    // Photoshop circle:
    // 1 Move + 4 Cubic curves + Close
    if (
        count.M !== 1 ||
        count.C !== 4 ||
        (count.Z || 0) !== 1 ||
        count.L ||
        count.H ||
        count.V ||
        count.Q ||
        count.A
    ) {
        return false;
    }

    // Compute bounding box from all points
    const nums = path.match(/-?\d*\.?\d+/g).map(Number);

    let minX = Infinity,
        minY = Infinity,
        maxX = -Infinity,
        maxY = -Infinity;

    for (let i = 0; i < nums.length; i += 2) {
        minX = Math.min(minX, nums[i]);
        maxX = Math.max(maxX, nums[i]);

        minY = Math.min(minY, nums[i + 1]);
        maxY = Math.max(maxY, nums[i + 1]);
    }

    const width = maxX - minX;
    const height = maxY - minY;

    return {
        isCircle: Math.abs(width - height) < eps,
        width, height,
    };
}

export default Index;