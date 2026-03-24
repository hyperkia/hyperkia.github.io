const Index = {
    db: null,

    initDatabase() {
        return this.openDatabase().then((success) => {
            this.db = success;
            if(this.db.objectStoreNames.length !== 5) indexedDB.deleteDatabase('hyperkia');            
            return this.collectData();
        }).catch((error) => {
            console.error(error);
        });
    },

    openDatabase() {
        return new Promise((resolve, reject) => {
            if (this.db) {
                resolve(this.db);
                return false;
            }

            const requestDB = indexedDB.open('hyperkia');
            requestDB.addEventListener('upgradeneeded', (e) => {
                this.db = e.target.result;
                if (e.oldVersion === 0) this.createObjectsVersion0();
                if (e.oldVersion === 1) this.createObjectsVersion1();

            })

            requestDB.onsuccess = (e) => {
                resolve(e.target.result);
            }

            requestDB.onerror = (error) => {
                console.error(error);
            }

        });
    },

    async collectData() {
        const data = {};
        data.layers = await this.getAllObjects('layers');
        data.pages = await this.getAllObjects('pages');
        data.canvas = await this.getKeyValueObject('canvas');
        data.options = await this.getKeyValueObject('options');
        data.assets = await this.getKeyValueObject('assets');
        return data;
    },

    createObjectsVersion0() {
        
        const createObjectStore = ['pages', 'layers','assets']
        const pageKey = crypto.randomUUID();
        createObjectStore.forEach((os) => {
            const objectStore = this.db.createObjectStore(os, {
                keyPath: 'key',
            })

            // Add default page
            if (objectStore.name === 'pages') {
                objectStore.transaction.oncomplete = () => {
                    this.addObject('pages', {
                        key: pageKey,
                        name: `Page 1`,
                        css: {
                            'background-color': '#ffffffff',
                            width: '1920px',
                            height: '6000px',
                            visibility: 'visible',
                            'pointer-events': 'auto',
                        },
                        layers: [],
                        createdAt: Date.now(),
                    }).catch((error) => {
                        console.error(error);
                    })
                }
            }
        })

        const canvasObject = this.db.createObjectStore('canvas');
        const optionsObject = this.db.createObjectStore('options');

        canvasObject.add([pageKey], 'pagesOrder');
    },

    createObjectsVersion1() {},

    addObject(obJectStore, obj) {
        let objects = null;
        if (Array.isArray(obj)) {
            objects = obj;
        } else {
            objects = [obj];
        }

        const storeobjects = [];

        return new Promise((resolve, reject) => {
            const addTransaction = this.db.transaction([obJectStore], 'readwrite');
            const addObjectStore = addTransaction.objectStore(obJectStore);
            objects.forEach((o) => {

                const addRequest = addObjectStore.add(o);
                addRequest.onsuccess = (e) => {
                    storeobjects.push(o);
                }

                addRequest.onerror = (error) => {
                    console.error(error);
                }
            })

            addTransaction.oncomplete = (e) => resolve(storeobjects);
            addTransaction.onerror = (e) => reject(e);

        })
    },

    async getKeyValueObject(obJectStore, keyName) {
        if (!this.db) {
            this.db = await this.openDatabase();
        }

        return new Promise((resolve, reject) => {
            const transactionRequest = this.db.transaction([obJectStore], 'readonly');
            const objectStoreRequest = transactionRequest.objectStore(obJectStore);
            const getKeys = objectStoreRequest.getAllKeys();
            const getValus = objectStoreRequest.getAll();

            transactionRequest.oncomplete = () => {

                const keys = getKeys.result;
                const valus = getValus.result;

                const keyValusPair = {};
                keys.forEach((k, i) => {
                    keyValusPair[k] = valus[i];
                });

                if (keyName) resolve({
                    [keyName]: keyValusPair[keyName]
                });
                if (!keyName) resolve(keyValusPair);

            }

            transactionRequest.onerror = (error) => {
                console.error(error);
            }
        })
    },

    async getAllObjects(obJectStore, onload) {
        if (onload === 'onload' && !this.db) {
            this.db = await this.openDatabase();
        }

        return new Promise((resolve, reject) => {
            const transactionRequest = this.db.transaction([obJectStore], 'readwrite');
            const objectStoreRequest = transactionRequest.objectStore(obJectStore);
            const getAllRequest = objectStoreRequest.getAll();

            getAllRequest.onsuccess = () => {
                const result = {};
                getAllRequest.result.forEach((o) => {
                    result[o.key] = o;
                })

                resolve(result);
            }

            getAllRequest.onerror = (error) => {
                console.error(error);
            }
        })
    },

    updateObject(obJectStore, key, obj) {

        return new Promise((resolve, reject) => {
            const transactionRequest = this.db.transaction([obJectStore], 'readwrite');
            const objectStoreRequest = transactionRequest.objectStore(obJectStore);

            const getRequest = objectStoreRequest.get(key);

            getRequest.onsuccess = () => {
                const getObj = getRequest.result;                

                for (let prop in obj) {
                    if (prop === 'key') continue;
                    if (typeof obj[prop] === 'string') {
                        getObj[prop] = obj[prop];
                    } else if(Array.isArray(obj[prop])) {
                        getObj[prop] = obj[prop];
                    } else if (typeof obj[prop] === 'object') {
                        if(!getObj[prop]) getObj[prop] = {};
                        Object.assign(getObj[prop], obj[prop]);
                    }
                }


                const putRequest = objectStoreRequest.put(getObj);

                putRequest.onsuccess = () => {
                    resolve(getObj);
                }

                putRequest.onerror = (error) => {
                    console.error(error);
                }
            }

            getRequest.onerror = (error) => {
                console.error(error);
            }

        })
    },

    updateObjects(objectStore, objs) {
        return new Promise((resolve, reject) => {
            const tx = this.db.transaction([objectStore], 'readwrite');
            const store = tx.objectStore(objectStore);

            objs.forEach(obj => {
                const getReq = store.get(obj.key);

                getReq.onsuccess = () => {
                    const record = getReq.result;
                    if (!record) return;

                    for (const prop in obj) {
                        if (prop === 'key') continue;
                        if (typeof obj[prop] === 'object' && obj[prop] !== null) {
                            record[prop] ??= {};
                            Object.assign(record[prop], obj[prop]);
                        } else {
                            record[prop] = obj[prop];
                        }
                    }

                    store.put(record);
                };
            });

            tx.oncomplete = () => resolve(true);
            tx.onerror = (e) => reject(e);
        });
    },

    deleteObject(objectStore, key) { 
        return new Promise((resolve, reject) => {
            const transactionRequest = this.db.transaction([objectStore], 'readwrite');
            const objectStoreRequest = transactionRequest.objectStore(objectStore);

            const deleteRequest = objectStoreRequest.delete(key);

            deleteRequest.onsuccess = () => {
                resolve(key);
            };

            deleteRequest.onerror = (e) => {
                reject(e);
            };
        });
    },

    updateKeyValueObject(objectStore, objects) {
        return new Promise((resolve, reject) => {
            const addTransaction = this.db.transaction([objectStore], 'readwrite');
            const addObjectStore = addTransaction.objectStore(objectStore);

            for (let prop in objects) {
                const addRequest = addObjectStore.put(objects[prop], prop);
                addRequest.onsuccess = (success) => {
                    // console.log(success);
                }

                addRequest.onerror = (error) => {
                    console.error(error);
                }
            }

            addTransaction.oncomplete = (e) => resolve('success');
            addTransaction.onerror = (e) => reject(e);

        })
    },

}

export default Index;