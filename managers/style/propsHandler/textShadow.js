const Index = {
    prop: 'text-shadow',

    inputTo(result) {

    },

    selectionTo(result) {

    },

    computedTo(result) {

    },

    codeTo(result) {
        const textShadow = result.style['text-shadow'];
        if (!textShadow) return;

        const stack = [];
        const parse = KIA.utils.css.parseTextShadow(textShadow);
        parse.forEach((bs) => {
            stack.push({
                id: crypto.randomUUID(),
                name: "text-shadow",
                type: 'effect',
                enable: true,
                value: bs,
            })
        });
        result.stack.push(...stack)
    }
};


export default Index;