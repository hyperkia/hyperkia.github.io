function Index(numb) {
    const val = Math.max(0, Math.min(100, numb));
    return Math.floor((val / 100) * 255).toString(16).padStart(2, '0');
}

export default Index;