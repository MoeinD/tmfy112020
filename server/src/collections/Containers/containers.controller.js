const containerModel = require('./containers.models').container;

exports.deleteContainer = async containerData => {
    return new Promise(async (resolve, reject) => {
        try {
            let rowList = containerData.Row.map(containerRow => containerRow.id);
            const pullResult = await containerModel.update({}, { $pull: { Row: { id: { $in: rowList } } } }, { multi: true });
            resolve(containerData);
        }
        catch (error) {
            reject(error);
        }
    })
}

exports.getContainer = async containerData => {
    return new Promise(async (resolve, reject) => {
        try {
            const desireContainer = await containerModel.find({ fillContainer: containerData.fillContainer });

            if (desireContainer.length > 0) {
                if (containerData.all) resolve(desireContainer[0])
                var keyList = Object.keys(containerData);
                keyList = keyList.filter(keyItem => keyItem !== 'fillContainer');
                var containerRows = desireContainer[0].Row;
                keyList.map(keyItem => {
                    containerRows = containerRows.filter(containerItem => {
                        return containerItem[keyItem] === containerData[keyItem];
                    })
                })
                resolve([{ fillContainer: containerData.fillContainer, Row: containerRows }]);
            }
        }
        catch (err) {
            reject(err);
        }
    })
}

exports.addContainer = async containerData => {
    /**get the container object in the data base if exist  */
    const inputContainer = containerData[0];
    console.log('this is the input containre ', inputContainer);
    const currentContainer = await containerModel.findOne({ fillContainer: inputContainer.fillContainer });
    if (!currentContainer) {
        const newContainer = new containerModel(inputContainer);
        return new Promise(async (resolve, reject) => {
            try {
                const container = await newContainer.save();
                resolve(container);
            }
            catch (error) {
                reject(error);
            }
        })
    } else if (inputContainer.Row) {
        var rowExist = false;
        inputContainer.Row.map(async inputContainerItem => {
            currentContainer.Row.map(async currentContainerRow => {
                if (inputContainerItem.id === currentContainerRow.id) {
                    rowExist = true;
                    currentContainerRow = Object.assign(currentContainerRow, inputContainerItem, { currentTime: new Date() });
                }
            })
            if (!rowExist) {
                currentContainer.Row.push(inputContainerItem);
            }
        })

        let currentContainerdeepCopy = JSON.parse(JSON.stringify(currentContainer));
        const newUpdate = await currentContainer.updateOne(currentContainerdeepCopy);
        return containerData[0];
    }
}