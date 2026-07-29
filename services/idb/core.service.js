const Index = {
    db: null,
    DB_NAME: 'hyperkia',

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

            const requestDB = indexedDB.open(this.DB_NAME);
            requestDB.addEventListener('upgradeneeded', (e) => {
                this.db = e.target.result;
                this.createObjectsVersion0();

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
        this.deleteOldDatabaseStructure(data);        
        return data;        
    },

    createObjectsVersion0() {        
        const createObjectStore = ['pages', 'layers', 'assets']
        createObjectStore.forEach((os) => {
            const objectStore = this.db.createObjectStore(os, {
                keyPath: 'id',
            })
        })

        const canvasObject = this.db.createObjectStore('canvas');
        const optionsObject = this.db.createObjectStore('options');

        const nowTime = Date.now();
        canvasObject.add(nowTime, 'createdAt');
        canvasObject.add(nowTime, 'updatedAt');
        canvasObject.add('DOM - v2', 'dataStructure');
        canvasObject.add(structuredClone(KIA.state.config.getProp('defaultProjectFont')), 'projectFonts');
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
            const nowTime = Date.now();
            objects.forEach((o) => {
                o.updatedAt = nowTime;
                o.createdAt = nowTime;
                const addRequest = addObjectStore.add(o);
                addRequest.onsuccess = (e) => {
                    storeobjects.push(o);
                }

                addRequest.onerror = (error) => {
                    console.error(error);
                }
            })

            addTransaction.oncomplete = (e) => resolve(storeobjects);
            addTransaction.onerror = (e) => reject(e.target.error);

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
                        result[o.id] = o;
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

    updateObject(objectStore, id, obj) {
        if(!this.db) return;
        return new Promise((resolve, reject) => {
            if(!this.db.objectStoreNames.contains(objectStore)) resolve({});
            const transactionRequest = this.db.transaction([objectStore], 'readwrite');
            const objectStoreRequest = transactionRequest.objectStore(objectStore);

            const getRequest = objectStoreRequest.get(id);

            getRequest.onsuccess = () => {
                const getObj = getRequest.result;                
                if(!getObj) return;
                getObj.updatedAt = Date.now();
                for (let prop in obj) {
                    if (prop === 'id') continue;
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
                const getReq = store.get(obj.id);                

                getReq.onsuccess = () => {
                    const record = getReq.result;
                    if (!record) return;

                    for (const prop in obj) {
                        if (prop === 'id') continue;
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

    deleteObjects(objectStore, ids) {
        return new Promise((resolve, reject) => {
            ids = Array.isArray(ids) ? ids : [ids];

            const tx = this.db.transaction([objectStore], 'readwrite');
            const store = tx.objectStore(objectStore);

            const deletedIds = [];

            ids.forEach(id => {
                const req = store.delete(id);

                req.onsuccess = () => {
                    deletedIds.push(id);
                };

                req.onerror = (e) => {
                    reject(e);
                };
            });

            tx.oncomplete = () => {
                resolve(deletedIds);
            };

            tx.onerror = (e) => {
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
            const finalObj = { ...newObj, id: newObj.id };

            const request = store.put(finalObj);

            request.onsuccess = () => resolve(finalObj);
            request.onerror = (e) => reject(e);
        });
    },

    replaceObjectsByKey(objectStore, newObjs){
        return new Promise((resolve, reject) => {
            if(!this.db.objectStoreNames.contains(objectStore)) {
                return resolve([]);
            }

            const tx = this.db.transaction([objectStore], 'readwrite');
            const store = tx.objectStore(objectStore);

            const results = [];

            newObjs.forEach(obj => {
                obj.updatedAt = Date.now();

                const finalObj = { ...obj, id: obj.id };
                const request = store.put(finalObj);

                request.onsuccess = () => {
                    results.push(finalObj);
                };

                request.onerror = (e) => {
                    reject(e);
                };
            });

            tx.oncomplete = () => resolve(results);
            tx.onerror = (e) => reject(e);
        });
    },

    DONT_USE_CLEAN_DB() {
      const storeNames = ['canvas', 'layers', 'pages', 'assets', 'options'];
      return new Promise((resolve, reject) => {
        const tx = this.db.transaction(storeNames, 'readwrite');

        tx.oncomplete = () => resolve(true);
        tx.onerror = (e) => reject(e);

        storeNames.forEach(storeName => {
          const store = tx.objectStore(storeName);
          store.clear(); // deletes all records in that store
        });
      });
    },

    deleteOldDatabaseStructure(data) {
        if(data.canvas.dataStructure === 'DOM - v2') return;

        this.db.close()

        const deleteReq = indexedDB.deleteDatabase("hyperkia");

        deleteReq.onsuccess = () => {
            console.log("Old DB deleted");
            location.reload();
        };

        deleteReq.onerror = () => {
            console.error("DB delete failed");
        };

        deleteReq.onblocked = () => {
            console.warn("Close other tabs using this app");
        };
    }

}

export default Index;