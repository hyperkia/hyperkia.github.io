const Index = {
    prop: 'box-shadow',

    inputTo(result) {

    },

    selectionTo(result) {

    },

    computedTo(result) {

    },

    codeTo(result) {
        const boxShadow = result.style['box-shadow'];
        if (!boxShadow) return;

        const stack = [];
        const parse = KIA.utils.css.parseBoxShadow(boxShadow);
        parse.forEach((bs) => {
            stack.push({
                id: crypto.randomUUID(),
                name: "box-shadow",
                type: 'effect',
                enable: true,
                value: bs,
            })
        });
        result.stack.push(...stack)
    }
};


export default Index;