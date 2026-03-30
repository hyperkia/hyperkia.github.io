const Index = {
    db: null,

    initDatabase() {
        return this.openDatabase().then((success) => {
            this.db = success;            
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
        const createObjectStore = ['pages', 'layers', 'assets']
        createObjectStore.forEach((os) => {
            const objectStore = this.db.createObjectStore(os, {
                keyPath: 'key',
            })
        })

        const canvasObject = this.db.createObjectStore('canvas');
        const optionsObject = this.db.createObjectStore('options');

        canvasObject.add(Date.now(), 'createdAt');
        canvasObject.add(Date.now(), 'updatedAt');
    },

    createObjectsVersion1() {},

    addObject(objectStore, obj) {

        let objects = null;
        if (Array.isArray(obj)) {
            objects = obj;
        } else {
            objects = [obj];
        }
        const storeobjects = [];

        if(!this.db) return;

        return new Promise((resolve, reject) => {
            if(!this.db.objectStoreNames.contains(objectStore)) resolve({});
            const addTransaction = this.db.transaction([objectStore], 'readwrite');
            const addObjectStore = addTransaction.objectStore(objectStore);
            objects.forEach((o) => {
                o.updatedAt = Date.now();
                o.createdAt = Date.now();
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

    async getKeyValueObject(objectStore, keyName) {
        if (!this.db) this.db = await this.openDatabase();

        return new Promise((resolve, reject) => {
            if(this.db.objectStoreNames.contains(objectStore)) {
                const transactionRequest = this.db.transaction([objectStore], 'readonly');
                const objectStoreRequest = transactionRequest.objectStore(objectStore);
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
                    reject(error);
                }
            } else {                
                resolve({});
            }
            
        })
    },

    async getAllObjects(objectStore, onload) {
        if (onload === 'onload' && !this.db) {
            this.db = await this.openDatabase();
        }
        return new Promise((resolve, reject) => {
            if(this.db.objectStoreNames.contains(objectStore)) {
                const transactionRequest = this.db.transaction([objectStore], 'readwrite');
                const objectStoreRequest = transactionRequest.objectStore(objectStore);
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
            } else {
                resolve({});
            }
        })
    },

    updateObject(objectStore, key, obj) {
        if(!this.db) return;
        return new Promise((resolve, reject) => {
            if(!this.db.objectStoreNames.contains(objectStore)) resolve({});
            const transactionRequest = this.db.transaction([objectStore], 'readwrite');
            const objectStoreRequest = transactionRequest.objectStore(objectStore);

            const getRequest = objectStoreRequest.get(key);

            getRequest.onsuccess = () => {
                const getObj = getRequest.result;                

                getObj.updatedAt = Date.now();
                for (let prop in obj) {
                    if (prop === 'key') continue;
                    if (typeof obj[prop] === 'string') {
                        if(!getObj[prop]) getObj[prop] = '';
                        getObj[prop] = obj[prop];
                    } else if(Array.isArray(obj[prop])) {
                        if(!getObj[prop]) getObj[prop] = null;
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
            if(!this.db.objectStoreNames.contains(objectStore)) resolve({});
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
                    record.updatedAt = Date.now();
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

    updateKeyValueObject(objectStore, obj) {
        if(!this.db) return;
        return new Promise((resolve, reject) => {
            if(!this.db.objectStoreNames.contains(objectStore)) resolve({});
            const addTransaction = this.db.transaction([objectStore], 'readwrite');
            const addObjectStore = addTransaction.objectStore(objectStore);

            obj.updatedAt = Date.now();

            for (let prop in obj) {
                const addRequest = addObjectStore.put(obj[prop], prop);
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

    replaceObjectByKey(objectStore, newObj){
        return new Promise((resolve, reject) => {
            if(!this.db.objectStoreNames.contains(objectStore)) resolve({});
            const tx = this.db.transaction([objectStore], 'readwrite');
            const store = tx.objectStore(objectStore);

            newObj.updatedAt = Date.now();

            // Ensure key remains same
            const finalObj = { ...newObj, key: newObj.key };

            const request = store.put(finalObj);

            request.onsuccess = () => resolve(finalObj);
            request.onerror = (e) => reject(e);
        });
    },

}

export default Index;