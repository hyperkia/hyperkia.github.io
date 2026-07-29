const Index = {
    prop: 'filter',

    inputTo(result) {

    },

    selectionTo(result) {

    },

    computedTo(result) {

    },

    codeTo(result) {
        const filter = result.style['filter'];
        if (!filter) return;

        const parseDrop = KIA.utils.css.parseDropShadow(filter);
        const parseFilter = KIA.utils.css.parseFilter(filter);

        const stack = [];

        parseDrop.forEach((bs) => {
            stack.push({
                id: crypto.randomUUID(),
                name: "drop-shadow",
                type: 'effect',
                enable: true,
                value: bs,
            })
        });

        parseFilter.forEach((fl) => {
            stack.push({
                id: crypto.randomUUID(),
                name: fl.name,
                enable: true,
                type: 'filter',
                value: fl.value,
            })

        });

        result.stack.push(...stack)
    }
};


export default Index;